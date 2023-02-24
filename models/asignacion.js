const{Schema, model} = require('mongoose');

const AgignacionSchema = Schema({
    alumnos: {
        type: Array,
        required: [true, 'Los alumnos son obligatorios']
    },
    maestro: {
        type: String,
        required: [true, 'El profesor es obligatorio'],
        unique: true
    },
    codigo: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        //enum: ['ALUMNO_ROLE', 'MAESTRO_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    cantidad: {
        type: Number,
        default: true
    }
});

module.exports = model('Asignacion', AgignacionSchema)