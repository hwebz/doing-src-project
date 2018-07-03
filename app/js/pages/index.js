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
        });
    }

});