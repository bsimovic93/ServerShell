const User = require('../models/user');


class UserService {

    static async getAllUsers() {
        return await User.findAll(); 
    }

    static async getUserById(id) {
        return await User.findOne({id: id});
    }
}

module.exports = UserService;