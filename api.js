export const getTodos = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/nina-bobyleva/comments", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
}

export const postTodo = ({name, text}) => {
    return fetch("https://wedev-api.sky.pro/api/v1/nina-bobyleva/comments", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          text: text,
          forceError: true,
        }),
      })
        .then((response) => {
          if (response.status === 400) {
            throw new Error('Введено меньше трех символов');
          }
          if (response.status === 500) {
            throw new Error('Сервер сломался');
          } else {
            return response.json();
          }
        })
}