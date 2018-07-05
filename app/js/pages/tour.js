$(document).ready(function() {
    var body = $('body');
    var resultsClass = '.tcd__tour-results-wrapper';
    var filterClass = '.tcd__tour-filters';
    var results = $(resultsClass);
    var toggleButton = results.find('.navbar-toggler');

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
});