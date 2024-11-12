let cart = [];
let totalPrice = 0;

// Function to add item to cart
function addToCart(foodItem) {
    const { image, name, price, category } = foodItem;
    cart.push({ image, name, price, category, quantity: 0 });
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    updateCartDisplay();
}

// Function to delete item from cart
function deleteFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
    updateCartDisplay();
}

// Function to update quantity
function updateQuantity(index, quantity) {
    if (quantity >= 0) {
        cart[index].quantity = parseInt(quantity);
        updateCartDisplay();
    }
}

// Function to handle radio button change
function handleRadioChange(index, radio) {
    if (radio.checked) {
        const quantityInput = prompt("Enter the quantity:");
        
        // Check if the user clicked Cancel
        if (quantityInput === null) {
            radio.checked = false; // Uncheck the radio button if cancelled
            updateQuantity(index, 0); // Reset quantity
            return; // Exit the function
        }
        
        const quantity = parseInt(quantityInput); // Parse as integer

        if (quantity > 0) {
            updateQuantity(index, quantity);
        } else {
            alert("Please enter a valid quantity greater than 0."); // Feedback for invalid quantity
            radio.checked = false; // Uncheck the radio button if invalid
            updateQuantity(index, 0); // Reset quantity
        }
    } else {
        updateQuantity(index, 0);
    }
}

// Function to update cart display and calculate total price
function updateCartDisplay() {
    const cartTable = document.getElementById('cart-table-body');
    cartTable.innerHTML = ''; // Clear the existing table content
    
    totalPrice = 0;
    
    cart.forEach((item, index) => {
        if (item.quantity > 0) {
            totalPrice += item.price * item.quantity;
        }
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="radio" id="item-${index}" name="item-${index}" ${item.quantity > 0 ? 'checked' : ''} 
                    onchange="handleRadioChange(${index}, this)" class="cart-radio">
                <label for="item-${index}">Order</label>
            </td>
            <td><button class="delete-button" onclick="deleteFromCart(${index})">Delete</button></td>
        `;
        cartTable.appendChild(row);
    });

    document.getElementById('total-price').innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to handle payment button click
function handlePayment() {
    // Check if any item is selected (radio button is checked)
    const isAnyItemSelected = document.querySelector('#cart-table-body input[type="radio"]:checked');

    if (!isAnyItemSelected) {
        alert('You didn\'t select any items.');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    // Show loading animation
    document.getElementById('loading-overlay').style.display = 'flex';

    // Simulate payment processing
    setTimeout(() => {
        document.getElementById('loading-overlay').style.display = 'none';
        alert('Payment successful!');

        // Reset total price and radio button states
        totalPrice = 0;
        document.getElementById('total-price').innerText = `Total: $0.00`;

        // Deselect all radio buttons
        document.querySelectorAll('#cart-table-body input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });

        // Show a success notification
        showNotification('Payment successful!');
    }, 2000);
}

// Function to show notifications
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Function to load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
        cart = storedCart;
        updateCartDisplay();
    }
});
