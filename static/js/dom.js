import { dataHandler } from "./data_handler.js";

function showMainTable() {
    let tableTemplate = document.getElementById('table-header-template').innerHTML;
    let compiledTemplate = Handlebars.compile(tableTemplate);
    let renderedTemplate = compiledTemplate();
    document.querySelector('body').insertAdjacentHTML('beforeend', renderedTemplate);

    let tbody = document.querySelector("tbody");
    dataHandler._api_get('/stocks', function (data) {
        for (let row of data) {
            let rowTemplate = document.getElementById('data-row-template').innerHTML;
            let compiledTemplate = Handlebars.compile(rowTemplate);
            console.log(row);
            let renderedTemplate = compiledTemplate(row);
            tbody.insertAdjacentHTML("beforeend", renderedTemplate);
        }
    })


}

showMainTable();
