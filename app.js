$("#modalAtos").on("hide.bs.modal", () => {
  $("#cellsButtons").empty();
  $("#cell-tabContent").empty();
  $("#pag2-content").empty();
  index = 0
})

const pathVodafonLogo = './assets/leaflet/images/vodafoneLogo.svg'
const pathTimLogo = './assets/leaflet/images/timLogo.svg'

var markersAtos = [];
var markersVodafone = [];
var markersTim = [];

$(document).ready(() => {

  if (map !== null) {
    antenneAtos.forEach((antenna) => {
      var marker
      if (Utils.checkPhyParms(antenna)) {
        marker = L.marker([antenna.latitude, antenna.longitude], {
          icon: atosIcon,
          tags: ['atos', 'allert'],
        }).addTo(map).bindTooltip("<div class='container position-relative'><p class='m-0'><b>" + antenna.idDevice + "</b><span class='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>!</span></p></div>", {
          permanent: true,
          direction: 'bottom',
        });
      } else {
        marker = L.marker([antenna.latitude, antenna.longitude], {
          icon: atosIcon,
          tags: ['atos'],
        }).addTo(map).bindTooltip("<b>" + antenna.idDevice + "</b>", {
          permanent: true,
          direction: 'bottom',
        });
      }
      markersAtos.push(marker);
    })
    antenneVodafone.forEach((antenna) => {
      var marker = L.marker([antenna.cell_lat, antenna.cell_long], {
        icon: vodafoneIcon,
        tags: ['vodafone'],
      }).addTo(map).bindTooltip(Utils.tooltTipTextBuilder(antenna), {
        permanent: true,
        direction: 'bottom'
      }).openTooltip()
      markersVodafone.push(marker);
    })
    antenneTim.forEach((antenna) => {
      var marker = L.marker([antenna.cell_lat, antenna.cell_long], {
        icon: vodafoneIcon,
        tags: ['tim'],
      }).addTo(map).bindTooltip('<b>' + antenna.node_id + '</b> <img style="width: 16px; height:16px;" src="' + pathTimLogo + '"/>', {
        permanent: true,
        direction: 'bottom',
        id: antenna.node_id
      }).openTooltip()
      markersTim.push(marker);
    })
  }

  if (markersAtos.length !== 0) {
    markersAtos.forEach((marker, index) => {
      var antenna = antenneAtos[index];
      marker.on("click", () => {
        map.setView(marker.getLatLng(), 15)
        setData(antenna);
        $("#modalAtos").modal("show");
      });
      marker.on("mouseover", () => {
        Utils.setPath(antenna["cells"], marker);
      })
      marker.on("mouseout", () => {
        destroyPolyline();
      })
    })
  }

  if (markersVodafone.length !== 0) {
    markersVodafone.forEach((marker, index) => {
      var antenna = antenneVodafone[index];
      marker.on("click", () => {
        effettuaZoom(antenna.cell_lat, antenna.cell_long)
        setAntennaVodafone(antenna);
        $("#offcanvasTower").offcanvas("show");
      })
    })
  }

  var options = {
    valueNames: ['address', 'idDevice'],
    item: (item) => {
      var lat = item.latitude;
      var long = item.longitude;
      var adrs = item.address;
      var id = item.idDevice;

      return '<button type="button" class="list-group-item list-group-item-action" onclick="effettuaZoom(' + lat + ',' + long + ')"><strong>' + adrs + '</strong><br><p class="mb-0">' + id + '</p></button>';
    }
  }

  var antenneList = new List('antenne', options, antenneAtos);

  $("#atosButtonSearch").on("click", () => {
    var options = {
      valueNames: ['address', 'idDevice'],
      item: (item) => {
        var lat = item.latitude;
        var long = item.longitude;
        var adrs = item.address;
        var id = item.idDevice;

        return '<button type="button" class="list-group-item list-group-item-action" onclick="effettuaZoom(' + lat + ',' + long + ')"><strong>' + adrs + '</strong><br><p class="mb-0">' + id + '</p></button>';
      }
    }
    antenneList.clear();
    antenneList = new List('antenne', options, antenneAtos)
  })

  $("#vodafoneButtonSearch").on("click", () => {
    var options = {
      valueNames: ['site_name', 'node_id'],
      item: (item) => {
        var lat = item.cell_lat;
        var long = item.cell_long;
        var adrs = item.site_name;
        var id = item.node_id;

        return '<button type="button" class="list-group-item list-group-item-action" onclick="effettuaZoom(' + lat + ',' + long + ')"><strong>' + adrs + '</strong><br><p class="mb-0">' + id + '</p></button>';
      }
    }

    antenneList.clear();
    antenneList = new List('antenne', options, antenneVodafone)
  })

  $("#timButtonSearch").on("click", () => {
    var options = {
      valueNames: ['site_name', 'node_id'],
      item: (item) => {
        var lat = item.cell_lat;
        var long = item.cell_long;
        var adrs = item.site_name;
        var id = item.node_id;

        return '<button type="button" class="list-group-item list-group-item-action" onclick="effettuaZoom(' + lat + ',' + long + ')"><strong>' + adrs + '</strong><br><p class="mb-0">' + id + '</p></button>';
      }
    }

    antenneList.clear();
    antenneList = new List('antenne', options, antenneTim)
  })
});

function effettuaZoom(latitudine, longitudine) {
  $("#offcanvasSearch").offcanvas("hide");
  map.setView([latitudine, longitudine], 15);
}

function setAntennaVodafone(antenna) {
  $("#infoVodafone").empty();
  var address = $("<h5>", {
    id: "address",
    text: antenna.site_name
  })

  var idDevice = $("<p>", {
    id: "nodeId",
    class: "p-0 m-0",
    html: "<b>Node ID:</b> " + antenna.node_id
  })

  $("#infoVodafone").append(address)
    .append(idDevice);

  setCellsVodafone(antenna.cells);
}

function setCellsVodafone(cells) {
  $("#vodafoneCells").empty();
  console.log("Start set cells");
  cells.forEach((cell, index) => {
    var accordionItem = $("<div>", {
      class: "accordion-item"
    })

    var accordionHeader = $("<h2>", {
      class: "accordion-header",
      id: "heading" + index
    })

    var button = $("<button>", {
      class: "accordion-button collapsed",
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": "#collapse" + index,
      "aria-expanded": false,
      "aria-controls": "collapse" + index,
    })

    var label = $("<div>", {
      class: "d-flex flex-column align-item-stretch",
    })

    var cellId = $("<p>", {
      class: "m-0 p-0"
    }).html("<b>Cell ID:</b> " + cell.cid);
    var cellName = $("<figcaption>", {
      class: "blockquote-footer m-0 p-0"
    }).html(cell.cell_name);

    label.append(cellId)
      .append(cellName);

    button.append(label);

    accordionHeader.append(button);
    accordionItem.append(accordionHeader);

    var accordionCollapse = $("<div>", {
      id: "collapse" + index,
      class: "accordion-collapse collapse",
      "aria-labelledby": "heading" + index,
      "data-bs-parent": "#vodafoneCells"
    })

    var accordionBody = $("<div>", {
      class: "accordion-body"
    })

    var list = $("<ul>", {
      class: "list-unstyled",
    })

    var name = Utils.listItem("Nome", cell.cell_name);
    var tech = Utils.listItem("Tecnologia", cell.tech);
    var band = Utils.listItem("Banda", cell.band);
    var arfcn = Utils.listItem("ARFCN", cell.arfcn);

    list.append(name)
      .append(tech)
      .append(band)
      .append(arfcn);

    accordionBody.append(list);
    accordionCollapse.append(accordionBody);
    accordionItem.append(accordionCollapse);
    $("#vodafoneCells").append(accordionItem);
  })
}

function setData(node) {
  $("#infoAntenna").empty();
  var title = $("<h5>", {
    id: "address",
    text: node["address"],
  });

  var idDevice = $("<p>", {
    id: "idDevice",
    class: "p-0 m-0",
    text: "ID Device: " + node["idDevice"],
  });

  $("#infoAntenna").append(title);
  $("#infoAntenna").append(idDevice);
  setCells(node["cells"]);
}


var allDataRsrp = new Map();
var allDataRsrq = new Map();
var allDataSinr = new Map();

function setCells(cells) {
  allDataRsrp = new Map();
  allDataRsrq = new Map();
  allDataSinr = new Map();
  $("#cellsButtons").empty();
  for (let i = 0; i < cells.length; i++) {
    var currentCell = cells[i];
    var nodeId = currentCell["nodeId"];
    var cid = currentCell["cid"];

    var phyParms = currentCell['phyParms']

    var cell;
    if (i === 0) {
      cell = $("<button>", {
        id: "cell" + i,
        class: "list-group-item list-group-item-action active d-flex justify-content-between align-items-center",
        html: "<b>Node Id:</b> " + nodeId + "<br><b>Cell ID:</b> " + cid,
        "data-bs-toggle": "tab",
        "data-bs-target": "#tab" + i,
        role: "tab",
        "aria-controls": "tab" + i,
        "aria-selected": true
      });
    } else {
      cell = $("<button>", {
        id: "cell" + i,
        class: "list-group-item list-group-item-action d-flex justify-content-between align-items-center",
        html: "<b>Node Id:</b> " + nodeId + "<br><b>Cell ID:</b> " + cid,
        "data-bs-toggle": "tab",
        "data-bs-target": "#tab" + i,
        role: "tab",
        "aria-controls": "tab" + i,
        "aria-selected": false
      });
    }

    var span;

    if (currentCell.MNC == 10) {
      span = '<img style="width: 16px; height:16px;" src="' + pathVodafonLogo + '"/>'
    } else {
      span = '<img style="width: 20px; height:20px;" src="' + pathTimLogo + '"/>'
    }

    $("#cellsButtons").append(cell);
    cell.append(span);
    setPhyParam(i, currentCell, phyParms)
  }
  console.log(allDataRsrp, allDataRsrq, allDataSinr);
  newChart(labels, "RSRP [dBm]", allDataRsrp);
  newChart(labels, "RSRQ [dB]", allDataRsrq);
  newChart(labels, "SINR [dB]", allDataSinr);
}

function setPhyParam(index, currentCell, phyParam) {

  var tabPane
  if (index == 0) {
    tabPane = $("<div>", {
      id: "tab" + index,
      class: "tab-pane fade show active",
      role: "tabpanel",
      "aria-labelledby": "tab" + index
    })
  } else {
    tabPane = $("<div>", {
      id: "tab" + index,
      class: "tab-pane fade",
      role: "tabpanel",
      "aria-labelledby": "tab" + index
    })
  }

  $("#cell-tabContent").append(tabPane)
  var infoCell = $("<div>", {
    id: "infoCell"
  })
  $(tabPane).append(infoCell);

  var nodeIdText = $("<h5>", {
    id: "nodeId",
    html: "<b>Node ID:</b> " + currentCell.nodeId
  });
  var cidText = $("<p>", {
    id: "cid",
    html: "<b>Cell ID:</b> " + currentCell.cid,
  });
  var mccText = $("<p>", {
    id: "mcc",
    html: "<b>MCC:</b> " + currentCell.MCC,
  })
  var mcnText = $("<p>", {
    id: "mcn",
    html: "<b>MNC:</b> " + currentCell.MNC,
  })

  infoCell.append(nodeIdText)
    .append(cidText)
    .append(mccText)
    .append(mcnText);

  var chartDiv = $("<div>")
  var chart = $("<canvas>", {
    id: "chart" + index
  })

  chartDiv.append(chart);
  tabPane.append(chartDiv);

  var tabelDiv = $("<div>")
  var tabelContainer = $("<table>", {
    id: "table" + index,
    class: "display w-100"
  })

  tabelDiv.append(tabelContainer);
  tabPane.append(tabelDiv);

  labels = [];
  const dataRsrp = [];
  const dataRsrq = [];
  const dataSinr = [];

  var data = [];
  for (i in phyParam) {
    var currentParam = phyParam[i];
    label = currentParam["date"].split(',')[0];
    labels.push(label);
    dataRsrp.push(currentParam["rsrp"]);
    dataRsrq.push(currentParam["rsrq"]);
    dataSinr.push(currentParam["sinr"]);
    data.push([label, currentParam['inUse'], currentParam['rsrp'], currentParam['rsrq'], currentParam['sinr']]);
  }

  allDataRsrp.set(currentCell.nodeId + "->" + currentCell.cid,dataRsrp);
  allDataRsrq.set(currentCell.nodeId + "->" + currentCell.cid,dataRsrq);
  allDataSinr.set(currentCell.nodeId + "->" + currentCell.cid,dataSinr);
  newMixedChart(index, labels, dataRsrp, dataRsrq, dataSinr);
  newTable(index, data);
}
