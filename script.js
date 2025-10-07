const toggleBtn = document.querySelector(".header__toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  toggleBtn.addEventListener("click", () => {
    mobileNav.style.display = mobileNav.style.display === "flex" ? "none" : "flex";
});

(function () {
  const TRANSITION_MS = 900;
  const STAGGER_BASE = 120;
  const STAGGER_CAP = 800;

  const configMap = [
    { sel: '.header__logo', type: 'reveal-up' },
    { sel: '.header__nav li', type: 'reveal-right' },
    { sel: '.header__actions > *', type: 'reveal-left' },
    { sel: '.hero__content', type: 'reveal-up' },
    { sel: '.jobs-item', type: 'reveal-up',   stagger: true },
    { sel: '.jobs-image', type: 'reveal-right' },
    { sel: '.stat-card', type: 'reveal-up',   stagger: true },
    { sel: '.text-box', type: 'reveal-up' },
    { sel: '.logos img', type: 'reveal-fade', stagger: true },
    { sel: '.cta-box', type: 'reveal-up' },
    { sel: '.footer-col', type: 'reveal-up',   stagger: true }
  ];

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      obs.unobserve(entry.target);
    });
  }, observerOptions);

  function registerNode(node, animationClass) {
    if (!(node instanceof Element)) return;
    if (node.classList.contains('reveal')) return;
    node.classList.add('reveal', animationClass || 'reveal-up');
    observer.observe(node);
  }

  configMap.forEach(item => {
    const nodes = Array.from(document.querySelectorAll(item.sel));
    if (!nodes.length) return;

    if (item.stagger) {
      nodes.forEach((node, index) => {
        registerNode(node, item.type);
        const delay = Math.min(STAGGER_BASE * index, STAGGER_CAP);
        node.style.transitionDelay = `${delay}ms`;
      });
    } else {
      nodes.forEach(node => registerNode(node, item.type));
    }
  });

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('active');
      el.style.transitionDelay = '0ms';
    });
  }

  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileNav) {
    const obsConfig = { childList: false, attributes: true, attributeFilter: ['class'] };
    const mo = new MutationObserver(muts => {
      muts.forEach(m => {
        if (m.type === 'attributes' && mobileNav.classList.contains('open')) {
          Array.from(mobileNav.querySelectorAll('a, button, li')).forEach((el, i) => {
            if (!el.classList.contains('reveal')) {
              el.classList.add('reveal', 'reveal-up');
              el.style.transitionDelay = `${Math.min(40 * i, 300)}ms`;
            }
          });
        }
      });
    });
    mo.observe(mobileNav, obsConfig);
  }
})();
