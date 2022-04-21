/**
 * Inner's page slider
 */

 $(function() {
    var mobileSlider = $('.inner-page .mobile-slider');
    if (!mobileSlider.length) {
        // no slider on the page, skip initialization
        return;
    }
    var topSlider = $("#inner-slider-top");
    var bottomSlider = $("#inner-slider-bottom");

    if (!topSlider.length || !bottomSlider.length) {
        return;
    }

    updateSlidesCount();

    var thumbnailItemClass = '.owl-item';

    var slides = topSlider.owlCarousel({
        video:true,
        startPosition: 1,
        items:1,
        loop:true,
        margin:10,
        autoplay: false,
        nav: false,
        dots: false
    }).on('changed.owl.carousel', syncPosition);

    function syncPosition(el) {
        $owl_slider = $(this).data('owl.carousel');
        
        var current = el.item.index;
        var realNumber = parseInt(topSlider.find(thumbnailItemClass).eq(current).find('.item').attr('data-number')) || 0;
        
        var thumbnailCurrentItem = bottomSlider.find(thumbnailItemClass).eq(realNumber);

        if (!thumbnailCurrentItem.hasClass('centered')) {
            var duration = 100;
            bottomSlider.trigger('to.owl.carousel',[realNumber, duration, true]);
        }   
    }
    var thumbs = bottomSlider.owlCarousel({
        startPosition: 1,
        items: 3,
        loop: false,
        margin: 3,
        autoplay: false,
        center: true,
        nav: true,
        dots: false,
        navText : ['<i class="iconfont-arrow-prev"></i>','<i class="iconfont-arrow-next"></i>'],
        onInitialized: function (e) {
            var thumbnailCurrentItem =  $(e.target).find(thumbnailItemClass).eq(this._current);
            var number = thumbnailCurrentItem.find('.item').attr('data-number');
            updateCurrentSlide(number);
            setTimeout(function(){ 
                $owl_slider = topSlider.data('owl.carousel');
                $owl_slider.to(number, 100, true);
            }, 500)
        },
    })
    .on('click', thumbnailItemClass, function(e) {
        e.preventDefault();
        $owl_slider = bottomSlider.data('owl.carousel');
        $owl_slider.to($(this).index(), 100, true);
    }).on("translated.owl.carousel", function (el) {
        var centeredItem = $(el.target).find(".owl-item.active.center");
        $owl_slider = topSlider.data('owl.carousel');
        $owl_slider.to(centeredItem.index(), 100, true);
        updateCurrentSlide(centeredItem.index());
    });

    function updateCurrentSlide(slideNumber) {
        mobileSlider.find('.current-slide').text(parseInt(slideNumber) + 1);
    }

    function updateSlidesCount() {
        mobileSlider.find('.slides-count').text(bottomSlider.find('.item').length);
    }
});

$(function() {
    var label = $('.report-name-label');
    if (label.length == 0) return;

    $('.interact-modal').on('shown.bs.modal', function() {
        label.flowtype({
            minimum   : 380,
            maximum   : 1320,
            minFont   : 10,
            maxFont   : 30,
            fontRatio : 24,
            lineRatio : 1.45
        });
    });
});