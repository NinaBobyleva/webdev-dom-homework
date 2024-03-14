export const rendering = (comments, listElement) => {
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
    
    listElement.innerHTML = commentsHtml;
}