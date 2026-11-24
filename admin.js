/* Admin route — intentionally a locked placeholder.
   No admin controls, data or layouts are shipped to the browser.
   When Supabase is connected, admin screens must be gated server-side
   (RLS + role check) and loaded only after that check passes. */
(function () {
  const h = RC.h, ui = RC.ui;

  RC.pages.admin = function () {
    const f = document.createDocumentFragment();
    f.append(h('section', { class: 'auth' },
      ui.wrap('auth-wrap',
        h('div', { class: 'auth-card locked' },
          h('span', { class: 'lock-ico' }, ui.icon('lock', 34)),
          h('p', { class: 'eyebrow' }, 'Restricted'),
          h('h1', null, 'Staff area'),
          h('p', { class: 'muted' }, 'Admin tools are not part of the public site. Access will require a staff account, checked on the server.'),
          h('div', { class: 'cta-row center' },
            ui.btn({ label: 'Back to home', href: '#home', variant: 'ghost' }),
            ui.btn({ label: 'Log in', href: '#login' }))))));
    return f;
  };
})();
