document.addEventListener('DOMContentLoaded', function () {
    // Burger menu toggle
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');

    burger.addEventListener('click', function () {
        burger.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close nav on link click
    var navLinks = document.querySelectorAll('[data-nav]');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            burger.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Menu tabs
    var tabs = document.querySelectorAll('.menu__tab');
    var categories = {
        cold: document.getElementById('cat-cold'),
        breakfast: document.getElementById('cat-breakfast'),
        first: document.getElementById('cat-first'),
        second: document.getElementById('cat-second'),
        garnish: document.getElementById('cat-garnish'),
        bakery: document.getElementById('cat-bakery'),
        drinks: document.getElementById('cat-drinks')
    };

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) { t.classList.remove('active'); });
            tab.classList.add('active');

            var targetId = tab.getAttribute('data-tab');
            Object.keys(categories).forEach(function (key) {
                if (categories[key]) {
                    categories[key].classList.remove('active');
                }
            });
            if (categories[targetId]) {
                categories[targetId].classList.add('active');
            }
        });
    });

    // Smooth scroll offset for fixed header
    var headerHeight = document.getElementById('header').offsetHeight;
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // Active nav link on scroll
    var sections = document.querySelectorAll('section[id]');
    function highlightNav() {
        var scrollY = window.pageYOffset;
        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - headerHeight - 100;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');
            var link = document.querySelector('.header__nav-link[href="#' + sectionId + '"]');
            if (link) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav();

    // Fallback images — generate colored placeholder if image fails to load
    document.querySelectorAll('.menu-card__img').forEach(function (img) {
        img.addEventListener('error', function () {
            var name = this.alt || 'Блюдо';
            var colors = ['#D4841A', '#B56E10', '#8B6240', '#C07830', '#A06020'];
            var color = colors[Math.abs(hashStr(name)) % colors.length];
            var initials = name.split(' ').slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
            this.style.display = 'none';
            var placeholder = document.createElement('div');
            placeholder.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:' + color + ';color:#fff;font-size:1.5rem;font-weight:700;font-family:Playfair Display,serif;min-height:100px;';
            placeholder.textContent = initials;
            this.parentNode.appendChild(placeholder);
        });
    });

    function hashStr(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }
});
