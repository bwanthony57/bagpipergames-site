(() => {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const on = Boolean(id) && link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', on);
      if (on) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const updateNavHighlight = () => {
    if (!sections.length) {
      return;
    }

    const marker = window.scrollY + window.innerHeight * 0.32;
    let currentId = '';

    for (const section of sections) {
      if (section.offsetTop <= marker) {
        currentId = section.id;
      }
    }

    setActive(currentId);
  };

  window.addEventListener('scroll', updateNavHighlight, { passive: true });
  window.addEventListener('hashchange', updateNavHighlight);
  updateNavHighlight();
})();
