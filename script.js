/* =====================================================================
   Nukkad store: everything in one file.
   1. Product data (480 products)   2. Helpers   3. Page chrome + theme
   4. Cart + checkout               5. Home page   6. Shop page
   ===================================================================== */
(() => {
  'use strict';

  /* ---------------------------------------------------------------
     1. PRODUCT DATA
     Generated from the lists below (60 per group). To use your own
     catalogue, replace PRODUCTS with an array of
     { id, name, brand, cat, price, old, rating, reviews, img, pos, z, desc }
     --------------------------------------------------------------- */
  let seed = 20240917;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const U = photo => `https://images.unsplash.com/photo-${photo}?auto=format&fit=crop&w=700&q=75`;
  const price99 = x => Math.round(x / 100) * 100 - 1;

  /* ---------------------------------------------------------------
     PRODUCT ARTWORK
     Drawn in code (SVG) so every product image always loads, and
     each type of product (6 per kind) and each colour looks different.
     --------------------------------------------------------------- */
  const PALETTE = [
    { name: 'Midnight', m: '#1f2a44', d: '#111827', l: '#dfe5f2' },
    { name: 'Forest', m: '#2f6f5e', d: '#1b4438', l: '#dcece6' },
    { name: 'Sand', m: '#c9a66b', d: '#8f7440', l: '#f3ead9' },
    { name: 'Crimson', m: '#b3323f', d: '#6e1a24', l: '#f5dcdf' },
    { name: 'Slate', m: '#59636e', d: '#343b43', l: '#e2e5e9' },
    { name: 'Ocean', m: '#2b7bb9', d: '#16496f', l: '#d9eaf6' },
    { name: 'Olive', m: '#7a8450', d: '#4a5230', l: '#e7ead8' },
    { name: 'Plum', m: '#7a4b86', d: '#4a2a52', l: '#eddff0' },
    { name: 'Amber', m: '#e08e1b', d: '#99590a', l: '#fbe9cc' },
    { name: 'Charcoal', m: '#2b2b2b', d: '#0d0d0d', l: '#e4e4e4' }
  ];
  const SILVER = '#cdd2d6', STEEL = '#8d959c', GLASS = '#0e1114';
  const pt = (cx, cy, r, deg) => [cx + r * Math.sin(deg * Math.PI / 180), cy - r * Math.cos(deg * Math.PI / 180)];
  const ln = (x1, y1, x2, y2, s, w) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${s}" stroke-width="${w}" stroke-linecap="round"/>`;
  const R = (x, y, w, h, r, f, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" ${extra}/>`;
  const C = (x, y, r, f, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${extra}/>`;
  const mirror = g => g + `<g transform="translate(200 0) scale(-1 1)">${g}</g>`;
  const ticks = (r1, r2, n, s, w) => {
    let o = '';
    for (let k = 0; k < n; k++) {
      const a = (k * 360) / n, p = pt(100, 100, r1, a), q = pt(100, 100, r2, a);
      o += ln(p[0].toFixed(1), p[1].toFixed(1), q[0].toFixed(1), q[1].toFixed(1), s, w);
    }
    return o;
  };

  const SHOES = [
    { stripe: 'swoosh', sole: 'white' },                                   // Runner
    { stripe: 'panel', sole: 'dark', lugs: 1, lace: 1 },                   // Trail
    { stripe: 'three', sole: 'white', lace: 1, cap: 1 },                   // Court
    { stripe: 'panel', sole: 'white', lace: 1, chunk: 1 },                 // Street
    { stripe: 'swoosh', sole: 'dark', lace: 1 },                           // Lite
    { stripe: 'three', sole: 'dark', cap: 1 },                             // Retro
    { sole: 'white', lace: 1, cap: 1 },                                    // Classic
    { stripe: 'panel', sole: 'white', lace: 1, band: 1 },                  // Canvas
    { stripe: 'three', sole: 'dark', lace: 1 },                            // Low-top
    { sole: 'white', lace: 1, cap: 1, h: 1 },                              // High-top
    { sole: 'dark', gore: 1 },                                             // Slip-on
    { stripe: 'swoosh', sole: 'dark', lace: 1, chunk: 1 }                  // Walker
  ];

  const ART = {
    watch(v, c) {
      const dark = v === 2 || v === 3 || v === 5;
      const dial = dark ? (v === 5 ? '#14181c' : c.d) : (v === 1 ? '#ffffff' : '#f4f1e8');
      const ink = dark ? '#f2f2f2' : '#1c1c1c';
      const rad = v === 3 ? 50 : 46;
      let s = R(80, 8, 40, 184, 12, c.m);
      for (let k = 0; k < 4; k++) s += C(100, 150 + k * 9, 1.8, 'rgba(0,0,0,.35)');
      s += v === 4 ? R(54, 54, 92, 92, 20, SILVER, `stroke="${STEEL}" stroke-width="2"`)
                   : C(100, 100, rad, SILVER, `stroke="${STEEL}" stroke-width="2"`);
      s += R(v === 4 ? 145 : 100 + rad - 1, 93, v === 5 ? 10 : 7, 14, 3, STEEL);
      if (v === 3) s += C(100, 100, 44, c.m) + ticks(40, 40.1, 12, '#ffffff', 3.5) + C(100, 100, 34, dial);
      else if (v === 4) s += R(62, 62, 76, 76, 12, dial);
      else s += C(100, 100, 38, dial);
      if (v === 0) s += ticks(33, 28, 12, ink, 2.5);
      if (v === 1) s += ticks(34, 30, 12, ink, 1.2);
      if (v === 2) s += ticks(34, 31, 60, ink, 1) + [[100, 80], [80, 110], [120, 110]].map(p => C(p[0], p[1], 9, 'none', `stroke="${ink}" stroke-opacity=".6"`)).join('');
      if (v === 3) s += ticks(26, 22, 4, ink, 4);
      if (v === 4) s += ticks(32, 27, 12, ink, 3);
      if (v === 5) s += ticks(34, 28, 12, ink, 2) + '<polygon points="100,62 94,74 106,74" fill="#f2a900"/>';
      const h = pt(100, 100, 19, 300), m = pt(100, 100, 29, 60), sc = pt(100, 100, 30, 190);
      return s + ln(100, 100, h[0].toFixed(1), h[1].toFixed(1), ink, 4) + ln(100, 100, m[0].toFixed(1), m[1].toFixed(1), ink, 3)
        + ln(100, 100, sc[0].toFixed(1), sc[1].toFixed(1), '#d64545', 1.4) + C(100, 100, 3.2, '#d64545');
    },

    smartwatch(v, c) {
      const a = '#7fe0c3', b = '#ffb454';
      const txt = (y, size, f, t) => `<text x="100" y="${y}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="700" fill="${f}" text-anchor="middle">${t}</text>`;
      const screens = [
        txt(108, 30, '#fff', '10:09') + ln(78, 122, 122, 122, a, 3),
        `<circle cx="100" cy="100" r="28" fill="none" stroke="${a}" stroke-width="7" stroke-dasharray="120 60"/><circle cx="100" cy="100" r="17" fill="none" stroke="${b}" stroke-width="7" stroke-dasharray="70 40"/>`,
        `<path d="M70 128 Q88 84 104 106 T132 74" fill="none" stroke="${b}" stroke-width="4" stroke-linecap="round"/>` + C(132, 74, 5, a),
        `<polyline points="66,104 84,104 92,80 102,124 110,96 116,104 134,104" fill="none" stroke="${a}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>`,
        R(72, 112, 10, 16, 3, a) + R(88, 96, 10, 32, 3, b) + R(104, 84, 10, 44, 3, a) + R(120, 102, 10, 26, 3, b),
        txt(106, 34, '#fff', '5.2') + txt(126, 12, a, 'km')
      ];
      return R(76, 6, 48, 188, 14, c.m) + R(56, 46, 88, 108, 26, '#0b0e12', `stroke="${SILVER}" stroke-width="4"`) + R(144, 84, 6, 18, 3, STEEL) + screens[v];
    },

    headphones(v, c) {
      const band = w => `<path d="M46 122 C46 30 154 30 154 122" fill="none" stroke="${c.m}" stroke-width="${w}" stroke-linecap="round"/>`;
      if (v === 0) return band(9) + mirror(R(30, 98, 32, 60, 15, c.m) + R(24, 104, 12, 48, 6, c.d));
      if (v === 1) return band(6) + mirror(C(46, 126, 21, c.m) + C(46, 126, 12, c.d));
      if (v === 2) return band(13) + mirror(C(44, 128, 31, c.m) + C(44, 128, 19, c.d) + C(44, 128, 19, 'none', `stroke="${c.l}" stroke-width="2"`));
      if (v === 3) return mirror(C(76, 68, 13, c.m) + R(72, 76, 7, 26, 3.5, c.m) + C(76, 68, 6, c.d))
        + R(56, 112, 88, 58, 22, c.d) + R(56, 112, 88, 28, 14, c.m) + ln(58, 140, 142, 140, c.l, 2) + C(100, 155, 3, c.l);
      if (v === 4) return band(8) + mirror(`<ellipse cx="46" cy="128" rx="19" ry="31" fill="${c.m}"/><ellipse cx="46" cy="128" rx="11" ry="21" fill="${c.d}"/>` + C(46, 88, 5, SILVER));
      return `<path d="M56 56 C40 170 160 170 144 56" fill="none" stroke="${c.m}" stroke-width="9" stroke-linecap="round"/>`
        + mirror(C(56, 48, 10, c.d) + C(56, 48, 4, SILVER)) + R(88, 150, 24, 10, 5, c.l);
    },

    shoe(o, c) {
      const sole = o.sole === 'dark' ? c.d : '#f4f4f2';
      let s = '';
      if (o.h) s += `<path d="M31 114 L35 70 Q60 62 84 72 L88 104 Z" fill="${c.m}"/>`;
      s += `<path d="M30 136 C30 116 40 106 56 102 L68 78 C74 70 92 70 98 80 L106 96 C124 100 152 104 166 118 C174 124 174 134 172 138 Z" fill="${c.m}"/>`;
      if (o.stripe === 'panel') s += `<path d="M30 136 C30 116 36 108 46 104 L62 134 Z" fill="${c.d}"/>`;
      if (o.stripe === 'swoosh') s += '<path d="M56 128 C90 134 120 118 150 112" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>';
      if (o.stripe === 'three') s += ln(84, 104, 94, 128, '#fff', 4) + ln(94, 102, 104, 126, '#fff', 4) + ln(104, 100, 114, 124, '#fff', 4);
      if (o.cap) s += '<path d="M138 108 C154 112 170 120 172 134 L140 136 Z" fill="#fff" opacity=".92"/>';
      if (o.lace) s += ln(72, 88, 92, 84, '#fff', 2.5) + ln(76, 96, 98, 92, '#fff', 2.5) + ln(80, 104, 104, 100, '#fff', 2.5);
      if (o.gore) s += `<path d="M70 86 Q88 98 104 88 L98 104 Q86 110 74 102 Z" fill="${c.d}"/>`;
      s += o.chunk ? `<path d="M24 128 H178 V156 C178 164 170 168 162 168 H40 C30 168 24 162 24 156 Z" fill="${sole}"/>`
                   : `<path d="M26 136 H176 V150 C176 156 170 160 164 160 H38 C31 160 26 155 26 150 Z" fill="${sole}"/>`;
      if (o.band) s += ln(30, 146, 172, 146, c.m, 3);
      if (o.lugs) for (let k = 0; k < 10; k++) s += R(34 + k * 14, 158, 8, 7, 2, c.d);
      return s + ln(30, 142, 172, 142, 'rgba(0,0,0,.15)', 1.5);
    },

    backpack(v, c) {
      const zip = (x1, y, x2) => ln(x1, y, x2, y, c.l, 3);
      if (v === 0) return `<path d="M84 44 C84 22 116 22 116 44" fill="none" stroke="${c.d}" stroke-width="6"/>` + R(54, 38, 92, 132, 28, c.m) + R(66, 104, 68, 52, 14, c.d) + zip(66, 90, 134) + C(100, 130, 3, c.l);
      if (v === 1) return R(64, 28, 72, 144, 16, c.m) + R(64, 28, 72, 66, 16, c.d) + R(94, 84, 12, 16, 3, SILVER) + zip(76, 122, 124) + zip(76, 138, 124);
      if (v === 2) return R(38, 108, 22, 52, 9, c.d) + R(140, 108, 22, 52, 9, c.d) + R(48, 32, 104, 140, 32, c.m) + R(58, 32, 84, 44, 22, c.d) + R(62, 108, 76, 50, 12, c.d) + ln(62, 92, 138, 92, c.l, 4);
      if (v === 3) return R(58, 66, 84, 108, 22, c.m) + R(52, 30, 96, 44, 20, c.d) + R(76, 58, 10, 40, 3, c.l) + R(114, 58, 10, 40, 3, c.l) + R(70, 128, 60, 32, 10, c.d);
      if (v === 4) return ln(78, 84, 152, 14, c.d, 11) + ln(152, 14, 176, 36, c.d, 11) + R(60, 76, 80, 92, 34, c.m) + R(70, 118, 60, 34, 12, c.d) + zip(72, 102, 128);
      return `<path d="M64 80 C64 40 136 40 136 80" fill="none" stroke="${c.d}" stroke-width="8"/>` + R(26, 76, 148, 82, 36, c.m) + zip(44, 108, 156) + R(40, 118, 34, 30, 10, c.d) + R(126, 118, 34, 30, 10, c.d);
    },

    sunglasses(v, c) {
      const fr = v === 0 ? STEEL : c.m;
      const lens = (d, w, extra = '') => `<path d="${d}" fill="${c.d}" fill-opacity=".88" stroke="${fr}" stroke-width="${w}" stroke-linejoin="round" ${extra}/>`;
      const shine = ln(46, 98, 58, 93, 'rgba(255,255,255,.4)', 3);
      if (v === 5) return lens('M22 92 Q100 76 178 92 Q176 132 138 130 Q116 128 100 116 Q84 128 62 130 Q24 132 22 92Z', 6) + ln(50, 98, 70, 92, 'rgba(255,255,255,.4)', 3);
      const shapes = [
        lens('M34 88 Q62 82 90 88 Q92 128 62 134 Q34 128 34 88Z', 3),
        lens('M32 84 H92 L88 122 Q86 132 74 132 H48 Q38 132 36 122Z', 7),
        `<circle cx="62" cy="106" r="27" fill="${c.d}" fill-opacity=".88" stroke="${fr}" stroke-width="5"/>`,
        `<rect x="34" y="82" width="56" height="48" rx="8" fill="${c.d}" fill-opacity=".88" stroke="${fr}" stroke-width="6"/>`,
        lens('M30 82 L88 92 Q92 118 76 130 Q52 138 38 120 Q28 104 30 82Z', 6)
      ];
      return mirror(shapes[v] + shine + ln(33, 92, 12, 99, fr, 5)) + ln(90, 94, 110, 94, fr, v === 0 ? 3 : 5);
    },

    camera(v, c) {
      const P = [
        { x: 36, y: 68, w: 128, h: 86, lr: 30, hump: 1 },
        { x: 32, y: 64, w: 136, h: 92, lr: 32, hump: 2, dial: 1 },
        { x: 34, y: 72, w: 132, h: 74, lr: 22, top: 1, retro: 1 },
        { x: 40, y: 50, w: 120, h: 112, lr: 34, hump: 1, grip: 1 },
        { x: 46, y: 80, w: 108, h: 62, lr: 20, off: 1 },
        { x: 28, y: 58, w: 144, h: 100, lr: 36, hump: 3, grip: 1 }
      ][v];
      const cx = P.off ? 122 : 100, cy = P.y + P.h / 2 + 4;
      let s = '';
      if (P.hump === 1) s += R(80, P.y - 16, 40, 20, 6, c.d);
      if (P.hump === 2) s += R(66, P.y - 16, 68, 20, 6, c.d);
      if (P.hump === 3) s += R(78, P.y - 20, 44, 24, 8, c.d) + R(88, P.y - 14, 24, 10, 3, '#f7f3e0');
      s += R(P.x, P.y, P.w, P.h, P.retro ? 8 : 16, c.m);
      s += R(P.x, P.y, P.w, 20, P.retro ? 8 : 12, P.top ? SILVER : c.d);
      if (P.grip) s += R(P.x + 6, P.y + 28, 18, P.h - 40, 9, c.d, 'opacity=".55"');
      s += R(P.x + P.w - 30, P.y - 6, 20, 8, 3, c.l);
      if (P.dial) s += C(P.x + 22, P.y + 2, 9, SILVER, `stroke="${STEEL}" stroke-width="2"`);
      if (P.retro) s += R(P.x + 12, P.y + 28, 22, 14, 3, GLASS);
      return s + C(cx, cy, P.lr + 5, SILVER) + C(cx, cy, P.lr, GLASS) + C(cx, cy, P.lr * 0.62, '#1c2a38') + C(cx - P.lr * 0.25, cy - P.lr * 0.28, P.lr * 0.16, 'rgba(255,255,255,.55)');
    }
  };

  function draw(g, li, ci) {
    const c = PALETTE[ci];
    const body = g.art === 'shoe' ? ART.shoe(SHOES[g.off + li], c) : ART[g.art](li, c);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="${c.l}"/><ellipse cx="100" cy="178" rx="62" ry="6" fill="#000" opacity=".08"/>${body}</svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  const BRAND_LIST = ['Kora', 'Vela', 'Northfield', 'Amara', 'Bricklane', 'Tarn', 'Solace', 'Ridgeway', 'Juno', 'Oakhurst'];

  const GROUPS = [
    { cat: 'Watches', type: 'Watch', img: '1523275335684-37898b6baf30', art: 'watch', price: [2499, 14999],
      lines: ['Field', 'Dress', 'Chrono', 'Diver', 'Heritage', 'Pilot'],
      desc: ['Steel case with a scratch-resistant crystal.', 'Slim profile that sits well under a cuff.', 'Water resistant to 50 m, strap included.'] },
    { cat: 'Smartwatches', type: 'Smartwatch', img: '1546868871-7041f2a55e12', art: 'smartwatch', price: [1999, 9999],
      lines: ['Pulse', 'Active', 'Trek', 'Lite', 'Pro', 'Sport'],
      desc: ['Heart-rate and sleep tracking with a week of battery.', 'Bright AMOLED screen, calls and notifications.', 'Built-in GPS and 20 workout modes.'] },
    { cat: 'Audio', type: 'Headphones', img: '1505740420928-5e560c06d30e', art: 'headphones', price: [999, 8999],
      lines: ['Studio', 'Air', 'Bass', 'Focus', 'Travel', 'Clear'],
      desc: ['Wireless with soft ear cups for long sessions.', 'Up to 30 hours on a single charge.', 'Foldable design that fits in a bag pocket.'] },
    { cat: 'Footwear', type: 'Sneakers', img: '1542291026-7eec264c27ff', art: 'shoe', off: 0, price: [1999, 6999],
      lines: ['Runner', 'Trail', 'Court', 'Street', 'Lite', 'Retro'],
      desc: ['Light mesh upper with a grippy sole.', 'Cushioned midsole for daily miles.', 'Breathable and easy to clean.'] },
    { cat: 'Footwear', type: 'Sneakers', img: '1491553895911-0055eca6402d', art: 'shoe', off: 6, price: [1499, 4999],
      lines: ['Classic', 'Canvas', 'Low-top', 'High-top', 'Slip-on', 'Walker'],
      desc: ['An everyday pair that goes with most outfits.', 'Flexible sole, comfortable from day one.', 'Padded collar and a durable rubber outsole.'] },
    { cat: 'Bags', type: 'Backpack', img: '1553062407-98eeb64c6a62', art: 'backpack', price: [999, 4499],
      lines: ['Daypack', 'Commuter', 'Trek', 'Roll-top', 'Sling', 'Weekender'],
      desc: ['Water-resistant fabric, fits a 15" laptop.', 'Padded straps and a hidden back pocket.', 'Roomy main compartment with organiser pockets.'] },
    { cat: 'Eyewear', type: 'Sunglasses', img: '1572635196237-14b3f281503f', art: 'sunglasses', price: [699, 3499],
      lines: ['Aviator', 'Wayfarer', 'Round', 'Square', 'Cat-eye', 'Sport'],
      desc: ['UV400 lenses that cut glare.', 'Lightweight frame, comfortable all day.', 'Comes with a hard case and cloth.'] },
    { cat: 'Cameras', type: 'Camera', img: '1526170375885-4d8ecf77b99f', art: 'camera', price: [24999, 64999],
      lines: ['M10', 'M20', 'X100', 'Studio', 'Compact', 'Pro'],
      desc: ['24 MP sensor with a kit lens included.', 'Fast autofocus and 4K video.', 'Tilting screen and built-in Wi-Fi.'] }
  ];

  const PRODUCTS = [];
  let nextId = 1;
  for (let i = 0; i < 60; i++) {          // interleave groups so "Featured" shows a mix
    GROUPS.forEach((g, gi) => {
      const brand = BRAND_LIST[i % 10];
      const li = Math.floor(i / 10) % 6;                            // which type of product
      const ci = ((i % 10) * 3 + Math.floor(i / 10) + gi) % 10;      // which colour
      const line = g.lines[li];
      const price = price99(g.price[0] + rnd() * (g.price[1] - g.price[0]));
      const bigger = price99(price * (1.15 + rnd() * 0.25));
      const sale = rnd() < 0.4 && bigger > price;
      const pid = nextId++;
      PRODUCTS.push({
        id: pid, brand, cat: g.cat, name: `${brand} ${line} ${g.type}`,
        price, old: sale ? bigger : 0,
        rating: Math.round((3.8 + rnd() * 1.1) * 10) / 10,
        reviews: Math.floor(12 + rnd() * 2400),
        img: draw(g, li, ci), color: PALETTE[ci].name, pos: '50% 50%', z: 1,
        desc: g.desc[i % 3]
      });
    });
  }
  const BRANDS = BRAND_LIST.slice().sort();
  const CATS = [...new Set(PRODUCTS.map(p => p.cat))];
  const CAT_IMG = {};
  GROUPS.forEach(g => { if (!CAT_IMG[g.cat]) CAT_IMG[g.cat] = U(g.img); });

  /* ---------------------------------------------------------------
     2. HELPERS
     --------------------------------------------------------------- */
  const $ = id => document.getElementById(id);
  const money = n => '₹' + n.toLocaleString('en-IN');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MAP = new Map(PRODUCTS.map(p => [p.id, p]));
  const FREE_AT = 1999, FEE = 99, KEY = 'nk-cart-v2';
  const FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3"><rect width="4" height="3" fill="#c9cfca"/><path d="M1.1 2.1l.7-.9.5.6.4-.4.7.7z" fill="#a5aea6"/></svg>');
  const page = location.pathname.split('/').pop() || 'index.html';
  const root = document.documentElement;

  function card(p) {
    return `<article class="card">
      <div class="ph"><img src="${p.img}" alt="${esc(p.name)}" loading="lazy" style="object-position:${p.pos};transform:scale(${p.z})">
        ${p.old ? `<span class="tag">Save ${Math.round((1 - p.price / p.old) * 100)}%</span>` : ''}</div>
      <div class="info">
        <p class="brand">${esc(p.brand)}, ${esc(p.color)}</p>
        <h3>${esc(p.name)}</h3>
        <p class="d">${esc(p.desc)}</p>
        <div class="pr"><b>${money(p.price)}</b>${p.old ? `<s>${money(p.old)}</s>` : ''}<span class="rt">★ ${p.rating.toFixed(1)} (${p.reviews})</span></div>
        <button class="btn add" type="button" data-id="${p.id}">Add to cart</button>
      </div></article>`;
  }

  /* ---------------------------------------------------------------
     3. PAGE CHROME (header, footer, drawer, modal) + THEME
     --------------------------------------------------------------- */
  const links = [['index.html', 'Home'], ['shop.html', 'Shop'], ['about.html', 'About']];
  document.body.insertAdjacentHTML('afterbegin', `
    <header class="top">
      <a class="logo" href="index.html">Nukkad</a>
      <nav class="nav" aria-label="Main">${links.map(([h, t]) => `<a href="${h}"${h === page ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
      <form class="search" action="shop.html" role="search">
        <input id="search" name="q" type="search" placeholder="Search products" aria-label="Search products" autocomplete="off">
      </form>
      <button id="themeBtn" class="ghost" type="button"></button>
      <button id="cartBtn" class="cart-btn" type="button">Cart <span id="cartCount">0</span></button>
    </header>`);

  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <div class="wrap foot">
        <div><strong class="logo">Nukkad</strong><p class="muted">Everyday things worth owning. Free delivery above ₹1,999, 7-day returns, cash on delivery.</p></div>
        <nav aria-label="Footer">${links.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}</nav>
      </div>
      <p class="muted copy">© ${new Date().getFullYear()} Nukkad. Demo store built for a project.</p>
    </footer>
    <div id="overlay" class="overlay"></div>
    <aside id="drawer" class="drawer" aria-label="Shopping cart" aria-hidden="true">
      <div class="drawer-head"><h2>Your cart</h2><button id="closeCart" class="x" type="button" aria-label="Close cart">✕</button></div>
      <div id="cartItems" class="cart-items"></div>
      <div class="cart-foot">
        <div class="row"><span>Subtotal</span><span id="sub"></span></div>
        <div class="row"><span>Delivery</span><span id="ship"></span></div>
        <div class="row total"><span>Total</span><span id="total"></span></div>
        <button id="checkoutBtn" class="btn full" type="button">Checkout</button>
      </div>
    </aside>
    <div id="modal" class="modal" hidden role="dialog" aria-modal="true" aria-labelledby="mTitle">
      <div class="modal-box">
        <button id="closeModal" class="x" type="button" aria-label="Close">✕</button>
        <form id="form" novalidate>
          <h2 id="mTitle">Delivery details</h2>
          <p id="mSummary" class="muted"></p>
          <label>Full name<input name="fullname" autocomplete="name"><small class="err"></small></label>
          <label>Mobile number<input name="phone" inputmode="numeric" maxlength="10" autocomplete="tel"><small class="err"></small></label>
          <label>Address<textarea name="address" rows="2" autocomplete="street-address"></textarea><small class="err"></small></label>
          <label>PIN code<input name="pin" inputmode="numeric" maxlength="6" autocomplete="postal-code"><small class="err"></small></label>
          <label>Payment<select name="pay"><option>Cash on delivery</option><option>UPI on delivery</option></select></label>
          <button class="btn full" type="submit">Place order</button>
        </form>
        <div id="done" hidden><h2>Order placed</h2><p id="doneMsg"></p><button id="doneBtn" class="btn" type="button">Continue shopping</button></div>
      </div>
    </div>
    <div id="toast" class="toast" role="status" aria-live="polite"></div>`);

  function setTheme(t, save) {
    root.dataset.theme = t;
    $('themeBtn').textContent = t === 'dark' ? '☀ Light' : '☾ Dark';
    $('themeBtn').setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' theme');
    if (save) { try { localStorage.setItem('nk-theme', t); } catch (e) { /* ignore */ } }
  }
  setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);
  $('themeBtn').addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));

  /* ---------------------------------------------------------------
     4. CART, DRAWER, CHECKOUT
     --------------------------------------------------------------- */
  function loadCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '{}'), out = {};
      Object.keys(raw).forEach(k => {
        const q = Math.floor(Number(raw[k]));
        if (MAP.has(+k) && q > 0) out[+k] = Math.min(q, 99);
      });
      return out;
    } catch (e) { return {}; }
  }
  let cart = loadCart(), lastFocus = null;

  function totals() {
    const sub = Object.keys(cart).reduce((s, id) => s + MAP.get(+id).price * cart[id], 0);
    const ship = sub === 0 || sub >= FREE_AT ? 0 : FEE;
    return { sub, ship, total: sub + ship };
  }

  function renderCart() {
    const ids = Object.keys(cart);
    $('cartCount').textContent = ids.reduce((s, id) => s + cart[id], 0);
    $('cartItems').innerHTML = ids.length ? ids.map(id => {
      const p = MAP.get(+id);
      return `<div class="line"><img src="${p.img}" alt="" style="object-position:${p.pos}">
        <div><h4>${esc(p.name)}</h4><div class="p">${money(p.price)}</div>
          <div class="qty"><button type="button" data-act="dec" data-id="${id}" aria-label="Decrease quantity">−</button><span>${cart[id]}</span><button type="button" data-act="inc" data-id="${id}" aria-label="Increase quantity">+</button></div></div>
        <button class="rm" type="button" data-act="rm" data-id="${id}">Remove</button></div>`;
    }).join('') : '<p class="empty-cart">Your cart is empty.<br>Add something from the shop.</p>';
    const t = totals();
    $('sub').textContent = money(t.sub);
    $('ship').textContent = t.sub === 0 ? '–' : (t.ship ? money(t.ship) : 'Free');
    $('total').textContent = money(t.total);
    $('checkoutBtn').disabled = !ids.length;
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ }
  }

  function change(id, d) {
    const n = (cart[id] || 0) + d;
    if (n <= 0) delete cart[id]; else cart[id] = Math.min(n, 99);
    renderCart();
  }

  let toastTimer;
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }
  function openCart() {
    lastFocus = document.activeElement;
    $('drawer').classList.add('open');
    $('drawer').setAttribute('aria-hidden', 'false');
    $('overlay').classList.add('show');
    document.body.classList.add('lock');
    $('closeCart').focus();
  }
  function closeCart() {
    $('drawer').classList.remove('open');
    $('drawer').setAttribute('aria-hidden', 'true');
    $('overlay').classList.remove('show');
    document.body.classList.remove('lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function openModal() {
    const f = $('form');
    f.reset();
    f.querySelectorAll('.err').forEach(e => (e.textContent = ''));
    f.querySelectorAll('.bad').forEach(e => e.classList.remove('bad'));
    f.hidden = false;
    $('done').hidden = true;
    $('mSummary').textContent = `${Object.keys(cart).length} item(s), total ${money(totals().total)}`;
    $('modal').hidden = false;
    document.body.classList.add('lock');
    f.elements['fullname'].focus();
  }
  function closeModal() {
    $('modal').hidden = true;
    document.body.classList.remove('lock');
  }

  function validate(f) {
    const rules = {
      fullname: v => v.trim().length >= 3 || 'Enter your full name.',
      phone: v => /^[6-9]\d{9}$/.test(v.trim()) || 'Enter a valid 10-digit mobile number.',
      address: v => v.trim().length >= 10 || 'Enter your full address (house, street, city).',
      pin: v => /^\d{6}$/.test(v.trim()) || 'Enter a 6-digit PIN code.'
    };
    let ok = true;
    Object.keys(rules).forEach(k => {
      const el = f.elements[k], r = rules[k](el.value);
      el.closest('label').querySelector('.err').textContent = r === true ? '' : r;
      el.classList.toggle('bad', r !== true);
      if (r !== true) ok = false;
    });
    return ok;
  }

  document.addEventListener('click', e => {
    const add = e.target.closest('.add');
    if (add) { change(+add.dataset.id, 1); toast('Added to cart'); }
  });
  $('cartItems').addEventListener('click', e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const id = +b.dataset.id;
    if (b.dataset.act === 'inc') change(id, 1);
    if (b.dataset.act === 'dec') change(id, -1);
    if (b.dataset.act === 'rm') change(id, -(cart[id] || 0));
  });
  $('cartBtn').addEventListener('click', openCart);
  $('closeCart').addEventListener('click', closeCart);
  $('overlay').addEventListener('click', closeCart);
  $('checkoutBtn').addEventListener('click', () => {
    if (!Object.keys(cart).length) return toast('Your cart is empty');
    closeCart();
    openModal();
  });
  $('closeModal').addEventListener('click', closeModal);
  $('doneBtn').addEventListener('click', closeModal);
  $('modal').addEventListener('click', e => { if (e.target === $('modal')) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!$('modal').hidden) closeModal(); else closeCart();
  });
  $('form').addEventListener('submit', e => {
    e.preventDefault();
    const f = $('form');
    if (!validate(f)) return;
    const t = totals(), oid = 'NK' + String(Date.now()).slice(-6);
    $('doneMsg').textContent = `Thank you, ${f.elements['fullname'].value.trim().split(/\s+/)[0]}. Order ${oid} for ${money(t.total)} is confirmed. It should reach you in 3–5 days.`;
    cart = {};
    renderCart();
    f.hidden = true;
    $('done').hidden = false;
  });

  /* Broken image? Swap in a neutral placeholder. */
  function fixImg(el) { if (el.tagName === 'IMG' && !el.dataset.fixed) { el.dataset.fixed = '1'; el.src = FALLBACK; } }
  document.addEventListener('error', e => fixImg(e.target), true);

  /* ---------------------------------------------------------------
     5. HOME PAGE (runs only if these elements exist)
     --------------------------------------------------------------- */
  if ($('tiles')) {
    $('tiles').innerHTML = CATS.map(c => {
      const n = PRODUCTS.filter(p => p.cat === c).length;
      return `<a class="tile" href="shop.html?cat=${encodeURIComponent(c)}"><img src="${CAT_IMG[c]}" alt=""><span>${esc(c)}</span><small>${n} products</small></a>`;
    }).join('');
  }
  if ($('featured')) {
    const sorted = PRODUCTS.slice().sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    const picks = [], seen = new Set();
    sorted.forEach(p => { if (!seen.has(p.cat)) { seen.add(p.cat); picks.push(p); } });
    sorted.forEach(p => { if (picks.length < 8 && !picks.includes(p)) picks.push(p); });
    $('featured').innerHTML = picks.map(card).join('');
  }

  /* ---------------------------------------------------------------
     6. SHOP PAGE (runs only on shop.html)
     --------------------------------------------------------------- */
  if ($('brand') && $('chips')) {
    const PER = 24;
    const params = new URLSearchParams(location.search);
    const pick = (v, allowed) => (allowed.includes(v) ? v : 'All');
    const st = {
      cat: pick(params.get('cat'), CATS),
      brand: pick(params.get('brand'), BRANDS),
      q: params.get('q') || '',
      sort: 'featured',
      shown: PER
    };

    const syncUrl = () => {
      const u = new URLSearchParams();
      if (st.cat !== 'All') u.set('cat', st.cat);
      if (st.brand !== 'All') u.set('brand', st.brand);
      if (st.q.trim()) u.set('q', st.q.trim());
      try { history.replaceState(null, '', u.toString() ? '?' + u.toString() : location.pathname); } catch (e) { /* file:// may block this */ }
    };

    const renderChips = () => {
      $('chips').innerHTML = ['All', ...CATS].map(c =>
        `<button type="button" class="chip" data-cat="${esc(c)}" aria-pressed="${c === st.cat}">${esc(c)}</button>`).join('');
    };

    const render = () => {
      const q = st.q.trim().toLowerCase();
      const list = PRODUCTS.filter(p =>
        (st.cat === 'All' || p.cat === st.cat) &&
        (st.brand === 'All' || p.brand === st.brand) &&
        (!q || `${p.name} ${p.brand} ${p.cat} ${p.color} ${p.desc}`.toLowerCase().includes(q)));

      if (st.sort === 'low') list.sort((a, b) => a.price - b.price);
      if (st.sort === 'high') list.sort((a, b) => b.price - a.price);
      if (st.sort === 'rating') list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

      const visible = list.slice(0, st.shown);
      $('count').textContent = list.length ? `Showing ${visible.length} of ${list.length} products` : '0 products';
      $('grid').innerHTML = list.length
        ? visible.map(card).join('')
        : `<div class="empty"><p>Nothing matches your filters${q ? ` for “${esc(st.q.trim())}”` : ''}.</p><button type="button" class="btn" id="reset">Clear filters</button></div>`;
      $('more').hidden = visible.length >= list.length;
      syncUrl();
    };

    const reset = () => {
      st.cat = 'All'; st.brand = 'All'; st.q = ''; st.shown = PER;
      $('search').value = '';
      $('brand').value = 'All';
      renderChips();
      render();
    };

    $('brand').innerHTML = ['All', ...BRANDS].map(b => `<option value="${esc(b)}">${b === 'All' ? 'All brands' : esc(b)}</option>`).join('');
    $('brand').value = st.brand;
    $('search').value = st.q;

    $('chips').addEventListener('click', e => {
      const b = e.target.closest('.chip');
      if (!b) return;
      st.cat = b.dataset.cat; st.shown = PER;
      renderChips();
      render();
    });
    $('brand').addEventListener('change', e => { st.brand = e.target.value; st.shown = PER; render(); });
    $('sort').addEventListener('change', e => { st.sort = e.target.value; st.shown = PER; render(); });
    $('more').addEventListener('click', () => { st.shown += PER; render(); });
    $('grid').addEventListener('click', e => { if (e.target.closest('#reset')) reset(); });

    // header search filters live on this page instead of reloading
    $('search').addEventListener('input', e => { st.q = e.target.value; st.shown = PER; render(); });
    $('search').form.addEventListener('submit', e => e.preventDefault());

    renderChips();
    render();
  }

  /* ---------------------------------------------------------------
     START
     --------------------------------------------------------------- */
  document.querySelectorAll('img').forEach(i => { if (i.complete && i.naturalWidth === 0) fixImg(i); });
  renderCart();
})();
