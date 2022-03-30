$(function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
});

// pricing options logic

$(function() {
    $('.pricing .options [type=checkbox]').on('change', function() {
        $(this).closest('.option').toggleClass('active', $(this).is(':checked'));
    })
})