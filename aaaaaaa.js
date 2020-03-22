let pageSize = [];
let totalPage = 0;

$(document).ready(function () {
    loadData(1);

    $('#paginationjs').twbsPagination({
        totalPages: totalPage,
        visiblePages: pageSize,
        onPageClick: function (event, page) {
            console.log(event);
            loadData(page);
        }
    });
});

function loadData(page) {
    $.ajax({
        async: false,
        url: 'Home/Load',
        data: {
            page: page
        },
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            appendItems(result.data);
            pageSize = result.pageSize;
            totalPage = result.totalPage;
        }
    });  
}

function appendItems(data) {
    $('#tbody').html('');
    let html = '';

    for (let i = 0; i < data.length; i++) {
        html += '<tr>';
        html += '<td>';
        html += data[i].Id;
        html += '</td>';
        html += '<td>';
        html += data[i].Name;
        html += '</td>';
        html += '</tr>';
    }
    $('#tbody').append(html);
}