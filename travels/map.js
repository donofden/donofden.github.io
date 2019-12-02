function initMap() {
    var zoomSize = 3;
    var html = '<p id="control-text"> a bunch of html select menu goes in here </p>';
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoomSize,
        center: {
            lat: 38.9637, // Turkey
            lng: 35.2433  // Turkey
        },
        mapTypeControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
        /*mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
        }*/
    });
    setMarker(map);

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
    var optionsDynamic = [];
    var chicago = {lat: 41.85, lng: -87.65};
    for (var i = 1; i < 10; i++) {
        //start process to set up custom drop down
        //create the options that respond to click
        var name = 'Option - ' + i;
        var value = 2*i;
        console.log(name);
        console.log(value);
        var divOptions = {
            gmap: map,
            name: name,
            title: "This acts like a button or click event ",
            id: "mapOpt ",
            action: function(){
                map.setCenter(chicago);
            }
        }
        var optionDiv1 = new optionDiv(divOptions);
        optionsDynamic.push(optionDiv1);
    }
/*
var divOptions2 = {
        gmap: map,
        name: 'Option2',
        title: "This acts like a button or click event ",
        id: "satelliteOpt ",
        action: function(){
            alert('option2');
        }
}

var optionDiv2 = new optionDiv(divOptions2);*/

//create the input box items

//possibly add a separator between controls        
var sep = new separator();

//put them all together to create the drop down       
var ddDivOptions = {
    items: optionsDynamic,
    id: "myddOptsDiv"              
}
//alert(ddDivOptions.items[1]);
var dropDownDiv = new dropDownOptionsDiv(ddDivOptions);               
        
var dropDownOptions = {
        gmap: map,
        name: 'Select Option',
        id: 'ddControl',
        title: 'A custom drop down select with mixed elements',
        position: google.maps.ControlPosition.LEFT_TOP,
        dropDown: dropDownDiv 
}

var dropDown1 = new dropDownControl(dropDownOptions); 
}

google.maps.event.addDomListener(window, 'load', initMap);

function setMarker(map) {

    var beaches = [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    var location = new google.maps.LatLng(53.3811, -1.4701);
    // Marker Icon
    var image = {
        url: './marker/icon_16X16.png',
        //size: new google.maps.Size(zoomSize * 2, zoomSize * 2),
        origin: null,
        anchor: null,
        //scaledSize: new google.maps.Size(zoomSize * 2, zoomSize * 2)
    };

    $.getJSON("position.json", function(data) {
        $.each(data, function(index, position) {
            for (var i = 0; i < position.length; i++) {
                var location = position[i];
                var marker = new google.maps.Marker({
                    position: {
                        lat: location['lat'],
                        lng: location['lng']
                    },
                    map: map,
                    icon: image,
                    //shape: shape,
                    title: location['title']
                    //zIndex: beach[3]
                });
                // Add Metadata to markers
                marker.metadata = {type: "point", id: location['id']};

                // List the Markers
                $('#results-list').append(
                    $('<li />')
                    .attr('id','map-marker-' + i)
                    .attr('class','depot-result')
                    .html(location['title'])
                );

                // Information on the Marker Click
                var contentString = '<div class="info-window">' +
                    '<h3>' + location['title'] + '</h3>' +
                    '<div class="info-content">' +
                    '<p>' + location['city'] + ' Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
                    '</div>' +
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 400
                });
                google.maps.event.addListener(marker, 'click', (function(marker, infowindow) {
                    return function() {
                        infowindow.open(map, marker);
                        // /windows.push(infowindow)
                        google.maps.event.addListener(map, 'click', function() {
                            infowindow.close();
                        });
                    };
                })(marker, infowindow));

                // Dynamically Resize the Icon with respect to Zoom
                //when the map zoom changes, resize the icon based on the zoom level so the marker covers the same geographic area
                google.maps.event.addListener(map, 'zoom_changed', function() {
                    var zoom = map.getZoom();
                    var icons = [
                        "icon_16X16.png", // Zoom - 0
                        "icon_16X16.png", // Zoom - 1
                        "icon_16X16.png", // Zoom - 2
                        "icon_16X16.png", // Zoom - 3
                        "icon_16X16.png", // Zoom - 4
                        "icon_16X16.png", // Zoom - 5
                        "icon_16X16.png", // Zoom - 6
                        "icon_16X16.png", // Zoom - 7
                        "icon_16X16.png", // Zoom - 8
                        "icon_16X16.png", // Zoom - 9
                        "icon_16X16.png", // Zoom - 10
                        "icon_32X32.png", // Zoom - 11
                        "icon_32X32.png", // Zoom - 12
                        "icon_32X32.png", // Zoom - 13
                        "icon_32X32.png", // Zoom - 14
                        "icon_32X32.png", // Zoom - 15
                        "icon_32X32.png", // Zoom - 16
                        "icon_32X32.png", // Zoom - 17
                        "icon_32X32.png", // Zoom - 18
                        "icon_32X32.png", // Zoom - 19
                        "icon_32X32.png", // Zoom - 20
                        "icon_32X32.png", // Zoom - 21
                        "icon_32X32.png" // Zoom - 22
                    ];
                    imageIconPath = "./marker/" + icons[zoom];

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
        });
    });
}

    /************
	 Classes to set up the drop-down control
	 ************/
          
    function optionDiv(options){
        var control = document.createElement('DIV');
        control.className = "dropDownItemDiv";
        control.title = options.title;
        control.id = options.id;
        control.innerHTML = options.name;
        console.log(options.action);
        google.maps.event.addDomListener(control,'click',options.action);
        return control;
    }
    
    function separator(){
            var sep = document.createElement('DIV');
            sep.className = "separatorDiv";
            return sep;      		
    }
    
    function dropDownOptionsDiv(options){
       //alert(options.items[1]);
         var container = document.createElement('DIV');
         container.className = "dropDownOptionsDiv";
         container.id = options.id;
         for(i=0; i<options.items.length; i++){
             container.appendChild(options.items[i]);
         }
        return container;        	
     }
    
    function dropDownControl(options){
         var container = document.createElement('DIV');
         container.className = 'container';
         
         var control = document.createElement('DIV');
         control.className = 'dropDownControl';
         control.innerHTML = options.name;
         control.id = options.name;
         var arrow = document.createElement('IMG');
         arrow.src = "http://maps.gstatic.com/mapfiles/arrow-down.png";
         arrow.className = 'dropDownArrow';
         control.appendChild(arrow);	      		
         container.appendChild(control);    
         container.appendChild(options.dropDown);
         
         options.gmap.controls[options.position].push(container);
         google.maps.event.addDomListener(container,'click',function(){
           (document.getElementById('myddOptsDiv').style.display == 'block') ? document.getElementById('myddOptsDiv').style.display = 'none' : document.getElementById('myddOptsDiv').style.display = 'block';
           setTimeout( function(){
               document.getElementById('myddOptsDiv').style.display = 'none';
           }, 1500);
         })      	  
     }