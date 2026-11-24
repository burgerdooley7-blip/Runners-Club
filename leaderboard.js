(function () {
  const h = RC.h, ui = RC.ui;

  RC.pages.leaderboard = function () {
    const f = document.createDocumentFragment();
    let period = 'weekly', city = 'all';
    const label = h('p', { class: 'board-label' });
    const body = h('div', { class: 'slot', 'aria-live': 'polite' });
    const tabs = h('div', { class: 'tabs', role: 'group', 'aria-label': 'Period' });
    const sel = ui.field({ id: 'lb-city', label: 'City', options: ['All Assam'].concat(RC.demo.cities), placeholder: 'All Assam' });
    sel.control.removeChild(sel.control.firstChild); // the first option already reads "All Assam"
    sel.control.value = 'All Assam';

    async function paint() {
      const rows = await RC.services.leaderboard.get({ period, city });
      label.textContent = (period === 'weekly' ? 'Week of 16–22 Nov 2026' : 'November 2026, to 22 Nov') +
        (city === 'all' ? '' : ' · ' + city) + ' · DEMO DATA';
      [...tabs.children].forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === period)));
      if (!rows.length) { body.replaceChildren(h('p', { class: 'muted' }, 'No demo runners in this city.')); return; }
      body.replaceChildren(RC.board.podium(rows), RC.board.table(rows));
    }
    [['weekly', 'Weekly'], ['monthly', 'Monthly']].forEach((t) =>
      tabs.append(h('button', { type: 'button', class: 'tab', 'data-k': t[0], 'aria-pressed': String(t[0] === period),
        onClick: () => { period = t[0]; paint(); } }, t[1])));
    sel.control.addEventListener('change', () => { city = sel.control.value === 'All Assam' ? 'all' : sel.control.value; paint(); });
    paint();

    f.append(h('section', { class: 'page-head' },
      ui.wrap(null,
        h('p', { class: 'eyebrow' }, 'Leaderboard'),
        h('h1', null, 'Who is putting in the work.'),
        h('p', { class: 'lead' }, 'Ranked by distance. In the live beta, only runs that pass review will count here.'),
        ui.notice({ tone: 'demo', icon: 'eye', title: 'DEMO DATA. Nothing here is verified.',
          body: 'Every runner, distance and rank on this page is invented for the design preview.' }))));

    f.append(h('section', { class: 'band' },
      ui.wrap(null,
        h('div', { class: 'toolbar' }, tabs, h('div', { class: 'toolbar-field' }, sel.wrap)),
        label,
        body)));

    f.append(h('section', { class: 'band band-alt' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'Review states', title: 'How a run reaches the board',
          lead: 'Once review is live, each submission moves through these states. Only Accepted runs add to your distance.' }),
        h('div', { class: 'states' },
          [['Pending', 'amber', 'Submitted and waiting for a reviewer.'],
           ['Needs info', 'amber', 'A reviewer asked for clearer proof.'],
           ['Accepted', 'lime', 'Checked against the rules. Counts on the board.'],
           ['Not accepted', 'red', 'Does not meet the rules. Does not count.']].map((s) =>
            h('div', { class: 'card' }, ui.chip(s[0], s[1]), h('p', { class: 'muted' }, s[2])))),
        h('p', { class: 'muted small' }, 'These are planned states. No run in this preview has been reviewed.'))));
    return f;
  };
})();
