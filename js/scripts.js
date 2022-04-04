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
})

$(function() {
    $(document).scroll(function() {
        var $nav = $(".navbar.fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > 0);
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