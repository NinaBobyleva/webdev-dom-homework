import { getTodos } from "./api.js";
import { renderComments, formElement, loadCommentElement, loadElement } from "./render.js";


export let comments = [];


export const fetchAddRenderComments = () => {

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
        comments = appComments;
        renderComments(comments);
        loadElement.classList.remove('show');
        loadCommentElement.classList.add('show');
        formElement.classList.add('hide');
    })
        .catch((error) => {
            loadElement.textContent = 'Неудалось загрузить комментарии...';
            console.warn(error);
        })
    renderComments(comments);
    loadElement.classList.add('show');
    formElement.classList.add('hide');
}


fetchAddRenderComments();


export const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

console.log("It works!");