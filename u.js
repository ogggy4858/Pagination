let _totalPage = 10;
let _displayPage = 3;
let _previous = 1;
let _next;
let _page = 1;
let isActive = 1;

$(document).ready(function() {
    _next = _previous + _displayPage - 1;
    if (_next > _totalPage) {
        _next = _totalPage;
    }
    appendItems();
    $(document).on('click', '.page-item', function() {
        refeshItems(this);
        loadData();
        appendItems();
    });
});

function loadData() {

}

function refeshItems(cuurentLi) {
    _page = cuurentLi.children[0].text;
    if (_page === 'Previous') {
        if (isActive > _totalPage - parseInt(_displayPage / 2)) {
            isActive--;
        } else if (isActive > Math.ceil(_displayPage / 2)) {
            _previous--;
            _next--;
            isActive--;
        } else if (isActive > 1) {
            // add class disable for previous 
            isActive--;
        }
    } else if (_page === 'Next') {
        if (isActive < Math.ceil(_displayPage / 2)) {
            isActive++;
        } else if (isActive <= _totalPage - Math.ceil(_displayPage / 2)) {
            _previous++;
            _next++;
            isActive++;
        } else if (isActive < _totalPage) {
            // add class disable for next 
            isActive++;
        }
    } else {
        _page = parseInt(_page);
        if (_page === (_previous + _next) / 2) {
            isActive = _page;
            return;
        }
        let current = parseInt(_displayPage / 2);
        _previous = _page - current;
        _next = _page + current;
        isActive = _page;
    }
}

function appendItems() {
    $('#pagin').html('');

    let html = '';
    html += '<li class="page-item">';
    html += '<a class="page-link" href="#">Previous</a>'; // aria-disabled="true"
    html += '</li>';
    for (let i = _previous; i <= _next; i++) {
        if (isActive === i) {
            html += '<li class="page-item active">';
            html += '<a class="page-link" href="#">' + i + '</a>';
            html += '</li>';
        } else {
            html += '<li class="page-item">';
            html += '<a class="page-link" href="#">' + i + '</a>';
            html += '</li>';
        }
    }
    html += '<li class="page-item">';
    html += '<a class="page-link" href="#">Next</a>';
    html += '</li>';

    $('#pagin').append(html);
}