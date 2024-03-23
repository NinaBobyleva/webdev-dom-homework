import { comments, fetchAddComments, setComments } from "./main.js";
import { buttonElement, nameInputElement, textInputElement, rendering, formElement, loadCommentElement } from "./render.js";
import { getTodos, id, postLike } from "./api.js";
import { sanitizeHtml } from "./sanitize.js";



export const initLikeButtonListeners = () => {
    
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {

        likeButtonElement.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = likeButtonElement.dataset.id;
            postLike(id).then((data) => {
                console.log(data);
                getTodos().then((responseData) => {
        
                    const appComments = responseData.comments.map((comment) => {
                        return {
                            id: comment.id,
                            name: comment.author.name,
                            date: new Date(comment.date).toLocaleDateString('ru-RU') + " " + new Date(comment.date).toLocaleTimeString('ru-RU'),
                            text: comment.text,
                            likes: comment.likes,
                            isLiked: comment.isLiked,
                        };
                    });
                    // newComments = appComments;
                    setComments(appComments)
                    rendering(comments);
                })
                // fetchAddComments();
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


