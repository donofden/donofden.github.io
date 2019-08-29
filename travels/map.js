function initMap() {
    var zoomSize = 10;
    var location = new google.maps.LatLng(53.3811, -1.4701);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoomSize,
        center: {
            lat: 53.3811,
            lng: -1.4701
        }
    });

    // Marker Icon
    var image = {
        url: './marker.png',
        size: new google.maps.Size(zoomSize * 2, zoomSize * 2),
        origin: null,
        anchor: null,
        scaledSize: new google.maps.Size(zoomSize * 2, zoomSize * 2)
    };
    // Set Marker
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: image,
    });

    // Information on the Marker Click
    var contentString = '<div class="info-window">' +
        '<h3>Info Window Content</h3>' +
        '<div class="info-content">' +
        '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
        '</div>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    // Map Style
    var styles = [{
        "featureType": "landscape",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": 65
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "poi",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": 51
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road.highway",
        "stylers": [{
            "saturation": -100
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road.arterial",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": 30
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "road.local",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": 40
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "transit",
        "stylers": [{
            "saturation": -100
        }, {
            "visibility": "simplified"
        }]
    }, {
        "featureType": "administrative.province",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [{
            "visibility": "on"
        }, {
            "lightness": -25
        }, {
            "saturation": -100
        }]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "hue": "#ffff00"
        }, {
            "lightness": -25
        }, {
            "saturation": -97
        }]
    }];

    map.set('styles', styles);

    // Dynamically Resize the Icon with respect to Zoom
    //when the map zoom changes, resize the icon based on the zoom level so the marker covers the same geographic area
    google.maps.event.addListener(map, 'zoom_changed', function() {
        var zoom = map.getZoom();
        var relativePixelSize = zoom * 4;
        var image = {
            url: marker.getIcon().url,
            // This marker is 20 pixels wide by 32 pixels high.
            size: null,
            // The origin for this image is (0, 0).
            origin: null,
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: null,
            scaledSize: new google.maps.Size(relativePixelSize, relativePixelSize) //changes the scale
        };
        marker.setIcon(image);
    });
}

google.maps.event.addDomListener(window, 'load', initMap);