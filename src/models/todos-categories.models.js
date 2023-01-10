const db = require('../utils/database');

const { DataTypes } = require('sequelize');
const Todos = require('./todos.models');
const Categories = require('./categories.models');

const TodosCategories = db.define('todos_categories', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    todoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'todo_id',
        references: {
            model: Todos,
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id',
        references: {
            model: Categories,
            key: 'id'
        }
    }
},
{
    timestamps: false
});

module.exports = TodosCategories;