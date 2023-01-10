// Vamos a importar todos nuestros modelos creados
const Categories = require('./categories.models')
const Todos = require('./todos.models');
const TodosCategories = require('./todos-categories.models');
const User = require('./user.models');


const initModels = () => {
    //Así sin llamarlas con paréntesis y sin parámetros. Esto es iniciarlas en frio, era solo para ver como se inicializaban las tablas
    // Categories; // Se quitan porque se están inicializando más abajo y haciendo las relaciones, esto era para ver como se creaban solamente
    // TodosCategories; // Se quitan porque se están inicializando más abajo y haciendo las relaciones, esto era para ver como se creaban solamente
    // Todos;
    // User; 

    // Aquí vamos a crear las relaciones
    // Palabras clave
    // hasOne --> para indicar que tiene un. (Se utiliza para las relaciones de uno a uno ¡UNICAMENTE!)
    // hasMany --> tiene muchos
    // belongsTo --> pertenece a. Cuando lo usamos, sequelize sabe que esa tabla tiene la llave foranea.
    // Ejemplo, hagamos la relación de uno a muchos que tiene users(1 a) --> (muchos) todos
    // Aquí se inicializan y se les asigna las relaciones de una vez, lo de arriba de iniciarlas en frío era de ejemplo
    Todos.belongsTo(User, { as: 'author', foreignKey: 'user_id' }); // un todo pertenece a un usuario. con el belongsTo ya sabemos que aquí está la llave foranea
    User.hasMany(Todos, { as: 'task', foreignKey: 'user_id' }) // Un usuario puede tener muchos todos

    // Relación Many - Many

    TodosCategories.belongsTo(Todos, { as: 'todo', foreignKey: 'todo_id' });
    Todos.hasMany(TodosCategories, { as: 'category', foreignKey: 'todo_id' });

    TodosCategories.belongsTo(Categories, { as: 'category', foreignKey: 'category_id' });
    Categories.hasMany(TodosCategories, { as: 'todo', foreignKey: 'category_id' });
}

module.exports = initModels;