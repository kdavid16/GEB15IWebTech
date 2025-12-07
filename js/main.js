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

    // jQuery Animation on Click (Cart Add)
    $(document).on('click', '.add-to-cart', function () {
        var name = $(this).data('name');

        // Create notification
        var $notification = $('<div class="notification" style="background: #2ecc71; color: white; padding: 15px; border-radius: 5px; margin-top: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: none;">' + name + ' hozzáadva a kosárhoz!</div>');

        $('#notification-area').append($notification);

        // Animate call
        $notification.slideDown(300).delay(2000).slideUp(300, function () {
            $(this).remove();
        });

        // Modify existing HTML element (Requirement)
        var currentCount = parseInt($('#cart-count').text()) || 0;
        $('#cart-count').text(currentCount + 1);
    });

    // YouTube API Video Control
    // This part requires the YouTube IFrame API script to be loaded in HTML
});

// Defining the YouTube player variable globally
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
