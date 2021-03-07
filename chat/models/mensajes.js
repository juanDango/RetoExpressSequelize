const { DataTypes, Model } = require('sequelize');
const sequelize = require('../lib/sequelize')

class Message extends Model{
}

Message.init({
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ts:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Mensajes',
        timestamps: false
    }
);

Message.sync();

module.exports = Message;