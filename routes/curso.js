const { Router } = require('express');
const { check } = require('express-validator');
const { getCursos, getCursoPorID, postCurso, putCurso, deleteCurso } = require('../controllers/curso');
const { existeCursoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getCursos);

router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
], getCursoPorID);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postCurso);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCursoPorId ),
    validarCampos
], putCurso);

router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es id de Mongo Válido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
], deleteCurso);

module.exports = router;