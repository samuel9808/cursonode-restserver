const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin } = require('../controllers/authControl');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/google',[
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validateFields
], googleSignin);


module.exports = router;