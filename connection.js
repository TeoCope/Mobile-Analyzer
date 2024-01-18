var jsonVodafonePath = "vodafone_ridotto.json";
var jsonAtosPath = "atos.json";

var antenneVodafone;
var antenneAtos;

var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -16],
    },
  });

var vodafoneIcon = new LeafIcon({ iconUrl: "./icon/antennaVodafone.png"});
var atosIcon = new LeafIcon({ iconUrl: "./icon/antennaAtos.png"});

$.ajax({
  url: jsonVodafonePath,
  method: "GET",
  dataType: "json",
  success: function (jsonData) {
    console.log(jsonData);
    antenneVodafone = jsonData;
  },
  error: function (error) {
    console.log(error);
  },
});

$.ajax({
  url: jsonAtosPath,
  method: "GET",
  dataType: "json",
  success: (jsonData) => {
    antenneAtos = jsonData;
  },
  error: (error) => {
    console.log(error);
  }
})
