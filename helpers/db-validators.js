const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const roleExist = await Role.findOne({role});
    if (!roleExist) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }  
}

const idExist = async(id) => {
    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`El id ${id} no existe.`)
    }  
}

const emailExist = async(email = '' ) => {
    const exist = await User.findOne({email})
    if (exist) {
        throw new Error(`El email ${email} ya está siendo utilizado`)
    }
} 




module.exports = {
    isValidRole,
    emailExist,
    idExist
}