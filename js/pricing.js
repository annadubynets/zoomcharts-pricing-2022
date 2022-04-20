// pricing options logic

$(function() {
    var pricingOptions = document.querySelectorAll('.pricing .options');
    pricingOptions.forEach(function(optionsElem) {
        var checkboxInput = optionsElem.querySelector('[type=checkbox]');
        checkboxInput.checked = false;
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

function initPricingHeaderImagesSlider() {
    if ($('.header-images-carousel').length) {
        $('.header-images-carousel').hiSlide();
    }
}

$(function() {
    initFormRangeControls('.form-range');
    initPricingHeaderImagesSlider();
});
