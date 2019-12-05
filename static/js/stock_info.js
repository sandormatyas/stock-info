import {dataHandler} from "./data_handler.js";

export let stockLoader = {
    loadStockInfo: function (event) {
        const ticker = event.currentTarget.dataset.ticker;
        dataHandler.getStock(ticker, stockData => {
            const stockPage = this.createStockTemplate(stockData);
            const page = document.querySelector('#content');
            page.innerHTML = "";
            page.appendChild(stockPage);
            this.insertChart(stockPage, stockData[2]);
            this.addListenerToButtons()

            //set back the cursor after the page is loaded
            document.querySelector('html').style.cursor='default';
        })
    },
    createStockTemplate: function (stockData) {
        const template = document.querySelector('#stock-info-template');
        const templateCopy = document.importNode(template.content, true);
        const stockInfo = stockData[0];

        templateCopy.querySelector('#stock-name').textContent = stockInfo.longName;
        templateCopy.querySelector('#stock-description').textContent = stockInfo.description;
        templateCopy.querySelector('#stock-country').textContent = stockInfo.country;
        templateCopy.querySelector('#stock-sector').textContent = stockInfo.sector;
        templateCopy.querySelector('#stock-industry').textContent = stockInfo.industry;
        templateCopy.querySelector('#stock-website').textContent = stockInfo.website;
        templateCopy.querySelector('#stock-website').href = stockInfo.website;
        templateCopy.querySelector('#stock-employees').textContent = stockInfo.employees;
        templateCopy.querySelector('#refresh-stock-info').dataset.ticker = stockInfo.ticker;

        this.insertNews(templateCopy, stockData[1]);

        return templateCopy
    },
    insertNews: function (emptyPage, news) {
        const newsBlock = emptyPage.querySelector('#stock-news');
        const newsTemplate = document.querySelector('#stock-news-template');

        for (const newsStory of news) {
            const newsTemplateCopy = document.importNode(newsTemplate.content, true);

            newsTemplateCopy.querySelector('#news-sentiment').classList.add(newsStory.sentiment);
            newsTemplateCopy.querySelector('#news-picture').src = newsStory.img_url;
            newsTemplateCopy.querySelector('#news-title').textContent = newsStory.title;
            newsTemplateCopy.querySelector('#news-title').href = newsStory.news_url;
            newsTemplateCopy.querySelector('#news-publisher').textContent = newsStory.source;
            newsTemplateCopy.querySelector('#news-date').textContent = newsStory.published;

            newsBlock.appendChild(newsTemplateCopy);
        }
    },
    insertChart: function (stockPage, chartData) {
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart(chartData));

        function drawChart(chartData) {
            var data = google.visualization.arrayToDataTable(chartData, true);

            var options = {
                legend: 'none',
                height: 500
            };

            var chart = new google.visualization.CandlestickChart(document.getElementById('chart-display'));

            chart.draw(data, options);
        }

    },
    addListenerToButtons: function () {
        document.querySelector('#back-to-main').addEventListener('click', this.handleBackToMain());
        document.querySelector('#refresh-stock-info').addEventListener('click', event => this.handleRefreshInfo(event));
    },
    handleBackToMain: function () {

    },
    handleRefreshInfo: function (event) {
        document.querySelector('#content').innerHTML = "";
        console.log('refresh');
        this.loadStockInfo(event);
    }
};