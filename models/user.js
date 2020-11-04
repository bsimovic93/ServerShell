const { DataTypes, Model } = require('sequelize');
const db = require('../cofiguration/db-connection');
var uuid = require('uuid');

class User extends Model {}

User.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        field: 'Id'
    },
    username: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        field: 'Username'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        field: 'Password'
    },
    email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        field: 'Email'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'IsActive'
    }
}, {
   sequelize: db,
   modelName: 'User' 
});

User.beforeCreate(u => u.id = uuid.v1());


User.sync()
module.exports = User;