const jwt = require('jsonwebtoken');

const crearJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid}

        jwt.sign(payload, process.env.SECRET_KEY_TOKEN, {expiresIn: '1h'}, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo crear el token');
            } else {
                resolve(token);
            }
        })
    });
}

module.exports = {
    crearJWT
}