function advSlider(element) {
    if (isDefined(element)) {
        element.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            dot: false,
            arrows: false,
        }).promise().done(function() {
            $(this).removeClass('initializing');
        });
    }
}

$(document).ready(function() {
    var body = $('body');
    var resultsClass = '.tcd__tour-results-wrapper';
    var filterClass = '.tcd__tour-filters';
    var results = $(resultsClass);
    var toggleButton = results.find('.navbar-toggler');

    var advListSlider = $('.tcd__adv-slider'); 
    var advsListSlider = $('.tcd__advs-slider');

    var toggleCollapseClass = '.toggle-collapse';
    var toggleBtnClass = '.icon-right-thin-chevron';
    var toggleCollapse = $(toggleCollapseClass).find(toggleBtnClass);
    var dropdownClasses = '.tcd__tour-filters-sub-activities';

    // Toggle Menu
    if (isDefined(toggleButton)) toggleButton.on('click', function() {
        var $this = $(this);
        var $nav = $this.parents(resultsClass).find(filterClass);

        if (isDefined($nav)) $nav.toggleClass('active').promise().done(function() {
            var isOpened = $(this).hasClass('active');

            if (isOpened) body.addClass('modal-open')
            else body.removeClass('modal-open')
        });
    });

    // Tour list slider
    advSlider(advListSlider);
    advSlider(advsListSlider);

    if (isDefined(toggleCollapse)) {
        toggleCollapse.on('click', function(event) {
            event.preventDefault();

            var $this = $(this);
            var dropdown = $this.parents(toggleCollapseClass).find(dropdownClasses);
            if (isDefined(dropdown)) {
                dropdown.slideToggle('fast', function() {
                    var isExpanded = $this.hasClass('expanded');

                    if (isExpanded) {
                        $this.removeClass('expanded');
                    } else {
                        $this.addClass('expanded');
                    }
                });
            }

            return false;
        })
    }
});