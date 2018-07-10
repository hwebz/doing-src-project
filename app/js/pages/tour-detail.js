$(document).ready(function () {
    var body = $('body');
    var detailCardClass = '.tcd__detail-card';
    var infoDetailClass = '.tcd__detail-info-detail';
    var detailCard = $(detailCardClass);
    var detailBtn = detailCard.find('.tcd__detail-btn');
    
    var detailInfoTabClass = '.tcd__detail-info-tabs';
    var detailinfoTabContentClass = '.tcd__detail-info-tab-content';
    var detailInfoTabs = $(detailInfoTabClass).find('>li >a');

    var galleryClass = '.gallery';
    var gallery = $(galleryClass);
    var galleryBigThumbClass = '.tcd__detail-info-big-thumb';
    var galleryImagesClass = '.tcd__detail-info-image';
    var galleryImages = gallery.find(galleryImagesClass);

    if (isDefined(detailBtn)) {
        detailBtn.on('click', function(e) {
            e.preventDefault();
            var $this = $(this);
            var pane = $this.parents(detailCardClass).find(infoDetailClass);

            if (isDefined(pane)) pane.slideToggle('fast', function() {
                $(infoDetailClass).not(pane).slideUp();
            });

            return false;
        });
    }

    if (isDefined(detailInfoTabs)) {
        detailInfoTabs.on('click', function(e) {
            e.preventDefault();

            var $this = $(this);
            var detailInfoContent = $($this.attr('href'));

            if (isDefined(detailInfoContent)) {
                var parent = $this.parents(detailCardClass);
                parent.find(detailinfoTabContentClass).removeClass('active');
                parent.find(detailInfoTabClass).find('> li').removeClass('active');

                detailInfoContent.addClass('active');
                $this.parent().addClass('active');
            }

            return false;
        })
    }

    if (isDefined(detailCard)) {
        for (var i = 0; i < detailCard.length; i++) {
            if (isDefined($('#detail-map-detail-' + i))) {
                initMap('detail-map-detail-' + i, 7);
            }
        }
    }

    if (isDefined(galleryImages)) {
        galleryImages.on('click', function(e) {
            e.preventDefault();

            var $this = $(this);
            var bigThumb = $this.parents(galleryClass).find(galleryBigThumbClass);
            var allImages = $this.parents(galleryClass).find(galleryImagesClass);

            if (isDefined(bigThumb)) {
                bigThumb.css({backgroundImage: $this.css('background-image')});

                allImages.removeClass('active');
                $this.addClass('active');
            }

            return false;
        })
    }
});