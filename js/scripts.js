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