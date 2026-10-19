(function () {
    var el = document.getElementById('date-nav');
    var meta = document.querySelector('meta[name="page-date"]');
    if (!el || !meta) return;

    var current = meta.content;
    var file = location.pathname.split('/').pop() || 'panchang.html';
    var inArchive = location.pathname.indexOf('/archive/') !== -1;

    var style = document.createElement('style');
    style.textContent =
        '#date-nav{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:nowrap}' +
        '#date-nav .nav-label{flex:0 1 auto;min-width:0;text-align:center;line-height:1.3}' +
        '#date-nav .nav-btn{flex:none;width:40px;height:40px;border-radius:50%;border:1px solid currentColor;' +
        'background:rgba(128,128,128,.2);color:var(--text-color,#fff);font-size:16px;line-height:1;cursor:pointer;padding:0;' +
        'display:inline-flex;align-items:center;justify-content:center;transition:background .2s,transform .2s}' +
        '#date-nav .nav-btn:hover:not(:disabled){background:rgba(128,128,128,.4);transform:scale(1.08)}' +
        '#date-nav .nav-btn:focus-visible{outline:2px solid #00d9ff;outline-offset:2px}' +
        '#date-nav .nav-btn:disabled{opacity:.25;cursor:default}' +
        '#date-nav .nav-pick{position:relative}' +
        '#date-nav .nav-pick input{position:absolute;inset:0;opacity:0;width:100%;height:100%;cursor:pointer}' +
        '.today-link{display:block;width:max-content;margin:10px auto 0;padding:6px 18px;border-radius:999px;' +
        'background:rgba(0,217,255,.15);border:1px solid rgba(0,217,255,.5);color:var(--text-color,#fff);text-decoration:none;font-size:.9rem}' +
        '.today-link:hover{background:rgba(0,217,255,.3)}';
    document.head.appendChild(style);

    var label = document.createElement('span');
    label.className = 'nav-label';
    while (el.firstChild) label.appendChild(el.firstChild);

    function button(text, title) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'nav-btn';
        b.textContent = text;
        b.title = title;
        b.setAttribute('aria-label', title);
        b.disabled = true;
        return b;
    }

    var prev = button('◀', 'Previous day');
    var next = button('▶', 'Next day');

    var pick = document.createElement('span');
    pick.className = 'nav-btn nav-pick';
    pick.title = 'Pick a date';
    pick.textContent = '📅';
    var input = document.createElement('input');
    input.type = 'date';
    input.setAttribute('aria-label', 'Pick a date');
    input.value = current;
    pick.appendChild(input);
    pick.hidden = true;

    el.appendChild(prev);
    el.appendChild(label);
    el.appendChild(pick);
    el.appendChild(next);

    if (inArchive) {
        var today = document.createElement('a');
        today.className = 'today-link';
        today.href = file;
        today.textContent = 'आज (Today)';
        el.insertAdjacentElement('afterend', today);
    }

    function go(date) {
        location.href = 'archive/' + date + '/' + file;
    }

    fetch('archive/dates.json', { cache: 'no-store' })
        .then(function (r) { return r.json(); })
        .then(function (dates) {
            dates.sort();
            var before = dates.filter(function (d) { return d < current; }).pop();
            var after = dates.filter(function (d) { return d > current; })[0];

            if (before) { prev.disabled = false; prev.onclick = function () { go(before); }; }
            if (after) { next.disabled = false; next.onclick = function () { go(after); }; }

            if (dates.length > 1) {
                pick.hidden = false;
                input.min = dates[0];
                input.max = dates[dates.length - 1];
                input.onchange = function () {
                    if (dates.indexOf(input.value) !== -1) {
                        go(input.value);
                    } else {
                        input.value = current;
                    }
                };
            }

            var startX = 0;
            var startY = 0;
            document.addEventListener('touchstart', function (e) {
                startX = e.changedTouches[0].clientX;
                startY = e.changedTouches[0].clientY;
            }, { passive: true });
            document.addEventListener('touchend', function (e) {
                var dx = e.changedTouches[0].clientX - startX;
                var dy = e.changedTouches[0].clientY - startY;
                if (Math.abs(dx) < 70 || Math.abs(dy) > 45) return;
                if (dx > 0 && before) go(before);
                if (dx < 0 && after) go(after);
            }, { passive: true });
        })
        .catch(function () {});
})();
