/* Login and Register. These are layout previews only.
   The handlers never read the typed values and never pretend to sign anyone in.
   Later: call RC.services.auth.signIn / signUp, then route to #dashboard. */
(function () {
  const h = RC.h, ui = RC.ui;

  function shell(title, lead, formEl, foot) {
    const f = document.createDocumentFragment();
    f.append(h('section', { class: 'auth' },
      ui.wrap('auth-wrap',
        h('div', { class: 'auth-card' },
          h('p', { class: 'eyebrow' }, "RUNNER'S CLUB"),
          h('h1', null, title),
          h('p', { class: 'muted' }, lead),
          ui.notice({ tone: 'demo', icon: 'info', title: 'Preview only', body: 'Accounts are not connected yet. Do not enter real passwords here. Nothing is saved or sent.' }),
          formEl,
          foot))));
    return f;
  }

  RC.pages.login = function () {
    const email = ui.field({ id: 'li-email', label: 'Email', type: 'email', autocomplete: 'email', placeholder: 'you@example.com', wide: true });
    const pass = ui.field({ id: 'li-pass', label: 'Password', type: 'password', autocomplete: 'current-password', wide: true });
    const out = h('div', { class: 'form-out', 'aria-live': 'polite' });
    const form = h('form', { class: 'form', novalidate: true, onSubmit: async (e) => {
      e.preventDefault();
      const res = await RC.services.auth.signIn();
      out.replaceChildren(ui.notice({ tone: 'warn', icon: 'lock', title: 'Not signed in', body: res.message }));
    } },
      h('div', { class: 'form-grid one' }, email.wrap, pass.wrap),
      h('div', { class: 'form-actions' }, ui.btn({ label: 'Log in', type: 'submit', icon: 'arrow', block: true })),
      out);
    return shell('Welcome back.', 'Log in to see your dashboard and submit runs.', form,
      h('div', { class: 'auth-foot' },
        h('p', null, 'New here? ', h('a', { href: '#register' }, 'Create a free account')),
        h('p', null, h('a', { href: '#dashboard' }, 'Preview the dashboard with a demo profile'))));
  };

  RC.pages.register = function () {
    const name = ui.field({ id: 'rg-name', label: 'Full name', autocomplete: 'name', wide: true });
    const email = ui.field({ id: 'rg-email', label: 'Email', type: 'email', autocomplete: 'email', wide: true });
    const city = ui.field({ id: 'rg-city', label: 'City', options: RC.demo.cities.concat(['Other (Assam)', 'Other (India)']), placeholder: 'Choose your city' });
    const level = ui.field({ id: 'rg-level', label: 'Running level', options: Object.keys(RC.demo.levels), placeholder: 'Choose a level' });
    const pass = ui.field({ id: 'rg-pass', label: 'Password', type: 'password', autocomplete: 'new-password', wide: true, hint: 'Preview only. Leave blank or use a throwaway.' });
    const agree = h('input', { type: 'checkbox', id: 'rg-agree' });
    const out = h('div', { class: 'form-out', 'aria-live': 'polite' });
    const form = h('form', { class: 'form', novalidate: true, onSubmit: async (e) => {
      e.preventDefault();
      const res = await RC.services.auth.signUp();
      out.replaceChildren(ui.notice({ tone: 'warn', icon: 'lock', title: 'No account created', body: res.message }));
    } },
      h('div', { class: 'form-grid' }, name.wrap, email.wrap, city.wrap, level.wrap, pass.wrap),
      h('div', { class: 'check' }, agree,
        h('label', { for: 'rg-agree' }, 'I agree to the draft ', h('a', { href: '#terms' }, 'Terms'), ', ', h('a', { href: '#privacy' }, 'Privacy Policy'), ' and ', h('a', { href: '#fair-play' }, 'Fair Play Rules'), '.')),
      h('div', { class: 'form-actions' }, ui.btn({ label: 'Create free account', type: 'submit', icon: 'arrow', block: true })),
      out);
    return shell('Join the club.', 'Free during beta. No payment details, ever.', form,
      h('div', { class: 'auth-foot' }, h('p', null, 'Already have an account? ', h('a', { href: '#login' }, 'Log in'))));
  };
})();
