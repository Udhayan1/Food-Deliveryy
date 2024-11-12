// search functionality

function toggleSearch() {
    const searchInput = document.querySelector('.search-input');
    const inputField = searchInput.querySelector('input');
    searchInput.style.display = searchInput.style.display === 'none' ? 'flex' : 'none';
    
    // If hiding the search input, clear the search and show all dishes
    if (searchInput.style.display === 'none') {
        inputField.value = ''; // Clear the input field
        filterDishes(); // Show all dishes
        location.href = '#navigation'; // Scroll to the navigation section
    } else {
        location.href = '#show-dishes';
    }
}

function filterDishes() {
    const searchInput = document.querySelector('.search-input input');
    const foodItems = document.querySelectorAll('.food-cat');
    const entered = searchInput.value.toUpperCase();
    let count = 0;

    foodItems.forEach(item => {
        const foodName = item.querySelector('.food-name').textContent.toUpperCase();

        if (foodName.indexOf(entered) < 0) {
            item.style.display = "none";
            count++;
        } else {
            item.style.display = "block";
        }
    });

    const noResults = count === foodItems.length;
    const res = document.querySelector('#no-results');

    if (noResults) {
        res.style.display = "block";
    } else {
        res.style.display = "none";
    }
}

// Modify the submitSearch function if necessary
function submitSearch() {
    const searchInput = document.querySelector('.search-input input');
    const query = searchInput.value.trim();

    if (query) {
        filterDishes();
        toggleSearch();
    }
}

// Add listener for Enter key
document.querySelector('.search-input input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        submitSearch();
    }
});




//add-to-cart
    // Initialize cart as an empty array
    let cart = [];

    // Function to add item to cart
    function addToCart(foodItem) {
        showAddPopup(); // Call the popup function
        const { image, name, price, category } = foodItem;
        cart.push({ image, name, price, category });
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
        updateCartDisplay();
    }

    //added popup function
    function showAddPopup() {
        const popup = document.createElement('div');
        popup.className = 'add-popup';
        popup.innerHTML = 'Added to cart <a href="cart.html" class="view-link">view</a>';
        
        // Style the popup
        popup.style.position = 'fixed';
        popup.style.bottom = '20px';
        popup.style.left = '50%'; 
        popup.style.transform = 'translateX(-50%)';
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        popup.style.color = 'white';
        popup.style.width = '300px'; 
        popup.style.padding = '20px'; 
        popup.style.borderRadius = '10px';
        popup.style.fontSize = '18px';
        popup.style.zIndex = '1000';
        popup.style.textAlign = 'center';
        popup.style.wordSpacing = '5px';
    
        // Style for the view link
        const viewLink = popup.querySelector('.view-link');
        viewLink.style.color = '#ff6600'; 
        viewLink.style.textDecoration = 'underline';
        viewLink.style.fontWeight = 'bold';
    
        document.body.appendChild(popup);
    
        // Remove the popup after a few seconds
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 3000);
    }

    // Function to delete item from cart
    function deleteFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
        updateCartDisplay();
    }

    // Function to update cart display
    function updateCartDisplay() {
        const cartTable = document.getElementById('cart-table-body');
        cartTable.innerHTML = ''; // Clear the existing table content

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>$${item.price}</td>
                <td><button onclick="deleteFromCart(${index})">Delete</button></td>
            `;
            cartTable.appendChild(row);
        });
    }//add-to-cart finished

    // Function to open the cart page
function opencart() {
  window.location.href = 'cart.html'; // Redirects to cart.html
}

    // Function to load cart from localStorage on page load
    window.onload = function() {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            cart = storedCart;
            updateCartDisplay();
        }
    };


// for popup
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const openButton = document.getElementById('openPopup');
    const closeButton = document.querySelector('.close-button');

    // Open the pop-up
    openButton.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    // Close the pop-up
    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close the pop-up if the user clicks outside of the pop-up content
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});