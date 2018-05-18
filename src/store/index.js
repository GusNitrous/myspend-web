/**
 * Подключение хранилища в зависимости от окружения.
 * @type {{default?}|*}
 */

module.exports = process.env.NODE_ENV === 'development' ?
        require('./Store.dev') :
        require('./Store.prod');