import { sanitizeHtml } from "./sanitize.js";
import { updateValue, keyEvent, inputAdd, answerComment, initLikeButtonListeners } from "./listeners.js";
import { renderLoginForm } from "./renderLogin.js";
import { getTodos, name, postTodo } from "./api.js";
import { format } from "date-fns";


export let buttonElement;
export let nameInputElement;
export let textInputElement;
export let formElement;
export let loadElement;
export let loadCommentElement;
export let buttonLog;

export const rendering = (comments) => {
    const appElement = document.getElementById('app');
    const commentsHtml = comments.map((comment) => {
        return `<li data-text="${comment.text}\n${comment.name}" class="comment">
            <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
            </div>
            <div class="comment-body">
            <div class="comment-text">
                ${comment.text.replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div class="quote">')}
            </div>
            </div>
            <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button data-like="${comment.likes}" data-id="${comment.id}" class="like-button ${comment.isLiked ? '-active-like' : 'like-button'}"></button>
            </div>
            </div>
        </li>`;
    }).join('');

    const formHtml =
        `<span class="hide" id="load">Пожалуйста подождите, загружаю комментарии...</span>
    <ul class="comments" id="list">
      ${commentsHtml}
    </ul>
    <span class="hide load" id="load-comment">Чтобы добавить комментарий,
    <a href="#" id="log">авторизуйтесь</a></span>
    <div class="add-form" id="form">
      <input type="text" class="add-form-name" value=${name} disabled id="name-input" readonly/>
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
        id="text-input"></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="add-button">Написать</button>
        <button class="add-form-button" id="delete-button">Удалить комментарий</button>
      </div>
      </div>`;

    appElement.innerHTML = formHtml;

    nameInputElement = document.getElementById('name-input');
    textInputElement = document.getElementById('text-input');
    buttonElement = document.getElementById('add-button');
    loadElement = document.getElementById('load');
    loadCommentElement = document.getElementById('load-comment');
    formElement = document.getElementById('form');
    buttonLog = document.getElementById('log');

    
    initLikeButtonListeners();
    formElement.classList.remove('hide');
    loadCommentElement.classList.add('hide');
    answerComment();
    updateValue();
    

    buttonLog.addEventListener('click', () => {
        renderLoginForm();
    })


    nameInputElement.addEventListener('input', inputAdd);
    textInputElement.addEventListener('input', inputAdd);

    textInputElement.addEventListener('keyup', keyEvent);

    buttonElement.disabled = true;

    nameInputElement.addEventListener('input', updateValue);
    textInputElement.addEventListener('input', updateValue);


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


        loadCommentElement.classList.add('show');
        loadCommentElement.textContent = "Комментарий добавляется...";
        formElement.classList.add('hide');

        const addComments = () => {
            return postTodo({
                name: sanitizeHtml(nameInputElement.value),
                text: sanitizeHtml(textInputElement.value)
            })
                .then(() => {
                    getTodos().then((responseData) => {
                        const appComments = responseData.comments.map((comment) => {
                            return {
                                id: comment.id,
                                name: comment.author.name,
                                date: format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss'),
                                text: comment.text,
                                likes: comment.likes,
                                isLiked: comment.isLiked,
                            };
                        });
                        loadCommentElement.classList.remove('show');
                        formElement.classList.remove('hide');
                        nameInputElement.value = '';
                        textInputElement.value = '';
                        comments = appComments;
                        rendering(comments);
                    })
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
}