const { Router } = require('express');
const {check} = require('express-validator');
const { getAsignaciones, postAsignacion, putAsignacion, deleteAsignacion, getAsignacionPorId } = require('../controllers/asignacion');
const { existeAsignacionPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { alumnoRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getAsignaciones);

router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeAsignacionPorId ),
    validarCampos
],  getAsignacionPorId);

router.post('/agregar', [
    validarJWT,
    check('salon', 'El salon es obligatorio').not().isEmpty(),
    validarCampos
], postAsignacion);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('salon', 'El salon es obligatorio').not().isEmpty(),
    check('id').custom( existeAsignacionPorId ),
    validarCampos
], putAsignacion);

router.delete('/eliminar/:id', [
    validarJWT,
    alumnoRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeAsignacionPorId),
    validarCampos
], deleteAsignacion);

module.exports = router;