import WebStorage from "../core/WebStorage";

let SessionServiceInstance = null;

/**
 * Сервис для работы с локальной сессией.
 */
export default class SessionService {
    static getInstance() {
        if (!SessionServiceInstance) {
            SessionServiceInstance = new SessionService();
        }

        return SessionServiceInstance;
    }

    constructor() {
        if (SessionServiceInstance) {
            throw new Error('Нельзя создать более одного экземпляра класса');
        }

        this.storage = new WebStorage(sessionStorage);
    }

    /**
     * Возвращает данные аутентификации.
     */
    getAuthData() {
        return this.storage.getItem('authData');
    }

    /**
     * Сохраняет данные аутентификации.
     * @param data
     */
    setAuthData(data) {
        this.storage.setItem('authData', data);
    }

    /**
     * Возвращает true если существуют актуальные данные аутентификации.
     */
    isActive() {
        return Boolean(this.getAuthData());
    }

    /**
     * Очищает текущую сессию.
     */
    destroy() {
        this.storage.clear();
    }
}
