import connection_api
import data_manager
from datetime import datetime
import pytz

# data manipulation on fetched json goes here


def get_quotes_for_main_page(user_id):
    tickers = data_manager.get_tickers_by_user(user_id)
    symbols = '%2C'.join([ticker['ticker'] for ticker in tickers])

    params = {
        "region": "US",
        "lang": "en",
        "symbols": symbols
    }
    raw_result = connection_api.get_quotes(params)["quoteResponse"]["result"]

    return process_raw_quotes_data(raw_result)


def process_raw_quotes_data(data):
    processed_quotes = []

    for record in data:

        processed_quotes.append({
            'ticker': record["symbol"],
            'name': record["longName"],
            'actual_price': round(record["regularMarketPrice"], 2),
            'daily_price_change': round(record["regularMarketChange"], 2),
            'daily_price_rel_change': str(round(record["regularMarketChangePercent"], 2)) + '%',
            'timestamp': record["regularMarketTime"],
            'market_status': 'OPEN' if record['marketState'] == 'REGULAR' else 'CLOSED',
            'mkt_time': datetime.fromtimestamp(record["regularMarketTime"], pytz.timezone('US/Eastern')),
            'local_time': datetime.fromtimestamp(record["regularMarketTime"]),
            'trends': record["pageViews"]
        })

    return processed_quotes


def get_all_stock_details_for_stock_page(ticker):

    detail_params = {
        "region": "US",
        "lang": "en",
        "symbol": ticker
    }

    default_chart_params = {
        "region": "US",
        "lang": "en",
        "symbol": ticker,
        "interval": "1d",
        "range": "3mo"
    }

    news_limit = 25

    raw_stock_details = connection_api.get_stock_detail(detail_params)
    raw_stock_news = connection_api.get_stock_news(ticker, news_limit)
    raw_charts = connection_api.get_chart_data(default_chart_params)

    return process_raw_stock_details(raw_stock_details, raw_stock_news, raw_charts)


def process_raw_stock_details(details, news, charts):
    pass
