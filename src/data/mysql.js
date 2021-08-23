const mysql = require('mysql2');
const config = require('../../config.json');

const pool = mysql.createPool(config.mysql);

/**
 * Execute a database query.
 * 
 * @param {String} sql
 * @param {Array} params
 * @returns A promise
 */
function query(sql, params) {
    return new Promise((resolve, reject) => {
        return pool.query(sql, params, (err, results, fields) => {
            if (err) return reject(err);
            return resolve(results);
        })
    })
}

module.exports = { query }