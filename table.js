var table;

$(document).ready(function () {
    table = $("#infoTabella").DataTable({
        paging: false,
        searching: false,
        info: false,
        rowCallback:(row,data,index) => {
            if (data[2] < -100) {
                $(row).find('td:eq(2)').addClass("table-danger");
            }
            if (data[3] < -20) {
                $(row).find('td:eq(2)').addClass("table-danger");
            }
            if (data[4] < -0) {
                $(row).find('td:eq(4)').addClass("table-danger");
            }
        }
    });
})

function changeTableData(newData) {
    table.clear();
    table.rows.add(newData);
    table.draw();
}