const { request, response } = require("express")


const isAdminRole = (req = request, res = response, next) => {

    if (!req.authUser){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        })
    }
    const { role, name } = req.authUser;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } no es administrador - No puede hacer esto`
        });
    }
    next();
}

const hasRoles = ( ...roles ) => {
    return (req = request, res = response, next) => {
        if (!req.authUser){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            });
        }

        if ( !roles.includes( req.authUser.role )) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    isAdminRole,
    hasRoles
}