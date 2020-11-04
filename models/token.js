const { DataTypes, Model } = require('sequelize');
const db = require('../cofiguration/db-connection');
var uuid = require('uuid');

class Token extends Model {};

Token.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        field: 'Id'
    },
    refreshToken: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'RefreshToken'
    }
},{
    sequelize: db,
    modelName: 'Token' 
});

Token.beforeCreate(u => u.id = uuid.v1());

Token.sync()

module.exports = Token;