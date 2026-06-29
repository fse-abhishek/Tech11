/**
 * Tech Research Technologies - Enterprise Corporate Website JavaScript
 * Pure Vanilla JavaScript ES6+ Architecture
 * Features: Preloader, Custom Cursor, AOS Scroll Animations, Typing Effect,
 * Animated Counters, Testimonials Carousel, Product Filtering, Dark/Light Mode,
 * Search Modal, Toast Notifications, & Interactive UI handlers.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. PRELOADER & INITIALIZATION
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const preloaderProgress = document.querySelector('.preloader-progress');

  function initPreloader() {
    let width = 0;
    const interval = setInterval(() => {
      width += Math.floor(Math.random() * 25) + 10;
      if (width >= 100) {
        width = 100;
        clearInterval(interval);
        if (preloaderProgress) preloaderProgress.style.width = '100%';
        setTimeout(() => {
          if (preloader) {
            preloader.classList.add('hidden');
          }
          // Trigger initial scroll animation check once preloader hides
          triggerAOS();
        }, 400);
      } else {
        if (preloaderProgress) preloaderProgress.style.width = `${width}%`;
      }
    }, 80);
  }

  initPreloader();

  /* ==========================================================================
     2. MODERN CUSTOM CURSOR
     ========================================================================== */
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');

  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Smooth follower animation loop
    function animateCursor() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add active interactive states for clickable elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .node, .dot');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
    });
  }

  /* ==========================================================================
     3. STICKY NAVBAR & SCROLL PROGRESS BAR
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Scroll Progress Bar calculation
    if (scrollProgress && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Navbar Glassmorphism State
    if (navbar) {
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top Button Visibility
    if (backToTopBtn) {
      if (scrollTop > 600) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Active Navigation Highlight
    highlightActiveNavLink();
  }

  window.addEventListener('scroll', handleWindowScroll, { passive: true });

  /* ==========================================================================
     4. RESPONSIVE MOBILE MENU
     ========================================================================== */
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

  /* ==========================================================================
     5. DARK / LIGHT MODE TOGGLE
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('trt_theme') || 'light';

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('trt_theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('trt_theme', 'light');
    }
  }

  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  /* ==========================================================================
     6. HERO TYPING EFFECT
     ========================================================================== */
  const typingTextEl = document.getElementById('typing-text');
  const phrases = [
    'Artificial Intelligence',
    'Quantum Computing',
    'Autonomous Robotics',
    'Cyber Security',
    'Cloud Systems',
    'Deep Learning'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingTextEl) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2200; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before typing next phrase
    }

    setTimeout(typeEffect, typeSpeed);
  }

  setTimeout(typeEffect, 1000);

  /* ==========================================================================
     7. AOS STYLE PURE JAVASCRIPT SCROLL ANIMATIONS
     ========================================================================== */
  const aosElements = document.querySelectorAll('[data-aos]');

  function triggerAOS() {
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.88;

    aosElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        el.classList.add('aos-animate');
      }
    });
  }

  window.addEventListener('scroll', triggerAOS, { passive: true });
  window.addEventListener('resize', triggerAOS);

  /* ==========================================================================
     8. ANIMATED NUMBER COUNTERS
     ========================================================================== */
  const counters = document.querySelectorAll('.counter');
  let hasAnimatedCounters = false;

  function animateCounters() {
    if (hasAnimatedCounters) return;
    const firstCounter = counters[0];
    if (!firstCounter) return;

    const top = firstCounter.getBoundingClientRect().top;
    if (top < window.innerHeight) {
      hasAnimatedCounters = true;

      counters.forEach((counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;

        const timer = setInterval(() => {
          current += Math.ceil(target / 45);
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = current;
          }
        }, stepTime || 30);
      });
    }
  }

  window.addEventListener('scroll', animateCounters, { passive: true });

  /* ==========================================================================
     9. BUTTON RIPPLE EFFECT
     ========================================================================== */
  const rippleButtons = document.querySelectorAll('.ripple-btn');

  rippleButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const circle = document.createElement('span');
      circle.classList.add('ripple');
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      this.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 600);
    });
  });

  /* ==========================================================================
     10. PRODUCT CATEGORY FILTERING
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          // Re-trigger simple entrance zoom
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     11. CLIENT TESTIMONIALS SLIDING CAROUSEL
     ========================================================================== */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('prev-test');
  const nextBtn = document.getElementById('next-test');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach((s) => s.classList.remove('active'));
    dots.forEach((d) => d.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() { showSlide(currentSlide + 1); }
  function prevSlide() { showSlide(currentSlide - 1); }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetSlideTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetSlideTimer(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      resetSlideTimer();
    });
  });

  function resetSlideTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 7000);
  }

  if (slides.length > 0) {
    resetSlideTimer();
  }

  /* ==========================================================================
     12. SEARCH POPUP MODAL
     ========================================================================== */
  const searchTrigger = document.getElementById('search-trigger');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-close');
  const searchBackdrop = document.querySelector('.search-modal-backdrop');
  const searchInput = document.getElementById('website-search-input');
  const searchResultsContainer = document.getElementById('search-results');

  // Indexable content items for client search
  const searchIndex = [
    { title: 'Artificial Intelligence Research', url: '#research', desc: 'Self-supervised learning, multimodal reasoning, and cognitive architectures.' },
    { title: 'Quantum Computing Breakthrough', url: '#research', desc: '512-Qubit simulation engines and post-quantum lattice encryption.' },
    { title: 'CloudSphere Enterprise OS', url: '#products', desc: 'Unified hybrid cloud management portal offering real-time Kubernetes scaling.' },
    { title: 'NeuralShield Sentinel', url: '#products', desc: 'Autonomous AI XDR firewall neutralizing ransomware within 12 milliseconds.' },
    { title: 'Cognito LLM Workbench', url: '#products', desc: 'Secure on-premise generative AI studio enabling enterprise RAG pipelines.' },
    { title: 'AI Development Services', url: '#services', desc: 'Custom generative models, autonomous workflows, and LLM fine-tuning.' },
    { title: 'Cyber Security Services', url: '#services', desc: 'Zero-Trust architecture, quantum-resistant encryption, and threat mitigation.' },
    { title: 'Executive Team & Leadership', url: '#team', desc: 'Meet Dr. Alexander Vance, Elena Rostova, and Marcus Sterling.' },
    { title: 'Careers & Open Positions', url: '#careers', desc: 'Principal AI Architect, Quantum Research Scientist, and MLOps Engineer.' }
  ];

  function openSearchModal() {
    if (!searchModal) return;
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { if (searchInput) searchInput.focus(); }, 100);
  }

  function closeSearchModal() {
    if (!searchModal) return;
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (searchTrigger) searchTrigger.addEventListener('click', openSearchModal);
  if (searchClose) searchClose.addEventListener('click', closeSearchModal);
  if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearchModal);

  // Keyboard shortcut Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('active')) {
        closeSearchModal();
      } else {
        openSearchModal();
      }
    }
    if (e.key === 'Escape') {
      closeSearchModal();
      closeJobModal();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!searchResultsContainer) return;

      if (!query) {
        searchResultsContainer.innerHTML = '<div class="no-results">Type a keyword to search solutions, labs, and products...</div>';
        return;
      }

      const filtered = searchIndex.filter((item) => 
        item.title.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        searchResultsContainer.innerHTML = `<div class="no-results">No corporate solutions found for "<strong>${query}</strong>"</div>`;
      } else {
        searchResultsContainer.innerHTML = filtered.map((item) => `
          <a href="${item.url}" class="search-result-item" onclick="document.getElementById('search-modal').classList.remove('active'); document.body.style.overflow='';">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <div>
              <h5>${item.title}</h5>
              <p>${item.desc}</p>
            </div>
          </a>
        `).join('');
      }
    });
  }

  /* ==========================================================================
     13. TOAST NOTIFICATIONS & CONTACT FORM
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const toastEl = document.getElementById('toast');
  const toastClose = document.getElementById('toast-close');
  const toastTitle = document.getElementById('toast-title');
  const toastDesc = document.getElementById('toast-desc');

  function showToast(title, desc) {
    if (!toastEl) return;
    if (toastTitle) toastTitle.textContent = title;
    if (toastDesc) toastDesc.textContent = desc;

    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 6000);
  }

  if (toastClose) {
    toastClose.addEventListener('click', () => toastEl.classList.remove('show'));
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Transmission Successful', 'Thank you. A dedicated Principal Technology Architect will contact you within 15 minutes.');
      contactForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Subscribed to Research Dispatch', 'You have been enrolled in our bi-weekly executive technology briefings.');
      newsletterForm.reset();
    });
  }

  /* ==========================================================================
     14. CAREERS JOB APPLICATION MODAL
     ========================================================================== */
  const jobModal = document.getElementById('job-modal');
  const jobModalClose = document.getElementById('job-modal-close');
  const jobModalBackdrop = document.querySelector('.job-modal-backdrop');
  const applyButtons = document.querySelectorAll('.apply-btn');
  const jobModalTitle = document.getElementById('job-modal-title');
  const appliedJobNameInput = document.getElementById('applied-job-name');
  const jobAppForm = document.getElementById('job-application-form');

  function openJobModal(jobName) {
    if (!jobModal) return;
    if (jobModalTitle) jobModalTitle.textContent = `Apply for: ${jobName}`;
    if (appliedJobNameInput) appliedJobNameInput.value = jobName;
    jobModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeJobModal() {
    if (!jobModal) return;
    jobModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  applyButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const jobCard = this.closest('.job-card');
      const jobTitle = jobCard ? jobCard.querySelector('h4').textContent : 'Principal Position';
      openJobModal(jobTitle);
    });
  });

  if (jobModalClose) jobModalClose.addEventListener('click', closeJobModal);
  if (jobModalBackdrop) jobModalBackdrop.addEventListener('click', closeJobModal);

  if (jobAppForm) {
    jobAppForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeJobModal();
      showToast('Candidate Dossier Received', 'Your application has been routed directly to our VP of Talent Acquisition.');
      jobAppForm.reset();
    });
  }

  /* ==========================================================================
     15. SMOOTH SCROLLING & ACTIVE NAV LINK HIGHLIGHT
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id="home"]');

  function highlightActiveNavLink() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Back to Top button click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initial trigger
  handleWindowScroll();
});
