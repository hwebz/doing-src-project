$(document).ready(function () {
    var body = $('body');
    var durationRangeSlider = $('#tcd__flight-filters-duration');
    var departureTimeRangeSlider = $('#tcd__flight-filters-departure');
    var arrivalTimeRangeSlider = $('#tcd__flight-filters-arrival');

    var resultCardClass = '.tcd__results-card';
    var resultCard = $(resultCardClass);
    var resultDetailPaneClass = '.tcd__results-detail';
    var resultCardDetailLinks = resultCard.find('.tcd__results-btns > a');

    // Duration Range slider
    if (isDefined(durationRangeSlider)) {
        durationRangeSlider.ionRangeSlider({
            type: "double",
            grid: false,
            min: 0,
            max: 24,
            from: 5,
            to: 24,
            step: 1,
            min_interval: 1,
            postfix: "h"
        });
    }

    // Departure Time Range slider
    if (isDefined(departureTimeRangeSlider)) {
        departureTimeRangeSlider.ionRangeSlider({
            type: "double",
            grid: false,
            min: 0,
            max: 24,
            from: 2,
            to: 24,
            step: 1,
            min_interval: 1,
            postfix: ":00"
        });
    }

    // Arrival Time Range slider
    if (isDefined(arrivalTimeRangeSlider)) {
        arrivalTimeRangeSlider.ionRangeSlider({
            type: "double",
            grid: false,
            min: 0,
            max: 24,
            from: 2,
            to: 24,
            step: 1,
            min_interval: 1,
            postfix: ":00"
        });
    }

    // Flight detail collapse
    if (isDefined(resultCardDetailLinks)) {
        resultCardDetailLinks.on('click', function(e) {
            e.preventDefault();

            var $this = $(this);
            var parent = $this.parents(resultCardClass);
            var togglePane = parent.find(resultDetailPaneClass);

            if (isDefined(togglePane)) togglePane.slideToggle('fast', function() {
                parent.toggleClass('active');
            });

            return false;
        })
    }
});