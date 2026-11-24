(function () {
  const h = RC.h, ui = RC.ui;

  RC.pages.contact = function () {
    const f = document.createDocumentFragment();
    const name = ui.field({ id: 'ct-name', label: 'Your name', autocomplete: 'name', required: true });
    const email = ui.field({ id: 'ct-email', label: 'Email', type: 'email', autocomplete: 'email', required: true });
    const topic = ui.field({ id: 'ct-topic', label: 'Topic', required: true, options: ['General question', 'Partnership or sponsorship', 'Report a problem', 'Press'] });
    const msg = ui.field({ id: 'ct-msg', label: 'Message', type: 'textarea', required: true, wide: true, rows: 6 });
    const out = h('div', { class: 'form-out', 'aria-live': 'polite' });
    const all = [name, email, topic, msg];

    async function onSubmit(e) {
      e.preventDefault();
      let ok = true;
      all.forEach((x) => { x.err.textContent = ''; });
      if (!name.control.value.trim()) { name.err.textContent = 'Enter your name.'; ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.control.value.trim())) { email.err.textContent = 'Enter a valid email address.'; ok = false; }
      if (!topic.control.value) { topic.err.textContent = 'Choose a topic.'; ok = false; }
      if (msg.control.value.trim().length < 10) { msg.err.textContent = 'Write at least a sentence.'; ok = false; }
      if (!ok) { out.replaceChildren(); return; }
      const res = await RC.services.contact.send({});
      out.replaceChildren(ui.notice({ tone: 'warn', icon: 'info', title: 'Message not sent', body: res.message }));
    }

    f.append(h('section', { class: 'page-head' },
      ui.wrap(null,
        h('p', { class: 'eyebrow' }, 'Contact'),
        h('h1', null, 'Talk to the club.'),
        h('p', { class: 'lead' }, 'Questions, partnership ideas or a problem to report. We read everything.'))));

    f.append(h('section', { class: 'band' },
      ui.wrap('contact-grid',
        h('div', { class: 'card' },
          h('h2', { class: 'h3' }, 'Details'),
          h('ul', { class: 'contact-list' },
            h('li', null, ui.icon('mail', 20), h('div', null, h('strong', null, RC.config.contactEmail), h('p', { class: 'muted small' }, 'Placeholder address until launch.'))),
            h('li', null, ui.icon('pin', 20), h('div', null, h('strong', null, RC.config.region), h('p', { class: 'muted small' }, 'Starting with runners across Assam.'))),
            h('li', null, ui.icon('clock', 20), h('div', null, h('strong', null, 'Replies'), h('p', { class: 'muted small' }, 'Response times will be set when the beta opens.')))),
          h('p', { class: 'small' }, h('a', { href: '#privacy' }, 'Privacy Policy'), ' · ', h('a', { href: '#terms' }, 'Terms of Use'))),
        h('div', { class: 'card' },
          h('h2', { class: 'h3' }, 'Send a message'),
          ui.notice({ tone: 'demo', icon: 'info', title: 'Not connected yet', body: 'This form checks your entries only. Nothing is sent.' }),
          h('form', { class: 'form', novalidate: true, onSubmit },
            h('div', { class: 'form-grid' }, name.wrap, email.wrap, topic.wrap, msg.wrap),
            h('div', { class: 'form-actions' }, ui.btn({ label: 'Send message', type: 'submit', icon: 'arrow' })),
            out)))));
    return f;
  };
})();
