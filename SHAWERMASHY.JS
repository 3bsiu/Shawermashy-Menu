let cart = [];
let totalPrice = 0;

function addToCart(productName, price) {
  cart.push({ productName, price });
  totalPrice += price;
  updateCart();
  
  showPopup(`✅ تمت إضافة ${productName} إلى السلة`);

}

function removeFromCart(index) {
  totalPrice -= cart[index].price; 
  cart.splice(index, 1); 
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-list');
  const totalPriceElem = document.getElementById('total-price');
  
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.productName} - ${item.price} د.أ 
      <button class="remove-btn" onclick="removeFromCart(${index})">إزالة</button>`;
    cartList.appendChild(li);
  });

  totalPriceElem.textContent = totalPrice.toFixed(2);
}
// لا تبعبص هون نصيحة انهلكت لحد ما لقيت الحل
function toggleCart() {
  const cartElement = document.querySelector('.cart');
  cartElement.style.display = cartElement.style.display === 'block' ? 'none' : 'block';
}
function showPopup(message) {
const popup = document.createElement('div');
popup.textContent = message;
popup.style.position = 'fixed';
popup.style.bottom = '20px';
popup.style.right = '20px';
popup.style.backgroundColor = '#28a745';
popup.style.color = 'white';
popup.style.padding = '12px 20px';
popup.style.borderRadius = '10px';
popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
popup.style.zIndex = 9999;
popup.style.fontFamily = 'Cairo, sans-serif';
document.body.appendChild(popup);

setTimeout(() => {
  popup.remove();
}, 1000); 
}