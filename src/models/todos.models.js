const db = require('../utils/database');
const { DataTypes } = require('sequelize');
const User = require('./user.models');

const Todos = db.define('todos', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_complete' // Sirve para que en la base de datos la columna quede con nombre snake_Case
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        // usamos references para indicar que es una llave foranea
        references: {
            model: User,
            key: 'id' // En string
        }
    }
});

module.exports = Todos;