const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status:true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .limit(Number(limit))
            .skip(Number(from))
    ]);

    res.json({
        total,
        users
    });
}
const usersPost = async(req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({name, email, password, role});

    // Encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    // Guardar en BD
    await user.save();

    res.json(user);
}
const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    // TODO validar contra db
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json({
        msg: "put API - Controlador",
        user

    });
}
const usersPatch = (req, res = response) => {
    res.json({
        msg: "patch API - Controlador"
    });
}
const usersDelete = async(req, res = response) => {

    const { id } = req.params; 

    // Fisicamente lo borramos
    // const user = await User.findByIdAndDelete(id);
    
    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({user});
}

module.exports = {
    usersGet,
    usersPost,
    usersPatch,
    usersPut,
    usersDelete
}