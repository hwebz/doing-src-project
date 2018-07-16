$(document).ready(function() {
    var navTabsClass = '.navigation-tab';
    var navContentsClass = '.navigation-content';
    var navTabs = $(navTabsClass);
    var navContents = $(navContentsClass);

    if (isDefined(navTabs) && isDefined(navContents)) {
        navTabs.on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            var targetClass = $this.attr('data-target');
            var target = $(targetClass);

            if(isDefined(target)) {
                if (target.hasClass('active')) {
                    target.removeClass('active');
                    $this.removeClass('active');
                } else {
                    navContents.removeClass('active');
                    navTabs.removeClass('active');

                    target.addClass('active');
                    $this.addClass('active');
                }
            }

            return false;
        });
    }
});