// Simple module switching - exactly like your reference code
document.querySelectorAll('.module-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Check if button is already active to prevent unnecessary clicks
    if (btn.classList.contains('active')) {
      return;
    }
    
    document.querySelectorAll('.module-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.module-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.module).classList.add('active');
  });
});

// Entrance animation for header elements on page load/refresh
function initEntranceAnimations() {
  const title = document.querySelector('h1');
  const subtitle = document.querySelector('.subtitle');
  
  // Set initial state to prevent flash
  if (title) {
    title.style.opacity = '0';
    title.style.transform = 'translateY(-30px) scale(0.9)';
  }
  if (subtitle) {
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(20px)';
  }
  
  setTimeout(() => {
    if (title) {
      // Apply entrance animation
      title.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      title.style.opacity = '1';
      title.style.transform = 'translateY(0) scale(1)';
      
      // Remove transition after animation completes to let CSS animations work
      setTimeout(() => {
        title.style.transition = '';
        title.style.transform = '';
      }, 1000);
    }
    
    if (subtitle) {
      setTimeout(() => {
        subtitle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
        
        // Clean up after animation
        setTimeout(() => {
          subtitle.style.transition = '';
          subtitle.style.transform = '';
        }, 800);
      }, 200);
    }
  }, 50);
}

// No additional keyframes needed - using CSS transitions for smoother animation

// Initialize essential features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Ensure no horizontal scroll from the start
  document.body.style.overflowX = 'hidden';
  document.documentElement.style.overflowX = 'hidden';
  
  // Add entrance animations
  initEntranceAnimations();
});

// Handle resize events to ensure no horizontal scroll
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
  }, 250);
});