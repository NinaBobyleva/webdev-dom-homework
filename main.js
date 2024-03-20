import { getTodos, postTodo } from "./api.js";
import { keyEvent, updateValue, inputAdd, addCommentButton, initLikeButtonListeners, answerComment } from "./listeners.js";
import { rendering } from "./render.js";

export const nameInputElement = document.getElementById('name-input');
export const textInputElement = document.getElementById('text-input');
export const buttonElement = document.getElementById('add-button');
export const listElement = document.getElementById('list');
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

export let comments = [];

export const renderComments = () => {

    rendering(comments);

    initLikeButtonListeners();
    updateValue();
    answerComment();
};


textInputElement.addEventListener('keyup', keyEvent);


const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}


buttonElement.disabled = true;

nameInputElement.addEventListener('input', updateValue);
textInputElement.addEventListener('input', updateValue);


nameInputElement.addEventListener('input', inputAdd);
textInputElement.addEventListener('input', inputAdd);


addCommentButton();

export const addComments = () => {
    loadCommentElement.classList.add('show');
    formElement.classList.add('hide');

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

renderComments();

console.log("It works!");