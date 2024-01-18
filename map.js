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

L.control.scale("metric").addTo(map);

var polylines = []

function setPolyline(nodeId, marker){
    var antenna = antenneVodafone.find((oggetto) => {
      return oggetto.node_id === nodeId;
    })
    console.log(antenna);
    var latLngAtos = marker.getLatLng();
    var latLngVodafone = [antenna.cell_lat, antenna.cell_long];
    console.log(latLngVodafone);

    var latlngs = [latLngAtos, latLngVodafone];

    polylines.push(L.polyline(latlngs, {color: 'red'}).addTo(map));
}

function destroyPolyline(){
  polylines.forEach((polyline) => {
    polyline.remove();
  })
}
