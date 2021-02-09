const UserModel = require('../model/users');
const UserError = require('../helpers/errors/UserError');
const errorPrint = require('../helpers/debug/debughelpers').errorPrint;
const successPrint = require('../helpers/debug/debughelpers').successPrint;

const UserController = {
    logIn: function (req, res, next) {

        let username = req.body.username;
        let password = req.body.password;

        //validate data
        UserModel.authenticate(username, password)
            .then((userData) => {
                if (userData) {
                    successPrint('Login Successful');
                    req.session.username = userData.user;
                    req.session.userID = userData.uid;
                    //res.json({ status: "OK", message: 'login successful', "redirect": "back" });
                    res.redirect('back');
                }
                else {
                    throw new UserError('Username or password is incorrect.', '/login', 200);
                }
            })
            .catch((err) => {
                if (err instanceof UserError) {
                    errorPrint(err.getMessage());
                    res.status(err.getStatus());
                    res.json({ status: "OK", message: err.getMessage(), "redirect": 'back' });
                } else {
                    next(err);
                }

            });
    },
    getLoginUsername: function (req, res, next) {
        if(req.session.username) {
            console.log(req.session.username);
            res.json(req.session.username);
        }
        else {
            res.json("Guest");
        }
    },
    logOut: function (req, res, next) {
        req.session.destroy((err) => {
            if(err) {
                console.log("Could not destroy session")
                next(err)
            }
            else {
                res.clearCookie('cookieKey');
                res.redirect('back');
            }
            
        }) 
    }
};

module.exports = UserController;
