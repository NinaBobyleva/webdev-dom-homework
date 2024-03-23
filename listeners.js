import { comments } from "./main.js";
import { buttonElement, nameInputElement, textInputElement, rendering, formElement, loadCommentElement } from "./render.js";
import { postLike } from "./api.js";
import { sanitizeHtml } from "./sanitize.js";



export const initLikeButtonListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    
    for (const likeButtonElement of likeButtonElements) {

        likeButtonElement.addEventListener('click', (e) => {
            e.stopPropagation();
            
            postLike().then((data) => {
                console.log(data);
                rendering(comments);
            })
              .catch((error) => {
                formElement.classList.add('hide');
                loadCommentElement.classList.add('show');
                // alert('Лайк можно поставить после регистрации');
                console.warn(error);
            })
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


