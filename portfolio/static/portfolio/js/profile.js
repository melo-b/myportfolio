(function () {
    'use strict';

    var $ = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

    /* ---------- Data ---------- */
    var posts = {
        auth: {
            title: 'Django Authentication System',
            img: $('[data-post="auth"] img').src,
            desc: [
                'Secure user authentication with custom models, comprehensive testing, and a modern UI.',
                'Built a complete authentication system featuring custom user models, secure login/logout flows, password reset functionality, and a responsive dashboard. Includes 18 comprehensive tests and a modern Bootstrap 5 interface.'
            ],
            tags: ['#django', '#python', '#bootstrap5', '#sqlite', '#authentication'],
            url: 'https://github.com/melo-b/django-auth-system'
        },
        events: {
            title: 'Django Event Booking System',
            img: $('[data-post="events"] img').src,
            desc: [
                'A robust event management platform built with Django, featuring user authentication, event CRUD operations, RSVP functionality, and real-time capacity management.'
            ],
            tags: ['#django', '#python', '#sqlite', '#orm', '#crud'],
            url: 'https://github.com/melo-b/event-booking-app'
        },
        chess: {
            title: 'Chess Tournament Management System',
            img: $('[data-post="chess"] img').src,
            desc: [
                'A comprehensive CLI chess tournament management application built with Python that handles complete tournament workflows from creation to final reporting.',
                'Features automated Swiss-system pairings, player registration, match result tracking, and detailed tournament reports in both text and HTML formats.'
            ],
            tags: ['#python', '#json', '#jinja2', '#flake8', '#cli'],
            url: 'https://github.com/melo-b/P3-Application-Developer-Skills-Bootcamp'
        }
    };
    var postOrder = ['auth', 'events', 'chess'];
    var currentPost = null;

    var stories = {
        about: [
            { icon: 'fa-user', title: 'Hi, I\'m Rommelo 👋', text: 'Mechanical Engineer turned Backend Developer. I build APIs, authentication systems and backend solutions with Python and Django.' },
            { icon: 'fa-certificate', title: 'Always learning', text: 'Self-taught and certified: Meta Back-End Developer Certificate, plus hands-on projects along the way.' },
            { icon: 'fa-bullseye', title: 'The goal', text: 'Grow into a role where I design and optimize systems that solve complex problems at scale.' }
        ],
        skills: [
            { icon: 'fa-code', title: 'Skills', chips: ['Python', 'Django / DRF', 'Flask', 'SQL'] }
        ],
        tools: [
            { icon: 'fa-screwdriver-wrench', title: 'Tools', chips: ['Git / GitHub', 'Docker', 'Insomnia', 'VS Code', 'PyCharm'] }
        ],
        journey: [
            { icon: 'fa-gears', title: 'Step 1: Engineering', text: 'A strong foundation in engineering principles: thinking analytically and breaking complex problems down.' },
            { icon: 'fa-laptop-code', title: 'Step 2: Python', text: 'Moved into web development and embraced learning new technologies by building real projects.' },
            { icon: 'fa-server', title: 'Step 3: Backend', text: 'Now focused on Django, REST APIs and authentication systems.' }
        ],
        life: [
            { icon: 'fa-plane', title: 'Travel', text: 'Usually researching my next destination.' },
            { icon: 'fa-table-tennis-paddle-ball', title: 'Pickleball', text: 'Playing whenever I can.' },
            { icon: 'fa-golf-ball-tee', title: 'Golf', text: 'Still working on that swing. ⛳' }
        ]
    };

    /* ---------- Modal helpers ---------- */
    function openModal(el) {
        el.classList.add('open');
        el.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    }
    function closeModal(el) {
        el.classList.remove('open');
        el.setAttribute('aria-hidden', 'true');
        if (!$('.modal.open') && !$('.story.open')) document.body.classList.remove('no-scroll');
    }

    $$('[data-open]').forEach(function (b) {
        b.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(document.getElementById(b.dataset.open));
            var first = $('input', document.getElementById(b.dataset.open));
            if (first) setTimeout(function () { first.focus(); }, 30);
        });
    });
    $$('.modal [data-close]').forEach(function (b) {
        b.addEventListener('click', function () { closeModal(b.closest('.modal')); });
    });

    /* ---------- Tabs ---------- */
    function showTab(name) {
        $$('.tab').forEach(function (t) { t.classList.toggle('active', t.dataset.tab === name); });
        $$('.panel').forEach(function (p) { p.classList.toggle('active', p.id === 'tab-' + name); });
    }
    $$('.tab').forEach(function (t) {
        t.addEventListener('click', function () { showTab(t.dataset.tab); });
    });
    $$('[data-tab-jump]').forEach(function (b) {
        b.addEventListener('click', function () {
            showTab(b.dataset.tabJump);
            $('.tabs').scrollIntoView({ behavior: 'smooth' });
        });
    });
    $$('[data-scroll="top"]').forEach(function (b) {
        b.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    });

    /* ---------- Post modal ---------- */
    var postModal = $('#post-modal');
    function showPost(key) {
        var p = posts[key];
        currentPost = key;
        $('#pv-img').src = p.img;
        $('#pv-img').alt = p.title;
        $('#pv-title').textContent = p.title;
        var desc = $('#pv-desc');
        desc.innerHTML = '';
        p.desc.forEach(function (t) {
            var el = document.createElement('p');
            el.textContent = t;
            desc.appendChild(el);
        });
        var tags = $('#pv-tags');
        tags.innerHTML = '';
        p.tags.forEach(function (t) {
            var s = document.createElement('span');
            s.textContent = t;
            tags.appendChild(s);
        });
        $('#pv-link').href = p.url;
        openModal(postModal);
    }
    function stepPost(dir) {
        var i = (postOrder.indexOf(currentPost) + dir + postOrder.length) % postOrder.length;
        showPost(postOrder[i]);
    }
    $$('[data-post]').forEach(function (b) {
        b.addEventListener('click', function () { showPost(b.dataset.post); });
    });
    $('#post-prev').addEventListener('click', function () { stepPost(-1); });
    $('#post-next').addEventListener('click', function () { stepPost(1); });

    /* ---------- Story viewer ---------- */
    var storyEl = $('#story');
    var storyDur = 6000;
    var storyTimer = null;
    var storyIdx = 0;
    var storySlides = [];

    function renderStory() {
        var s = storySlides[storyIdx];
        var c = $('#story-content');
        c.innerHTML = '';
        var icon = document.createElement('i');
        icon.className = 'fas ' + s.icon + ' s-icon';
        var h = document.createElement('h2');
        h.textContent = s.title;
        c.appendChild(icon);
        c.appendChild(h);
        if (s.text) {
            var p = document.createElement('p');
            p.textContent = s.text;
            c.appendChild(p);
        }
        if (s.chips) {
            var wrap = document.createElement('div');
            wrap.className = 'story-chips';
            s.chips.forEach(function (t) {
                var sp = document.createElement('span');
                sp.textContent = t;
                wrap.appendChild(sp);
            });
            c.appendChild(wrap);
        }
        $$('span', $('#story-bars')).forEach(function (bar, i) {
            bar.className = i < storyIdx ? 'done' : (i === storyIdx ? 'active' : '');
        });
        clearTimeout(storyTimer);
        storyTimer = setTimeout(function () { stepStory(1); }, storyDur);
    }
    function openStory(key) {
        storySlides = stories[key];
        storyIdx = 0;
        var bars = $('#story-bars');
        bars.innerHTML = '';
        storySlides.forEach(function () {
            var b = document.createElement('span');
            b.appendChild(document.createElement('i'));
            bars.appendChild(b);
        });
        storyEl.classList.add('open');
        storyEl.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
        renderStory();
    }
    function closeStory() {
        clearTimeout(storyTimer);
        storyEl.classList.remove('open');
        storyEl.setAttribute('aria-hidden', 'true');
        if (!$('.modal.open')) document.body.classList.remove('no-scroll');
    }
    function stepStory(dir) {
        var n = storyIdx + dir;
        if (n >= storySlides.length) return closeStory();
        if (n < 0) n = 0;
        storyIdx = n;
        renderStory();
    }
    $$('[data-story]').forEach(function (b) {
        b.addEventListener('click', function () { openStory(b.dataset.story); });
    });
    $('#story-prev').addEventListener('click', function () { stepStory(-1); });
    $('#story-next').addEventListener('click', function () { stepStory(1); });
    $('[data-story-close]').addEventListener('click', closeStory);
    storyEl.addEventListener('click', function (e) { if (e.target === storyEl) closeStory(); });

    /* ---------- Keyboard ---------- */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (storyEl.classList.contains('open')) return closeStory();
            var m = $('.modal.open');
            if (m) closeModal(m);
        } else if (storyEl.classList.contains('open')) {
            if (e.key === 'ArrowRight') stepStory(1);
            if (e.key === 'ArrowLeft') stepStory(-1);
        } else if (postModal.classList.contains('open')) {
            if (e.key === 'ArrowRight') stepPost(1);
            if (e.key === 'ArrowLeft') stepPost(-1);
        }
    });

    /* Keep the contact modal scroll lock if the server re-opened it after a validation error */
    if ($('.modal.open')) document.body.classList.add('no-scroll');
})();
