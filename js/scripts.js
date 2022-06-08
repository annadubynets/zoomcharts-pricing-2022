$(function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});

$(function() {
    var $nav = $(".navbar.fixed-top");

    // Get the alert
    var alert = document.querySelector(".sticky-alert");
    var prevAlertPosition = 0;

    if (alert) {
        prevAlertPosition = alert.offsetTop;
    }

    function dockStickyAlert() {
        if (window.pageYOffset > prevAlertPosition - $nav.height()) {
            alert.classList.add("docked");
        } else {
            alert.classList.remove("docked");
        }
    }

    $(document).scroll(function() {

        $nav.toggleClass('scrolled', $(this).scrollTop() > 0);

        if (alert) {
            dockStickyAlert();
        }
    });
});

$(function() {
    var navbarCollapse = document.getElementById('navbarCollapse')
    navbarCollapse.addEventListener('hide.bs.collapse', function(e) {
        e.target.closest('html').classList.remove('nav-opened');
    })

    navbarCollapse.addEventListener('hidden.bs.collapse', function(e) {
        e.target.closest('html').classList.remove('nav-opened');
    })

    navbarCollapse.addEventListener('show.bs.collapse', function(e) {
        e.target.closest('html').classList.add('nav-opened');
    })

    navbarCollapse.addEventListener('shown.bs.collapse', function(e) {
        e.target.closest('html').classList.add('nav-opened');
    })
})


jQuery(document).ready(function() {
    // click on next button
    jQuery('.form-wizard-next-btn').click(function() {
        var parentFieldset = jQuery(this).parents('.wizard-fieldset');
        var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
        var next = jQuery(this);
        var nextWizardStep = true;
        parentFieldset.find('.wizard-required').each(function() {
            var thisValue = jQuery(this).val();

            if (thisValue == "") {
                jQuery(this).siblings(".wizard-form-error").slideDown();
                nextWizardStep = false;
            } else {
                jQuery(this).siblings(".wizard-form-error").slideUp();
            }
        });
        if (nextWizardStep) {
            next.parents('.wizard-fieldset').removeClass("show", "400");
            currentActiveStep.removeClass('active').addClass('activated').next().addClass('active', "400");
            next.parents('.wizard-fieldset').next('.wizard-fieldset').addClass("show", "400");
            jQuery(document).find('.wizard-fieldset').each(function() {
                if (jQuery(this).hasClass('show')) {
                    var formAtrr = jQuery(this).attr('data-tab-content');
                    jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function() {
                        if (jQuery(this).attr('data-attr') == formAtrr) {
                            jQuery(this).addClass('active');
                            var innerWidth = jQuery(this).innerWidth();
                            var position = jQuery(this).position();
                            jQuery(document).find('.form-wizard-step-move').css({ "left": position.left, "width": innerWidth });
                        } else {
                            jQuery(this).removeClass('active');
                        }
                    });
                }
            });
        }
    });
    //click on previous button
    jQuery('.form-wizard-previous-btn').click(function() {
        var counter = parseInt(jQuery(".wizard-counter").text());;
        var prev = jQuery(this);
        var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
        prev.parents('.wizard-fieldset').removeClass("show", "400");
        prev.parents('.wizard-fieldset').prev('.wizard-fieldset').addClass("show", "400");
        currentActiveStep.removeClass('active').prev().removeClass('activated').addClass('active', "400");
        jQuery(document).find('.wizard-fieldset').each(function() {
            if (jQuery(this).hasClass('show')) {
                var formAtrr = jQuery(this).attr('data-tab-content');
                jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function() {
                    if (jQuery(this).attr('data-attr') == formAtrr) {
                        jQuery(this).addClass('active');
                        var innerWidth = jQuery(this).innerWidth();
                        var position = jQuery(this).position();
                        jQuery(document).find('.form-wizard-step-move').css({ "left": position.left, "width": innerWidth });
                    } else {
                        jQuery(this).removeClass('active');
                    }
                });
            }
        });
    });
    //click on form submit button
    jQuery(document).on("click", ".form-wizard .form-wizard-submit", function() {
        var parentFieldset = jQuery(this).parents('.wizard-fieldset');
        var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
        parentFieldset.find('.wizard-required').each(function() {
            var thisValue = jQuery(this).val();
            if (thisValue == "") {
                jQuery(this).siblings(".wizard-form-error").slideDown();
            } else {
                jQuery(this).siblings(".wizard-form-error").slideUp();
            }
        });
    });
});