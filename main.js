import { getTodos } from "./api.js";
import { rendering, formElement, loadCommentElement, loadElement } from "./render.js";


export let comments = [];

export const renderComments = () => {

    rendering(comments);
      
}

export const fetchAddRenderComments = () => {

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
        comments = appComments;
        renderComments();
        loadCommentElement.classList.add('show');
        formElement.classList.add('hide');
    })
        .catch((error) => {
            loadElement.textContent = 'Неудалось загрузить комментарии...';
            console.warn(error);
        })
        renderComments();
    loadElement.classList.add('show');
    formElement.classList.add('hide');
}


fetchAddRenderComments();


console.log("It works!");