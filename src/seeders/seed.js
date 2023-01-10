const db = require('../utils/database');
const User = require('../models/user.models');
const Todos = require('../models/todos.models')

const users = [
    {username: 'Camilo', email: 'caac9530@gmail.com', password: '12345'},
    {username: 'Juan', email: 'juan@gmail.com', password: '12345'},
    {username: 'Pedro', email: 'pedro@gmail.com', password: '12345'},
];

const todos = [
    {title: 'Tarea 1', description: 'Descripción para 1', userId: 1},
    {title: 'Tarea 2', description: 'Descripción para 2', userId: 2},
    {title: 'imposible 1', userId: 2},
    {title: 'Dormir', description: 'no me dejan dormir', userId: 3}
];

// const categories = [];

// const TodosCategories = [];


// Ya solo falta crear la información que tenemos en los arreglos dentro de la base de datos. Lo que hay que hacer es Sincronizar la base de datos
// Cada modelo tiene los siquientes métodos:
// create
// findOne, getAll, findByPK
// update
// destroy

db.sync({ force: true })
    .then( () => {
        console.log('Iniciando la siembre de informacion');
        users.forEach( user => User.create(user)); // Esto es equivalente a INSERT INTO user () VALUES (cada usuario)
        setTimeout(() => {
            todos.forEach( todo => Todos.create(todo))
        }, 100)
        
    })
    .catch( err => console.log(err) )