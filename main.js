import { getTodos } from "./api.js";
// import { initLikeButtonListeners } from "./listeners.js";
import { rendering, formElement, loadCommentElement, loadElement } from "./render.js";


export let comments = [];

export const setComments = (newComments) => {
    comments = newComments;
}

export const fetchAddComments = () => {
    loadElement.classList.add('show');
    formElement.classList.add('hide');
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
        rendering(comments);
        formElement.classList.add('hide'); 
        loadCommentElement.classList.remove('hide');
    })
    .catch((error) => {
        loadElement.textContent = 'Неудалось загрузить комментарии...';
        console.warn(error);
    })
}

export const fetchAddRenderComments = () => {
    
    rendering(comments);
    
    fetchAddComments();
    
}


fetchAddRenderComments();


console.log("It works!");