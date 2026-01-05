/* 
  ETCH Theme - Main JavaScript
  Utility functions and general initialization
*/

// URL selector change handler (for language/currency selectors)
const changeUrlInSelector = (obj) => {
  window.location.href = obj.value;
};

// Make available globally
window.changeUrlInSelector = changeUrlInSelector;

// Product variant change handler (for product pages)
const idChange = (obj) => {
  const imgElement = document.querySelector('#my_img > img');
  const priceElement = document.querySelector('#my_price');
  
  if (imgElement && obj.options[obj.selectedIndex].dataset.img) {
    imgElement.src = obj.options[obj.selectedIndex].dataset.img;
  }
  
  if (priceElement && obj.options[obj.selectedIndex].dataset.price) {
    priceElement.innerHTML = obj.options[obj.selectedIndex].dataset.price;
  }
  
  // Update URL if variant parameter exists
  const given_id = new URLSearchParams(window.location.search).get('variant');
  if (given_id != obj.value) {
    const params = new URLSearchParams(window.location.search);
    params.set('variant', obj.value);
    window.location.search = params.toString();
  }
};

// Make available globally
window.idChange = idChange;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize product variant selector
  const variantSelect = document.querySelector('.product-variant-select');
  if (variantSelect) {
    idChange(variantSelect);
    
    // Attach change event listener
    variantSelect.addEventListener('change', function() {
      idChange(this);
    });
  }
  
  // Initialize locale selector
  const localeSelect = document.querySelector('.locale-selector');
  if (localeSelect) {
    localeSelect.addEventListener('change', function() {
      changeUrlInSelector(this);
    });
  }
  
  // Initialize currency selector
  const currencySelect = document.querySelector('.currency-selector');
  if (currencySelect) {
    currencySelect.addEventListener('change', function() {
      changeUrlInSelector(this);
    });
  }
  
  // Initialize search input
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    const currentQuery = new URLSearchParams(window.location.search).get('q');
    if (currentQuery) {
      searchInput.value = currentQuery;
    }
    
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const path = window.Shopify.routes.root.replace(/\/$/, '');
        window.location.href = `${path}/search?q=${encodeURIComponent(searchInput.value)}&type=product&options[unavailable_products]=hide&options[prefix]=last`;
      }
    });
  }
});