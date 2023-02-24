const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre del curso es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    asignacion: {
        type: Schema.Types.ObjectId,
        ref: 'Asignacion',
        required: true
    }
});


module.exports = model('Curso', CursoSchema);