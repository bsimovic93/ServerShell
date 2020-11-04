const Token = require('../models/token')
const User = require('../models/user');
const AuthError  = require('./errors/auth-error');
const bcrypt = require('bcrypt');


exports.module = function auth(req, res, next) {
    if (req.headers.authentication) {
        next();
    }
    return res.sendStatus(401);
} 

class OAuthServivce {
    static async saveToken(token) {

        const userToken = {
            refreshToken: token
        }
        await Token.create(userToken);
    }
    static async getAllTokens() {
        const refreshTokens = await Token.findAll();
        return refreshTokens;
    }
    static async registerUser(user) {
        
        if (user.password !== user.confirmPassword) {
            throw new AuthError('Passwords do not match.');
        }

        let emailRegEx = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
        if (!emailRegEx.test(String(user.email).toLowerCase())) {
            throw new AuthError('Email is not valid format');
        }

        // check if username and passwords match the constraints 
        // username min 6 no spec characters no space 
        // password min 6 at least 1 spec chat and 1 number


        let hashedPassword = await bcrypt.hash(user.password, 10);
        let newUser = {
            username: user.username,
            password: hashedPassword,
            email: user.email
        }
        await User.create(newUser);
    } 
    static async loginUser(user) {
        const loginUser = await User.findOne({where: {username: user.username}});
        if (!loginUser) {
            throw new AuthError('No user with that username found');
        }
        if (!loginUser.isActive) {
            throw new AuthError('User did not confirm the email!');
        }
        if (await !bcrypt.compare(user.password, loginUser.password)) {
            throw new AuthError('Username or password does not match');
        }
    }
}

module.exports = OAuthServivce;