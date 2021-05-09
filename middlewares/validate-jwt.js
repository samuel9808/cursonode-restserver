const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = async ( req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No existe token en la petición.'
        })
    }
    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        
        const authUser = await User.findById(uid)

        // Verificar status del authUser

        if (!authUser) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe'
            })
        }

        if (!authUser.status) {
            return res.status(401).json({
                msg: 'Token no válido - Status false'
            })
        }

        req.authUser = authUser;

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            'msg':'Token no válido.'
        });
    }

}

module.exports = {
    validateJWT
}