const{Schema, model} = require('mongoose');

const AgignacionSchema = Schema({
    salon: {
        type: String,
        required: [true, 'El salon es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    fecha: {type: Date}
    
});

module.exports = model('Asignacion', AgignacionSchema)