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
    }});
}

function inputHandler() {
    let inputField = document.getElementById('stockSearch');

}
function getAutoSearchOptions(search, callback) {
    let url = `/stocks?search=${search}`;
    dataHandler._api_get(`/stocks?search=${search}`, function (json) {
        callback(json)
    })
}


showMainTable();
