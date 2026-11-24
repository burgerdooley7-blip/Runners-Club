/* User dashboard — a PREVIEW of the signed-in experience with an invented profile.
   Later: guard this route with RC.services.auth.getSession() and read the user's own rows. */
(function () {
  const h = RC.h, ui = RC.ui, fmt = RC.fmt, S = RC.services;

  function weekChart(days) {
    const max = 15, ticks = [0, 5, 10, 15];
    return h('div', { class: 'chart', role: 'img',
      'aria-label': 'Distance per day: ' + days.map((d) => d.d + ' ' + d.km + ' km').join(', ') },
      h('div', { class: 'plot' },
        ticks.map((t) => h('div', { class: 'tick', style: { bottom: (t / max * 100) + '%' } }, h('span', null, t))),
        h('div', { class: 'bars' }, days.map((d) =>
          h('div', { class: 'bar-col' },
            h('span', { class: 'bar-val' }, d.km ? fmt.km(d.km) : ''),
            h('div', { class: 'bar-fill' + (d.km ? '' : ' zero'), style: { height: (d.km / max * 100) + '%' } }),
            h('span', { class: 'bar-day' }, d.d))))));
  }

  const STATUS = {
    pending: ['Pending review', 'amber'],
    info: ['Needs info', 'amber']
  };

  function activityRow(a) {
    const pace = fmt.pace(fmt.parseDuration(a.time) / a.km);
    const st = STATUS[a.status];
    return h('li', { class: 'act' },
      h('div', { class: 'act-main' },
        h('p', null, h('strong', null, fmt.km(a.km) + ' km'), h('span', { class: 'muted' }, ' · ' + a.time + ' · ' + pace + '/km')),
        h('p', { class: 'muted small' }, RC.dates.long(a.date) + ' · ' + a.source + ' · ' + a.challenge),
        a.note ? h('p', { class: 'small note' }, a.note) : null),
      h('div', { class: 'act-side' }, ui.chip(st[0], st[1]), ui.demoTag('DEMO')));
  }

  RC.pages.dashboard = function () {
    const me = RC.demo.me;
    const f = document.createDocumentFragment();

    const stats = h('dl', { class: 'stats' },
      ui.stat('This week', '36.6', 'km'), ui.stat('Runs', '5'), ui.stat('Avg pace', fmt.pace(me.pace), '/km'),
      ui.stat('Rank', '—', 'pending review'));

    const progress = ui.asyncSlot(S.activities.progressMine(), (items) =>
      h('ul', { class: 'prog-list' }, items.map((p) => {
        const ch = RC.demo.challenges.find((c) => c.id === p.challengeId);
        const goal = Number(ch.goal.value), st = RC.challenge.status(ch);
        return h('li', null,
          h('div', { class: 'prog-top' }, h('strong', null, ch.title), ui.chip(st.label, st.tone)),
          ui.progress(p.done / goal * 100, ch.title + ' progress'),
          h('p', { class: 'muted small mono' }, fmt.km(p.done) + ' of ' + goal + ' ' + p.unit));
      })));

    const chart = ui.asyncSlot(S.activities.weekMine(), weekChart);
    const acts = ui.asyncSlot(S.activities.listMine(), (rows) => h('ul', { class: 'act-list' }, rows.map(activityRow)));

    f.append(h('section', { class: 'page-head slim' },
      ui.wrap(null,
        ui.notice({ tone: 'demo', icon: 'eye', title: 'DEMO PROFILE. This is not your data.',
          body: 'You are not signed in. This screen previews the dashboard with an invented runner. Nothing here is verified.' }),
        h('div', { class: 'me' },
          ui.avatar(me, 72),
          h('div', null,
            h('h1', { class: 'me-name' }, me.name),
            h('p', { class: 'muted icon-line' }, ui.icon('pin', 14), me.city + ', Assam', ' · ', ui.chip(me.level, 'soft'), ' ', ui.demoTag('DEMO PROFILE')))))));

    f.append(h('section', { class: 'band tight' },
      ui.wrap('dash-grid',
        h('div', { class: 'd-stats' }, stats),
        h('div', { class: 'card d-progress' }, h('h2', { class: 'h3' }, 'Challenge progress'), progress),
        h('div', { class: 'd-submit' }, RC.activityForm({ idPrefix: 'dash' })),
        h('div', { class: 'card d-chart' },
          h('div', { class: 'card-head' }, h('h2', { class: 'h3' }, 'This week, km per day'), ui.demoTag('DEMO')),
          chart),
        h('div', { class: 'card d-acts' },
          h('div', { class: 'card-head' }, h('h2', { class: 'h3' }, 'Recent submissions'), ui.demoTag('DEMO')),
          acts,
          h('p', { class: 'muted small' }, 'Other review states planned: Accepted and Not accepted. No run here has been reviewed.')),
        h('div', { class: 'card d-badges' },
          h('h2', { class: 'h3' }, 'Badges'),
          h('div', { class: 'medals compact' }, RC.demo.myBadges.map((b) => ui.medal(b)))))));
    return f;
  };
})();
