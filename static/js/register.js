import {dataHandler} from "./data_handler.js";

function checkAvailability(event) {
    const userInput = event.currentTarget.value;
    if (userInput.length > 0) {
        const registerButton = document.querySelector('button#register-button');
        let errorDisplay = document.querySelector('#username-error');
        dataHandler.getUsers(users => {
            for (const user of users) {
                if (user.username === userInput) {
                    errorDisplay.classList.remove('hidden');
                    errorDisplay.textContent = "Username already taken";
                    registerButton.disabled = true;
                } else {
                    registerButton.disabled = false;
                    errorDisplay.classList.add('hidden');
                }
            }
        })
    }
}

function usernameCheck() {
    const usernameInput = document.querySelector('#register-username');
    usernameInput.addEventListener('blur', checkAvailability)
}

usernameCheck();