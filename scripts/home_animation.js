// Typewriter effect for site title
(function() {
  const titleLink = document.querySelector('.site-title a');
  const baseText = 'dj@psu >';
  const typeText = 'home';
  let typingTimeout = null;
  let isTyping = false;
  
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
  
  titleLink.addEventListener('mouseenter', function() {
    if (!isTyping) {
      isTyping = true;
      typeCharacter(0);
    }
  });
  
  titleLink.addEventListener('mouseleave', function() {
    resetText();
  });
})();
