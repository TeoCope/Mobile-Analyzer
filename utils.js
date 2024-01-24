var antenneConnetted = [];
var antenneNotConnetted = [];

const Utils = {

    colors: {
      red: chroma('red'),
      blue: chroma('blue'),
      green: chroma('green'),
      orange: chroma(255,166,0),
      purple: chroma(160, 32, 240),
      violet: chroma(238, 130, 238),
      yellow: chroma(255, 255, 0),
      brown: chroma(160, 82, 45),
      ciano: chroma(0, 255, 255),
      gray: chroma(105, 105, 105),
    },

    listItem: (key = "",text) => {
      return $("<li>").html("<b>" + key + ":</b> " + text);
    },

    paragraph: (text) => {
      return $("<p>").html(text);
    },

    setPath: (cells, marker) => {
      cells.forEach((cell) => {
        var lastMeasure = cell["phyParms"].length - 1;
        if (cell.phyParms[lastMeasure].inUse && !antenneConnetted.includes(cell.nodeId)) {
          if(antenneNotConnetted.includes(cell.nodeId)){
            var newArray = antenneNotConnetted.filter(element => element === cell.nodeId)
            antenneNotConnetted = newArray
          }
          antenneConnetted.push(cell.nodeId);
        } else if(!cell.phyParms[lastMeasure].inUse && !antenneConnetted.includes(cell.nodeId) && !antenneNotConnetted.includes(cell.nodeId) ) {
          antenneNotConnetted.push(cell.nodeId);
        }
      })
      antenneConnetted.forEach((cell) => {
        setContinuePolyline(cell, marker)
      })
      antenneNotConnetted.forEach((cell => {
        setDashPolyline(cell, marker)
      }))
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
    },

    tooltTipTextBuilder: (antenna = null, cell = null) => {
      var id = antenna.node_id || antenna.idDevice || cell.nodeId
      if(antenna !== null) {
        return '<b>' + id + '</b> <img style="width: 16px; height:16px;" src="./assets/leaflet/images/vodafoneLogo.svg"/>'
      }
    }
  };