const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/usuario');
const { emailExiste, existeUsuarioPorId, roleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/', getUsuarios);

router.post('/agregar', [
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('password', 'Maximo 6 digitos').isLength({min: 6}),
    check('correo', 'Correo no válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(roleValido),
    validarCampos
], postUsuario);

router.put('/editar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(roleValido),
    validarCampos
], putUsuario);

router.delete('eliminar/:id', [
    validarJWT,
    tieneRole('MAESTRO_ROLE', 'ALUMNO_ROLE'),
    check('id', 'No es ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], deleteUsuario);

module.exports = router;