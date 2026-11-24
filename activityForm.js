/* Run submission form. Validates in the browser and shows a preview summary.
   Nothing is uploaded or saved: RC.services.activities.submit() is a stub that
   reports NOT_CONNECTED. Swap that service for Supabase and this form keeps working. */
(function () {
  const h = RC.h, ui = RC.ui, fmt = RC.fmt;
  const MAX_BYTES = 10 * 1024 * 1024;
  const SOURCES = ['Strava', 'Garmin Connect', 'Apple Fitness', 'Nike Run Club', 'Google Fit / Fitbit', 'Treadmill screen', 'Other app'];

  RC.activityForm = function (opts) {
    const o = opts || {};
    const p = o.idPrefix || 'af';
    const today = RC.dates.todayISO();
    const open = RC.demo.challenges.filter((c) => RC.challenge.status(c).key !== 'ended');

    const fChallenge = ui.field({ id: p + '-challenge', label: 'Challenge', required: true, options: open.map((c) => c.title), wide: true });
    const fDate = ui.field({ id: p + '-date', label: 'Run date', type: 'date', required: true, value: today, max: today });
    const fKm = ui.field({ id: p + '-km', label: 'Distance (km)', type: 'number', step: '0.01', min: '0', inputmode: 'decimal', placeholder: '5.00', required: true });
    const fTime = ui.field({ id: p + '-time', label: 'Moving time', placeholder: '32:10', inputmode: 'numeric', required: true, hint: 'mm:ss or h:mm:ss' });
    const fSource = ui.field({ id: p + '-source', label: 'Recorded with', required: true, options: SOURCES });
    const fFile = ui.field({ id: p + '-file', label: 'Proof of run', type: 'file', accept: 'image/*,.gpx,.fit,.tcx', required: true, wide: true,
      hint: 'Screenshot or GPX/FIT/TCX file, up to 10 MB. In the live beta, proof will be stored privately.' });
    const confirmId = p + '-confirm';
    const confirm = h('input', { type: 'checkbox', id: confirmId, name: confirmId });
    const confirmErr = h('p', { class: 'field-err', id: confirmId + '-err', 'aria-live': 'polite' });
    const out = h('div', { class: 'form-out', 'aria-live': 'polite' });

    const fields = [fChallenge, fDate, fKm, fTime, fSource, fFile];
    const clear = () => { fields.forEach((f) => { f.err.textContent = ''; f.control.removeAttribute('aria-invalid'); }); confirmErr.textContent = ''; };
    const bad = (f, msg) => { f.err.textContent = msg; f.control.setAttribute('aria-invalid', 'true'); return false; };

    function validate() {
      clear();
      let ok = true;
      if (!fChallenge.control.value) ok = bad(fChallenge, 'Choose the challenge this run is for.');
      if (!fDate.control.value) ok = bad(fDate, 'Enter the date you ran.');
      else if (fDate.control.value > today) ok = bad(fDate, 'The run date cannot be in the future.');
      const km = parseFloat(fKm.control.value);
      if (!(km > 0)) ok = bad(fKm, 'Enter a distance greater than 0.');
      else if (km > 100) ok = bad(fKm, 'Single runs above 100 km need a manual review. Contact us.');
      const sec = fmt.parseDuration(fTime.control.value);
      if (sec === null || sec === 0) ok = bad(fTime, 'Use mm:ss or h:mm:ss, for example 32:10.');
      else if (km > 0 && (sec / km < 150 || sec / km > 900)) ok = bad(fTime, 'That pace looks off. Check the distance and the time.');
      if (!fSource.control.value) ok = bad(fSource, 'Tell us what recorded the run.');
      const file = fFile.control.files && fFile.control.files[0];
      if (!file) ok = bad(fFile, 'Attach a screenshot or a GPX/FIT/TCX file.');
      else if (file.size > MAX_BYTES) ok = bad(fFile, 'That file is over 10 MB. Attach a smaller one.');
      if (!confirm.checked) { confirmErr.textContent = 'Confirm the run is yours and the proof is unedited.'; ok = false; }
      return ok ? { km, sec, file } : null;
    }

    async function onSubmit(e) {
      e.preventDefault();
      const v = validate();
      if (!v) {
        out.replaceChildren();
        const first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }
      const payload = {
        challenge: fChallenge.control.value, ranOn: fDate.control.value, distanceKm: v.km,
        durationS: v.sec, source: fSource.control.value, proof: v.file
      };
      const res = await RC.services.activities.submit(payload);
      const row = (k, val) => h('div', null, h('dt', null, k), h('dd', null, val));
      out.replaceChildren(h('div', { class: 'summary' },
        h('div', { class: 'summary-head' }, h('strong', null, 'Preview of your submission'), ui.demoTag('NOT SUBMITTED')),
        h('dl', null,
          row('Challenge', payload.challenge),
          row('Date', RC.dates.long(payload.ranOn)),
          row('Distance', fmt.km(v.km) + ' km'),
          row('Time', fmt.duration(v.sec)),
          row('Pace', fmt.pace(v.sec / v.km) + ' /km'),
          row('Proof', v.file.name + ' (' + (v.file.size / 1024 < 1024 ? Math.round(v.file.size / 1024) + ' KB' : (v.file.size / 1048576).toFixed(1) + ' MB') + ')')),
        ui.notice({ tone: 'warn', icon: 'info', title: 'Not saved', body: res.message + ' When Supabase is connected, this creates a Pending submission for review.' })));
    }

    const form = h('form', { class: 'form', novalidate: true, onSubmit },
      h('div', { class: 'form-grid' },
        fChallenge.wrap, fDate.wrap, fKm.wrap, fTime.wrap, fSource.wrap, fFile.wrap),
      h('div', { class: 'check' }, confirm,
        h('label', { for: confirmId }, 'I ran this myself and the proof is unedited.')),
      confirmErr,
      h('div', { class: 'form-actions' },
        ui.btn({ label: 'Preview submission', type: 'submit', icon: 'check' }),
        h('button', { class: 'link-btn', type: 'reset', onClick: () => setTimeout(() => { clear(); out.replaceChildren(); }, 0) }, 'Clear')),
      out);

    return h('div', { class: 'submit-card' },
      h('div', { class: 'card-head' },
        h('h3', null, 'Submit a run'),
        ui.demoTag('PREVIEW ONLY')),
      h('p', { class: 'muted small' }, 'This form checks your entries and shows a summary. It does not upload files or save anything yet.'),
      form);
  };
})();
