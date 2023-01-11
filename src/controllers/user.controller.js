

const getAllUsers = ( req, res ) => {
    res.json({ message: 'Obteniendo todos los usuarios desde mi route y usando mi controlador' })
};

const getUserById = ( req, res ) => {
    res.json({ message: 'Obteniendo usuario por ID' })
};

const createUser = ( req, res ) => {
    res.json({ message: 'Creando un nuevo usuario' })
};

const updateUser = ( req, res ) => {
    res.json({ message: 'Actualizando usuario' })
};

const deleteUser = ( req, res ) => {
    res.json({ message: 'Eliminando un usuario' })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}