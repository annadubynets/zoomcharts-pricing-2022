$(function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});

// pricing options logic

$(function() {
    var pricingOptions = document.querySelectorAll('.pricing .options');
    pricingOptions.forEach(function(optionsElem) {
        var checkboxInput = optionsElem.querySelector('[type=checkbox]');
        var header = optionsElem.querySelector('.options-header');
        header.addEventListener('click', function(e) {
            if (!e.target.classList.contains('form-check-input')) {
                checkboxInput.checked = !checkboxInput.checked;
                syncCheckboxState();
            }
        });

        checkboxInput.addEventListener('change', function() {
            syncCheckboxState();
        })

        function syncCheckboxState() {
            // when checkbox is selected, we add a special class 'active' to options element. 
            // it changes the style and expands the block
            optionsElem.classList.toggle('active', checkboxInput.checked);
        }

        syncCheckboxState();
    });

    // the logic which synchronizes the input and range controls of number of users
    // on the pricing page
    var pricingRangeGroups = document.querySelectorAll('.pricing-range-group');
    pricingRangeGroups.forEach(function(rangeGroup) {
        var formInput = rangeGroup.querySelector('[type="number"]');
        var formRange = rangeGroup.querySelector('[type="range"]');

        formInput.addEventListener('change', function() {
            if (formRange.value != this.value) {
                formRange.value = this.value;
                formRange.dispatchEvent(new Event('input', {bubbles:true}));
            }
        });

        formRange.addEventListener('input', function() {
            if (formInput.value != this.value) {
                formInput.value = this.value;
                formInput.dispatchEvent(new Event('change', {bubbles:true}));
            }
        })
    });
})

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

/**
 * Adds the ability to fill one side of the input range slider with the different color.
 * See style details in ./style/theme/components/_form-range.scss
 * @param {HTMInputElement} elem 
 */
function InputRangeSlider(elem) {
    this.rangeInput = elem;

    this.init = function() {
        this.rangeInput.addEventListener('input', function() {
            this._initSlider(this.rangeInput);
        }.bind(this));

        this._initSlider(this.rangeInput);
    }

    this._initSlider = function(input) {
        var value = (input.value - input.min) / (input.max - input.min) * 100
        input.style.setProperty('--form-range-value', value + "%");
    }.bind(this);
}

/**
 * Helper function for initialization input range sliders
 * 
 * @param {string} selector 
 */
function initFormRangeControls(selector) {
    var inputs = document.querySelectorAll(selector);
    inputs.forEach(function(input) {
        var slider = new InputRangeSlider(input);
        slider.init();
    })
}

$(function() {
    initFormRangeControls('.form-range');
});

$('.img-area').hiSlide();