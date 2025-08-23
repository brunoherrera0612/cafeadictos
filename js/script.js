// Cart functionality
let cart = [];
let cartTotal = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartDisplay();

    // Show confirmation animation
    showAddedToCart(name);
}

function updateCartDisplay() {
    document.getElementById('cart-count').textContent = cart.length;

    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cartTotal = 0;

    cart.forEach((item, index) => {
        cartTotal += item.price;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                    <button onclick="removeFromCart(${index})" style="background: #dc3545; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 3px; cursor: pointer;">Eliminar</button>
                `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    alert(`¡Gracias por tu pedido! Total: $${cartTotal.toFixed(2)}\nNos contactaremos contigo pronto.`);
    cart = [];
    updateCartDisplay();
    closeCart();
}

function showAddedToCart(itemName) {
    const notification = document.createElement('div');
    notification.textContent = `${itemName} agregado al carrito`;
    notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 1rem;
                border-radius: 5px;
                z-index: 3000;
                animation: slideInRight 0.5s ease-out;
            `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Form submission
function submitForm() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (!nombre || !email || !mensaje) {
        alert('Por favor, completa todos los campos');
        return;
    }

    alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado. Te contactaremos pronto a ${email}.`);

    // Reset form
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mensaje').value = '';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animationDelay = '0.1s';
            element.style.animationFillMode = 'forwards';
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Initial call
animateOnScroll();

// Close cart when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) {
        closeCart();
    }
}

// Add keyframe animation for notifications
const style = document.createElement('style');
style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
document.head.appendChild(style);