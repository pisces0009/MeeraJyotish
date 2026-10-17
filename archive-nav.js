(function () {
    var el = document.getElementById('date-nav');
    var meta = document.querySelector('meta[name="page-date"]');
    if (!el || !meta) return;

    var current = meta.content;
    var file = location.pathname.split('/').pop() || 'panchang.html';

    var style = document.createElement('style');
    style.textContent =
        '#date-nav{display:flex;align-items:center;justify-content:center;gap:16px}' +
        '#date-nav .nav-arrow{background:rgba(255,255,255,.18);color:inherit;border:0;border-radius:50%;' +
        'width:2em;height:2em;font-size:1em;line-height:1;cursor:pointer;flex:none}' +
        '#date-nav .nav-arrow:disabled{opacity:.3;cursor:default}';
    document.head.appendChild(style);

    var label = document.createElement('span');
    while (el.firstChild) label.appendChild(el.firstChild);

    function makeArrow(text, title) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'nav-arrow';
        b.textContent = text;
        b.title = title;
        b.setAttribute('aria-label', title);
        b.disabled = true;
        return b;
    }
    var prev = makeArrow('◀', 'Previous day');
    var next = makeArrow('▶', 'Next day');
    el.appendChild(prev);
    el.appendChild(label);
    el.appendChild(next);

    function go(date) {
        return function () { location.href = 'archive/' + date + '/' + file; };
    }

    fetch('archive/dates.json', { cache: 'no-store' })
        .then(function (r) { return r.json(); })
        .then(function (dates) {
            dates.sort();
            var before = dates.filter(function (d) { return d < current; }).pop();
            var after = dates.filter(function (d) { return d > current; })[0];
            if (before) { prev.disabled = false; prev.onclick = go(before); }
            if (after) { next.disabled = false; next.onclick = go(after); }
        })
        .catch(function () {});
})();
