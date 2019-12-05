import requests
import os
# fetches data from an api


def fetch(url, headers=None, params=None):
    return requests.get(url, headers=headers, params=params).json()


def fetch_yahoo_fin(url_end, params=None):
    url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/" + url_end
    headers = {
        'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com",
        'x-rapidapi-key': os.environ.get('YAHOO_API_KEY')
    }
    response = fetch(url, headers=headers, params=params)

    return response


def get_quotes(params):
    url_end = "market/get-quotes"

    return fetch_yahoo_fin(url_end, params=params)


def get_stock_detail(params):
    url_end = "stock/get-detail"

    return fetch_yahoo_fin(url_end, params=params)


def get_stock_news(ticker, limit):
    url = f'https://stocknewsapi.com/api/v1?tickers={ticker}&items={limit}&token={os.environ.get("STOCK_NEWS_API_KEY")}'

    return fetch(url)


def get_chart_data(params):
    url_end = "market/get-charts"

    return fetch_yahoo_fin(url_end, params=params)


def get_autocomplete(params):
    url_end = "market/auto-complete"

    return fetch_yahoo_fin(url_end, params=params)

