/**
 * Jayant - Developer Portfolio
 * Main JavaScript File
 * Handles: Typewriter, Navigation, ScrollSpy, Form Validation, Modals, Toasts, and Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DYNAMIC TYPEWRITER EFFECT (HERO)
  // --------------------------------------------------------------------------
  const typedTextEl = document.getElementById('typed-text');
  const roles = [
    'B.Tech CSE (Batch 2026-2030)',
    'Aspiring Software Engineer',
    'C & Web Programming Enthusiast',
    'JECRC University Undergrad',
    'Problem Solver & Builder'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typedTextEl) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of text
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      // Move to next string
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // --------------------------------------------------------------------------
  // 2. STICKY NAVBAR & BACK-TO-TOP BUTTON VISIBILITY
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollPos = window.scrollY;

    // Header glass background toggle
    if (scrollPos > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Back to top floating button
    if (scrollPos > 350) {
      backToTopBtn?.classList.add('show');
    } else {
      backToTopBtn?.classList.remove('show');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Back to top click event
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --------------------------------------------------------------------------
  // 3. MOBILE NAVIGATION HAMBURGER MENU
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    const isOpen = navMenu?.classList.toggle('open');
    navToggle?.classList.toggle('active');
    navToggle?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  function closeMenu() {
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
  }

  navToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close when clicking outside of nav
  document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('open') && !header?.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu?.classList.contains('open')) {
      closeMenu();
    }
  });

  // --------------------------------------------------------------------------
  // 4. SCROLLSPY / ACTIVE NAV LINK HIGHLIGHT
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.scrollY + 120; // Offset for navbar

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove('active'));
        targetNavLink?.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // --------------------------------------------------------------------------
  // 5. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'success', duration = 4000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-info';
    toast.innerHTML = `
      <i class="${iconClass}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 6. CV DOWNLOAD HANDLER
  // --------------------------------------------------------------------------
  const cvButtons = document.querySelectorAll('.cv-btn, #hero-cv-btn, [download="Jayant_Resume.txt"]');
  cvButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      showToast("Jayant's Resume downloaded! (Editable placeholder file)", 'info', 3500);
    });
  });

  // --------------------------------------------------------------------------
  // 7. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const charCount = document.getElementById('char-count');
  const submitBtn = document.getElementById('submit-btn');
  const formAlert = document.getElementById('form-alert');

  // Character counter for message textarea
  messageInput?.addEventListener('input', () => {
    const len = messageInput.value.length;
    if (charCount) charCount.textContent = `${len} / 1000`;
    if (len > 1000) {
      messageInput.value = messageInput.value.slice(0, 1000);
    }
  });

  // Email regex validator
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validateField(input, errorElement, validatorFn, errorMsg) {
    const isValid = validatorFn(input.value.trim());
    if (!isValid) {
      input.classList.add('is-invalid');
      if (errorElement) errorElement.textContent = errorMsg;
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorElement) errorElement.textContent = '';
      return true;
    }
  }

  // Real-time blur validation
  nameInput?.addEventListener('blur', () => {
    validateField(nameInput, nameError, (v) => v.length >= 2, 'Please enter your full name (at least 2 characters).');
  });

  emailInput?.addEventListener('blur', () => {
    validateField(emailInput, emailError, isValidEmail, 'Please enter a valid email address.');
  });

  messageInput?.addEventListener('blur', () => {
    validateField(messageInput, messageError, (v) => v.length >= 10, 'Please write a message of at least 10 characters.');
  });

  // Form Submission
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField(nameInput, nameError, (v) => v.length >= 2, 'Please enter your full name (at least 2 characters).');
    const isEmailValid = validateField(emailInput, emailError, isValidEmail, 'Please enter a valid email address.');
    const isMessageValid = validateField(messageInput, messageError, (v) => v.length >= 10, 'Please write a message of at least 10 characters.');

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    // Toggle button to loading state
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    if (btnText && btnLoading && submitBtn) {
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-flex';
      submitBtn.disabled = true;
    }

    // Simulate sending network request
    setTimeout(() => {
      // Success feedback
      if (btnText && btnLoading && submitBtn) {
        btnText.style.display = 'inline-flex';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
      }

      if (formAlert) {
        formAlert.className = 'form-alert success';
        formAlert.innerHTML = `
          <i class="fa-solid fa-circle-check"></i>
          <span>Thank you, <strong>${nameInput.value.trim()}</strong>! Your message has been received. Jayant will respond to you soon.</span>
        `;
        formAlert.style.display = 'flex';
      }

      showToast(`Message sent successfully from ${nameInput.value.trim()}!`, 'success');

      // Reset form
      contactForm.reset();
      if (charCount) charCount.textContent = '0 / 1000';

      // Hide inline alert after 7 seconds
      setTimeout(() => {
        if (formAlert) formAlert.style.display = 'none';
      }, 7000);
    }, 700);
  });

  // --------------------------------------------------------------------------
  // 8. PROJECT DETAILS MODAL
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  const projectDetails = {
    'student-records': {
      title: 'Student Record Management System (C Language)',
      category: 'Systems & Data Structures',
      tech: ['C Language', 'File Handling', 'Structures', 'Sorting Algorithms', 'CLI'],
      description: 'A structured console application engineered in C to maintain, search, sort, and persist student academic data using structured binary files.',
      features: [
        'Binary file persistence ensuring fast retrieval and data safety across executions.',
        'Complete CRUD operations: Add new records, update student marks, search by Roll No, and delete entries.',
        'GPA & Percentage computation module with automatic grade categorization.',
        'Memory-safe string and buffer handling techniques.'
      ],
      codeSnippet: `// Example Record Structure in C:\nstruct Student {\n    int rollNumber;\n    char fullName[50];\n    char branch[30];\n    float cgpa;\n};`
    },
    'js-apps': {
      title: 'Interactive JavaScript Utilities Suite',
      category: 'Front-End Web Development',
      tech: ['JavaScript ES6+', 'DOM API', 'HTML5', 'CSS Grid', 'LocalStorage API'],
      description: 'A responsive collection of client-side web applications designed to enhance everyday developer productivity and demonstrate modern JavaScript design patterns.',
      features: [
        'Dynamic Task Manager: Add, filter, toggle completion, and persist tasks in browser LocalStorage.',
        'Interactive Glassmorphism Calculator with keyboard support and error handling.',
        'Digital Stopwatch and Timer with lap recording functionality.',
        'Modular, clean ES6+ JavaScript code structure.'
      ],
      codeSnippet: `// LocalStorage Persistence Pattern:\nconst saveTasks = (tasks) => {\n    localStorage.setItem('jayant_tasks', JSON.stringify(tasks));\n};`
    }
  };

  window.showProjectModal = function (projectId) {
    const data = projectDetails[projectId];
    if (!data || !modalBody || !projectModal) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #38bdf8; letter-spacing: 0.5px;">${data.category}</span>
        <h3 style="font-size: 1.5rem; color: #fff; margin-top: 0.35rem; font-weight: 800;">${data.title}</h3>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
        ${data.tech.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
      </div>

      <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem;">${data.description}</p>

      <h4 style="font-size: 1rem; color: #f8fafc; margin-bottom: 0.75rem;"><i class="fa-solid fa-list-check" style="color: #8b5cf6;"></i> Key Highlights:</h4>
      <ul style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; padding-left: 0.5rem;">
        ${data.features.map((f) => `<li style="font-size: 0.9rem; color: #cbd5e1; display: flex; align-items: flex-start; gap: 0.5rem;"><i class="fa-solid fa-check" style="color: #38bdf8; margin-top: 4px;"></i><span>${f}</span></li>`).join('')}
      </ul>

      <div style="background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #c084fc; overflow-x: auto;">
        <pre><code>${data.codeSnippet}</code></pre>
      </div>

      <div style="margin-top: 1.75rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button type="button" class="btn btn-outline btn-sm" onclick="window.closeProjectModal()">Close</button>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function () {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  modalClose?.addEventListener('click', window.closeProjectModal);

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      window.closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal?.classList.contains('active')) {
      window.closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // 9. REVEAL-ON-SCROLL ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.skill-card, .project-card, .timeline-content, .about-photo-card, .about-content, .contact-info-card, .contact-form-card');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => {
      el.classList.add('reveal-init');
      revealObserver.observe(el);
    });
  }

  // --------------------------------------------------------------------------
  // 10. CURRENT YEAR IN FOOTER
  // --------------------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
