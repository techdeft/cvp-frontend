import './style.css';
import 'preline/preline';

// Ensure Preline components auto-init on initial DOM load
document.addEventListener('DOMContentLoaded', () => {
  if (window.HSStaticMethods) {
    window.HSStaticMethods.autoInit();
  }
});
