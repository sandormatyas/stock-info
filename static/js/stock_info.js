import {dataHandler} from "./data_handler";

export let stockLoader = {
    loadStockInfo: function (ticker) {
        //clear the page
        dataHandler.getStock(ticker, stockData => {
            const stockPage = this.createStockTemplate(stockData)
            dataHandler.getNews(ticker, news => {
                this.insertNews(stockPage, news)
            })
        })
    },
    createStockTemplate: function (stockData) {
        const template = document.querySelector('#stock-info-template');
        const templateCopy = document.importNode(template.content, true);

        templateCopy.querySelector('#stock-name').textContent = stockData.summaryProfile.price.longName;
        templateCopy.querySelector('#stock-description').textContent = stockData.summaryProfile.longBusinessSummary;
        templateCopy.querySelector('#stock-country').textContent = stockData.summaryProfile.country;
        templateCopy.querySelector('#stock-sector').textContent = stockData.summaryProfile.sector;
        templateCopy.querySelector('#stock-industry').textContent = stockData.summaryProfile.industry;
        templateCopy.querySelector('#stock-website').textContent = stockData.summaryProfile.website;
        templateCopy.querySelector('#stock-employees').textContent = stockData.summaryProfile.fullTimeEmployees;

        return templateCopy
    },
    insertNews: function (emptyPage, news) {
        const newsBlock = emptyPage.querySelector('#stock-news');
        const newsTemplate = document.querySelector('#stock-news-template');

        for (const news_story of news) {
            const newsTemplateCopy = document.importNode(newsTemplate.content, true);

            newsTemplateCopy.querySelector('#news-sentiment').textContent = news_story.sentiment;
            newsTemplateCopy.querySelector('#news-picture').textContent = news_story.picture;
            newsTemplateCopy.querySelector('#news-title').textContent = news_story.title;
            newsTemplateCopy.querySelector('#news-publisher').textContent = news_story.publisher;
            newsTemplateCopy.querySelector('#news-date').textContent = news_story.date;

            newsBlock.insertAdjacentElement('beforeend', newsTemplateCopy);
        }
    }
};