(function () {
  const h = RC.h, ui = RC.ui;

  RC.pages['how-it-works'] = function () {
    const f = document.createDocumentFragment();

    f.append(h('section', { class: 'page-head' },
      ui.wrap(null,
        h('p', { class: 'eyebrow' }, 'How it works'),
        h('h1', null, 'Join. Run. Submit. Rank.'),
        h('p', { class: 'lead' }, 'Runner\'s Club turns your regular runs into a shared challenge. Here is the full flow as designed for the beta.'),
        ui.notice({ tone: 'demo', icon: 'info', title: 'Design preview',
          body: 'Sign-in, submissions and review are not connected yet. This page shows how the flow is planned to work.' }))));

    f.append(h('section', { class: 'band' },
      ui.wrap(null,
        h('ol', { class: 'flow' }, RC.demo.steps.map((s) =>
          h('li', { class: 'flow-item' },
            h('span', { class: 'flow-n' }, s.n),
            h('div', { class: 'flow-body' },
              h('h2', null, s.title),
              h('p', null, s.detail))))))));

    f.append(h('section', { class: 'band band-alt' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'Draft rules', title: 'What counts and what does not' }),
        h('div', { class: 'two-col' },
          h('div', { class: 'card' }, h('h3', { class: 'icon-line' }, ui.icon('check', 20), 'Counts'),
            h('ul', { class: 'list' },
              h('li', null, 'Outdoor runs recorded by a watch or phone app'),
              h('li', null, 'Treadmill runs with a clear final screen'),
              h('li', null, 'Run-walk sessions, as long as the full distance is logged'),
              h('li', null, 'Runs inside the challenge dates (IST)'))),
          h('div', { class: 'card' }, h('h3', { class: 'icon-line' }, ui.icon('close', 20), 'Does not count'),
            h('ul', { class: 'list' },
              h('li', null, 'Rides, drives or any motorised distance'),
              h('li', null, 'Edited or reused screenshots and files'),
              h('li', null, 'The same run submitted twice'),
              h('li', null, 'Runs without proof'))))))) ;

    f.append(h('section', { class: 'band' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'Submission screen', title: 'See what logging a run looks like',
          lead: 'Fill it in to preview the summary. Nothing is uploaded or saved.' }),
        h('div', { class: 'narrow' }, RC.activityForm({ idPrefix: 'how' })))));

    f.append(h('section', { class: 'band band-alt' },
      ui.wrap('narrow',
        ui.sectionHead({ eyebrow: 'Questions', title: 'Straight answers' }),
        h('div', { class: 'faq' }, RC.demo.faq.map((q) =>
          h('details', null, h('summary', null, q[0]), h('p', null, q[1])))))));

    f.append(h('section', { class: 'cta-band' },
      ui.wrap('cta-inner',
        h('h2', null, 'Ready when you are.'),
        h('p', null, 'Create a free account to be first in line when challenges open.'),
        ui.btn({ label: 'Join Your First Challenge', href: '#register' }))));
    return f;
  };
})();
