const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");


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

const googleSignin = async(req, res=response) => {

    const { id_token } = req.body;

    try {

        const {email, name, img} = await googleVerify( id_token );

        let user = await User.findOne({email});

        if (!user) {
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            };
            
            user = new User(data);
            await user.save();
        };

        if (!user.status) {
            return res.status(401).json({
                msg: 'Contacta con un administrador. Usuario bloqueado'
            });
        }

        const token = await generateJWT( user.id );
        
        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }

}

module.exports = {
    login,
    googleSignin
}