/* 問学舎 LP — 動き
   1) スマホメニュー
   2) カテゴリの絞り込み
   3) 各回の「View More」開閉
   4) 気になる回（チェック）— localStorage に保存し、件数をヘッダーと下部バーに出す
   5) 開講までのカウントダウン
   6) スクロール表示
   動きは prefers-reduced-motion を尊重する。 */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PICK_KEY = 'mongaku:picks';
  var BAR_KEY = 'mongaku:barClosed';

  /* ---------- 1. スマホメニュー ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    };

    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        burger.focus();
      }
    });

    window.matchMedia('(min-width: 861px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- 2. カテゴリの絞り込み ---------- */
  var tabs = document.querySelectorAll('.ftab');
  var progs = document.querySelectorAll('.prog');
  var empty = document.getElementById('empty');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var cat = tab.dataset.cat;

      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-on', on);
        t.setAttribute('aria-pressed', String(on));
      });

      var shown = 0;
      progs.forEach(function (p) {
        var hit = cat === 'all' || p.dataset.cat === cat;
        p.classList.toggle('is-off', !hit);
        if (hit) shown++;
      });

      if (empty) empty.hidden = shown !== 0;
    });
  });

  /* ---------- 3. View More ---------- */
  document.querySelectorAll('.more').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      btn.textContent = open ? 'View More' : 'Close';
    });
  });

  /* ---------- 4. 気になる回 ---------- */
  var favs = document.querySelectorAll('.fav');
  var chip = document.getElementById('pickChip');
  var chipNum = document.getElementById('pickNum');
  var bar = document.getElementById('pickbar');
  var barNum = document.getElementById('pickbarNum');
  var barX = document.getElementById('pickbarX');

  var read = function () {
    try {
      var raw = localStorage.getItem(PICK_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  };

  var save = function (list) {
    try { localStorage.setItem(PICK_KEY, JSON.stringify(list)); } catch (err) { /* 保存できなくても動作は続ける */ }
  };

  var picks = read();

  var barClosed = function () {
    try { return sessionStorage.getItem(BAR_KEY) === '1'; } catch (err) { return false; }
  };

  var paint = function (bump) {
    var n = picks.length;

    if (chipNum) chipNum.textContent = String(n);
    if (chip) {
      chip.classList.toggle('is-hot', n > 0);
      if (bump && !reduce) {
        chip.classList.add('is-bump');
        setTimeout(function () { chip.classList.remove('is-bump'); }, 220);
      }
    }

    if (bar && barNum) {
      barNum.textContent = String(n);
      if (n > 0 && !barClosed()) {
        bar.hidden = false;
        // hidden を外した直後だと transition が走らないので1フレーム待つ
        requestAnimationFrame(function () { bar.classList.add('is-up'); });
      } else {
        bar.classList.remove('is-up');
        if (n === 0) bar.hidden = true;
      }
    }
  };

  favs.forEach(function (btn) {
    var id = btn.dataset.fav;
    if (picks.indexOf(id) !== -1) btn.setAttribute('aria-pressed', 'true');

    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!on));

      if (on) {
        picks = picks.filter(function (p) { return p !== id; });
      } else if (picks.indexOf(id) === -1) {
        picks.push(id);
        try { sessionStorage.removeItem(BAR_KEY); } catch (err) { /* noop */ }
      }

      save(picks);
      paint(!on);
    });
  });

  if (barX && bar) {
    barX.addEventListener('click', function () {
      bar.classList.remove('is-up');
      try { sessionStorage.setItem(BAR_KEY, '1'); } catch (err) { /* noop */ }
      setTimeout(function () { bar.hidden = true; }, reduce ? 0 : 400);
    });
  }

  paint(false);

  /* ---------- 5. 開講までのカウントダウン ---------- */
  var count = document.getElementById('count');
  var countNum = document.getElementById('countNum');

  if (count && countNum) {
    var start = new Date('2026-09-02T19:30:00+09:00');
    var days = Math.ceil((start.getTime() - Date.now()) / 86400000);

    if (days > 0) {
      countNum.textContent = String(days);
    } else {
      // 開講日を過ぎたら日数ではなく状態を出す
      count.textContent = '9月2日（水）開講';
      count.classList.add('count--past');
    }
  }

  /* ---------- 6. スクロール表示 ---------- */
  var targets = document.querySelectorAll('[data-reveal]');

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });

  targets.forEach(function (el) { io.observe(el); });
})();
