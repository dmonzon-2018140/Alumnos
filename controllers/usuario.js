const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async(req = request, res = response) => {
    const query = {estado: true};

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).populate('asignacion', 'maestro')
    ]);

    res.json({
        msg: 'Get Usuario',
        listaUsuarios
    });
}

const getUsuarioPorID = async (req = request, res = response) => {

    const { id } = req.params;
    const usuarioById = await Usuario.findById( id ).populate('asignacion', 'maestro');
 
    res.status(201).json( usuarioById );
 
}

const postUsuario = async(req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const usuarioDB = await Usuario.findOne({ nombre });

    if (usuarioDB) {
        return res.status(400).json({
            msg: `El usuario ${usuarioDB.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        asignacion: req.asignacion._id
    }

    const usuario = new Usuario(data);

    await usuario.save();

    res.status(201).json(usuario);
}

const putUsuario = async(req = request, res = response) => {
    const { id } = req.params;
    const { estado, asignacion, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.asignacion = req.asignacion._id;

    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json(usuarioEditado)
}

const deleteUsuario = async(req = request, res = response) => {
    const {id} = req.params;

    const usuarioEliminado = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(201).json(usuarioEliminado);
}

module.exports = {
    getUsuarios,
    getUsuarioPorID,
    postUsuario,
    putUsuario,
    deleteUsuario
}