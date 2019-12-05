import { dataHandler } from "./data_handler";


function fillTableWithData() {
    dataHandler._api_get()
}


function main() {
    fillTableWithData();
}


main();