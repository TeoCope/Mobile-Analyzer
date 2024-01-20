var table;

$(document).ready(function () {
    table = $("#infoTabella").DataTable({
        paging: false,
        searching: false,
        info: false
    });

    var cell = table.cell({row: 1, column: 3});
    cell.node().classList.add('cell-true');

    table.draw();
})

function changeTableData(newData) {
    table.clear();
    table.rows.add(newData);
    table.draw();
}