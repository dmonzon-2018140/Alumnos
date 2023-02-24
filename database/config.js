const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_ALUMNO);
        console.log('Base conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error de conexion a la base de datos');
    }
}

module.exports = {
    dbConection
}