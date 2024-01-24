var map = L.map("map", {
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

var vodafoneIcon = new LeafIcon({ iconUrl: "./assets/leaflet/images/antennaVodafone.png" });
var atosIcon = new LeafIcon({ iconUrl: "./assets/leaflet/images/nodoAtos.png" });

L.control.scale("metric").addTo(map);

var polylines = [];
var tooltTipsChanged = [];
var antenne = [];

function setContinuePolyline(nodeId, marker) {
  var antenna = antenneVodafone.find((oggetto) => {
    return oggetto.node_id === nodeId;
  })

  antenne.push(antenna)

  var latLngAtos = marker.getLatLng();
  var latLngVodafone = [antenna.cell_lat, antenna.cell_long];

  var latlngs = [latLngAtos, latLngVodafone];

  var node = markersVodafone.find((element) => {
    return element.getLatLng().lat === antenna.cell_lat && element.getLatLng().lng === antenna.cell_long
  })

  node.bindTooltip(Utils.tooltTipTextBuilder(antenna), {
    permanent: true,
    direction: 'bottom',
    className: 'cell-green'
  }).openTooltip()
  tooltTipsChanged.push(node);

  polylines.push(L.polyline(latlngs, { color: 'green' }).addTo(map));
  $("#" + antenna.node_id).addClass("cell-green");
}

function setDashPolyline(nodeId, marker) {
  var antenna = antenneVodafone.find((oggetto) => {
    return oggetto.node_id === nodeId;
  })

  antenne.push(antenna)

  var latLngAtos = marker.getLatLng();
  var latLngVodafone = [antenna.cell_lat, antenna.cell_long];

  var latlngs = [latLngAtos, latLngVodafone];

  var node = markersVodafone.find((element) => {
    return element.getLatLng().lat === antenna.cell_lat && element.getLatLng().lng === antenna.cell_long
  })

  node.bindTooltip(Utils.tooltTipTextBuilder(antenna), {
    permanent: true,
    direction: 'bottom',
    className: 'cell-orange'
  }).openTooltip()
  tooltTipsChanged.push(node)

  polylines.push(L.polyline(latlngs, {
    dashArray: '5, 10',
    color: 'red'
  }).addTo(map));
}

function destroyPolyline() {
  polylines.forEach((polyline) => {
    polyline.remove();
  })

  tooltTipsChanged.forEach((node,index) => {
    node.unbindTooltip();
    node.bindTooltip(Utils.tooltTipTextBuilder(antenne[index]), {
      permanent: true,
      direction: 'bottom',
    }).openTooltip()
  })

  tooltTipsChanged = [];
  antenneConnetted = [];
  antenneNotConnetted = [];
  antenne = [];
}

L.control.tagFilterButton({
  data: ['atos', 'vodafone', 'tim','allert'],
  filterOnEveryClick: true,
  icon: '<img src="./assets/leaflet/images/filter.png" style="width: 16px; height: 16pxpx"/>',
}).addTo(map);
