document.addEventListener('DOMContentLoaded', function() {
  // Navigation menu toggle for mobile
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Animate hamburger icon
      const spans = hamburger.querySelectorAll('span');
      
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
  
  // Smooth scrolling for navigation links
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // WhatsApp redirect
  const whatsappButton = document.getElementById('whatsapp-button');
  
  if (whatsappButton) {
    whatsappButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the actual WhatsApp link from the href attribute
      const whatsappLink = this.getAttribute('href');
      
      // Show confirmation dialog
      const confirmed = confirm('You are about to join our WhatsApp group. Continue?');
      
      if (confirmed) {
        // Open in new tab
        window.open(whatsappLink, '_blank');
      }
    });
  }
  
  // Intersection Observer for animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Add animation classes to CSS and uncomment this code to enable animations
  /*
  const animateElements = document.querySelectorAll('.feature-card, .benefits-content, .benefits-image, .testimonial-card');
  animateElements.forEach(el => {
      observer.observe(el);
  });
  */
});