const Utils = {
    colors: {
      red: "#FF0000",
      blue: "#0000FF",
      green: "#00FF00",
    },

    listItem: (key = "",text) => {
      return $("<li>").html("<b>" + key + ":</b> " + text);
    },

    checkPhyParms: (antenna) => {
      var error = false
      var celle = antenna["cells"]
      for (i in celle) {
        var phyParam = celle[i]["phyParms"]
        for (j in phyParam){
          if (phyParam[j].rsrp < -100 || phyParam[j].rsrq < -20 || phyParam[j].sinr < 0){
            error = true
          }
        }
      }
      return error
    }
  };