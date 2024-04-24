// Импорт WebDriverIO
import { describe, beforeEach, it, expect, $, browser } from "webdriverio";


describe("Страница Регистрации", () => {
  beforeEach(() => {
    browser.url("/register");
  });

  it("должна отображать форму регистрации", () => {
    const regForm = $(".reg__form");
    expect(regForm).toBeDisplayed();
  });

  it("должна успешно зарегистрировать нового пользователя", () => {
    const usernameInput = $('[name="username"]');
    const telegramInput = $('[name="telegramID"]');
    const passwordInput = $('[name="password"]');
    const registerButton = $(".reg__button");

    // Вводим допустимые данные для регистрации
    usernameInput.setValue("TestUser");
    telegramInput.setValue("@TestTelegramID");
    passwordInput.setValue("TestPassword");

    // Нажимаем на кнопку регистрации
    registerButton.click();

    // Проверяем, что пользователь перенаправлен на страницу входа после успешной регистрации
    expect(browser.getUrl()).toContain("/login");
  });

  it("должна отображать сообщение об ошибке при недопустимой регистрации", () => {
    const registerButton = $(".reg__button");

    // Нажимаем на кнопку регистрации без ввода данных
    registerButton.click();

    // Проверяем, что отображается сообщение об ошибке
    const errorMessage = $(".reg__error");
    expect(errorMessage).toBeDisplayed();
  });
});
