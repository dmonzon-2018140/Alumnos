//Importaciones de nodejs
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.asignacionPath = '/api/asignaciones';
        this.cursoPath = '/api/cursos';
        this.usuariosPath = '/api/usuarios';

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.asignacionPath, require('../routes/asignacion'));
        this.app.use(this.cursoPath, require('../routes/curso'));
        this.app.use(this.usuariosPath, require('../routes/usuario'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor activo en puerto', this.port);
        })
    }
}

module.exports = Server;