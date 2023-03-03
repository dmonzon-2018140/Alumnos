const { request, response } = require('express');

const maestroRole = (req = request, res = response, next) => {
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Verificar el role sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'MAESTRO_ROLE') {
        return res.status(500).json({
            msg: `${ nombre } no es Maestro - Sin acceso a esta función`
        });
    }

    next();
}

const alumnoRole = (req = request, res = response, next) => {
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Verificar el role sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;

    if (rol !== 'ALUMNO_ROLE') {
        return res.status(500).json({
            msg: `${ nombre } no es Alumno - Sin acceso a esta función`
        });
    }

    next();
}

const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })
        }

        next();
    }
}

module.exports = {
    maestroRole,
    alumnoRole,
    tieneRole
}