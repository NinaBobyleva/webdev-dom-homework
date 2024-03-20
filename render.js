
export const appElement = document.getElementById('app');

export let buttonElement;
export let nameInputElement;
export let textInputElement;
export let formElement;
export let loadElement;
export let loadCommentElement;

export const rendering = (comments) => {
    const commentsHtml = comments.map((comment, index) => {
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
                <button data-like="${comment.likes}" data-index="${index}" class="like-button ${comments[index].isLiked ? '-active-like' : 'like-button'}"></button>
            </div>
            </div>
        </li>`;
    }).join('');

    const formHtml =
        `<span class="hide" id="load">Пожалуйста подождите, загружаю комментарии...</span>
    <ul class="comments" id="list">
      ${commentsHtml}
    </ul>
    <span class="hide load" id="load-comment">Чтобы добавить комментарий, <a
        href="renderLogin.js">авторизуйтесь</a></span>
    <div class="add-form" id="form">
      <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name-input" />
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

    
}

// renderComments();