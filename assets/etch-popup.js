/* 
  ETCH Theme - Popup Manager
  Handles all popup modals with a reusable system
*/

class PopupManager {
    constructor() {
      this.popups = new Map();
      this.init();
    }
  
    init() {
      // Use event delegation for all popup triggers
      document.addEventListener('click', (e) => {
        // Handle trigger buttons
        if (e.target.matches('[data-popup-trigger]')) {
          const popupId = e.target.dataset.popupTrigger;
          this.open(popupId);
          e.preventDefault();
        }
        
        // Handle close buttons
        if (e.target.matches('[data-popup-close]')) {
          const popupId = e.target.dataset.popupClose;
          this.close(popupId);
          e.preventDefault();
        }
        
        // Handle clicking outside popup
        if (e.target.matches('.popup')) {
          this.close(e.target.id);
        }
      });
    }
  
    open(id) {
      const popup = document.getElementById(id);
      if (popup) {
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
    }
  
    close(id) {
      const popup = document.getElementById(id);
      if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
      }
    }
  }
  
  // Initialize popup manager when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new PopupManager();
    });
  } else {
    new PopupManager();
  }