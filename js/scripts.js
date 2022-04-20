
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
