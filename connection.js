var jsonVodafonePath = "vodafone_ridotto.json";
var jsonAtosPath = "atos.json";
var jsonTimPath = "tim-ridotto.json";

var antenneVodafone = [];
var antenneTim;
var antenneAtos;

$.ajax({
  url: jsonVodafonePath,
  method: "GET",
  dataType: "json",
  success: function (jsonData) {
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

$.ajax({
  url: jsonTimPath,
  method: "GET",
  dataType: "json",
  success: (jsonData) => {
    /* var nodeId = 0
    var newJsonData = [];
    var jsonObject = null;
    for (let i = 0; i < 20; i++) {
      var currentItem = jsonData[i]
      if(currentItem.node_id !== nodeId) {
        if(jsonObject !== null) {
          newJsonData.push(jsonObject);
        }
        jsonObject = {
          site_name: currentItem.site_name,
          cell_lat: currentItem.cell_lat,
          cell_long: currentItem.cell_long,
          node_id: currentItem.node_id,
          cells: []
        }
      }
      if(currentItem.node_id === nodeId) {
        jsonObject.cells.push(currentItem);
      }
    }
    console.log(newJsonData);
    antenneTim = newJsonData; */
    antenneTim = jsonData;
  },
  error: (error) => {
    console.log(error);
  }
})
