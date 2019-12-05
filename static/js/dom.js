import {dataHandler} from "./data_handler.js";
import {stockLoader} from "./stock_info.js";

export let tableLoader = {
    showMainTable: function () {
        let tableTemplate = document.getElementById('table-header-template').innerHTML;
        let compiledTemplate = Handlebars.compile(tableTemplate);
        let renderedTemplate = compiledTemplate();
        document.querySelector('#content').insertAdjacentHTML('beforeend', renderedTemplate);

        dataHandler._api_get('/stocks', function (data) {
            for (let row of data) {
                tableLoader.insertTickerIntoHeader(row);

                //decide which arrow should we use
                if (row['trends']['longTermTrend'] === 'UP') {
                    row['trends']['longTermTrend'] = "fas fa-angle-double-up"
                } else {
                    row['trends']['longTermTrend'] = "fas fa-angle-double-down"
                }

                if (row['trends']['midTermTrend'] === 'UP') {
                    row['trends']['midTermTrend'] = "fas fa-angle-double-up"
                } else {
                    row['trends']['midTermTrend'] = "fas fa-angle-double-down"
                }

                if (row['trends']['shortTermTrend'] === 'UP') {
                    row['trends']['shortTermTrend'] = "fas fa-angle-double-up"
                } else {
                    row['trends']['shortTermTrend'] = "fas fa-angle-double-down"
                }


                let rowTemplate = document.getElementById('data-row-template').innerHTML;
                let compiledTemplate = Handlebars.compile(rowTemplate);
                let renderedTemplate = compiledTemplate(row);
                document.querySelector("tbody").insertAdjacentHTML("beforeend", renderedTemplate);
            }
            const tickers = document.querySelectorAll('.ticker');
            for (const ticker of tickers) {
                ticker.addEventListener('click', (event) => stockLoader.loadStockInfo(event))
            }
        });
    },
    insertTickerIntoHeader: function (dataRow) {
        const dropDownTemplate = document.getElementById('dropdown-items-template');
        const menuOption = document.importNode(dropDownTemplate.content, true);

        menuOption.querySelector('.option').textContent = dataRow.ticker;
        menuOption.querySelector('.option').dataset.ticker = dataRow.ticker;

        document.querySelector('#dropdown-menu').appendChild(menuOption);
    }
};

if (document.getElementById('user-data') != null) {
    tableLoader.showMainTable();
}
