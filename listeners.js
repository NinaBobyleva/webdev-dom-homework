import { sanitizeHtml } from "./main.js";
import { buttonElement, nameInputElement, textInputElement } from "./render.js";
// import { addLike } from "./likes.js";


export const initLikeButtonListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');

    for (const likeButtonElement of likeButtonElements) {
        
        const index = likeButtonElement.dataset.index;
        const counter = likeButtonElement.dataset.like;
        likeButtonElement.addEventListener('click', (e) => {
            e.stopPropagation();

            // addLike(comments, index, counter);
            // renderComments(comments);
            
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


