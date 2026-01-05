/* 
  ETCH Theme - Cart Update Handler
  Handles cart quantity updates via AJAX
*/

const cartUpdate = (obj) => {
  // Item quantity update triggered by the input change
  // See https://shopify.dev/docs/api/ajax
  // See https://shopify.dev/docs/api/ajax/reference/cart#update-line-item-quantities
  const url = `${window.Shopify.routes.root}cart/update.js`;
  const body = `updates[${obj.id}]=${obj.value}`;
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'same-origin', // Ensure same-origin requests
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Reload page to show updated cart
      window.location.reload();
    })
    .catch((error) => {
      console.error('Cart update error:', error);
      // Optionally show error message to user
      alert('Failed to update cart. Please try again.');
    });
};

// Make cartUpdate available globally
window.cartUpdate = cartUpdate;

// Attach event listeners to cart quantity inputs using event delegation
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('change', (e) => {
    if (e.target.matches('.cart-quantity-input')) {
      cartUpdate(e.target);
    }
  });
});