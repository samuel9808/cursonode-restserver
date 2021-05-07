const { Router } = require('express');
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields')
const { isValidRole, emailExist, idExist } = require('../helpers/db-validators');


const { usersGet,
        usersPost,
        usersPatch,
        usersPut,
        usersDelete } = require('../controllers/usersControl');

const router = Router();

router.get('/', usersGet);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idExist),
    check('role').custom(isValidRole),
    validateFields
], usersPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 caracteres.').isLength({min: 6}),
    check('email').custom(emailExist),
    // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields
], usersPost);


router.patch('/', usersPatch);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idExist),
    validateFields
], usersDelete);


module.exports = router;
