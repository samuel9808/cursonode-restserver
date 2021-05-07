const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usersPath = '/api/users';


        // Conectar a DB

        this.conectarDB();

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        // Parseo y lectura del body

        this.app.use( express.json() );

        // Directorio público
        this.app.use(express.static('public') );
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'))
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
          });
    }
}

module.exports = Server;