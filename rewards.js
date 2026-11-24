(function () {
  const h = RC.h, ui = RC.ui;

  RC.pages.rewards = function () {
    const f = document.createDocumentFragment();

    f.append(h('section', { class: 'page-head' },
      ui.wrap(null,
        h('p', { class: 'eyebrow' }, 'Rewards'),
        h('h1', null, 'Earned by kilometres. Never by luck.'),
        h('p', { class: 'lead' }, 'Reach a goal and the reward is yours. Rewards follow published rules and reviewed results.'),
        ui.notice({ tone: 'demo', icon: 'info', title: 'Free beta, no random draws',
          body: 'There are no entry fees, memberships, payments, raffles or lucky draws. The rewards below are plans for the beta and may change.' }))));

    f.append(h('section', { class: 'band' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'Badges', title: 'The badge wall',
          lead: 'Every runner who reaches the goal earns the badge. No quotas.' }),
        h('div', { class: 'medals' }, RC.demo.medals.map((m) => ui.medal(m))))));

    f.append(h('section', { class: 'band band-alt' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'What is planned', title: 'Recognition that fits the effort' }),
        h('div', { class: 'reward-grid' }, RC.demo.rewards.map((r) =>
          h('article', { class: 'card reward' },
            h('span', { class: 'step-ico' }, ui.icon(r.icon, 22)),
            h('h3', null, r.title),
            h('p', { class: 'muted' }, r.text),
            ui.chip(r.status, r.tone)))))));

    f.append(h('section', { class: 'band' },
      ui.wrap('narrow',
        ui.sectionHead({ eyebrow: 'The rules of rewards', title: 'How rewards are decided' }),
        h('ul', { class: 'list big' },
          h('li', null, 'Rewards go to runners who meet a goal or finish high on a board.'),
          h('li', null, 'Only reviewed runs count toward a goal or a ranking.'),
          h('li', null, 'No lucky draws, no raffles and no chance-based prizes.'),
          h('li', null, 'No payment is needed to take part or to earn a reward.'),
          h('li', null, 'Anything involving a partner will be announced with its own terms before it starts.')),
        h('div', { class: 'cta-row' },
          ui.btn({ label: 'Join Your First Challenge', href: '#register' }),
          ui.btn({ label: 'Fair play rules', href: '#fair-play', variant: 'ghost' })))));
    return f;
  };
})();
