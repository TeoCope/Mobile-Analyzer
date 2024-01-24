function changeTableData(newData) {
    table.clear();
    table.rows.add(newData);
    table.draw();
}

function newTable(index, newData) {
    $("#table" + index).DataTable(
        {
            paging: false,
            searching: false,
            info: false,
            columns: [
                { title: 'Date' },
                { title: 'In Use'},
                { title: 'RSRP [dBm]'},
                { title: 'RSRQ [dB]'},
                { title: 'SINR [dB]'}
            ],
            data: newData,
            rowCallback:(row,data,index) => {
                if (data[2] < -100) {
                    $(row).find('td:eq(2)').addClass("cell-red");
                }
                if (data[3] < -20) {
                    $(row).find('td:eq(3)').addClass("cell-red");
                }
                if (data[4] < -0) {
                    $(row).find('td:eq(4)').addClass("cell-red");
                }

                if(data[2] > -80) {
                    $(row).find('td:eq(2)').addClass("cell-green");
                }
                if(data[3] > -10) {
                    $(row).find('td:eq(3)').addClass("cell-green");
                }
                if(data[4] > 20) {
                    $(row).find('td:eq(4)').addClass("cell-green");
                }
            }
        }
    )
}