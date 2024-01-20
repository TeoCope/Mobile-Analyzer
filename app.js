$("#closeButtonAtos").on("click", () => {
  $("#tabCell").hide();
  $("#chartContainer").hide();
  $("#infoCell").hide();
})

$("#cells").on("click", () => {
  $("#tabCell").show();
  $("#chartContainer").show();
  $("#infoCell").show();
})
var markersAtos = [];
var markersVodafone = [];
var markersTim = [];

$(document).ready(() => {

  if (map !== null) {
    antenneAtos.forEach((antenna) => {
      var marker = L.marker([antenna.latitudine, antenna.longitudine], {
        icon: atosIcon,
        tags: ['atos'],
      }).addTo(map).bindTooltip("<b>" + antenna.idDevice + "</b>", {
        permanent: true,
        direction: 'bottom',
      });
      markersAtos.push(marker);
    })
    antenneVodafone.forEach((antenna) => {
      var marker = L.marker([antenna.cell_lat, antenna.cell_long], {
        icon: vodafoneIcon,
        tags: ['vodafone'],
      }).addTo(map).bindTooltip('<b>' + antenna.node_id + '</b> <img style="width: 16px; height:16px;" src="./leaflet/images/vodafoneLogo.svg"/>', {
        permanent: true,
        direction: 'bottom',
      }).openTooltip()
      markersVodafone.push(marker);
    })
    antenneTim.forEach((antenna) => {
      var marker = L.marker([antenna.cell_lat, antenna.cell_long], {
        icon: vodafoneIcon,
        tags: ['tim'],
      }).addTo(map).bindTooltip('<b>' + antenna.node_id + '</b> <img style="width: 16px; height:16px;" src="./leaflet/images/timLogo.svg"/>', {
        permanent: true,
        direction: 'bottom',
      }).openTooltip()
      markersTim.push(marker);
    })
  }

  if (markersAtos.length !== 0) {
    markersAtos.forEach((marker, index) => {
      var antenna = antenneAtos[index];
      marker.on("click", () => {
        setData(antenna);
        $("#modalAtos").modal("show");
      });
      marker.on("mouseover", () => {
        setPath(antenna["cells"], marker);
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
        setAntennaVodafone(antenna);
        $("#modalVodafone").modal("show");
      })
    })
  }

  var optionsList = {
    valueNames: ['address', 'idDevice'],
    item: (item) => {
      var lat = item.latitudine;
      var long = item.longitudine;
      var adrs = item.address;
      var id = item.idDevice;

      return '<button type="button" class="list-group-item list-group-item-action" onclick="effettuaZoom(' + lat + ',' + long + ')"><strong>' + adrs + '</strong><br><p class="mb-0">' + id + '</p></button>';
    }

  }

  var antenneList = new List('antenne', optionsList, antenneAtos);
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

function setCells(cells) {
  $("#cellsButtons").empty();
  for (index in cells) {
    var currentCell = cells[index];
    var nodeId = currentCell["nodeId"];
    var cid = currentCell["cid"];

    function createClickHandler(nodeId, cid, phyParms) {

      return function () {
        setPhyParam(nodeId, cid, phyParms);
      };
    }

    var cell = $("<button>", {
      id: "cell" + index,
      class: "list-group-item list-group-item-action d-flex justify-content-between align-items-center",
      html: "<b>Node Id:</b> " + nodeId + "<br><b>CID:</b> " + cid,
      click: createClickHandler(nodeId, cid, currentCell['phyParms']),
      "data-bs-toggle": "list",
      role: "tab"
    });

    var span = $("<span>", {
      class: "badge bg-secondary rounded-pill",
      text: currentCell["phyParms"].length,
    })

    $("#cellsButtons").append(cell);
    cell.append(span);
  }
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
    }).html("<b>Cella ID:</b> " + cell.cid);
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

function setPhyParam(nodeId, cid, phyParam) {
  $("#infoCell").empty();
  var nodeIdText = $("<h6>", {
    id: "nodeId",
    html: "<b>Nodo ID:</b> " + nodeId
  });
  var cidText = $("<p>", {
    id: "cid",
    html: "<b>Cella ID:</b> " + cid,
  });

  $("#infoCell").append(nodeIdText);
  $("#infoCell").append(cidText);

  const labels = [];
  const dataRsrp = [];
  const dataRsrq = [];
  const dataSinr = [];

  var data = [];
  for (index in phyParam) {
    var currentParam = phyParam[index];
    label = currentParam["date"];
    labels.push(label);
    dataRsrp.push(currentParam["rsrp"]);
    dataRsrq.push(currentParam["rsrq"]);
    dataSinr.push(currentParam["sinr"]);
    data.push([label, currentParam['inUse'], currentParam['rsrp'], currentParam['rsrq'], currentParam['sinr']]);
  }
  changeTableData(data);
  removeData();
  addData(labels, dataRsrp, dataRsrq, dataSinr);
}

function setPath(cells, marker) {
  cells.forEach((cell) => {
    var lastMeasure = cell["phyParms"].length - 1;
    //cell["phyParms"].forEach((phyParam) => {
    if (cell.phyParms[lastMeasure].inUse) {
      setPolyline(cell.nodeId, marker);
    }
    //})
  })
}

