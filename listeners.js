import { buttonElement, nameInputElement, textInputElement } from "./main.js";



export function keyEvent(e) {
    if (e.code === 'Enter') {
        return buttonElement.dispatchEvent(new Event('click'));
    }
}

export function updateValue() {
    if (nameInputElement.value !== '' && textInputElement.value !== '') {
        return buttonElement.disabled = false;
    } else {
        return buttonElement.disabled = true;
    }
}

export function inputAdd() {
    if (nameInputElement.value.trim() !== '' && textInputElement.value.trim() !== '') {
        nameInputElement.classList.remove('error');
        textInputElement.classList.remove('error');
        return;
    }
    if (nameInputElement.value.trim() !== '') {
        nameInputElement.classList.remove('error');
        return;
    } else if (textInputElement.value.trim() !== '') {
        textInputElement.classList.remove('error');
        return;
    }
}

export function saveData(nameElement, textElement) {
    nameElement = nameInputElement.value;
    textElement = textInputElement.value;
}