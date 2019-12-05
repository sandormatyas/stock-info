import {dataHandler} from "./data_handler.js";

export let stockLoader = {
    loadStockInfo: function (event) {
        //clear the page
        const ticker = event.currentTarget.dataset.ticker;
        dataHandler.getStock(ticker, stockData => {
            const stockPage = this.createStockTemplate(stockData);
            const page = document.querySelector('#content');
            page.innerHTML = "";
            page.appendChild(stockPage);
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
        templateCopy.querySelector('#stock-employees').textContent = stockInfo.employees;

        this.insertNews(templateCopy, stockData[1]);

        return templateCopy
    },
    insertNews: function (emptyPage, news) {
        const newsBlock = emptyPage.querySelector('#stock-news');
        const newsTemplate = document.querySelector('#stock-news-template');

        for (const news_story of news) {
            const newsTemplateCopy = document.importNode(newsTemplate.content, true);

            newsTemplateCopy.querySelector('#news-sentiment').textContent = news_story.sentiment;
            newsTemplateCopy.querySelector('#news-picture').src = news_story.img_url;
            newsTemplateCopy.querySelector('#news-title').textContent = news_story.title;
            newsTemplateCopy.querySelector('#news-title').href = news_story.news_url;
            newsTemplateCopy.querySelector('#news-publisher').textContent = news_story.source;
            newsTemplateCopy.querySelector('#news-date').textContent = news_story.published;

            newsBlock.appendChild(newsTemplateCopy);
        }
    },
    insertChart: function (stockPage, chartData) {
        
    }
};