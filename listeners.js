import { comments, renderComments, addComments } from "./main.js";
import { buttonElement, nameInputElement, textInputElement } from "./render.js";
import { addLike } from "./likes.js";
// import { rendering } from "./render.js";

export const initLikeButtonListeners = () => {
    const buttonElements = document.querySelectorAll('.like-button');

    for (const buttonElement of buttonElements) {

        const index = buttonElement.dataset.index;
        const counter = buttonElement.dataset.like;

        buttonElement.addEventListener('click', (e) => {
            e.stopPropagation();

            addLike(comments, index, counter);
            renderComments();
        })

    }

}

export function keyEvent(e) {
    if (e.code === 'Enter') {
        return buttonElement.dispatchEvent(new Event('click'));
    }
}

export function answerComment() {
    const commentsElements = document.querySelectorAll('.comment');

    for (const comment of commentsElements) {
        const text = comment.dataset.text;

        comment.addEventListener('click', () => {
            sanitizeHtml(textInputElement.value = `QUOTE_BEGIN>${text}QUOTE_END`);

        })
    }
}

export function updateValue() {
    // rendering(comments);
    if (nameInputElement.value.trim() !== '' && textInputElement.value.trim() !== '') {
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

export const addCommentButton = () => {
    buttonElement.addEventListener('click', () => {

        nameInputElement.classList.remove('error');
        textInputElement.classList.remove('error');
    
        if (nameInputElement.value.trim() !== '' && textInputElement.value.trim() === '') {
            textInputElement.classList.add('error');
            return;
        }
        if (nameInputElement.value.trim() === '' && textInputElement.value.trim() === '') {
            nameInputElement.classList.add('error');
            textInputElement.classList.add('error');
            return;
        }
        if (textInputElement.value.trim() !== '' && nameInputElement.value.trim() === '') {
            nameInputElement.classList.add('error');
            return;
        }
    
    
        nameInputElement.addEventListener('input', saveData);
        textInputElement.addEventListener('input', saveData);
    
        function saveData(nameElement, textElement) {
            nameElement = nameInputElement.value;
            textElement = textInputElement.value;
        }
    
        addComments();
    });
}
