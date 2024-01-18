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

$(document).ready(() => {
  if (map !== null) {
    antenneAtos.forEach((antenna) => {
      var marker = L.marker([antenna.latitudine, antenna.longitudine], {
        icon: atosIcon,
      }).addTo(map);
      markersAtos.push(marker);
    })
    antenneVodafone.forEach((antenna) => {
      markersVodafone.push(L.marker([antenna.cell_lat, antenna.cell_long], {
        icon: vodafoneIcon,
      }).addTo(map))
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

  $('#searchInput').on('input', function() {
    $("#searchResults").dropdown("show");
    // Ottieni il valore inserito nell'input
    var searchValue = $(this).val();

    console.log(searchValue);
    var result = [];
    var resultAtos = antenneAtos.filter((oggetto) => {
      return oggetto.idDevice.includes(searchValue);
    })

    console.log(resultAtos);
  });
});

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
  $("#cells").empty();
  for (index in cells) {
    var currentCell = cells[index];
    var nodeId = currentCell["nodeId"];
    var cid = currentCell["cid"];

    function createClickHandler(nodeId, cid, phyParms) {
      return function () {
        setPhyParam(nodeId, cid, phyParms);
      };
    }

    var cell = $("<li>", {
      id: "cell" + index,
      class: "list-group-item d-flex justify-content-between align-items-center",
      html: "<b>Node Id:</b> " + nodeId + "<br><b>CID:</b> " + cid,
      click: createClickHandler(nodeId, cid, currentCell['phyParms']),
    });

    var span = $("<span>", {
      class: "badge bg-primary rounded-pill",
      text: currentCell["phyParms"].length,
    })

    $("#cells").append(cell);
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
      html: "<b>Cella ID:</b> " + cell.cid
    })

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
    cell["phyParms"].forEach((phyParam) => {
      if (phyParam.inUse) {
        setPolyline(cell.nodeId, marker);
      }
    })
  })
}

