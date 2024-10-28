const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Ajuste o caminho se necessário

const app = express();
app.use(cors());
app.use(express.json());

// Montando a rota /api para userRoutes
app.use('/api', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
