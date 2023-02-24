const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Asignacion = require('../models/asignacion');
const Curso = require('../models/curso');

const roleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});

    if(!existeRol){
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }
}

const existeAsignacionPorId = async(id) => {
    const existeAlumno = await Asignacion.findById(id);

    if(!existeAlumno){
        throw new Error(`El id ${ id } no existe en la DB`);
    }
}

const existeCursoPorId = async(id) => {
    const existeMaestro = await Curso.findById(id);

    if (!existeMaestro) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }
}

module.exports = {
    roleValido,
    emailExiste,
    existeUsuarioPorId,
    existeAsignacionPorId,
    existeCursoPorId
}