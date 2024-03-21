const todoURL = "https://wedev-api.sky.pro/api/v2/nina-bobyleva";
const userURL = "https://wedev-api.sky.pro/api/user";

export let token;
export let name;

export const setToken = (newToken) => {
  token = newToken;
}
export const setName = (newName) => {
  name = newName;
}

export const getTodos = () => {
    return fetch(`${todoURL}/comments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        return response.json();
      })
}

export const postTodo = ({name, text}) => {
    return fetch(`${todoURL}/comments`, {
        method: "POST",
        body: JSON.stringify({
          name,
          text,
          forceError: true,
        }),
        headers: {
          Authorization: `Bearer ${token}`
        }
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

export const login = ({ login, password }) => {
  return fetch(`${userURL}/login`, {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
}