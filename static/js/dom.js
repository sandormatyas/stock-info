import {dataHandler} from "./data_handler.js";
import {stockLoader} from "./stock_info.js";

export let tableLoader = {
    showMainTable: function () {
        let tableTemplate = document.getElementById('table-header-template').innerHTML;
        let compiledTemplate = Handlebars.compile(tableTemplate);
        let renderedTemplate = compiledTemplate();
        document.querySelector('#content').insertAdjacentHTML('beforeend', renderedTemplate);

        dataHandler._api_get('/stocks', function (data) {
            document.querySelector('#dropdown-menu').innerHTML = "";
            for (let row of data) {
                tableLoader.insertTickerIntoHeader(row);
                let rowTemplate = document.getElementById('data-row-template').innerHTML;
                let compiledTemplate = Handlebars.compile(rowTemplate);
                let renderedTemplate = compiledTemplate(row);
                document.querySelector("tbody").insertAdjacentHTML("beforeend", renderedTemplate);
            }
            const tickers = document.querySelectorAll('.ticker');
            for (const ticker of tickers){
                ticker.addEventListener('click', (event) => stockLoader.loadStockInfo(event))}
            addEventListenerForDeleteButton();
            addEventListenerForRefreshButton();
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



function modifyRowData(tickerData) {
    let tickerRow = document.getElementsByClassName(`${tickerData['ticker']}`);

    // updates actual price
    let actualPrice = tickerRow[0].getElementsByClassName('actual-price');
    actualPrice[0].firstChild.innerText = tickerData['actual_price'];

    // updates daily price
    let dailyPrice = tickerRow[0].getElementsByClassName('daily-price');
    dailyPrice[0].firstChild.innerText = tickerData['daily_price_change'];

    // updates daily price percentage
    let dailyPricePercentage = tickerRow[0].getElementsByClassName('daily-price-percentage');
    dailyPricePercentage[0].firstChild.innerText = tickerData['daily_price_rel_change'];

    // updates short term trend
    let shortTermTrend = tickerRow[0].getElementsByClassName('short-term-trend');
    shortTermTrend[0].firstChild.Classlist = tickerData['trends']['shortTermTrend'];

    // updates mid term trend
    let midTermTrend = tickerRow[0].getElementsByClassName('mid-term-trend');
    midTermTrend[0].firstChild.Classlist = tickerData['trends']['midTermTrend'];
    //updates long term trend
    let longTermTrend = tickerRow[0].getElementsByClassName('long-term-trend');
    longTermTrend[0].firstChild.Classlist = tickerData['trends']['longTermTrend'];

    // updates market and local time
    let marketLocalTime = tickerRow[0].getElementsByClassName('market-local-time');
    marketLocalTime[0].innerHTML = `${tickerData['mkt_time']}` + " /<br> " + `${tickerData['local_time']}`;

    // updates market status
    let marketStatus = tickerRow[0].getElementsByClassName('status');
    marketStatus[0].firstChild.innerText = tickerData['actual_price'];
}


function refreshDataFields() {
    dataHandler._api_get('/stocks', function (tickerDatas) {
        for (let tickerData of tickerDatas) {
            modifyRowData(tickerData);
        }
    })
}


function addEventListenerForRefreshButton() {
    let refreshButton = document.getElementsByClassName('btn btn-outline-primary');
    refreshButton[0].addEventListener('click', function () {
        console.log('refresh');
        refreshDataFields();
    })
}

function savePickedStock() {
    $("#inputModal").on("show.bs.modal", function (event) {
            document.getElementById("stockSearch").focus()
    });
    document.getElementById('saveStock').addEventListener('click', function (event) {
        let newItem = document.getElementById("stockSearch").value;
        console.log(newItem);
        dataHandler._api_put('/stocks', newItem, function (json) {
            console.log(json, 'json');
            if (typeof json === "object") {
                dataHandler._api_get('/stocks', function (data) {
                    let rowTemplate = document.getElementById('data-row-template').innerHTML;
                    let compiledTemplate = Handlebars.compile(rowTemplate);
                    let renderedTemplate = compiledTemplate(data[data.length - 1]);
                    document.querySelector("tbody").insertAdjacentHTML("beforeend", renderedTemplate);

                    let insertedRow = document.querySelector("tbody").lastChild.previousSibling;
                    insertedRow.querySelector('.ticker').addEventListener('click', (event) => stockLoader.loadStockInfo(event));

                    insertedRow.querySelector('button').addEventListener('click', function (event) {
                        let deleteButton = event.currentTarget;
                        let tickerOfRow = deleteButton.dataset.ticker;
                        deleteRow(tickerOfRow, insertedRow);
                    })

                });
                let inputField = document.getElementById("stockSearch");
                inputField.value = '';
                inputField.focus();

            }
        })
    })
}


function main() {
    tableLoader.showMainTable();
    inputListener();
    savePickedStock();
    google.charts.load('current', {'packages':['corechart']});
}

if (document.getElementById('user-data') != null) {
    main();}


