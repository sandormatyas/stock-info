import connection_api
import data_manager
from datetime import datetime
import pytz

# data manipulation on fetched json goes here

watchlist = ['FB', 'TSLA', 'AMZN', 'AAPL', 'GOOGL']


def get_quotes_for_main_page(user):
    tickers = data_manager.get_tickers_by_user(user)
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
            'actual_price': record["regularMarketPrice"],
            'daily_price_change': record["regularMarketChange"],
            'daily_price_rel_change': record["regularMarketChangePercent"] + '%',
            'mkt_time': pytz.timezone('US/Eastern').localize(datetime.fromtimestamp(int(record["regularMarketTime"]))),
            'local_time': datetime.fromtimestamp(int(record["regularMarketTime"])),
            'trends': record["pageViews"]
        })

    return processed_quotes



