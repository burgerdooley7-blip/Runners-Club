(function () {
  const h = RC.h, ui = RC.ui;

  RC.pages.challenges = function () {
    const f = document.createDocumentFragment();
    let kind = 'all';
    const grid = h('div', { class: 'ch-grid' });
    const tabs = h('div', { class: 'tabs', role: 'group', 'aria-label': 'Challenge type' });
    const count = h('p', { class: 'muted small', 'aria-live': 'polite' });
    let all = [];

    function paint() {
      const list = all.filter((c) => kind === 'all' || c.kind === kind);
      grid.replaceChildren(...list.map((c) => RC.challenge.card(c)));
      count.textContent = list.length + ' demo challenges shown';
      [...tabs.children].forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === kind)));
    }
    [['all', 'All'], ['weekly', 'Weekly'], ['monthly', 'Monthly']].forEach((t) =>
      tabs.append(h('button', { type: 'button', class: 'tab', 'data-k': t[0], 'aria-pressed': String(t[0] === 'all'),
        onClick: () => { kind = t[0]; paint(); } }, t[1])));

    RC.services.challenges.list().then((l) => { all = l; paint(); });

    f.append(h('section', { class: 'page-head' },
      ui.wrap(null,
        h('p', { class: 'eyebrow' }, 'Challenges'),
        h('h1', null, 'Pick your number.'),
        h('p', { class: 'lead' }, 'Weekly sprints and monthly distance goals, with a level for every runner.'),
        ui.notice({ tone: 'demo', icon: 'eye', title: 'DEMO CHALLENGES', body: 'These challenges show the planned format. Dates and rules are drafts and joining is not connected yet.' }))));

    f.append(h('section', { class: 'band' },
      ui.wrap(null,
        h('div', { class: 'toolbar' }, tabs, count),
        grid)));

    f.append(h('section', { class: 'band band-alt' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'Levels', title: 'Find your level' }),
        h('div', { class: 'levels' }, Object.keys(RC.demo.levels).map((k) =>
          h('div', { class: 'card' }, h('h3', null, k), h('p', { class: 'muted' }, RC.demo.levels[k])))))));
    return f;
  };
})();
