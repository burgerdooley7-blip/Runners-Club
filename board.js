/* Leaderboard table and podium. Rows come from RC.services.leaderboard. */
(function () {
  const h = RC.h, ui = RC.ui, fmt = RC.fmt;

  function table(rows) {
    const max = rows.length ? rows[0].km : 1;
    const th = (t, cls) => h('th', { scope: 'col', class: cls || null }, t);
    return h('div', { class: 'table-scroll' },
      h('table', { class: 'board' },
        h('caption', { class: 'sr' }, 'Leaderboard preview. Demo data. Not verified.'),
        h('thead', null, h('tr', null, th('#', 'c-rank'), th('Runner'), th('Runs', 'hide-s num'), th('Avg pace', 'hide-s num'), th('Distance', 'num'))),
        h('tbody', null, rows.map((r) =>
          h('tr', { class: r.rank <= 3 ? 'top top-' + r.rank : null },
            h('td', { class: 'c-rank' }, h('span', { class: 'rank' }, r.rank)),
            h('td', null,
              h('div', { class: 'who' }, ui.avatar(r, 40),
                h('div', null,
                  h('p', { class: 'who-name' }, r.name, ' ', ui.demoTag('DEMO')),
                  h('p', { class: 'muted small' }, r.city + ', Assam')))),
            h('td', { class: 'hide-s num mono' }, String(r.runs)),
            h('td', { class: 'hide-s num mono' }, fmt.pace(r.pace) + '/km'),
            h('td', { class: 'num' },
              h('span', { class: 'km mono' }, fmt.km(r.km), h('small', null, ' km')),
              h('span', { class: 'bar', 'aria-hidden': 'true' }, h('i', { style: { width: (r.km / max * 100) + '%' } }))))))));
  }

  function podium(rows) {
    return h('ol', { class: 'podium' }, rows.slice(0, 3).map((r, i) =>
      h('li', { class: 'pod pod-' + (i + 1) },
        h('span', { class: 'pod-rank' }, i + 1),
        ui.avatar(r, 56),
        h('strong', null, r.name),
        h('span', { class: 'muted small' }, r.city),
        h('span', { class: 'pod-km mono' }, fmt.km(r.km), h('small', null, ' km')),
        ui.demoTag('DEMO'))));
  }

  RC.board = { table, podium };
})();
