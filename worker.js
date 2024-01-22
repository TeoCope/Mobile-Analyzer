self.addEventListener("message", event => {
    var nodeid = 0
    var newJsonData = [];
    var jsonObject = null;
    for (let i = 0; i < event.data.length; i++) {
      var currentItem = event.data[i]
      if(currentItem.node_id !== nodeid){
        if (jsonObject !== null) {
          newJsonData.push(jsonObject);
        }
        jsonObject = {
          address: "",
          latitudine: "",
          longitudine: "",
          idDevice: "",
          cells: []
        }
        jsonObject.address = currentItem.site_name;
        jsonObject.latitudine = currentItem.cell_lat;
        jsonObject.longitudine = currentItem.cell_long;
        jsonObject.idDevice = currentItem.node_id;
        nodeid = currentItem.node_id;
      }
      if(currentItem.node_id === nodeid) {
        jsonObject.cells.push(currentItem);
      }
    }
    console.log(newJsonData);
    self.postMessage(newJsonData)
    self.close();
})