const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true , 'El rol es obligatorio'],
        enum: ['ALUMNO_ROLE', 'MAESTRO_ROLE']
    }
});


module.exports = model('Role', RoleSchema);