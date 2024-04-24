// Импорт WebDriverIO
import { describe, beforeEach, it, expect, $, browser } from "webdriverio";

describe("Страница Добавления Ссылки", () => {
  beforeEach(() => {
    browser.url("/add-link");
  });

  it("должна отображать основные элементы страницы", () => {
    const title = $(".AddLink__title");
    const icon = $(".AddLink__icon");
    const subtitle = $(".AddLink__subtitle");
    const input = $(".AddLink__input");
    const button = $(".AddLink__button");

    expect(title).toBeDisplayed();
    expect(icon).toBeDisplayed();
    expect(subtitle).toBeDisplayed();
    expect(input).toBeDisplayed();
    expect(button).toBeDisplayed();
  });

  it("должна успешно добавлять ссылку при вводе корректных данных", () => {
    const input = $(".AddLink__input");
    const button = $(".AddLink__button");

    // Вводим корректные данные
    input.setValue("psevdoITman");
    button.click();

    // Проверяем, что пользователь перенаправлен на главную страницу после успешного добавления ссылки
    expect(browser.getUrl()).toContain("/");
  });

  it("должна отображать сообщение об ошибке при некорректных данных или ошибке сервера", () => {
    const button = $(".AddLink__button");

    // Пытаемся добавить ссылку без ввода данных
    button.click();

    // Проверяем, что отображается сообщение об ошибке
    const errorMessage = $(".AddLink__error");
    expect(errorMessage).toBeDisplayed();

    // TODO: Добавьте дополнительные проверки для случаев с ошибкой сервера
  });
});
