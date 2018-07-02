$(document).ready(function() {

    var body = $('body');
    var header = $(".tcd__header");
    var toggleButton = header.find('.navbar-toggler');
    var navigation = header.find('.tcd__header-navigation');

    // Toggle Menu
    toggleButton.on('click', function() {
        var $this = $(this);

        $this.parents(header).find(navigation).toggleClass('active').promise().done(function() {
            var isOpened = $(this).hasClass('active');

            if (isOpened) body.addClass('modal-open')
            else body.removeClass('modal-open')
        });
    });

});