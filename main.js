import { getTodos, postTodo } from "./api.js";
import { addLike } from "./likes.js";
import { rendering } from "./render.js";

const nameInputElement = document.getElementById('name-input');
const textInputElement = document.getElementById('text-input');
const buttonElement = document.getElementById('add-button');
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
    });
}

fetchAddRenderComments();

let comments = [];

const renderComments = () => {

    rendering(comments, listElement);

    initLikeButtonListeners();
    updateValue();
    answerComment();
};

fetchAddRenderComments();


function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}


const initLikeButtonListeners = () => {
    const buttonElements = document.querySelectorAll('.like-button');

    for (const buttonElement of buttonElements) {

        const index = buttonElement.dataset.index;
        const counter = buttonElement.dataset.like;

        buttonElement.addEventListener('click', (e) => {
            e.stopPropagation();
            buttonElement.classList.add('-loading-like');

            delay(2000).then(() => {

                addLike(comments, index, counter);

                renderComments();

            });


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

function keyEvent(e) {
    if (e.code === 'Enter') {
        buttonElement.dispatchEvent(new Event('click'));
    }
}

const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}


buttonElement.disabled = true;

nameInputElement.addEventListener('input', updateValue);
textInputElement.addEventListener('input', updateValue);

function updateValue() {
    if (nameInputElement.value !== '' && textInputElement.value !== '') {
        return buttonElement.disabled = false;
    } else {
        return buttonElement.disabled = true;
    }
}

renderComments();


buttonElement.addEventListener('click', () => {
    nameInputElement.addEventListener('input', validation);
    textInputElement.addEventListener('input', validation);

    function validation() {
        nameInputElement.classList.remove('error');
        textInputElement.classList.remove('error');
        if (nameInputElement.value.trim() !== '') {
            nameInputElement.classList.remove('error');
        }
        if (textInputElement.value.trim() !== '') {
            textInputElement.classList.remove('error');
        }
        if (nameInputElement.value.trim() !== '' && textInputElement.value.trim() === '') {
            textInputElement.classList.add('error');
            return;
        }
        else if (nameInputElement.value.trim() === '' && textInputElement.value.trim() === '') {
            nameInputElement.classList.add('error');
            textInputElement.classList.add('error');
            return;
        }
    
        if (textInputElement.value.trim() !== '' && nameInputElement.value.trim() === '') {
            nameInputElement.classList.add('error');
            return;
        }
    }

    validation();


    nameInputElement.addEventListener('input', saveData);
    textInputElement.addEventListener('input', saveData);

    function saveData(nameElement, textElement) {
        nameElement = nameInputElement.value;
        textElement = textInputElement.value;
    }
    saveData();

    loadCommentElement.classList.add('show');
    formElement.classList.add('hide');

    const addComments = () => {
        postTodo({ name: nameInputElement.value, text: textInputElement.value }).then(() => {
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