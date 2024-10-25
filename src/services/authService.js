const db = require('../database/mysql');
const bcrypt = require('bcrypt');

const authService = {
    registerUser: (nome, email, senha, telefone, callback) => {
        const hashedPassword = bcrypt.hashSync(senha, 10);
        const query = 'INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)';
        db.query(query, [nome, email, hashedPassword, telefone], callback);
    },
    loginUser: (email, senha, callback) => {
        const query = 'SELECT * FROM usuarios WHERE email = ? AND ativo = TRUE';
        db.query(query, [email], (err, result) => {
            if (err || result.length === 0) return callback(err, null);
            const user = result[0];
            const isPasswordValid = bcrypt.compareSync(senha, user.senha);
            callback(null, isPasswordValid ? user : null);
        });
    }
};

module.exports = authService;
