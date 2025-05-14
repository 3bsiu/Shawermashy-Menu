
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
  const whatsappButton = document.getElementById('whatsapp-btn');

  if (cartElement.style.display === 'block') {
    cartElement.style.display = 'none';
    whatsappButton.style.display = 'none';
  } else {
    cartElement.style.display = 'block';
    whatsappButton.style.display = 'block';
  }
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
let lastScrollTop = 0;
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      
      navbar.classList.add("hide-nav");
    } else {
      
      navbar.classList.remove("hide-nav");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }, false);
  function sendToWhatsApp() {
    if (cart.length === 0) {
      showPopup("🚫 السلة فارغة!");
      return;
    }
  
    // نحسب الكميات والمجاميع
    const itemSummary = {};
  
    cart.forEach(item => {
      if (itemSummary[item.productName]) {
        itemSummary[item.productName].quantity += 1;
        itemSummary[item.productName].total += item.price;
      } else {
        itemSummary[item.productName] = {
          quantity: 1,
          price: item.price,
          total: item.price
        };
      }
    });
  
    // إنشاء الرسالة
    let message = `🧺 عدد الأصناف: ${Object.keys(itemSummary).length}\n\n`;
  
    let index = 1;
    for (let product in itemSummary) {
      const item = itemSummary[product];
      message += `${index++}. ${product} × ${item.quantity} = ${item.total.toFixed(2)} د.أ\n`;
    }
  
    message += `\n💰 الإجمالي الكلي: ${totalPrice.toFixed(2)} د.أ`;
  
    const encodedMessage = encodeURIComponent(message);
    
    const whatsappURL = `https://api.whatsapp.com/send?phone=962790059181&text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  }
  
