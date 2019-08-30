function initMap() {
    var zoomSize = 5;
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
        url: './marker/icon_32X32.png',
        //size: new google.maps.Size(zoomSize * 2, zoomSize * 2),
        origin: null,
        anchor: null,
        //scaledSize: new google.maps.Size(zoomSize * 2, zoomSize * 2)
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
        var icons = [
            "icon_16X16.png",   // Zoom - 0
            "icon_20X20.png",   // Zoom - 1
            "icon_20X20.png",   // Zoom - 2
            "icon_24X24.png",   // Zoom - 3
            "icon_24X24.png",   // Zoom - 4
            "icon_32X32.png",   // Zoom - 5
            "icon_32X32.png",   // Zoom - 6
            "icon_32X32.png",   // Zoom - 7
            "icon_32X32.png",   // Zoom - 8
            "icon_32X32.png",   // Zoom - 9
            "icon_48X48.png",   // Zoom - 10
            "icon_48X48.png",   // Zoom - 11
            "icon_48X48.png",   // Zoom - 12
            "icon_48X48.png",   // Zoom - 13
            "icon_48X48.png",   // Zoom - 14
            "icon_64X64.png",   // Zoom - 15
            "icon_64X64.png",   // Zoom - 16
            "icon_64X64.png",   // Zoom - 17
            "icon_64X64.png",   // Zoom - 18
            "icon_64X64.png",   // Zoom - 19
            "icon_128X128.png", // Zoom - 20
            "icon_128X128.png", // Zoom - 21
            "icon_128X128.png"  // Zoom - 22
        ];
        imageIconPath ="./marker/"+icons[zoom];

        var image = {
            //url: marker.getIcon().url,
            url: imageIconPath,
            // This marker is 20 pixels wide by 32 pixels high.
            size: null,
            // The origin for this image is (0, 0).
            origin: null,
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: null,
            //scaledSize: new google.maps.Size(relativePixelSize, relativePixelSize) //changes the scale
        };
        marker.setIcon(image);
    });
}

google.maps.event.addDomListener(window, 'load', initMap);