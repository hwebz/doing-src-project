$(document).ready(function () {
    var toggleCollapseClass = '.tcd__booking-flight-direction';
    var toggleBtnClass = '.icon-right-thin-chevron';
    var toggleCollapse = $(toggleCollapseClass).find(toggleBtnClass);
    var dropdownClasses = '.tcd__booking-flight-detail';

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
});