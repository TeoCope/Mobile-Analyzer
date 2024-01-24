var index = 0;

var colors = [Utils.colors.blue, Utils.colors.brown, Utils.colors.ciano, Utils.colors.gray, Utils.colors.green, Utils.colors.orange, Utils.colors.red, Utils.colors.purple,Utils.colors.violet,Utils.colors.yellow];

console.log(chroma(1,0,0,0.5).css())
var options = {
  responsive: true,
  scales: {
    y: {
      display: true,
      type: "linear",
      position: "left",
      border: {
        color: Utils.colors.red.alpha(0.5).hex(),
      },
    },
    y2: {
      display: true,
      type: "linear",
      position: "left",
      border: {
        color: Utils.colors.green.alpha(0.5).hex(),
      },
    },
    y3: {
      display: true,
      type: "linear",
      position: "left",
      border: {
        color: Utils.colors.blue.alpha(0.5).hex(),
      },
    },
  },
};

function addData(labels, dataRsrp, dataRsrq, dataSinr) {
  labels.forEach((label) => {
    chart.data.labels.push(label);
  })
  dataRsrp.forEach((data) => {
    chart.data.datasets[0].data.push(data);
  })
  dataRsrq.forEach((data) => {
    chart.data.datasets[1].data.push(data);
  })
  dataSinr.forEach((data) => {
    chart.data.datasets[2].data.push(data);
  })
  chart.update();
}

function removeData() {
  chart.data.labels = [];
  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  chart.update();
}

function newMixedChart(index, labels, dataRsrp, dataRsrq, dataSinr) {
  var chartContainer = $("#chart" + index);
  var data = {
    labels: labels,
    datasets: [
      {
        label: "rsrp [dBm]",
        data: dataRsrp,
        borderColor: Utils.colors.red.hex(),
        backgroundColor: Utils.colors.red.hex(),
        yAxisID: "y",
      },
      {
        label: "rsrq [dB]",
        data: dataRsrq,
        borderColor: Utils.colors.green.hex(),
        backgroundColor: Utils.colors.green.hex(),
        yAxisID: "y2",
      },
      {
        label: "sinr [dB]",
        data: dataSinr,
        borderColor: Utils.colors.blue.hex(),
        backgroundColor: Utils.colors.blue.hex(),
        yAxisID: "y3",
      },
    ],
  };
  var chart = new Chart(chartContainer, {
    type: "line",
    data: data,
    options: options,
  });;
}

function newChart(labels, label, dataSend) {
  var container = $("<div>", {
    style: "height: 400px; width: 800px"
  });
  var canvas = $("<canvas>", {
    id: "singleChart" + index,
  });

  container.append(canvas)
  $("#pag2-content").append(container)
  var data = {
    labels: labels,
    datasets: [
    ]
  }

  var options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: label
      }
    },
    scales: {
      y: {
        display: true,
        type: "linear",
        position: "left",
      },
    }
  }

  var j = 0
  dataSend.forEach((value,key) => {
      var dataset = {
        label: key,
        data: value,
        borderColor: colors[j].hex(),
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: colors[j].alpha(0.5).hex(),
      }
      data.datasets.push(dataset);
      j++
  })

  var chart = new Chart(canvas, {
    type: "line",
    data: data,
    options: options,
  });
}