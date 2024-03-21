import { getTodos } from "./api.js";
import { updateValue, initLikeButtonListeners, answerComment } from "./listeners.js";
import { rendering, formElement, loadCommentElement, loadElement } from "./render.js";


export let comments = [];

export const renderComments = () => {
    
    rendering(comments);
    loadElement.classList.add('show');
    formElement.classList.add('hide');

    initLikeButtonListeners();
    updateValue();
    answerComment();
};


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
            renderComments();
            loadElement.classList.remove('show');
            loadCommentElement.classList.add('show');
        })
        .catch((error) => {
            loadElement.textContent = 'Неудалось загрузить комментарии...';
            console.warn(error);
        })
    renderComments();
}


fetchAddRenderComments();


export const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

console.log("It works!");