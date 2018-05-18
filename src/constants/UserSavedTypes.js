/**
 * Сохранение данных пользователя.
 * @type {{msg: string, type: string}}
 */
export const USER_SAVED_DATA = {
    msg: "Данные успешно обновлены",
    type: "USER_SAVED_DATA"
}

/**
 * Ошибка сохранения данных пользователя.
 * @type {{msg: string, type: string}}
 */
export const ERROR_USER_SAVED_DATA = {
    msg: "Ошибка сохранения данных",
    type: "ERROR_USER_SAVED_DATA"
}

/**
 * Ошибка загрузки данных пользователя.
 * @type {{msg: string, type: string}}
 */
export const ERROR_USER_LOAD_DATA = {
    msg: "Ошибка загрузки данных. Проверьте соединение",
    type: "ERROR_USER_LOAD_DATA"
}

/**
 * Сохранение данных с email.
 * @type {{msg: string, type: string}}
 */
export const USER_SAVED_WITH_EMAIL = {
    msg: "После изменения email текущий сеанс будет завершён",
    type: "USER_SAVED_WITH_EMAIL"
}

/**
 * Обновление пароля пользователя.
 * @type {{msg: string, type: string}}
 */
export const USER_UPDATE_PASSWORD = {
    msg: "Пароль успешно обновлён",
    type: "USER_UPDATE_PASSWORD"
}

/**
 * Ошибка обновления пароля пользователя.
 * @type {{msg: string, type: string}}
 */
export const ERROR_USER_UPDATE_PASSWORD = {
    msg: "Ошибка обновления пароля",
    type: "ERROR_USER_UPDATE_PASSWORD"
}

