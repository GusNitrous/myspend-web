/**
 * Обёртка для объектов, реализующих интерфейс Storage.
 */
export default class WebStorage {

    /**
     * WebStorage constructor.
     */
    constructor(storage) {
        if (!(storage instanceof Storage)) {
            throw new Error('Передан неверный тип хранилища');
        }

        this.storage = storage;
    }

    /**
     * Количество элементов хранящихся в storage.
     */
    get length() {
        return this.storage.length;
    }

    /**
     * Возвращает ключ для указанного индекса.
     */
    key(index) {
        this.storage.key(index);
    }

    /**
     * Преобразует в json и добавляет элемент с указанным ключом.
     * @param key
     * @param item
     */
    setItem(key, item) {
        this.storage.setItem(key, JSON.stringify(item));
    }

    /**
     * Возвращает элемент по ключу.
     * @param key
     */
    getItem(key) {
        let item = this.storage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    /**
     * Удаляет элемент по ключу.
     * @param key
     */
    removeItem(key) {
        this.storage.removeItem(key);
    }

    /**
     * Очищает хранилище.
     */
    clear() {
        this.storage.clear();
    }
}