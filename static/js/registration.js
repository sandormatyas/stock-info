import {dataHandler} from "./data_handler";

function checkAvailability() {
    const userInput = this.textContent;
    if (userInput.length > 0) {
        const registerButton = document.querySelector('button#register-button');
        let errorDisplay = document.querySelector('#username-error');
        console.log(userInput);
        dataHandler.getUsers(users => {
            for (const user of users) {
                if (user.username === userInput) {
                    errorDisplay.classList.toggle('invisible');
                    errorDisplay.textContent = "Username already taken";
                    registerButton.disabled = true;
                } else {
                    registerButton.disabled = false;
                    errorDisplay.classList.toggle()
                }
            }
        }
    }
)
}

function usernameCheck() {
    const usernameInput = document.querySelector('input#register-username');
    usernameInput.addEventListener('blur', checkAvailability)
}

function main() {
    usernameCheck()
}

main();