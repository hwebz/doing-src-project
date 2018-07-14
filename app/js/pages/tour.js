$(document).ready(function () {
    var body = $('body');

    var advListSlider = $('.tcd__adv-slider');
    var advsListSlider = $('.tcd__advs-slider .tcd__advs-wrapper');

    var toggleCollapseClass = '.toggle-collapse';
    var toggleBtnClass = '.icon-right-thin-chevron';
    var toggleCollapse = $(toggleCollapseClass).find(toggleBtnClass);
    var dropdownClasses = '.tcd__filters-sub-activities';

    var durationRangeSlider = $('#tcd__tour-filters-duration');

    var mapTourClass = 'map-tour-map';
    var smallMapTourClass = 'small-map-tour';
    var mapTour = $('#' + mapTourClass);
    var smallMapTourChildClass = null;
    var smallMapTourChild = null;

    // Tour list slider
    advSlider(advListSlider, 1);
    advSlider(advsListSlider, 3);

    if (isDefined(toggleCollapse)) {
        toggleCollapse.on('click', function (event) {
            event.preventDefault();

            var $this = $(this);
            var dropdown = $this.parents(toggleCollapseClass).find(dropdownClasses);
            if (isDefined(dropdown)) {
                dropdown.slideToggle('fast', function () {
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

    if (isDefined(durationRangeSlider)) {
        durationRangeSlider.ionRangeSlider({
            type: "double",
            grid: false,
            min: 3,
            max: 100,
            from: 15,
            to: 100,
            step: 1,
            min_interval: 1,
            postfix: "+ ngày"
        });
    }

    // map tour
    for (var i = 0; i < 5; i++) {
        smallMapTourChildClass = smallMapTourClass + '-' + i;
        smallMapTourChild = $('#' + smallMapTourChildClass);
        if (isDefined(smallMapTourChild)) initMap(smallMapTourClass + '-' + i, 6);
    }
    if (isDefined(mapTour)) {
        initMap(mapTourClass, 7)
    }
});