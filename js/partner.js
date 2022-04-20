
$(function() {
    if ($('.company .owl-carousel').length > 0) {
        $('.company .owl-carousel').owlCarousel({
            loop: true,
            margin: 60,
            responsiveClass: true,
            autoplay: false,
            dots: false,
            nav: false,
            autoWidth: true,
            responsive: {
                0: {
                    items: 5,
                    autoplay: true,
                    stagePadding: 60,
                },
                768: {
                    items: 4

                },
                1200: {
                    items: 7,
                    autoWidth: false,
                }
            }
        })
    }

    if ($('.testimonials .owl-carousel').length > 0) {
        $('.testimonials .owl-carousel').owlCarousel({
            loop: true,
            margin: 30,
            responsiveClass: true,
            autoplay: true,
            dots: false,
            nav: false,
            autoWidth: true,
            responsive: {
                0: {
                    items: 1,
                    stagePadding: 60,
                    margin: 20,
                },
                1200: {
                    items: 3,
                    stagePadding: 100
                }
            }
        })
    }

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});
