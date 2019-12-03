import requests
# fetches data from an api


def fetch(url):
    response = requests.get(url).json()
    return response
