const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario, getUsuarioPorID } = require('../controllers/usuario');
const { emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getUsuarios);

router.get('/:id', [
    check('id', 'No es ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], getUsuarioPorID);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('password', 'Maximo 6 digitos').isLength({min: 6}),
    check('correo', 'Correo no válido').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], postUsuario);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es ID válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], putUsuario);

router.delete('eliminar/:id', [
    validarJWT,
    check('id', 'No es ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], deleteUsuario);

module.exports = router;