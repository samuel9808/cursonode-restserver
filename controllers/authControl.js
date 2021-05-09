const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        // Verificar email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password incorrectos - Email'
            });
        }
        // User activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'User / Password incorrectos - Status: False'
            });
        }

        // Verificar passwd
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password incorrectos - Password'
            });
        }

        // Generar JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Algo salió mal'
        })
    }

}

module.exports = {
    login
}