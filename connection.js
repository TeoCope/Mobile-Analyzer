var jsonVodafonePath = "./assets/json/vodafone-ridotto.json";
var jsonAtosPath = "./assets/json/deploy_nodi_atos.json";
var jsonTimPath = "./assets/json/tim-ridotto.json";

var antenneVodafone = [];
var antenneTim;
var antenneAtos;

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
});

$.ajax({
  url: jsonVodafonePath,
  method: "GET",
  dataType: "json",
  success: function (jsonData) {
    antenneVodafone = jsonData
  },
  error: function (error) {
    console.log(error)
  },
});

$.ajax({
  url: jsonTimPath,
  method: "GET",
  dataType: "json",
  success: (jsonData) => {
    antenneTim = jsonData;
  },
  error: (error) => {
    console.log(error);
  }
})

/*function buildJson(jsonData) {
  var nodeid = 0
  var newJsonData = [];
  var jsonObject = null;
  for (let i = 0; i < jsonData.lenght; i++) {
    var currentItem = jsonData[i]
    if (currentItem.node_id !== nodeid) {
      if (jsonObject !== null) {
        newJsonData.push(jsonObject);
      }
      jsonObject = {
        site_name: "",
        cell_lat: 0,
        cell_long: 0,
        node_id: 0,
        cells: []
      }
      jsonObject.site_name = currentItem.site_name;
      jsonObject.cell_lat = currentItem.cell_lat;
      jsonObject.cell_long = currentItem.cell_long;
      jsonObject.node_id = currentItem.node_id;
      nodeid = currentItem.node_id;
    }
    if (currentItem.node_id === nodeid) {
      jsonObject.cells.push(currentItem);
    }
  }
  antenneVodafone = newJsonData
  console.log(antenneVodafone)
  setDocument()
} */
