var map;

var markers = [];
var geocoder;
var largeInfowindow;
var k = 0;
//initialize map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 15.6580,
            lng: 73.8549
        },
        zoom: 11
    });
    geocoder = new google.maps.Geocoder();
    largeInfowindow = new google.maps.InfoWindow();
    var defaultIcon = makeMarkerIcon('0091ff');   //default when mouse is not on markers
    var highlightedIcon = makeMarkerIcon('FFFF24'); //yellow when mouse is on markers

    //creating marker for each place
    for (var i = 0; i < places.length; i++) {
        var address = places[i].place;
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                        var marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            icon: defaultIcon,
                            title: results[0].formatted_address,
                            animation: google.maps.Animation.DROP
                        });

                        markers.push(marker);   //push the markers in marker array
                        places[k].marker = marker;  //add property marker to the places
                        k = k + 1;

                        marker.addListener('click', function() {
                            this.setAnimation(google.maps.Animation.DROP);
                            populateInfoWindow(this, largeInfowindow); //event listener to populate when marker is clicked
                        });
                        marker.addListener('mouseover', function() {
                            this.setIcon(highlightedIcon);                //event listener for mouse on marker
                        });
                        marker.addListener('mouseout', function() {
                            this.setIcon(defaultIcon);                   //event listener for mouse out of marker
                        });
                    }
                }
            });
        }
    }
    for (var i = 0; i < markers.length; i++) {
        markers[i].title = places[i].place;                       //adding title to all markers
    }


};

function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +     //making marker with different color
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
};

function populateInfoWindow(marker, infowindow) {                 //populating info window with wikepedia links

    if (infowindow.marker != marker) {

        infowindow.setContent('');
        infowindow.marker = marker;

        infowindow.addListener('closeclick', function() {        //hide infowindow when close clicked
            infowindow.marker = null;
        });


       var wikiRequestTimeout = setTimeout(function() {
            infowindow.setContent("Wikepedia links could not be loaded");   //error handling if request fails
        }, 6000);

        var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title.split(" ")[0] + '&format=json&callback=?';
        $.ajax({
            url: wikiURL,
            dataType: "jsonp",
            success: function(response) {
                console.log(response);
                var articleList = response[1];
                var articleURL = 'http://en.wikipedia.org/wiki/' + articleList[0];  //ajax call for getting wikipedia links
                infowindow.setContent('<h1>Wikepedia Link:</h1><li>' +
                    '<a href="' + articleURL + '">' + articleList[0] + '</a></li>');
                clearTimeout(wikiRequestTimeout);
            }
        });


        infowindow.open(map, marker);   //open the infowindow
    }
};

function mapError() {
  console.log("ajnjka");
  window.alert("Not able to load map");
};


var menu = document.querySelector('#menu');
var main = document.querySelector('#map');
var drawer = document.querySelector('.navigation');
menu.addEventListener('click', function(val) {
    drawer.classList.toggle('open');
    val.stopPropagation();
});
main.addEventListener('click', function() {
    drawer.classList.remove('open');
});
