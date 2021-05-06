const { response, request } = require('express');

const usersGet = (req = request, res = response) => {

    const {q, nombre, apikey, page = 1, limit = 5} = req.query;

    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}
const usersPost = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: "post API - Controlador",
        nombre, 
        edad
    });
}
const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: "put API - Controlador",
        id

    });
}
const usersPatch = (req, res = response) => {
    res.json({
        msg: "patch API - Controlador"
    });
}
const usersDelete = (req, res = response) => {
    res.json({
        msg: "delete API - Controlador"
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPatch,
    usersPut,
    usersDelete
}