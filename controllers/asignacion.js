const { response, request } = require('express');
const Asignacion = require('../models/asignacion');

const getAsignaciones = async (req = request, res = response) => {
    const query = { estado: true };

    const listaAsignaciones = await Promise.all([
        Asignacion.countDocuments(query),
        Asignacion.find(query).populate('usuario', 'correo').populate('curso', 'nombre')
    ]);

    res.json({
        msg: 'Get Asignaciones',
        listaAsignaciones
    });
}

const getAsignacionPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const asignacionById = await Asignacion.findById(id).populate('usuario', 'nombre').populate('curso', 'nombre');

    res.status(201).json(asignacionById);

}

const postAsignacion = async (req = request, res = response) => {
    const { estado, usuario, ...body } = req.body;
    const asignacionDB = await Asignacion.findOne({ nombre: body.nombre });

    if (asignacionDB) {
        return res.status(400).json({
            msg: `La asignacion ${ asignacionDB.nombre }, ya existe en la DB`
        });
    }

    const data = {
        ...body,
        salon: body.salon.toUpperCase(),
        usuario: req.usuario._id
    }

    const asignar = await Asignacion( data );

    await asignar.save();

    res.status(201).json( asignar );
}

const putAsignacion = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...restoData } = req.body;

    if (restoData.salon) {
        restoData.salon = restoData.salon.toUpperCase();
        restoData.usuario = req.usuario._id;
    }

    const editarAsignacion = await Asignacion.findByIdAndUpdate(id, restoData, {new: true});

    res.status(201).json({
        msg: 'Put Asignacion',
        editarAsignacion
    });
}

const deleteAsignacion = async (req = request, res = response) => {
    const { id } = req.params;

    const eliminarAsignacion = await Asignacion.findByIdAndUpdate(id, { estado: false }, {new: true});

    res.json({
        msg: 'Delete Asignacion',
        eliminarAsignacion
    });
}

module.exports = {
    getAsignaciones,
    getAsignacionPorId,
    postAsignacion,
    putAsignacion,
    deleteAsignacion
}