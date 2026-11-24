(function () {
  const h = RC.h, ui = RC.ui, S = RC.services;

  function contours() {
    let s = '';
    for (let i = 0; i < 12; i++) {
      const y = 760 - i * 58;
      s += '<path d="M-60 ' + y + ' C 220 ' + (y - 70) + ', 380 ' + (y + 60) + ', 620 ' + (y - 10) +
        ' S 980 ' + (y - 90) + ', 1260 ' + (y - 30) + '" opacity="' + (0.9 - i * 0.05).toFixed(2) + '"/>';
    }
    return s;
  }

  function heroArt() {
    const route = 'M-20 580 C 160 540, 240 440, 380 470 S 600 620, 740 490 S 920 280, 1100 320';
    return RC.html(
      '<svg class="hero-art" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
      '<defs><filter id="rc-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5" result="b"/>' +
      '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>' +
      '<g class="contours" fill="none" stroke="currentColor" stroke-width="1">' + contours() + '</g>' +
      '<path class="route-base" d="' + route + '" fill="none"/>' +
      '<path class="route-live" pathLength="1" d="' + route + '" fill="none" filter="url(#rc-glow)"/>' +
      '<g class="pins"><circle cx="380" cy="470" r="7"/><circle cx="740" cy="490" r="7"/><circle class="end" cx="1100" cy="320" r="11"/>' +
      '<text x="398" y="458">KM 5</text><text x="758" y="478">KM 10</text><text x="1060" y="290">FINISH</text></g></svg>');
  }

  function hero() {
    const fact = (t) => h('li', null, ui.icon('check', 16), t);
    return h('section', { class: 'hero' }, heroArt(),
      ui.wrap('hero-inner',
        h('h1', { class: 'hero-title' },
          h('span', { class: 'hero-brand' }, "RUNNER'S CLUB"),
          h('span', { class: 'l1' }, 'RUN MORE.'),
          h('span', { class: 'l2' }, 'WIN MORE.')),
        h('p', { class: 'hero-sub' }, "Weekly and monthly running challenges for Assam's runners. Log your kilometres, climb the leaderboard and earn badges."),
        h('div', { class: 'cta-row' },
          ui.btn({ label: 'Join Your First Challenge', href: '#register' }),
          ui.btn({ label: 'How it works', href: '#how-it-works', variant: 'ghost' })),
        h('ul', { class: 'hero-facts' }, fact('Free during beta'), fact('No entry fees'), fact('No lucky draws')),
        h('p', { class: 'hero-demo' }, ui.demoTag('DEMO PREVIEW'), ' Sample runners and numbers only.')));
  }

  function marquee() {
    const track = (hidden) => h('div', { class: 'marquee-track', 'aria-hidden': hidden ? 'true' : null },
      RC.demo.cities.map((c) => [h('span', null, c.toUpperCase()), h('i', { 'aria-hidden': 'true' })]));
    return h('div', { class: 'marquee', role: 'group', 'aria-label': 'Starting in Assam: ' + RC.demo.cities.join(', ') }, track(false), track(true));
  }

  function how() {
    return h('section', { class: 'band' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'How it works', title: 'Four steps. One kilometre at a time.',
          lead: 'Pick a challenge, run, send in your proof, and get ranked on reviewed results.' }),
        h('ol', { class: 'steps' }, RC.demo.steps.map((s) =>
          h('li', { class: 'step' },
            h('span', { class: 'step-n', 'aria-hidden': 'true' }, s.n),
            h('span', { class: 'step-ico' }, ui.icon(s.icon, 22)),
            h('h3', null, s.title),
            h('p', null, s.short)))),
        h('div', { class: 'center-row' }, ui.btn({ label: 'Full walkthrough', href: '#how-it-works', variant: 'ghost' }))));
  }

  function featuredSection() {
    return h('section', { class: 'band band-alt' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'Featured weekly challenge', title: 'This week\'s line in the sand' }),
        ui.asyncSlot(S.challenges.getFeaturedWeekly(), (ch) => RC.challenge.featured(ch))));
  }

  function boardSection() {
    return h('section', { class: 'band' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'Leaderboard preview', title: 'Ranked on reviewed runs',
          lead: 'In the live beta, only runs that pass review will count. Nothing below is real or verified.' }),
        ui.notice({ tone: 'demo', icon: 'eye', title: 'DEMO DATA', body: 'Sample runners and distances for the week of 16–22 Nov 2026. No activity on this site has been verified.' }),
        ui.asyncSlot(S.leaderboard.get({ period: 'weekly' }), (rows) => RC.board.table(rows.slice(0, 5))),
        h('div', { class: 'center-row' }, ui.btn({ label: 'Full leaderboard', href: '#leaderboard', variant: 'ghost' }))));
  }

  function runnersSection() {
    const picks = ['r2', 'r4', 'r7', 'r9'].map((id) => RC.demo.runners.find((r) => r.id === id));
    return h('section', { class: 'band band-alt' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'Runner profiles', title: 'Every pace has a place',
          lead: 'Sample profiles that show what your Runner\'s Club page will look like.' }),
        h('div', { class: 'profiles', role: 'list' }, picks.map((r) => h('div', { role: 'listitem' }, ui.profileCard(r))))));
  }

  function rewardsSection() {
    return h('section', { class: 'band' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'Rewards', title: 'Earned by kilometres. Never by luck.',
          lead: 'Reach the goal and the reward is yours. No raffles, no random draws and no entry fees.' }),
        h('div', { class: 'medals' }, RC.demo.medals.slice(0, 4).map((m) => ui.medal(m))),
        h('div', { class: 'center-row' }, ui.btn({ label: 'See all rewards', href: '#rewards', variant: 'ghost' }))));
  }

  function roadmap() {
    const phase = (n, t, tag, tone, text) =>
      h('li', { class: 'phase' }, h('span', { class: 'phase-n' }, n),
        h('div', null, h('h3', null, t, ' ', ui.chip(tag, tone)), h('p', null, text)));
    return h('section', { class: 'band band-alt' },
      ui.wrap(null,
        ui.sectionHead({ eyebrow: 'Assam first. India next.', title: 'Starting at home',
          lead: 'We are beginning with runners across Assam, then growing region by region.' }),
        h('ol', { class: 'phases' },
          phase(1, 'Assam beta', 'Now', 'lime', 'Free challenges for runners in Guwahati, Dibrugarh, Jorhat, Silchar, Tezpur, Nagaon, Tinsukia and Sivasagar.'),
          phase(2, 'North East', 'Planned', 'amber', 'Open challenges to runners across the North East.'),
          phase(3, 'Across India', 'Planned', 'amber', 'National boards, city boards and bigger seasonal challenges.'))));
  }

  function cta() {
    return h('section', { class: 'cta-band' },
      ui.wrap('cta-inner',
        h('h2', null, 'Your first kilometre is waiting.'),
        h('p', null, 'Join the free beta and be ready when the first challenge opens.'),
        ui.btn({ label: 'Join Your First Challenge', href: '#register' })));
  }

  RC.pages.home = function () {
    const f = document.createDocumentFragment();
    f.append(hero(), marquee(), how(), featuredSection(), boardSection(), runnersSection(), rewardsSection(), roadmap(), cta());
    return f;
  };
})();
