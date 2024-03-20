const todoURL = "https://wedev-api.sky.pro/api/v2/nina-bobyleva";
const userURL = "https://wedev-api.sky.pro/api/user";

export const getTodos = () => {
    return fetch(`${todoURL} /comments`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
}

export const postTodo = ({name, text}) => {
    return fetch(`${todoURL} /comments`, {
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

export const login = ({login, password}) => {
  return fetch(`${userURL}/login`, {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    })
      .then((response) => {
        return response.json();
      })
}