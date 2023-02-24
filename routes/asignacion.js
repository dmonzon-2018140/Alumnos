const { Router } = require('express');
const {check} = require('express-validator');
const { getAsignaciones, postAsignacion, putAsignacion, deleteAsignacion } = require('../controllers/asignacion');
const { roleValido, existeAsignacionPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getAsignaciones);

router.post('/agregar', [
    check('alumnos', 'Los alumnos son obligatorios').not().isEmpty(),
    check('rol').custom(roleValido),
    validarCampos
], postAsignacion);

router.put('/editar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeAsignacionPorId),
    check('rol').custom(roleValido),
    validarCampos
], putAsignacion);

router.delete('/eliminar/:id', [
    validarJWT,
    tieneRole('ALUMNO_ROLE', 'MAESTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeAsignacionPorId),
    validarCampos
], deleteAsignacion);

module.exports = router;