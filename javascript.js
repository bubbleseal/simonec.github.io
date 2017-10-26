$(document).ready(function () {

    //Variables
    var bgImage = $('.bg-img');
    var header = $('#header-bar');
    var nav = $('.nav');
    var bar = $('.navbar-scroll-container');
    var iconsContainer = $('.nav-link');
    var icons = $('.nav-link > img');
    var logo = $('.logo');

    if ($(window).width() < 974) {
        iconsContainer.removeClass('d-flex justify-content-center');
    }

    if ($(window).width() < 559) {
        //Change landing page background image & nav bar based on size
        if (window.innerHeight < window.innerWidth) {
            bgImage.attr('src', 'images/bg_art.png');
        } else {
            bgImage.attr('src', 'images/bg_mobile.png');
        }
    } else {
        bgImage.attr('src', 'images/bg_art.png');
        logoHover();

        //Set sticky navigation bar based on scroll position
        $(window).scroll(function () {
            if ($(window).scrollTop() > 220) {
                stickyNav(true);
                logo.unbind('mouseenter mouseleave');
                logo.children('img').show();
                logo.children('div').hide();
                if ($(window).width() < 750) {
                    $('.nav-desc').hide();
                }
            } else {
                stickyNav(false);
                $('.nav-desc').show();
                logoHover();
            }
        });
    }

    //Detect viewport resizing
    $(window).resize(function () {
        window.location.reload();
    });

    //Detect orientation change
    $(window).on("orientationchange", function (event) {
        window.location.reload();
    });

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

    function stickyNav(result) {
        if (result) {
            header.addClass('fixed-top');
            nav.addClass('sticky-nav');
            iconsContainer.addClass('sticky-icon-container');
            icons.addClass('sticky-icons');
            logo.addClass('sticky-logo');
            logo.attr('href', '#home');
            bar.show();
        } else {
            header.removeClass('fixed-top');
            nav.removeClass('sticky-nav');
            iconsContainer.removeClass('sticky-icon-container');
            icons.removeClass('sticky-icons');
            logo.removeClass('sticky-logo');
            logo.attr('href', '#work');
            bar.hide();
        }
    }

    function logoHover() {
        logo.hover(function () {
            $(this).children('img').finish().fadeOut(100);
            $(this).children('div').finish().delay(100).fadeIn(300);
        }, function () {
            $(this).children('div').finish().fadeOut(100);
            $(this).children('img').finish().delay(100).fadeIn(300);
        });
    }


    function navLinksHover(transformValue) {
        iconsContainer.hover(function () {
            $(this).children('.nav-desc').finish().css('transform', 'translateY(' + transformValue + '%)');
        }, function () {
            $(this).children('.nav-desc').finish().css('transform', 'translateY(-100%)');
        });
    }
});