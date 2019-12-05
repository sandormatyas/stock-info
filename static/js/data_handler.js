export let dataHandler = {
    _api_get: function (url, callback) {
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        // sends the data to the API, and calls callback function

        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json_response => callback(json_response));

    },
    getStock: function (stockTicker, callback) {
        // example
    },
    getUsers: function (callback) {
        //gets existing usernames
        this._api_get('/users', response => {
            callback(response);
        })
    },

    _api_delete: function(url, callback) {
        fetch(url, {
            method: 'DELETE',
            credentials: 'same-origin'
        }).then(response => response.json())
            .then(json_response => callback(json_response));
    }
};