// Typewriter effect for site title
(function() {
  const titleLink = document.querySelector('.site-title a');
  const baseText = 'dj@psu >';
  const typeText = 'home';
  let typingTimeout = null;
  let isTyping = false;
  let suppressAnimation = false; // Flag to suppress animation after click
  
  // Create a style element to dynamically update the ::after content
  const style = document.createElement('style');
  document.head.appendChild(style);
  
  function updateAfterContent(text) {
    style.textContent = `.site-title a::after { content: '${text}'; }`;
  }
  
  function typeCharacter(index) {
    if (index <= typeText.length) {
      const currentText = baseText + typeText.substring(0, index);
      updateAfterContent(currentText);
      
      if (index < typeText.length) {
        typingTimeout = setTimeout(() => typeCharacter(index + 1), 100); // 100ms per character
      } else {
        isTyping = false;
      }
    }
  }
  
  function resetText() {
    clearTimeout(typingTimeout);
    updateAfterContent(baseText);
    isTyping = false;
  }
  
  function startAnimation() {
    // Don't start if suppressed or already typing
    if (!isTyping && !suppressAnimation) {
      isTyping = true;
      typeCharacter(0);
    }
  }
  
  // Check if we just navigated via the link (flag in sessionStorage)
  if (sessionStorage.getItem('homeAnimationClicked') === 'true') {
    suppressAnimation = true;
    sessionStorage.removeItem('homeAnimationClicked'); // Clean up
    
    // Reset suppression after a short delay (after page load/hover settles)
    setTimeout(() => {
      suppressAnimation = false;
    }, 500);
  }
  
  // Desktop: mouseenter
  titleLink.addEventListener('mouseenter', startAnimation);
  
  titleLink.addEventListener('mouseleave', function() {
    resetText();
  });
  
  // Track when link is clicked to suppress animation on destination page
  titleLink.addEventListener('click', function() {
    sessionStorage.setItem('homeAnimationClicked', 'true');
  });
  
  // Mobile: touchstart
  titleLink.addEventListener('touchstart', function(e) {
    // Check if we should suppress (just navigated here)
    if (suppressAnimation) {
      return; // Allow normal navigation without animation
    }
    
    // First touch - play animation then navigate
    if (!isTyping) {
      e.preventDefault(); // Prevent immediate navigation
      startAnimation();
      
      // Set flag before navigating
      sessionStorage.setItem('homeAnimationClicked', 'true');
      
      // Navigate after animation completes
      setTimeout(() => {
        window.location.href = titleLink.href;
      }, typeText.length * 100 + 200); // Animation duration + small buffer
    }
  }, { passive: false });
})();