/* Hash router. Each route renders a page function from RC.pages into <main>.
   Route names are plain slugs (#challenges, #how-it-works). */
(function () {
  const h = RC.h, ui = RC.ui;
  let first = true;

  function notFound() {
    const f = document.createDocumentFragment();
    f.append(h('section', { class: 'auth' }, ui.wrap('auth-wrap',
      h('div', { class: 'auth-card' },
        h('p', { class: 'eyebrow' }, '404'),
        h('h1', null, 'Wrong turn.'),
        h('p', { class: 'muted' }, 'That page does not exist.'),
        ui.btn({ label: 'Back to home', href: '#home' })))));
    return f;
  }

  function render() {
    const raw = decodeURIComponent(location.hash.replace(/^#/, '')).toLowerCase() || 'home';
    const page = Object.prototype.hasOwnProperty.call(RC.pages, raw) ? RC.pages[raw] : notFound;
    const main = document.getElementById('main');
    let node;
    try { node = page(); }
    catch (err) {
      console.error(err);
      node = h('section', { class: 'band' }, ui.wrap(null, ui.notice({ tone: 'warn', title: 'This page failed to load', body: 'Refresh and try again.' })));
    }
    main.replaceChildren(node);
    RC.layout.setActive(raw);
    window.scrollTo(0, 0);
    if (!first) main.focus({ preventScroll: true });
    first = false;
  }

  RC.start = function () {
    RC.layout.mount(document.getElementById('root'));
    window.addEventListener('hashchange', render);
    render();
  };
  RC.start();
})();
