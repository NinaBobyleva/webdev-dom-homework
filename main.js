import { getTodos, postTodo } from "./api.js";
import { addLike } from "./likes.js";
import { keyEvent, updateValue, inputAdd, saveData } from "./listeners.js";
import { rendering } from "./render.js";

export const nameInputElement = document.getElementById('name-input');
export const textInputElement = document.getElementById('text-input');
export const buttonElement = document.getElementById('add-button');
// const deleteButtonElement = document.getElementById('delete-button');
const listElement = document.getElementById('list');
const loadElement = document.getElementById('load');
const loadCommentElement = document.getElementById('load-comment');
const formElement = document.getElementById('form');

loadElement.classList.add('show');

const fetchAddRenderComments = () => {

    getTodos().then((responseData) => {
            const appComments = responseData.comments.map((comment) => {

                return {
                    name: comment.author.name,
                    date: new Date(comment.date).toLocaleDateString('ru-RU') + " " + new Date(comment.date).toLocaleTimeString('ru-RU'),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                };
            });
            loadElement.classList.remove('show');
            comments = appComments;
            renderComments();
        })
        .catch((error) => {
            loadElement.textContent = 'Неудалось загрузить комментарии...';
            console.warn(error);
        })
}

fetchAddRenderComments();

let comments = [];

const renderComments = () => {

    rendering(comments, listElement);

    initLikeButtonListeners();
    // updateValue();
    answerComment();
};

fetchAddRenderComments();


const initLikeButtonListeners = () => {
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

renderComments();


function answerComment() {
    const commentsElements = document.querySelectorAll('.comment');

    for (const comment of commentsElements) {
        const text = comment.dataset.text;

        comment.addEventListener('click', () => {
            sanitizeHtml(textInputElement.value = `QUOTE_BEGIN>${text}QUOTE_END`);

        })
    }
}

renderComments();


textInputElement.addEventListener('keyup', keyEvent);


const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}


// buttonElement.disabled = true;

// nameInputElement.addEventListener('input', updateValue);
// textInputElement.addEventListener('input', updateValue);


renderComments();

nameInputElement.addEventListener('input', inputAdd);
textInputElement.addEventListener('input', inputAdd);




buttonElement.addEventListener('click', () => {

    nameInputElement.classList.remove('error');
    textInputElement.classList.remove('error');

    const inputValidation = () => {
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

    inputValidation();


    nameInputElement.addEventListener('input', saveData);
    textInputElement.addEventListener('input', saveData);

    
    loadCommentElement.classList.add('show');
    formElement.classList.add('hide');

    const addComments = () => {
        postTodo({ name: sanitizeHtml(nameInputElement.value), text: sanitizeHtml(textInputElement.value) }).then(() => {
            return fetchAddRenderComments();
        }).
            then(() => {
                loadCommentElement.classList.remove('show');
                formElement.classList.remove('hide');
                nameInputElement.value = '';
                textInputElement.value = '';
                return fetchAddRenderComments();
            })
            .catch((error) => {
                if (error.message === 'Сервер сломался') {
                    console.warn(error);
                    // alert('Сервер сломался, попробуй позже');
                    return addComments();
                }
                if (error.message === 'Введено меньше трех символов') {
                    loadCommentElement.classList.remove('show');
                    formElement.classList.remove('hide');
                    console.warn(error);
                    return alert('Имя и комментарий не должны быть короче 3 символов');
                }
                buttonElement.disabled = false;
                loadCommentElement.classList.remove('show');
                formElement.classList.remove('hide');
                console.warn(error);
                alert("Кажется, у вас сломался интернет, попробуйте позже");
            })
    }
    addComments();
});

renderComments();

console.log("It works!");