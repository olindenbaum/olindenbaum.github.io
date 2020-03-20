(function($) {
    "use strict";

    /* Preloader */
    $(window).on('load', function() {
        var preloaderFadeOutTime = 500;

        function hidePreloader() {
            var preloader = $('.spinner-wrapper');
            setTimeout(function() {
                preloader.fadeOut(preloaderFadeOutTime);
            }, 3000);
        }
        particlesJS.load("particles-js", 'assets/particles-config.json');


        main();

        $('#particles-js').css({ "height": $('#startTag').offset().top + "px" })


        hidePreloader();
    });

    $(window).resize(function() {
        $('#particles-js').css({ "height": $('#startTag').offset().top + "px" })
    });



    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
        if ($(".navbar").offset().top > 20) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
        if (!$(this).parent().hasClass('dropdown'))
            $(".navbar-collapse").collapse('hide');
    });


    /* Rotating Text - Morphtext */
    $("#js-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "fadeIn",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: ",",
        // The delay between the changing of each phrase in milliseconds.
        speed: 2000,
        complete: function() {
            // Called after the entrance animation is executed.
        }
    });


    /* Card Slider - Swiper */
    var cardSlider = new Swiper('.card-slider', {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            // when window is <= 992px
            992: {
                slidesPerView: 2
            },
            // when window is <= 768px
            768: {
                slidesPerView: 1
            }
        }
    });


    /* Image Slider - Swiper */
    var imageSlider = new Swiper('.image-slider', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        loop: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        spaceBetween: 30,
        slidesPerView: 5,
        breakpoints: {
            // when window is <= 380px
            380: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window is <= 516px
            516: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            // when window is <= 768px
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window is <= 992px
            992: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            // when window is <= 1200px
            1200: {
                slidesPerView: 5,
                spaceBetween: 30
            },
        }
    });


    /* Image Slider - Magnific Popup */
    $('.popup-link').magnificPopup({
        removalDelay: 300,
        type: 'image',
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure ' + this.st.el.attr('data-effect'));
            },
            beforeClose: function() {
                $('.mfp-figure').addClass('fadeOut');
            }
        },
        gallery: {
            enabled: true //enable gallery mode
        }
    });


    /* Video Lightbox - Magnific Popup */
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: function(url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if (!m || !m[1]) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function(url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if (!m || !m[5]) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


    /* Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        /* keep it false to avoid html tag shift with margin-right: 17px */
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });


    /* Counter - CountTo */
    var a = 0;
    $(window).scroll(function() {
        if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function() {
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                            //alert('finished');
                        }
                    });
                });
                a = 1;
            }
        }
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function() {
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });


    // /* Contact Form */
    // $("#contactForm").validator().on("submit", function(event) {
    //     if (event.isDefaultPrevented()) {
    //         // handle the invalid form...
    //         cformError();
    //         csubmitMSG(false, "Please fill all fields!");
    //     } else {
    //         // everything looks good!
    //         event.preventDefault();
    //         csubmitForm();
    //     }
    // });

    // function csubmitForm() {
    //     // initiate variables with form content
    //     var name = $("#cname").val();
    //     var email = $("#cemail").val();
    //     var message = $("#cmessage").val();
    //     var terms = $("#cterms").val();
    //     $.ajax({
    //         type: "POST",
    //         url: "php/contactform-process.php",
    //         data: "name=" + name + "&email=" + email + "&message=" + message + "&terms=" + terms,
    //         success: function(text) {
    //             if (text == "success") {
    //                 cformSuccess();
    //             } else {
    //                 cformError();
    //                 csubmitMSG(false, text);
    //             }
    //         }
    //     });
    // }

    // function cformSuccess() {
    //     $("#contactForm")[0].reset();
    //     csubmitMSG(true, "Message Submitted!");
    //     $("input").removeClass('notEmpty'); // resets the field label after submission
    //     $("textarea").removeClass('notEmpty'); // resets the field label after submission
    // }

    // function cformError() {
    //     $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    //         $(this).removeClass();
    //     });
    // }

    // function csubmitMSG(valid, msg) {
    //     if (valid) {
    //         var msgClasses = "h3 text-center tada animated";
    //     } else {
    //         var msgClasses = "h3 text-center";
    //     }
    //     $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    // }


    /* Privacy Form */
    $("#privacyForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
        // initiate variables with form content
        var name = $("#pname").val();
        var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();

        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms,
            success: function(text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
    }

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


    /* Removes Long Focus On Buttons */
    $(".button, a, button").mouseup(function() {
        $(this).blur();
    });

})(jQuery);




function showHiddenImage() {
    var el = document.getElementById("defaultHeadshot");
    var animationNumberX = Math.floor(Math.random() * 45);
    var animationNumberY = Math.floor(Math.random() * 45);

    switch (Math.floor(Math.random() * 10)) {
        case 0:
            el.animate([
                // keyframes
                {
                    transform: 'translateY(0px)'
                }, {
                    transform: 'translateY(' + animationNumberY + 'px)'
                }, {
                    transform: 'translateX(' + animationNumberX + 'px)'
                }, {
                    transform: 'translateY(0px)'
                }
            ], {
                // timing options
                duration: 500,
                iterations: 1,
            });
            break;
        case 1:
            el.animate([
                // keyframes
                {
                    transform: 'translateY(0px)'
                }, {
                    transform: 'translateY(' + animationNumberY + 'px)'
                }, {
                    transform: 'translateX(-' + animationNumberX + 'px)'
                }, {
                    transform: 'translateY(0px)'
                }
            ], {
                // timing options
                duration: 500,
                iterations: 1,
            });
            break;

        case 2:
            el.animate([
                // keyframes
                {
                    transform: 'translateY(0px)'
                }, {
                    transform: 'translateY(-' + animationNumberY + 'px)'
                }, {
                    transform: 'translateX(' + animationNumberX + 'px)'
                }, {
                    transform: 'translateY(0px)'
                }
            ], {
                // timing options
                duration: 500,
                iterations: 1,
            });
            break;

        case 3:
            el.animate([
                // keyframes
                {
                    transform: 'translateY(0px)'
                }, {
                    transform: 'translateY(-' + animationNumberY + 'px)'
                }, {
                    transform: 'translateX(-' + animationNumberX + 'px)'
                }, {
                    transform: 'translateY(0px)'
                }
            ], {
                // timing options
                duration: 500,
                iterations: 1,
            });
            break;
        case 4:
            break;
        case 5, 6, 7, 8, 9:
            break;
    }


}

function openInNewTab(url) {
    var win = window.open("https://" + url, '_blank');
    win.focus();
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {

    while (true) {
        var result = Math.floor(Math.random() * 100);
        await sleep(2000);
        if (result <= 10) {
            showHiddenImage();
        }

    }
}



// text animation

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round($elem.offset().top);
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}