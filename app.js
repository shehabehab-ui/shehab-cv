// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  initMobileMenu();
  initActiveNav();
  initSkillsTabs();
  initEtoileTabs();
  initContactForm();
});

// Mobile Navigation Toggle
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        const isOpen = navMenu.classList.contains('open');
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        lucide.createIcons({
          attrs: {
            'data-lucide': icon.getAttribute('data-lucide')
          },
          nameAttr: 'data-lucide'
        });
      }
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }
      });
    });
  }
}

// Active Nav Link Highlighting on Scroll
function initActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const options = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the sweet spot of viewport
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Tab Switching for Skills & Expertise
function initSkillsTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const skillPanes = document.querySelectorAll('.skills-pane');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      
      // Update active button state
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update active pane state with smooth transition
      skillPanes.forEach(pane => {
        if (pane.id === `pane-${tabId}`) {
          pane.classList.add('active');
          // Trigger reflow to restart css opacity animation
          void pane.offsetWidth;
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

// Contact Form Handling and Toast Notification
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const toast = document.getElementById('toast');
  
  if (contactForm && submitBtn && toast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get input values
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;
      
      // Basic validation check
      if (!name || !email || !subject || !message) {
        return;
      }
      
      // Disable button & show loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Message... <i data-lucide="loader" class="animate-spin"></i>';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
      
      // Simulate form submission delay (1 second)
      setTimeout(() => {
        // Reset form inputs
        contactForm.reset();
        
        // Restore button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
        
        // Display toast success notification
        toast.classList.add('show');
        
        // Auto hide toast after 4 seconds
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);
        
      }, 1200);
    });
  }
}

// Etoile Group Role Tabs
function initEtoileTabs() {
  const tabs = document.querySelectorAll('.etoile-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.etab;

      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panes
      document.querySelectorAll('.etoile-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      const targetPane = document.getElementById('epane-' + target);
      if (targetPane) {
        // Restart animation
        targetPane.style.animation = 'none';
        targetPane.offsetHeight; // reflow
        targetPane.style.animation = '';
        targetPane.classList.add('active');
      }
    });
  });
}
