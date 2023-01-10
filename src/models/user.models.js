// Instancia para la conexión de la db
const db = require('../utils/database');
// Tipos de datos de sequelize
const { DataTypes } = require('sequelize');


// definir un modelo (abstacción de una tabla)
// parámetro 1 --> nombre tabla, parametro 2 --> objeto
const User = db.define( 'user', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = User;