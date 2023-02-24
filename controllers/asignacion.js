const { response, request } = require('express');
const Asignacion = require('../models/asignacion');

const getAsignaciones = async(req = request, res = response) => {
    const query = {estado: true};

    const listaAsignaciones = await Promise.all([
        Asignacion.countDocuments(query),
        Asignacion.find(query)
    ]);

    res.json({
        msg: 'Get Asignaciones',
        listaAsignaciones
    });
}

const postAsignacion = async(req = request, res = response) => {
    const {alumnos, maestro, rol} = req.body;
    const guardarAsignacion = new Asignacion({alumnos, maestro, rol});

    await guardarAsignacion.save();

    res.json({
        msg: 'Post Asignacion',
        guardarAsignacion
    });
}

const putAsignacion = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id, estado, ...resto} = req.body;

    const editarAsignacion = await Asignacion.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put Asignacion',
        editarAsignacion
    });
}

const deleteAsignacion = async(req = request, res = response) => {
    const {id} = req.params;

    const eliminarAsignacion = await Asignacion.findByIdAndUpdate(id, {estado: false});

    res.json({
        msg: 'Delete Asignacion',
        eliminarAsignacion
    });
}

module.exports = {
    getAsignaciones,
    postAsignacion,
    putAsignacion,
    deleteAsignacion
}