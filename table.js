var table;

$(document).ready(function () {
    table = $("#infoTabella").DataTable({
        paging: false,
        searching: false,
        info: false
    });
})

function changeTableData(newData) {
    table.clear();
    table.rows.add(newData);
    table.draw();
}