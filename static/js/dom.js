import { dataHandler } from "./data_handler.js";

function showMainTable() {
    let tableTemplate = document.getElementById('table-header-template').innerHTML;
    let compiledTemplate = Handlebars.compile(tableTemplate);
    let renderedTemplate = compiledTemplate();
    document.querySelector('body').insertAdjacentHTML('beforeend', renderedTemplate);

    dataHandler._api_get('/stocks', function (data) {
        for (let row of data) {
            let rowTemplate = document.getElementById('data-row-template').innerHTML;
            let compiledTemplate = Handlebars.compile(rowTemplate);
            console.log(row);
            let renderedTemplate = compiledTemplate(row);
            document.querySelector("tbody").insertAdjacentHTML("beforeend", renderedTemplate);

    }
        addEventListenerForDeleteButton();
    });
}

//add event listener for delete buttons
function addEventListenerForDeleteButton() {
    let deleteButtons = document.getElementsByClassName('btn btn-outline-warning border-0');
    for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', function () {
            let parentOfDeleteButton = deleteButton.parentElement;
            let rowOfDeleteButton = parentOfDeleteButton.parentElement;
            let tickerOfRow = deleteButton.getAttribute('data-ticker');
            deleteRow(tickerOfRow, rowOfDeleteButton);
        })
    }
}

function deleteRow(tickerOfRow, rowOfDeleteButton) {
    dataHandler._api_delete(`/stocks/${tickerOfRow}`, function (deletedRowList) {
        rowOfDeleteButton.remove();
    })
}

function inputHandler(event) {
    let search = event.target.value;
    if (search.length >= 3) {
        getAutoSearchOptions(search, function (data) {
            let results = [];
            for (let row of data["ResultSet"]["Result"]) {
                results.push(row['name'] + '/' + row['symbol'])
            }
            console.log(results);
            $('#stockSearch').autocomplete({
                source: results
            });
            $( '#stockSearch').autocomplete( "option", "appendTo", ".inputModal" );
        });
    }
}

function getAutoSearchOptions(search, callback) {
    let url = `/stocks?search=${search}`;
    dataHandler._api_get(url, function (json) {
        callback(json)
    })
}

function inputListener() {
    document.getElementById('stockSearch').addEventListener('input', inputHandler)
}


showMainTable();
inputListener();

