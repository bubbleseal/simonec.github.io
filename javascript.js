$(document).ready(function () {


    //Scrolling effect
    $('a[href*="#"]').click(function (event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[id=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    };
                });
            }
        }
    });

    //Change landing page background image & nav bar based on size
    $(function () {
        if ($(window).width() < 576) {
            if (window.innerHeight < window.innerWidth) {
                $('.bg-img').attr('src', 'images/bg_art.png');
            } else {
                $('.bg-img').attr('src', 'images/bg_mobile.png');
            }
        } else if ($(window).width() > 575) {
            $('.bg-img').attr('src', 'images/bg_art.png');
        }
    });

    //Detect orientation change
    $(window).on("orientationchange", function (event) {
        window.location.reload();
    });

});