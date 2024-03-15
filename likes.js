export const addLike = (comments, index, counter,) => {
    if (comments[index].isLiked === false) {

        const result = +counter + 1;
        comments[index].likes = result;
        
        comments[index].isLiked = true;
      } else if (comments[index].isLiked === true) {

        const result = counter - 1;
        comments[index].likes = result;

        comments[index].isLiked = false;
      }
}