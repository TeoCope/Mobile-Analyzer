
var chartContainer = $("#chart")

const data = {
  labels: [],
  datasets: [
    {
      label: "rsrp",
      data: [],
      borderColor: Utils.colors.red,
      backgroundColor: Utils.colors.red,
      yAxisID: "y",
    },
    {
      label: "rsrq",
      data: [],
      borderColor: Utils.colors.green,
      backgroundColor: Utils.colors.green,
      yAxisID: "y2",
    },
    {
      label: "sinr",
      data: [],
      borderColor: Utils.colors.blue,
      backgroundColor: Utils.colors.blue,
      yAxisID: "y3",
    },
  ],
};

const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Parametri Fisici",
      },
    },
    scales: {
      y: {
        display: true,
        type: "linear",
        position: "left",
        border: {
          color: Utils.colors.red,
        },
      },
      y2: {
        display: true,
        type: "linear",
        position: "left",
        border: {
          color: Utils.colors.green,
        },
      },
      y3: {
        display: true,
        type: "linear",
        position: "left",
        border: {
          color: Utils.colors.blue,
        },
      },
      x: {
        title: {
          display: true,
          text: "Data",
        },
      },
    },
  };

var chart = new Chart(chartContainer, {
  type: "line",
  data: data,
  options: options,
});;

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