const express = require('express'); // importar express
const app = express();
app.use(express.json());
const db = require('./utils/database'); // importar db
// Crear una instancia de express
// localhost:8000
const PORT = 8000;

// Importamos initModels
const initModels = require('./models/initModels');
const User = require('./models/user.models');
const Todos = require('./models/todos.models')

// Probando la conexión a la db
db.authenticate()
    .then( () => console.log('autenticación exitosa'))
    .catch( (err) => console.log(err));


// Ejecutamos función initmodels
initModels();

// Usamos el método sync
// de Sequelize para realizar la sincronización 
// db.sync() // Sincronizar normal
// db.sync( {alter:true} ) // Sincronizar y alterar tablas
// db.sync( {force:true} ) // Sincronizar y fuerza la alteración de las tablas
db.sync()
    .then( () => console.log('base de datos sincronizada'))
    .catch( (err) => console.log(err));


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Bienvenido al servidor' })
});


// Definir las rutas de nuestros endpoints (de ahora en adelante ep)
// Todas las consultas de usuarios
// localhost:8000/users --> todo para usuarios
// localhost:8000/todos --> todo para tareas

// GET a /users
app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users)
})

app.get('/users/:id', async ( req, res ) => {
    try {
        // vamos a obtener el resultado de consultar a todos los usuarios de la DB, con los métodos de los modelos como findAll
        // const users = await User.findAll(); // Esto es el equivaente a un SELECT * FROM user;
        // res.status(200).json(users)
        const { id } = req.params;
        const result = await User.findByPk(id, {
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'] // Obtener una respuesta sin estos atributos
            }
        })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
})

app.get('/users/username/:username', async ( req, res ) => {
    try {
        const { username } = req.params;
        const result = await User.findOne({ 
            where: { username },
            attributes: ['id', 'username', 'email'] // Obtener una respuesta con estos atributos
        }); // Es equivalente a --> SELECT * FROM users WHERE users.id = 1;
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
})


app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
});


// Vamos a insertar información en nuestra base de datos desde Node
// Para crear un nuevo registro en nuestra base de datos, debemos atender un método POST.
// El body es un archivo json, hay que usar el middleware de express para que del json obtengamos un objeto manipulable por js. 
app.post('/users', async (req, res) => {
    try {
        const newUser = req.body;
        const results = await User.create(newUser);
        res.status(201).json(results)
    } catch (error) {
        res.status(400).json(error.message)
        console.log(error)
    }
})

// Solo vamos a cambiar el password

app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const field = req.body;
        const result = await User.update(field, {
            where: { id }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message)
        console.log(error)
    }
})

// Eliminar usuario

app.delete('users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.destroy({
            where: { id }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message)
    }
})

// Consultar información con endpoints (crear, obtener, actualizar y eliminar)

/////////////// Tarea //////////////////

// 1. Obtener todas las tareas

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todos.findAll();
        res.status(200).json(todos)
    } catch (error) {
        res.status(400).json(error.message)
    }
})


// 2. Obtener tareas por id
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todos.findByPk(id) 
        res.status(200).json(todo);  
    } catch (error) {
        res.status(400).json(error.message)
    }
    
});

// 3. Crear tareas
app.post('/todos', async (req, res) => {
    try {
        const newTodo = req.body;
        const result = await Todos.create(newTodo);
        res.status(201).json(result) 
    } catch (error) {
        res.status(400).json(error.message)
    }
    
})


// 4. Actualizar estado de tareas (is_complete)
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const field = req.body;
        const result = await Todos.update(field, { where: {
            id
        }});
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message)
    }
    
})

// 5. Eliminar tareas por id
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todos.destroy({
            where:{ id }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message)
    }
    
})
