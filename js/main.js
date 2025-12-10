$(document).ready(function () {
    // Active menu highlighting
    var path = window.location.pathname;
    var page = path.split("/").pop();
    $('nav ul li a[href="' + page + '"]').addClass('active');

    // AJAX - Load Products from JSON
    if ($('#product-container').length) {
        $.ajax({
            url: 'data/products.json',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var html = '';
                $.each(data, function (index, product) {
                    html += '<div class="product-card" id="product-' + product.id + '">';
                    html += '<img src="' + product.image + '" alt="' + product.name + '">';
                    html += '<h3>' + product.name + '</h3>';
                    html += '<p style="color: grey; font-size: 0.9em;">' + product.description + '</p>';
                    html += '<span class="price">' + product.price + ' Ft</span>';
                    html += '<button class="btn add-to-cart" data-id="' + product.id + '" data-name="' + product.name + '" data-price="' + product.price + '">Kosárba</button>';
                    html += '</div>';
                });
                $('#product-container').html(html);

                // jQuery Animation: Fade in products
                $('.product-card').hide().fadeIn(1000);
            },
            error: function (error) {
                console.log('Error loading products:', error);
                $('#product-container').html('<p class="error">Hiba történt a termékek betöltésekor.</p>');
            }
        });
    }

    // Creating new HTML element (Requirement)
    // Add a notification area if it doesn't exist
    if ($('#notification-area').length === 0) {
        $('body').append('<div id="notification-area" style="position: fixed; bottom: 20px; right: 20px; z-index: 1001;"></div>');
    }

    // Cart Logic
    updateCartCount();

    // jQuery Animation on Click (Cart Add)
    $(document).on('click', '.add-to-cart', function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var price = $(this).data('price');
        var size = "42"; // Default méret demonstrációhoz

        addToCart(id, name, price, size);

        // Create notification
        var $notification = $('<div class="notification" style="background: #2ecc71; color: white; padding: 15px; border-radius: 5px; margin-top: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: none;">' + name + ' hozzáadva a kosárhoz!</div>');

        $('#notification-area').append($notification);

        // Animate call
        $notification.slideDown(300).delay(2000).slideUp(300, function () {
            $(this).remove();
        });
    });

    // Cart Page Rendering
    if (window.location.pathname.endsWith('cart.html')) {
        renderCart();
    }

    // Remove from cart
    $(document).on('click', '.remove-item', function () {
        var index = $(this).data('index');
        removeFromCart(index);
    });
});

// Helper Functions
function getCart() {
    var cart = localStorage.getItem('kunkicks_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('kunkicks_cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(id, name, price, size) {
    var cart = getCart();
    cart.push({ id: id, name: name, price: price, size: size });
    saveCart(cart);
}

function removeFromCart(index) {
    var cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart(); // Re-render table
}

function updateCartCount() {
    var cart = getCart();
    $('#cart-count').text(cart.length);
}

function renderCart() {
    var cart = getCart();
    var html = '';
    var total = 0;

    $.each(cart, function (index, item) {
        html += '<tr>';
        html += '<td>' + item.name + '</td>';
        html += '<td>' + item.size + '</td>';
        html += '<td>' + item.price + ' Ft</td>';
        html += '<td><button class="remove-item" data-index="' + index + '" style="background:none; border:none; color:red; cursor:pointer;">X</button></td>';
        html += '</tr>';

        // Price string to number (simplified)
        var priceStr = String(item.price).replace(/\D/g, '');
        var priceNum = parseInt(priceStr);
        if (!isNaN(priceNum)) total += priceNum;
    });

    if (cart.length === 0) {
        html = '<tr><td colspan="4" style="text-align:center;">A kosár üres.</td></tr>';
    }

    $('table tbody').html(html);
    $('#cart-total').text('Összesen: ' + total + ' Ft');
}


var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'EhE19oknFX8', // Video ID from user request
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Player ready
}

function playVideo() {
    if (player) player.playVideo();
}

function pauseVideo() {
    if (player) player.pauseVideo();
}

function stopVideo() {
    if (player) player.stopVideo();
}
