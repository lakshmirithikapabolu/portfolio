/**
 * RITHIKA PABOLU'S PORTFOLIO - MAIN INTERACTIVE LOGIC
 * Features: Typewriter, Smooth Scroll Spy, Skill Filters, Project Modals, Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNav();
  initTypewriter();
  initScrollSpy();
  initSkillFilters();
  initProjectModals();
  initContactForm();
  initBackToTop();
  initLiveClock();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen 
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggleBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Hero Role Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typerElement = document.getElementById('role-typer');
  if (!typerElement) return;

  const roles = [
    "Frontend Developer",
    "Public Speaker",
    "Toastmasters Orator Runner-Up",
    "Campus Ambassador @ E-Cell IIT Bombay",
    "Creative Problem Solver"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typerElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typerElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Active Section Spy
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: "-70px 0px -60% 0px"
  });

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   4. Skills Category Filters
   -------------------------------------------------------------------------- */
function initSkillFilters() {
  const filterButtons = document.querySelectorAll('.skills-filters .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterButtons.length || !skillCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Project Details Modal System
   -------------------------------------------------------------------------- */
const projectsData = {
  solar: {
    title: "Solar System — A Cosmic Theory",
    subtitle: "Interactive Web Experience",
    tags: ["HTML5", "CSS3", "JavaScript"],
    description: "A responsive web project designed with a focus on clean UI, smooth interactions, and an engaging user experience exploring planetary orbits and cosmic wonders.",
    features: [
      "Responsive design optimized for desktop, tablet, and mobile screens",
      "Interactive UI components with planetary information cards",
      "Smooth CSS animations, transitions, and celestial motion effects",
      "Clean, user-focused interface crafted with semantic HTML and modern styling"
    ],
    github: "https://github.com/lakshmirithikapabolu",
    demo: "https://deluxe-fox-8b98af.netlify.app"
  },
  geargo: {
    title: "Gear Go",
    subtitle: "JavaScript-Based Web Application",
    tags: ["HTML5", "CSS3", "JavaScript", "Team Project"],
    description: "A functional web application built using JavaScript to demonstrate dynamic content, DOM manipulation, and interactive user experiences. Built collaboratively as a mini project with our team where I played the role of Frontend Developer.",
    features: [
      "Dynamic DOM manipulation and state-driven UI updates",
      "Interactive workflows and responsive layouts across viewports",
      "Clean JavaScript architecture for maintainable component logic",
      "Collaborative frontend development and Git version control"
    ],
    github: "https://github.com/lakshmirithikapabolu",
    demo: "#"
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.querySelector('.modal-close');
  const detailButtons = document.querySelectorAll('.btn-view-details');

  if (!modalOverlay) return;

  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalTags = document.getElementById('modal-tags');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeaturesList = document.getElementById('modal-features');
  const modalGhLink = document.getElementById('modal-github-link');
  const modalDemoLink = document.getElementById('modal-demo-link');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectsData[projectId];

      if (!data) return;

      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalDesc.textContent = data.description;

      // Populate tags
      modalTags.innerHTML = '';
      data.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tech-tag';
        tagSpan.textContent = tag;
        modalTags.appendChild(tagSpan);
      });

      // Populate features
      modalFeaturesList.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.textContent = feat;
        modalFeaturesList.appendChild(li);
      });

      // Update links
      modalGhLink.setAttribute('href', data.github);
      modalDemoLink.setAttribute('href', data.demo);

      // Show modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. Contact Form Validation & Toast Notification
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name']?.value.trim();
    const email = form.elements['email']?.value.trim();
    const subject = form.elements['subject']?.value.trim();
    const message = form.elements['message']?.value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    // Button loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      Sending...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      form.reset();
      showToast(`Thank you, ${name}! Your message has been sent to Rithika.`, "success");
    }, 1000);
  });
}

function showToast(message, type = "success") {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* --------------------------------------------------------------------------
   7. Back to Top Smooth Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   8. Live Time & Footer Year
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockElem = document.getElementById('footer-clock');
  const yearElem = document.getElementById('current-year');

  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }

  if (clockElem) {
    const updateTime = () => {
      const now = new Date();
      clockElem.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };
    updateTime();
    setInterval(updateTime, 1000);
  }
}
