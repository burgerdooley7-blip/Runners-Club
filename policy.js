/* Policy pages. DRAFT summaries, not legal text. Have them reviewed before launch. */
(function () {
  const h = RC.h, ui = RC.ui;

  const POLICIES = {
    privacy: {
      title: 'Privacy Policy',
      lead: 'What the beta plans to collect and why.',
      sections: [
        ['What we plan to collect', ['Name, email and city when you register.', 'Run details you enter: date, distance, time and the app you used.', 'Proof files you upload, such as screenshots or GPX/FIT files.']],
        ['How proof files are handled', ['Stored in private storage, not on public links.', 'Visible only to you and the reviewers checking your run.']],
        ['What we will not do', ['Sell your personal data.', 'Show your email address on public pages.', 'Collect payment details. The beta is free.']],
        ['Your choices', ['Ask us to correct or delete your account and data.', 'Choose a display name for public boards.']]
      ]
    },
    terms: {
      title: 'Terms of Use',
      lead: 'The ground rules for the free beta.',
      sections: [
        ['Free beta', ['Runner\'s Club is free during beta. There are no fees, memberships or payments.', 'Features, challenges and rewards may change while we build.']],
        ['Your account', ['Use your own details and keep your login private.', 'One account per runner.']],
        ['Rewards', ['Rewards follow the published rules of each challenge.', 'There are no random draws or chance-based prizes.']],
        ['Run safely', ['Running carries risk. Run within your limits, follow local rules and take care on roads.', 'Challenges are never a reason to run through illness or injury.']]
      ]
    },
    'fair-play': {
      title: 'Fair Play Rules',
      lead: 'What keeps the boards worth chasing.',
      sections: [
        ['Your runs', ['Submit only runs you completed yourself, on foot.', 'Never submit motorised or assisted distance.', 'Never submit the same run twice.']],
        ['Your proof', ['Proof must be original and unedited.', 'Reviewers may ask for more proof or the original file.']],
        ['Review', ['Each run is checked against the challenge rules before it counts.', 'Runs that fail the check do not count toward a goal or a ranking.']],
        ['If something goes wrong', ['Repeated or serious breaches can lead to removal from boards or the club.']]
      ]
    }
  };

  function page(key) {
    return function () {
      const p = POLICIES[key];
      const f = document.createDocumentFragment();
      f.append(h('section', { class: 'page-head' },
        ui.wrap('narrow',
          h('p', { class: 'eyebrow' }, 'Policies'),
          h('h1', null, p.title),
          h('p', { class: 'lead' }, p.lead),
          ui.notice({ tone: 'demo', icon: 'info', title: 'DRAFT', body: 'This is a plain-language outline for the beta. It is not final legal text and should be reviewed before launch.' }))));
      f.append(h('section', { class: 'band' },
        ui.wrap('narrow',
          p.sections.map((s) => h('div', { class: 'policy-block' }, h('h2', { class: 'h3' }, s[0]), h('ul', { class: 'list' }, s[1].map((i) => h('li', null, i))))),
          h('p', { class: 'muted small' }, 'Questions? ', h('a', { href: '#contact' }, 'Contact us'), '.'))));
      return f;
    };
  }

  RC.pages.privacy = page('privacy');
  RC.pages.terms = page('terms');
  RC.pages['fair-play'] = page('fair-play');
})();
