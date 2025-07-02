
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCheckout();
  alert(`${name} a fost adăugat în coș.`);
}

function updateCartCount() {
  const count = cart.length;
  document.querySelector('.cart-icon').setAttribute('data-count', count);
}

function renderCheckout() {
  const container = document.getElementById('checkout-items');
  const total = document.getElementById('checkout-total');
  container.innerHTML = '';
  let sum = 0;
  cart.forEach(item => {
    sum += item.price;
    container.innerHTML += `<div class="checkout-item"><span>${item.name}</span><span>${item.price.toFixed(2)} lei</span></div>`;
  });
  total.textContent = `Total: ${sum.toFixed(2)} lei`;
}

function initiatePayment() {
  alert('Integrarea Stripe urmează să fie activată.');
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCheckout();

  const payButton = document.querySelector('.pay-button');
  if (payButton) payButton.addEventListener('click', initiatePayment);
});
