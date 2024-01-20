var map = L.map("map",{
    center: [43.6112377, 13.3938954],
    zoom: 12,
    closePopupOnClick: false,
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var LeafIcon = L.Icon.extend({
  options: {
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -16],
  },
});

var vodafoneIcon = new LeafIcon({ iconUrl: "./leaflet/images/antennaVodafone.png" });
var atosIcon = new LeafIcon({ iconUrl: "./leaflet/images/nodoAtos.png" });

L.control.scale("metric").addTo(map);

var polylines = []

function setPolyline(nodeId, marker){
    var antenna = antenneVodafone.find((oggetto) => {
      return oggetto.node_id === nodeId;
    })

    var latLngAtos = marker.getLatLng();
    var latLngVodafone = [antenna.cell_lat, antenna.cell_long];

    var latlngs = [latLngAtos, latLngVodafone];

    polylines.push(L.polyline(latlngs, {color: 'red'}).addTo(map));
}

function destroyPolyline(){
  polylines.forEach((polyline) => {
    polyline.remove();
  })
}

L.control.tagFilterButton({
	data: ['atos', 'vodafone', 'tim'],
  filterOnEveryClick: true,
  icon: '<img src="./leaflet/images/filter.png" style="width: 16px; height: 16pxpx"/>',
}).addTo(map);
