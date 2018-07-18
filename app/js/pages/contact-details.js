$(document).ready(function () {
    var toggleCollapseClass = '.tcd__booking-flight-direction';
    var toggleBtnClass = '.icon-right-thin-chevron';
    var toggleCollapse = $(toggleCollapseClass).find(toggleBtnClass);
    var dropdownClasses = '.tcd__booking-flight-detail';

    var viewDetailLinkClass = '.tcd__contact-details-expand';
    var detailPaneClass = '.tcd__contact-details-form-wrapper';
    var viewDetailLink = $(viewDetailLinkClass);

    if (isDefined(toggleCollapse)) {
        toggleCollapse.on('click', function (event) {
            event.preventDefault();

            var $this = $(this);
            var dropdown = $this.parents(toggleCollapseClass).find(dropdownClasses);
            if (isDefined(dropdown)) {
                dropdown.slideToggle('fast', function () {
                    var parent = $this.parent();
                    var isExpanded = parent.hasClass('expanded');

                    if (isExpanded) {
                        parent.removeClass('expanded');
                    } else {
                        parent.addClass('expanded');
                    }
                });
            }

            return false;
        })
    }

    if (isDefined(viewDetailLink)) {
        viewDetailLink.on('click', function(e) {
            e.preventDefault();

            var $this = $(this);
            var pane = $this.next(detailPaneClass);

            if (isDefined(pane)) pane.slideToggle('fast', function() {
                if ($this.hasClass('active')) $this.removeClass('active')
                else $this.addClass('active');
                $(window).trigger('resize');
            });

            return false;
        });
    }
});