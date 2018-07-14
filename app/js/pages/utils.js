function isDefined(element) {
    return typeof element !== 'undefined' && element.length > 0;
}

function checkPaxs(context, plusBtn, minusBtn, current) {
    debugger;
    if (context) {
        if (current == 0) {
            context.parent().find(minusBtn).addClass('disabled');
        } else {
            context.parent().find(minusBtn).removeClass('disabled');
        }
    } else {
        $(minusBtn).each(function (idx, item) {
            $this = $(item);
            var cur = parseInt($this.parent().find('>p').text(), 10);
            if (cur == 0) {
                $this.addClass('disabled');
            } else {
                $this.removeClass('disabled');
            }
        })
    }
}

function paxSelectorAction(context, plusBtn, minusBtn, isIncrement, label) {
    var current = parseInt(label.text(), 10);
    if (!isNaN(current)) {
        if (isIncrement) {
            current += 1;
        } else if (!isIncrement && current > 0) {
            current -= 1;
        }
        label.text(current);
    }

    checkPaxs(context, plusBtn, minusBtn, current);
}

var map;
var lineSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 4,
    strokeColor: '#393'
};

var coords = [{
        "lat": 8.893260000000001,
        "lng": 76.61427
    },
    {
        "lat": 8.691880000000001,
        "lng": 77.82178
    },
    {
        "lat": 8.535070000000001,
        "lng": 76.92738
    },
    {
        "lat": 7.535070000000001,
        "lng": 75.92738
    },
    {
        "lat": 8.893260000000001,
        "lng": 76.61427
    }
];
var startIcon = {
    url: "img/map/start.png",
    scaledSize: new google.maps.Size(15, 15), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(7, 7) // anchor
};

var icon = {
    url: "img/map/marker.png",
    scaledSize: new google.maps.Size(15, 15), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(7, 7) // anchor
};

function moveMarker(map, marker, lat, lon) {
    //marker.setPosition(new google.maps.LatLng(lat, lon));
    //map.panTo(new google.maps.LatLng(lat, lon));
}

function autoRefresh() {
    var i, route, marker;

    route = new google.maps.Polyline({
        path: [],
        icons: [{
            icon: lineSymbol,
            offset: '100%'
        }],
        geodesic: true,
        strokeColor: '#409cd1',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        editable: false,
        map: map
    });

    marker = new google.maps.Marker({
        map: map,
        icon: icon
    });

    for (i = 0; i < coords.length; i++) {
        route.getPath().push(new google.maps.LatLng(coords[i].lat, coords[i].lng));
    }
    animateCircle(route);

    for (var i = 0; i < route.getPath().getLength(); i++) {
        var marker = new google.maps.Marker({
            title: route.getPath().getAt(i),
            position: route.getPath().getAt(i),
            map: map,
            icon: (i == 0 || i == coords.length - 1) ? startIcon : icon
        });
    }
    route.setMap(map);
}

function animateCircle(line) {
    var count = 0;
    var animated = window.setInterval(function () {
        // if (count > 198) {
        //     window.clearInterval(animated);
        //     var icons = line.get('icons');
        //     icons[0].offset = '100%';
        //     line.set('icons', icons);
        //     return;
        // }
        count = (count + 1) % 200;

        var icons = line.get('icons');
        icons[0].offset = (count / 2) + '%';
        line.set('icons', icons);

    }, 30);
}

function getCenterPoint() {
    var avgLat = 0;
    var avgLng = 0;

    for (var i = 0; i < coords.length; i++) {
        avgLat += coords[i].lat;
        avgLng += coords[i].lng;
    }

    avgLat /= coords.length;
    avgLng /= coords.length;

    return {
        lat: avgLat,
        lng: avgLng
    }
}

function advSlider(element, numberSlide) {
    if (isDefined(element)) {
        element.slick({
            slidesToShow: numberSlide,
            slidesToScroll: numberSlide,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            dot: false,
            arrows: false,
            responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]
        }).promise().done(function () {
            $(this).removeClass('initializing');
        });
    }
}

function initMap(mapId, zoom) {
    google.maps.event.addDomListener(window, 'load', function() {
        var mark = getCenterPoint();
        map = new google.maps.Map(document.getElementById(mapId), {
            center: new google.maps.LatLng(mark.lat, mark.lng),
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#d3d3d3"
                    }]
                },
                {
                    "featureType": "transit",
                    "stylers": [{
                            "color": "#808080"
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#b3b3b3"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "weight": 1.8
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#d7d7d7"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#ebebeb"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#a7a7a7"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#ffffff"
                    }]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#efefef"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#696969"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#737373"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#d6d6d6"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {

                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#dadada"
                    }]
                }
            ]
        });

        autoRefresh();
    });
}

(function() {
    $('[data-toggle="tooltip"]').tooltip();
})();