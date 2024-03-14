import { nameInputElement, textInputElement } from "./main.js";

export const inputValidation = () => {
    if (nameInputElement.value.trim() !== '' && textInputElement.value.trim() === '') {
        textInputElement.classList.add('error');
        return;
    } else if (nameInputElement.value.trim() === '' && textInputElement.value.trim() === '') {
        nameInputElement.classList.add('error');
        textInputElement.classList.add('error');
        return;
    } else if (textInputElement.value.trim() !== '' && nameInputElement.value.trim() === '') {
        nameInputElement.classList.add('error');
        return;
    }  
}