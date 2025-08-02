// Simple module switching - exactly like your reference code
document.querySelectorAll('.module-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.module-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.module-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.module).classList.add('active');
  });
});

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll-based animations with proper intersection observer
function initScrollAnimations() {
  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once revealed to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add scroll reveal classes to folders with alternating directions
  document.querySelectorAll('.folder').forEach((folder, index) => {
    // Only add scroll reveal to folders not currently visible
    const rect = folder.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      folder.classList.add('scroll-reveal');
      if (index % 2 === 0) {
        folder.classList.add('scroll-reveal-left');
      } else {
        folder.classList.add('scroll-reveal-right');
      }
      observer.observe(folder);
    } else {
      // For folders already visible, make sure they show up properly
      folder.style.opacity = '1';
      folder.style.transform = 'translateY(0) scale(1)';
    }
  });
  
  // Store observer for potential cleanup
  window.scrollObserver = observer;
}

// Parallax scrolling effect
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax-element');
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    parallaxElements.forEach(element => {
      element.style.transform = `translateY(${rate}px)`;
    });
  }

  // Throttle scroll events for better performance
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
      setTimeout(() => { ticking = false; }, 16);
    }
  }

  window.addEventListener('scroll', requestTick);
}

// Enhanced file interactions
function initFileInteractions() {
  document.querySelectorAll('.file-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(12px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
    
    // Add ripple effect on click
    item.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(102,126,234,0.3);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Add dynamic particles with proper cleanup
function createFloatingParticles() {
  if (window.innerWidth <= 600) return; // Skip on mobile for performance
  
  // Remove existing particles first to prevent duplicates
  const existingParticles = document.querySelector('.floating-particles');
  if (existingParticles) {
    existingParticles.remove();
  }
  
  // Check if HTML already has particles container
  const htmlParticles = document.querySelector('.floating-particles');
  if (htmlParticles && !htmlParticles.hasAttribute('data-js-created')) {
    // Use existing HTML particles, just add the attribute
    htmlParticles.setAttribute('data-js-created', 'false');
    return;
  }
  
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'floating-particles';
  particlesContainer.setAttribute('data-js-created', 'true');
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: -2;
    overflow: hidden;
    max-width: 100%;
    max-height: 100%;
  `;
  
  document.body.insertBefore(particlesContainer, document.body.firstChild);
  
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particlesContainer.appendChild(particle);
  }
}

// Simple loading animations
function initLoadingAnimations() {
  // Animate header elements on load
  setTimeout(() => {
    const title = document.querySelector('h1');
    const subtitle = document.querySelector('.subtitle');
    
    if (title) {
      title.style.animation = 'titleEntrance 1s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    if (subtitle) {
      subtitle.style.animation = 'subtitleEntrance 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both';
    }
  }, 100);
}

// Add entrance animations for header elements
function addHeaderAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes titleEntrance {
      from {
        opacity: 0;
        transform: translateY(-30px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes subtitleEntrance {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

// Smooth scroll to top functionality
function addScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f093fb, #667eea);
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(102,126,234,0.3);
  `;
  
  document.body.appendChild(scrollBtn);
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.transform = 'translateY(0)';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.transform = 'translateY(100px)';
    }
  });
}

// Add ripple animation keyframes
function addRippleAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Ensure no horizontal scroll from the start
  document.body.style.overflowX = 'hidden';
  document.documentElement.style.overflowX = 'hidden';
  
  // Initialize only essential features for simple animations
  addHeaderAnimations();
  createFloatingParticles();
  initLoadingAnimations();
  addScrollToTop();
  addRippleAnimation();
  
  // Performance monitoring
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      console.log('✨ MASAI PDF Library with simple animations loaded!');
    });
  }
});

// Handle resize events for responsive behavior with throttling
let resizeTimeout;
window.addEventListener('resize', () => {
  // Throttle resize events for better performance
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Ensure no horizontal scroll on resize
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    // Recreate particles if screen size changes significantly
    const existingParticles = document.querySelector('.floating-particles[data-js-created="true"]');
    if (existingParticles) {
      existingParticles.remove();
    }
    createFloatingParticles();
  }, 250); // Throttle to 250ms
});