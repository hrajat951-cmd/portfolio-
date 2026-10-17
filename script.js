/**
 * Developer Portfolio - Rajat N Hegde
 * Interactive Features & Logic
 * Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initScrollProgress();
  initActiveNav();
  initMobileDrawer();
  initProjectFilters();
  initMealPlannerDemo();
  initResumeModal();
  initCopyButtons();
  initContactForm();
});

/* ==========================================================================
   1. Theme Toggle (Default Light Theme + Dark Mode Option + LocalStorage)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlEl = document.documentElement;

  // Retrieve stored theme or default to 'light' per design requirements
  const savedTheme = localStorage.getItem('rh_portfolio_theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('rh_portfolio_theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`
      );
    }
  }
}

/* ==========================================================================
   2. Reading Progress Bar & Header Shadow on Scroll
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  const header = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (header) {
      if (scrollTop > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   3. Active Navigation Tracking via IntersectionObserver
   ========================================================================== */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav .mobile-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLink(id);
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));

  function updateActiveLink(activeId) {
    desktopLinks.forEach((link) => {
      const href = link.getAttribute('href').substring(1);
      if (href === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach((link) => {
      const href = link.getAttribute('href').substring(1);
      if (href === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   4. Mobile Navigation Drawer & Keyboard Accessibility
   ========================================================================== */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   5. Project Filtering Tabs
   ========================================================================== */
function initProjectFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.projects-grid .project-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. AI Meal Planner Interactive Demo Modal & Logic
   ========================================================================== */
function initMealPlannerDemo() {
  const openBtn = document.getElementById('open-meal-planner-demo');
  const modal = document.getElementById('meal-planner-modal');
  const closeBtn = document.getElementById('close-meal-modal');
  const closeBottomBtn = document.getElementById('close-meal-modal-bottom');
  const backdrop = document.getElementById('meal-modal-backdrop');

  const caloriesSlider = document.getElementById('demo-calories');
  const caloriesDisplay = document.getElementById('calories-display');
  const dietSelect = document.getElementById('demo-diet');
  const goalSelect = document.getElementById('demo-goal');
  const generateBtn = document.getElementById('generate-plan-btn');

  // Results elements
  const resCalories = document.getElementById('res-calories');
  const resProtein = document.getElementById('res-protein');
  const resCarbs = document.getElementById('res-carbs');
  const resFats = document.getElementById('res-fats');
  const mealsGrid = document.getElementById('meals-output-grid');
  const groceryList = document.getElementById('grocery-output-list');

  if (!openBtn || !modal) return;

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    updatePlan();
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBottomBtn) closeBottomBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (caloriesSlider && caloriesDisplay) {
    caloriesSlider.addEventListener('input', (e) => {
      caloriesDisplay.textContent = `${e.target.value} kcal`;
    });
    caloriesSlider.addEventListener('change', updatePlan);
  }

  if (dietSelect) dietSelect.addEventListener('change', updatePlan);
  if (goalSelect) goalSelect.addEventListener('change', updatePlan);
  if (generateBtn) generateBtn.addEventListener('click', () => {
    updatePlan();
    showToast('Weekly Plan & Grocery List Generated!');
  });

  function updatePlan() {
    const calories = parseInt(caloriesSlider.value, 10) || 2000;
    const diet = dietSelect.value;
    const goal = goalSelect.value;

    let pRatio = 0.3;
    let cRatio = 0.45;
    let fRatio = 0.25;

    if (goal === 'fitness') {
      pRatio = 0.40;
      cRatio = 0.35;
      fRatio = 0.25;
    } else if (goal === 'standard') {
      pRatio = 0.25;
      cRatio = 0.50;
      fRatio = 0.25;
    } else if (goal === 'low-carb') {
      pRatio = 0.30;
      cRatio = 0.25;
      fRatio = 0.45;
    }

    // 1g Protein = 4 kcal, 1g Carb = 4 kcal, 1g Fat = 9 kcal
    const proteinGrams = Math.round((calories * pRatio) / 4);
    const carbsGrams = Math.round((calories * cRatio) / 4);
    const fatsGrams = Math.round((calories * fRatio) / 9);

    if (resCalories) resCalories.textContent = calories.toLocaleString();
    if (resProtein) resProtein.textContent = `${proteinGrams}g`;
    if (resCarbs) resCarbs.textContent = `${carbsGrams}g`;
    if (resFats) resFats.textContent = `${fatsGrams}g`;

    renderMeals(diet, calories);
    renderGroceries(diet);
  }

  function renderMeals(diet, calories) {
    if (!mealsGrid) return;

    let meals = [];
    if (diet === 'vegetarian') {
      meals = [
        {
          slot: 'Breakfast',
          title: 'Paneer Bhurji & Multigrain Toast',
          calories: Math.round(calories * 0.25),
          macros: '28g P / 42g C / 14g F'
        },
        {
          slot: 'Lunch',
          title: 'Brown Rice with Dal Tadka & Palak Paneer',
          calories: Math.round(calories * 0.35),
          macros: '38g P / 70g C / 20g F'
        },
        {
          slot: 'Evening Snack',
          title: 'Roasted Chana, Almonds & Green Tea',
          calories: Math.round(calories * 0.15),
          macros: '16g P / 24g C / 9g F'
        },
        {
          slot: 'Dinner',
          title: 'Tofu Vegetable Stir-Fry & Quinoa / Phulka',
          calories: Math.round(calories * 0.25),
          macros: '32g P / 45g C / 12g F'
        }
      ];
    } else if (diet === 'high-protein') {
      meals = [
        {
          slot: 'Breakfast',
          title: 'High Protein Oats with Whey / Soya & Chia Seeds',
          calories: Math.round(calories * 0.25),
          macros: '35g P / 45g C / 10g F'
        },
        {
          slot: 'Lunch',
          title: 'Paneer & Soya Chunks Curry with Brown Rice & Curd',
          calories: Math.round(calories * 0.35),
          macros: '48g P / 60g C / 18g F'
        },
        {
          slot: 'Evening Snack',
          title: 'Sprouted Moong Salad & Boiled Chickpeas',
          calories: Math.round(calories * 0.15),
          macros: '20g P / 28g C / 6g F'
        },
        {
          slot: 'Dinner',
          title: 'Grilled Tofu / Low-Fat Paneer with Steamed Broccoli & Dal',
          calories: Math.round(calories * 0.25),
          macros: '40g P / 35g C / 12g F'
        }
      ];
    } else {
      meals = [
        {
          slot: 'Breakfast',
          title: 'South Indian Idli / Dosa with Sambar & Sprout Chutney',
          calories: Math.round(calories * 0.25),
          macros: '20g P / 55g C / 11g F'
        },
        {
          slot: 'Lunch',
          title: 'Homestyle Thali: Rice, Rajma Curry, Curd & Salad',
          calories: Math.round(calories * 0.35),
          macros: '32g P / 75g C / 16g F'
        },
        {
          slot: 'Evening Snack',
          title: 'Mixed Fruit Bowl with Walnuts & Pumpkin Seeds',
          calories: Math.round(calories * 0.15),
          macros: '10g P / 32g C / 8g F'
        },
        {
          slot: 'Dinner',
          title: 'Mixed Veg Curry with Whole Wheat Rotis & Buttermilk',
          calories: Math.round(calories * 0.25),
          macros: '25g P / 50g C / 12g F'
        }
      ];
    }

    mealsGrid.innerHTML = meals.map(meal => `
      <div class="meal-item-card">
        <span class="meal-slot-label">${meal.slot}</span>
        <h5 class="meal-title">${meal.title}</h5>
        <div class="meal-stats">${meal.calories} kcal &bull; ${meal.macros}</div>
      </div>
    `).join('');
  }

  function renderGroceries(diet) {
    if (!groceryList) return;

    let items = [
      'Rolled Oats (500g)',
      'Spinach / Palak (2 bunches)',
      'Brown Rice (1kg)',
      'Toor Dal & Moong Dal (1kg)',
      'Almonds & Walnuts (250g)',
      'Tomatoes, Onions & Ginger (1.5kg)',
      'Curd / Greek Yogurt (400g)'
    ];

    if (diet === 'vegetarian') {
      items.unshift('Fresh Paneer (400g)');
      items.push('Organic Tofu (200g)');
    } else if (diet === 'high-protein') {
      items.unshift('Low-Fat Paneer (500g)');
      items.push('Soya Chunks (200g)', 'Chia Seeds (100g)');
    } else {
      items.unshift('Whole Wheat Atta (2kg)');
      items.push('Rajma / Kidney Beans (500g)');
    }

    groceryList.innerHTML = items.map(item => `
      <span class="grocery-chip">&#10003; ${item}</span>
    `).join('');
  }
}

/* ==========================================================================
   7. Resume Modal & Print Functionality
   ========================================================================== */
function initResumeModal() {
  const resumeBtn = document.getElementById('resume-btn');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('close-resume-modal');
  const closeBottomBtn = document.getElementById('close-resume-bottom-btn');
  const backdrop = document.getElementById('resume-modal-backdrop');
  const printBtn = document.getElementById('print-resume-btn');
  const printBottomBtn = document.getElementById('print-resume-bottom-btn');

  if (!modal) return;

  function openResume() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (resumeBtn) resumeBtn.addEventListener('click', openResume);
  if (mobileResumeBtn) mobileResumeBtn.addEventListener('click', openResume);
  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  if (closeBottomBtn) closeBottomBtn.addEventListener('click', closeResume);
  if (backdrop) backdrop.addEventListener('click', closeResume);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeResume();
    }
  });

  function handlePrint() {
    window.print();
  }

  if (printBtn) printBtn.addEventListener('click', handlePrint);
  if (printBottomBtn) printBottomBtn.addEventListener('click', handlePrint);
}

/* ==========================================================================
   8. One-Click Copy Buttons (Email & Phone)
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showCopySuccess(btn, textToCopy);
        }).catch(() => {
          fallbackCopy(btn, textToCopy);
        });
      } else {
        fallbackCopy(btn, textToCopy);
      }
    });
  });

  function fallbackCopy(btn, text) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    tempTextArea.style.position = 'fixed';
    tempTextArea.style.left = '-9999px';
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand('copy');
      showCopySuccess(btn, text);
    } catch (err) {
      showToast('Could not copy to clipboard.');
    }
    document.body.removeChild(tempTextArea);
  }

  function showCopySuccess(btn, text) {
    const tooltip = btn.querySelector('.tooltip');
    if (tooltip) {
      const originalText = tooltip.textContent;
      tooltip.textContent = 'Copied!';
      setTimeout(() => {
        tooltip.textContent = originalText;
      }, 2000);
    }
    showToast(`Copied "${text}" to clipboard!`);
  }
}

/* ==========================================================================
   9. Interactive Contact Form with Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameError.classList.add('visible');
      nameInput.classList.add('error');
      isValid = false;
    } else {
      nameError.classList.remove('visible');
      nameInput.classList.remove('error');
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailError.classList.add('visible');
      emailInput.classList.add('error');
      isValid = false;
    } else {
      emailError.classList.remove('visible');
      emailInput.classList.remove('error');
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
      messageError.classList.add('visible');
      messageInput.classList.add('error');
      isValid = false;
    } else {
      messageError.classList.remove('visible');
      messageInput.classList.remove('error');
    }

    if (isValid) {
      const senderName = nameInput.value.trim();
      const subject = encodeURIComponent(subjectInput.value.trim() || 'Portfolio Inquiry');
      const body = encodeURIComponent(`Name: ${senderName}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`);
      
      showToast(`Thank you, ${senderName}! Opening your email client to send message...`);
      
      // Trigger mailto link for real email sending
      setTimeout(() => {
        window.location.href = `mailto:hrajat951@gmai.com?subject=${subject}&body=${body}`;
      }, 800);

      form.reset();
    }
  });

  // Clear errors on typing
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const err = input.parentElement.querySelector('.field-error');
        if (err) err.classList.remove('visible');
      });
    }
  });
}

/* ==========================================================================
   10. Toast Notification System
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#ea580c; flex-shrink:0;">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 300);
  }, 3500);
}
