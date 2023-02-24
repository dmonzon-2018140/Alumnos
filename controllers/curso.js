const { request, response } = require('express');
const Curso = require('../models/curso');

const getCursos = async (req = request, res = response) => {
    const query = { estado: true };

    const listaCursos = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query).populate('asignacion', 'alumnos')
    ]);

    res.json({
        msg: 'get Curso',
       listaCursos
    });

}


const getCursoPorID = async (req = request, res = response) => {

  const { id } = req.params;
  const cursoById = await Categoria.findById( id ).populate('usuario', 'alumnos');

  res.status(201).json( cursoById );

}


const postCurso = async (req = request, res = response) => {
   const nombre = req.body.nombre.toUpperCase();

   const cursoDB = await Curso.findOne({ nombre });

   if (cursoDB) {
       return res.status(400).json({
           msg: `El curso ${cursoDB.nombre}, ya existe`
       });
   }

   const data = {
       nombre,
       asignacion: req.asignacion._id
   }

   const curso = new Curso(data);

   await curso.save();

   res.status(201).json(curso);

}


const putCurso = async (req = request, res = response) => {

   const { id } = req.params;
   const { estado, asignacion, ...resto } = req.body;

   resto.nombre = resto.nombre.toUpperCase();
   resto.asignacion = req.asignacion._id;

   const cursoEditado = await Curso.findByIdAndUpdate(id, resto, { new: true });

   res.status(201).json(cursoEditado);

}

const deleteCurso = async (req = request, res = response) => {

   const { id } = req.params;

   const cursoEliminado = await Curso.findByIdAndUpdate(id, { estado: false }, { new: true });

   res.status(201).json(cursoEliminado);

}




module.exports = {
   getCursos,
   getCursoPorID,
   postCurso,
   putCurso,
   deleteCurso
}