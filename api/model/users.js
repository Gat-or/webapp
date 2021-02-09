const db = require('../conf/database');
const bcrypt = require('bcrypt');
const UserError = require('../helpers/errors/UserError');
const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const successPrint = require('../helpers/debug/debughelpers').successPrint;

const UserModel = {
    authenticate: function (username, password) {
        let userID;

        return db.execute('SELECT id, password FROM users WHERE username = ?', [username])
            .then(([results, fields]) => {
                if (results && results.length == 1) {
                    userID = results[0].id;
                    return bcrypt.compare(password, results[0].password);
                }
                else {
                    throw new UserError("Username or password is incorrect.", "/login", 200);
                }
            })
            .then((hashesMatch) => {
                if (hashesMatch) {
                    return Promise.resolve({ user: username, uid: userID });
                }
                else {
                    return Promise.resolve(false);
                }
            })
            .catch((err) => {
                throw err;
            });
    }
}

module.exports = UserModel;