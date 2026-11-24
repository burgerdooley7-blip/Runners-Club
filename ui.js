/* Reusable UI building blocks. No page-specific logic lives here. */
(function () {
  const h = RC.h, html = RC.html;
  const ui = (RC.ui = {});

  const PATHS = {
    arrow: 'M5 12h14M13 6l6 6-6 6',
    check: 'M5 13l4 4L19 7',
    menu: 'M4 7h16M4 12h16M4 17h16',
    close: 'M6 6l12 12M18 6L6 18',
    pin: 'M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21zM12 9.5m-2.3 0a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0-4.6 0',
    clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
    lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
    upload: 'M12 16V4M7 9l5-5 5 5M5 20h14',
    bolt: 'M13 3L5 13h6l-1 8 8-11h-6l1-7z',
    trophy: 'M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 21h8M9.5 17h5',
    route: 'M7 19h5a4 4 0 0 0 0-8h-1a4 4 0 0 1 0-8h6M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M19 3m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
    medal: 'M8 3l3 6M16 3l-3 6M12 21a5 5 0 1 0 0-10 5 5 0 0 0 0 10z',
    shield: 'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3zM9 12l2 2 4-4',
    users: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5.5a3 3 0 0 1 0 5.5M18 14.5c1.8.8 3 2.6 3 5.5',
    calendar: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4',
    flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
    mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
    user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.6-7 8-7s8 3 8 7',
    info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01',
    file: 'M7 3h7l4 4v14H7zM14 3v4h4',
    heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
    eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0'
  };

  ui.icon = function (name, size) {
    size = size || 20;
    return html(
      '<svg class="icon" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      '<path d="' + (PATHS[name] || '') + '"/></svg>'
    );
  };

  ui.wrap = (cls, ...kids) => h('div', { class: 'wrap' + (cls ? ' ' + cls : '') }, ...kids);

  ui.demoTag = (label) =>
    h('span', { class: 'tag-demo', title: 'Sample record for the design preview. Not real, not verified.' }, label || 'DEMO DATA');

  ui.chip = (text, tone) => h('span', { class: 'chip chip-' + (tone || 'neutral') }, text);

  ui.avatar = (u, size) =>
    h('span', { class: 'avatar', 'aria-hidden': 'true', style: { '--h': u.hue, '--s': (size || 44) + 'px' } }, u.initials);

  ui.btn = function (o) {
    const cls = 'btn btn-' + (o.variant || 'primary') + (o.block ? ' btn-block' : '') + (o.small ? ' btn-sm' : '');
    const kids = [o.label, o.icon === false ? null : ui.icon(o.icon || 'arrow', 18)];
    if (o.href) return h('a', { class: cls, href: o.href }, kids);
    return h('button', { class: cls, type: o.type || 'button', onClick: o.onClick, disabled: o.disabled }, kids);
  };

  ui.sectionHead = (o) =>
    h('header', { class: 'sec-head' + (o.center ? ' center' : '') },
      o.eyebrow ? h('p', { class: 'eyebrow' }, o.eyebrow) : null,
      h('h2', { class: 'sec-title' }, o.title),
      o.lead ? h('p', { class: 'lead' }, o.lead) : null);

  ui.notice = (o) =>
    h('div', { class: 'notice notice-' + (o.tone || 'info'), role: 'note' },
      ui.icon(o.icon || 'info', 20),
      h('div', null,
        o.title ? h('strong', null, o.title) : null,
        o.body ? h('p', null, o.body) : null,
        o.extra || null));

  ui.progress = (pct, label) =>
    h('div', { class: 'progress', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100',
      'aria-valuenow': String(Math.round(pct)), 'aria-label': label || 'Progress' },
      h('i', { style: { width: Math.min(100, pct) + '%' } }));

  ui.stat = (label, value, unit) =>
    h('div', { class: 'stat' },
      h('dt', null, label),
      h('dd', null, h('span', { class: 'stat-val' }, value), unit ? h('span', { class: 'stat-unit' }, unit) : null));

  // Renders a loading state, then the result of a service call.
  ui.asyncSlot = function (promise, render) {
    const slot = h('div', { class: 'slot', 'aria-busy': 'true' }, h('p', { class: 'muted' }, 'Loading…'));
    promise.then((v) => {
      slot.removeAttribute('aria-busy');
      slot.replaceChildren(render(v));
    }).catch(() => {
      slot.replaceChildren(ui.notice({ tone: 'warn', title: 'Could not load this section', body: 'Refresh the page to try again.' }));
    });
    return slot;
  };

  ui.medal = function (o) {
    const earned = o.earned !== false;
    return h('figure', { class: 'medal' + (earned ? '' : ' locked') },
      html('<svg viewBox="0 0 80 92" width="76" height="87" aria-hidden="true"><path class="medal-shape" d="M40 3l33 19v48L40 89 7 70V22z"/>' +
        '<path class="medal-inner" d="M40 12l25 14.5v36L40 77 15 62.5v-36z"/>' +
        '<text x="40" y="55" text-anchor="middle" class="medal-text">' + o.mark + '</text></svg>'),
      h('figcaption', null, h('strong', null, o.label), o.sub ? h('span', null, o.sub) : null,
        o.earned === undefined ? null : h('em', null, earned ? 'Earned (demo)' : 'Locked')));
  };

  // Form field with label, hint and an inline error slot.
  ui.field = function (o) {
    const id = o.id;
    let control;
    if (o.options) {
      control = h('select', { id, name: id, required: o.required },
        h('option', { value: '' }, o.placeholder || 'Select'),
        o.options.map((x) => h('option', { value: x }, x)));
    } else if (o.type === 'textarea') {
      control = h('textarea', { id, name: id, rows: o.rows || 5, required: o.required, placeholder: o.placeholder });
    } else {
      control = h('input', {
        id, name: id, type: o.type || 'text', required: o.required, placeholder: o.placeholder,
        autocomplete: o.autocomplete, inputmode: o.inputmode, step: o.step, min: o.min, max: o.max,
        accept: o.accept, value: o.value, pattern: o.pattern
      });
    }
    const err = h('p', { class: 'field-err', id: id + '-err', 'aria-live': 'polite' });
    control.setAttribute('aria-describedby', (o.hint ? id + '-hint ' : '') + id + '-err');
    const wrap = h('div', { class: 'field' + (o.wide ? ' wide' : '') },
      h('label', { for: id }, o.label, o.optional ? h('span', { class: 'opt' }, ' (optional)') : null),
      control,
      o.hint ? h('p', { class: 'hint', id: id + '-hint' }, o.hint) : null,
      err);
    return { wrap, control, err };
  };

  ui.profileCard = function (r) {
    const fmt = RC.fmt;
    const cell = (k, v) => h('div', null, h('dt', null, k), h('dd', null, v));
    return h('article', { class: 'profile' },
      h('div', { class: 'profile-top' },
        ui.avatar(r, 60),
        h('div', null, h('h3', null, r.name),
          h('p', { class: 'muted small icon-line' }, ui.icon('pin', 14), r.city + ', Assam'))),
      h('div', { class: 'profile-tags' }, ui.chip(r.level, 'soft'), ui.demoTag('DEMO PROFILE')),
      h('dl', { class: 'profile-stats' },
        cell('This week', fmt.km(r.weeklyKm) + ' km'),
        cell('Runs', String(r.weeklyRuns)),
        cell('Avg pace', fmt.pace(r.pace) + '/km'),
        cell('Streak', r.streak + ' days')),
      h('p', { class: 'muted small' }, r.badges + ' badges earned (demo)'));
  };
})();
