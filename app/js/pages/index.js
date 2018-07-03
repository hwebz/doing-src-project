function isDefined(element) {
    return typeof element !== 'undefined' && element.length > 0;
}

$(document).ready(function() {

    var body = $('body');
    var header = $('.tcd__header');
    var toggleButton = header.find('.navbar-toggler');
    var navigation = header.find('.tcd__header-navigation');

    var tourList = $('.tcd__tour-list');
    var tourListSlider = tourList.find('.tcd__tour-list-slider'); 

    var banner = $('.tcd__banner');
    var bannerSlider = banner.find('.tcd__banner-slider');

    var daterangepicker = $(".daterange-picker .form-control");

    // Toggle Menu
    if (isDefined(toggleButton)) toggleButton.on('click', function() {
        var $this = $(this);
        var $nav = $this.parents(header).find(navigation);

        if (isDefined($nav)) $nav.toggleClass('active').promise().done(function() {
            var isOpened = $(this).hasClass('active');

            if (isOpened) body.addClass('modal-open')
            else body.removeClass('modal-open')
        });
    });

    // Tour list slider
    if (isDefined(tourListSlider)) {
        tourListSlider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            dot: false,
            arrows: true,
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1
                  }
                }
              ]
        }).promise().done(function() {
            $(this).removeClass('initializing');
        });
    }

    if (isDefined(tourListSlider)) {
        bannerSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            dot: false,
            arrows: true,
        }).promise().done(function() {
            $(this).removeClass('initializing');
        });
    }

    // Date range picker
    if (isDefined(daterangepicker)) {
        daterangepicker.daterangepicker({
            "autoApply": true,
            "startDate": moment(),
            "endDate": moment().add(2, 'd'),
            locale: {
                format: 'DD/MM/YYYY',
                "daysOfWeek": [
                    "CN",
                    "T2",
                    "T3",
                    "T4",
                    "T5",
                    "T6",
                    "T7"
                ],
                "monthNames": [
                    "Th01",
                    "Th02",
                    "Th03",
                    "Th04",
                    "Th05",
                    "Th06",
                    "Th07",
                    "Th08",
                    "Th09",
                    "Th10",
                    "th11",
                    "Th12"
                ],
                "firstDay": 1
            }
        }, function(start, end, label) {
          console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
        })
    }

});