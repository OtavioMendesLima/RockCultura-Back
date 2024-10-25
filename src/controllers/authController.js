const authService = require('../services/authService');

const authController = {
    registerUser: (req, res) => {
        const { nome, email, senha, telefone } = req.body;
        authService.registerUser(nome, email, senha, telefone, (err, result) => {
            if (err) return res.status(500).json({ error: 'Erro ao registrar usuário.' });
            res.status(201).json({ message: 'Usuário registrado com sucesso!' });
        });
    },
    loginUser: (req, res) => {
        const { email, senha } = req.body;
        authService.loginUser(email, senha, (err, result) => {
            if (err || !result) return res.status(401).json({ error: 'Credenciais inválidas.' });
            res.json({ message: 'Login realizado com sucesso!', user: result });
        });
    }
};


module.exports = 
    authController
    
;
