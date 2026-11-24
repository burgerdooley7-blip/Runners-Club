(function () {
  const h = RC.h, ui = RC.ui;

  RC.pages.about = function () {
    const f = document.createDocumentFragment();

    f.append(h('section', { class: 'page-head' },
      ui.wrap(null,
        h('p', { class: 'eyebrow' }, 'About Us'),
        h('h1', null, 'A running club that fits in your pocket.'),
        h('p', { class: 'lead' }, 'Runner\'s Club is a free running challenge community. We are starting in Assam, where runners already fill the riverfront roads at dawn, and growing across India.'))));

    f.append(h('section', { class: 'band' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'What we believe', title: 'Four ideas we build around' }),
        h('div', { class: 'values' },
          [['users', 'Every pace has a place', 'Starter, Steady and Pro levels mean a first 2 km and a 150 km month both get a goal.'],
           ['shield', 'Fair play first', 'Rankings count reviewed runs. A board is only worth chasing if people trust it.'],
           ['pin', 'Local first', 'We begin with Assam\'s cities and towns and build from what runners there tell us.'],
           ['heart', 'Free to join', 'The beta has no fees, no memberships and no chance-based prizes.']].map((v) =>
            h('article', { class: 'card' }, h('span', { class: 'step-ico' }, ui.icon(v[0], 22)), h('h3', null, v[1]), h('p', { class: 'muted' }, v[2])))))));

    f.append(h('section', { class: 'band band-alt' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'Where we are', title: 'Starting across Assam',
          lead: 'The beta is aimed at these cities first.' }),
        h('ul', { class: 'city-chips' }, RC.demo.cities.map((c) => h('li', null, ui.icon('pin', 14), c))),
        h('ol', { class: 'phases' },
          [['1', 'Assam beta', 'Now', 'lime'], ['2', 'North East', 'Planned', 'amber'], ['3', 'Across India', 'Planned', 'amber']].map((p) =>
            h('li', { class: 'phase' }, h('span', { class: 'phase-n' }, p[0]),
              h('div', null, h('h3', null, p[1], ' ', ui.chip(p[2], p[3])))))))));

    f.append(h('section', { class: 'band' },
      ui.wrap('narrow',
        ui.sectionHead({ eyebrow: 'Beta status', title: 'Where the project stands today' }),
        ui.notice({ tone: 'demo', icon: 'info', title: 'This is a design preview',
          body: 'Accounts, run submission, review and rankings are not live. Every runner, run and ranking you see is DEMO DATA.' }),
        h('div', { class: 'cta-row' },
          ui.btn({ label: 'Get in touch', href: '#contact' }),
          ui.btn({ label: 'See how it works', href: '#how-it-works', variant: 'ghost' })))));
    return f;
  };
})();
