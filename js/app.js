//Create Leaflet Map
var mymap = L.map('map', {
	//Centered in NYC
	center: [40.7128, -74.0060],
	zoom: 10,
});

//Add basemaps
//Customized Mapbox map without train stations and customized colors
L.tileLayer('https://api.mapbox.com/styles/v1/mpadillaruiz/cjiv6fgvn4rs72so4mzo3vh74/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXBhZGlsbGFydWl6IiwiYSI6IjVNdEo5ZHcifQ.hOJnD_xBxWNwY0YoK978wg', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
									'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
									'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(mymap);

//OpenRailWayMap to include subway lines as basemap
L.tileLayer("http://{s}.tiles.openrailwaymap.org/signals/{z}/{x}/{y}.png", {
		opacity: 0.9,
		minZoom:13
}).addTo(mymap)

//Marker group to store markers and render the cluster
var markersCluster = L.markerClusterGroup({
		spiderfyOnMaxZoom: false,
		disableClusteringAtZoom:15,
		polygonOptions:{ weight: 3, color: '#222', opacity: 0.5 }
});

//Add layer to map
markersCluster.addTo(mymap);

//Legend component to add to the map
var legend = L.control({position: 'bottomright'});
//Event triggered when adding the legend
legend.onAdd = function (mymap) {
		var div = L.DomUtil.create('div', 'info legend');
		//Adding subway lines
		div.innerHTML +='<i style="background:#000000"></i><span>Subway Line</span><br>';
		//Adding subway stops
		div.innerHTML +='<img src="assets/images/icon.png" alt="subway" height="20" width="20"><span>Subway Stop</span><br>';
		return div;
};
//Add legend to map
legend.addTo(mymap);

//Icon representing a subway stop
var subwayStop = L.icon({
		iconUrl: 'assets/images/icon.png',
		iconSize:     [20, 20], // size of the icon
		popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});

//URL to fetch the data from the server
var url = "http://localhost:3001/stops"

//AJAX request to the node API to get the stops
$.ajax(url, {
		success: function(data) {
			for ( var i=0; i < data.length; ++i ){
				//As realized analyzing the data, each station is triplicated (N/S)
				//Only parent stops will be added (stops without a parent_station or location type 1)
				if(data[i].location_type==='1'){
						//Construct a marker with the stops properties
						var m= L.marker( [data[i].stop_lat, data[i].stop_lon],{icon: subwayStop}).bindTooltip(data[i].stop_name,{direction:'left',offset:L.point(-10,0),permanent:false})
						.bindPopup( '<span>ID: ' + data[i].stop_id + '<br>Name: ' + data[i].stop_name + '<br>Coordinates: ' + data[i].stop_lat + ', '+data[i].stop_lon+'</span>' );
						//Add individual marker to the cluster group
						markersCluster.addLayer(m);
			}
			}

		},
		error: function() {
			 console.log("error");
		}
 });
