var jsonVodafonePath = "vodafone_ridotto.json";
var jsonAtosPath = "atos.json";
var jsonTimPath = "tim-ridotto.json";

var antenneVodafone;
var antenneTim;
var antenneAtos;

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
