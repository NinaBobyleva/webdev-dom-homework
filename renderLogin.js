import { login, setToken, setName } from "./api.js";
import { comments } from "./main.js";
import { renderComments } from "./render.js";

export const renderLoginForm = () => {
  const appElement = document.getElementById('app');
  const loginHtml = `<div class="add-form" id="login">
    <h2>Форма ввода</h2>
    <input type="text" class="login-form-name" placeholder="Введите ваш логин" id="login-input" />
    <input type="password" class="add-form-text login-form-password" placeholder="Введите ваш пароль" rows="4"
      id="password-input" />
    <div class="add-form-row login-form-row">
      <button class="add-form-button login-button" id="login-button">Войти</button>
      <a class="login-link" href="">Зарегистрироваться</a>
    </div>
    </div>`;

  appElement.innerHTML = loginHtml;

  const loginButtonElement = document.getElementById('login-button');
  const loginInputElement = document.getElementById('login-input');
  const loginPasswordElement = document.getElementById('password-input');
  loginButtonElement.addEventListener('click', () => {
    login({ login: loginInputElement.value, password: loginPasswordElement.value, })
      .then((responseData) => {
        console.log(responseData);
        setToken(responseData.user.token);
        setName(responseData.user.name);
        return responseData;
      })
      .then((response) => {
        renderComments(comments);
        return response;
      })
  })
}