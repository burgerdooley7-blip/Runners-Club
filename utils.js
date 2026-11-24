/* Small DOM + formatting helpers shared by every component and page. */
(function () {
  function append(el, kids) {
    for (const k of kids) {
      if (k == null || k === false || k === true) continue;
      if (Array.isArray(k)) append(el, k);
      else if (k instanceof Node) el.appendChild(k);
      else el.appendChild(document.createTextNode(String(k)));
    }
  }

  // h('div', {class:'x', onClick:fn}, child, [children], 'text')
  // Text is always inserted as text nodes, never as HTML.
  RC.h = function (tag, props, ...kids) {
    const el = document.createElement(tag);
    if (props) {
      for (const k in props) {
        const v = props[k];
        if (v == null || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k === 'style' && typeof v === 'object') {
          for (const s in v) {
            if (s.indexOf('--') === 0) el.style.setProperty(s, v[s]);
            else el.style[s] = v[s];
          }
        } else if (k.indexOf('on') === 0 && typeof v === 'function') {
          el.addEventListener(k.slice(2).toLowerCase(), v);
        } else el.setAttribute(k, v === true ? '' : v);
      }
    }
    append(el, kids);
    return el;
  };

  // Parse a trusted, static SVG/HTML string (icons, hero art only).
  RC.html = function (str) {
    const t = document.createElement('template');
    t.innerHTML = str.trim();
    return t.content.firstChild;
  };

  const pad = (n) => String(n).padStart(2, '0');
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  RC.fmt = {
    km: (n) => Number(n).toFixed(1),
    pace(sec) {
      const t = Math.round(sec);
      return Math.floor(t / 60) + ':' + pad(t % 60);
    },
    duration(sec) {
      const t = Math.round(sec);
      return Math.floor(t / 3600) + ':' + pad(Math.floor((t % 3600) / 60)) + ':' + pad(t % 60);
    },
    // "47:20" = mm:ss, "1:09:36" = h:mm:ss. Returns seconds or null.
    parseDuration(str) {
      const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(String(str).trim());
      if (!m) return null;
      let h = 0, mi, s;
      if (m[3] !== undefined) { h = +m[1]; mi = +m[2]; s = +m[3]; if (mi > 59 || s > 59) return null; }
      else { mi = +m[1]; s = +m[2]; if (s > 59) return null; }
      return h * 3600 + mi * 60 + s;
    }
  };

  // Challenge windows are defined in Indian Standard Time.
  RC.dates = {
    parts(iso) { const p = iso.split('-').map(Number); return { y: p[0], m: p[1], d: p[2] }; },
    start: (iso) => new Date(iso + 'T00:00:00+05:30'),
    end: (iso) => new Date(iso + 'T23:59:59+05:30'),
    long(iso) { const p = this.parts(iso); return p.d + ' ' + MONTHS[p.m - 1] + ' ' + p.y; },
    short(iso) { const p = this.parts(iso); return p.d + ' ' + MONTHS[p.m - 1]; },
    range(a, b) {
      const A = this.parts(a), B = this.parts(b);
      if (a === b) return this.long(a);
      if (A.y === B.y && A.m === B.m) return A.d + '–' + B.d + ' ' + MONTHS[A.m - 1] + ' ' + A.y;
      if (A.y === B.y) return A.d + ' ' + MONTHS[A.m - 1] + ' – ' + B.d + ' ' + MONTHS[B.m - 1] + ' ' + A.y;
      return this.long(a) + ' – ' + this.long(b);
    },
    todayISO() {
      const d = new Date();
      return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    }
  };
})();
