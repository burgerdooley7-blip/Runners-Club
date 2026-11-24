/* Site chrome: beta bar, header with mobile menu, footer. */
(function () {
  const h = RC.h, ui = RC.ui;

  const NAV = [
    ['how-it-works', 'How It Works'],
    ['challenges', 'Challenges'],
    ['leaderboard', 'Leaderboard'],
    ['rewards', 'Rewards'],
    ['about', 'About Us'],
    ['contact', 'Contact']
  ];

  function brandMark() {
    return RC.html('<svg class="brand-mark" viewBox="0 0 30 24" width="30" height="24" aria-hidden="true">' +
      '<path d="M9 0h9l-7 24H2z" fill="var(--lime)"/><path d="M21 0h9l-7 24h-9z" fill="var(--fg)"/></svg>');
  }

  function brand() {
    return h('a', { class: 'brand', href: '#home', 'aria-label': "Runner's Club, home" },
      brandMark(), h('span', { class: 'brand-word' }, "RUNNER'S", h('b', null, ' CLUB')));
  }

  function link(route, label, cls) {
    return h('a', { href: '#' + route, 'data-route': route, class: cls || null }, label);
  }

  function betaBar() {
    return h('div', { class: 'betabar' },
      ui.wrap('betabar-row',
        h('span', { class: 'dot', 'aria-hidden': 'true' }),
        h('p', null, h('strong', null, 'FREE BETA'), ' · Design preview. Every runner, run and ranking is ',
          h('strong', { class: 'lime' }, 'DEMO DATA'), '.')));
  }

  function header() {
    let open = false;
    const panel = h('div', { class: 'nav-panel', id: 'nav-panel', hidden: true },
      ui.wrap('panel-inner',
        h('nav', { 'aria-label': 'Mobile' },
          NAV.map((n) => link(n[0], n[1])),
          link('dashboard', 'Dashboard (demo)'),
          link('login', 'Login')),
        ui.btn({ label: 'Join Your First Challenge', href: '#register', block: true })));

    const toggle = h('button', {
      class: 'menu-btn', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'nav-panel', 'aria-label': 'Open menu',
      onClick: () => setMenu(!open)
    }, ui.icon('menu', 24));

    function setMenu(v) {
      open = v;
      panel.hidden = !v;
      toggle.setAttribute('aria-expanded', String(v));
      toggle.setAttribute('aria-label', v ? 'Close menu' : 'Open menu');
      toggle.replaceChildren(ui.icon(v ? 'close' : 'menu', 24));
    }
    RC.layout.closeMenu = () => setMenu(false);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) { setMenu(false); toggle.focus(); } });

    const el = h('header', { class: 'site-header' },
      ui.wrap('header-row',
        brand(),
        h('nav', { class: 'nav-desktop', 'aria-label': 'Primary' }, NAV.map((n) => link(n[0], n[1]))),
        h('div', { class: 'header-actions' },
          link('login', 'Login', 'link-quiet'),
          ui.btn({ label: 'Join free', href: '#register', small: true, icon: false }),
          toggle)),
      panel);
    return el;
  }

  function footer() {
    const col = (title, items) =>
      h('div', { class: 'foot-col' }, h('h3', null, title),
        h('ul', null, items.map((i) => h('li', null, h('a', { href: '#' + i[0] }, i[1])))));
    return h('footer', { class: 'site-footer' },
      ui.wrap('foot-grid',
        h('div', { class: 'foot-brand' },
          brand(),
          h('p', { class: 'foot-tag' }, 'RUN MORE. WIN MORE.'),
          h('p', { class: 'muted small' }, 'A free running challenge community, starting in Assam and growing across India.')),
        col('Explore', [['how-it-works', 'How It Works'], ['challenges', 'Challenges'], ['leaderboard', 'Leaderboard'], ['rewards', 'Rewards']]),
        col('Club', [['about', 'About Us'], ['contact', 'Contact'], ['login', 'Login'], ['register', 'Register'], ['dashboard', 'Dashboard (demo)']]),
        col('Policies', [['privacy', 'Privacy Policy'], ['terms', 'Terms of Use'], ['fair-play', 'Fair Play Rules']]),
        h('div', { class: 'foot-col' }, h('h3', null, 'Contact'),
          h('p', { class: 'small' }, RC.config.contactEmail),
          h('p', { class: 'muted small' }, 'Placeholder address until launch.'),
          h('p', { class: 'small' }, RC.config.region))),
      h('div', { class: 'foot-base' },
        ui.wrap('foot-base-row',
          h('p', { class: 'muted small' }, '© 2026 Runner\'s Club. Free beta. All users, activities and leaderboard records shown are DEMO DATA and are not verified.'),
          h('a', { class: 'small muted', href: '#admin' }, 'Staff access'))));
  }

  RC.layout = {
    mount(root) {
      root.replaceChildren(betaBar(), header(), h('main', { id: 'main', tabindex: '-1' }), footer());
    },
    setActive(route) {
      document.querySelectorAll('[data-route]').forEach((a) => {
        if (a.getAttribute('data-route') === route) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
      if (RC.layout.closeMenu) RC.layout.closeMenu();
    }
  };
})();
