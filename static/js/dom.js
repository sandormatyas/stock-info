import { dataHandler } from "./data_handler.js";

function showMainTable() {
    let tableTemplate = document.getElementById('table-header-template').innerHTML;
    let compiledTemplate = Handlebars.compile(tableTemplate);
    let renderedTemplate = compiledTemplate();
    document.querySelector('body').insertAdjacentHTML('beforeend', renderedTemplate);

    let tbody = document.querySelector("tbody");
    dataHandler._api_get('/stocks', function (data) {
        for (let row of data) {

            //decide which arrow should we use
            if (row['trends']['longTermTrend'] === 'UP'){
                row['trends']['longTermTrend'] = `<i class="fas fa-angle-double-up"></i>`
            }
            else {
                row['trends']['longTermTrend'] = `<i class="fas fa-angle-double-down"></i>`
            }

            if (row['trends']['midTermTrend'] === 'UP'){
                row['trends']['midTermTrend'] = `<i class="fas fa-angle-double-up"></i>`
            }
            else {
                row['trends']['midTermTrend'] = `<i class="fas fa-angle-double-down"></i>`
            }

            if (row['trends']['shortTermTrend'] === 'UP'){
                row['trends']['shortTermTrend'] = `<i class="fas fa-angle-double-up"></i>`
            }
            else {
                row['trends']['shortTermTrend'] = `<i class="fas fa-angle-double-down"></i>`
            }


            let rowTemplate = document.getElementById('data-row-template').innerHTML;
            let compiledTemplate = Handlebars.compile(rowTemplate);
            console.log(row);
            let renderedTemplate = compiledTemplate(row);
            tbody.insertAdjacentHTML("beforeend", renderedTemplate);
    }})
}

showMainTable();
