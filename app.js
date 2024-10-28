// app.js
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

sequelize.sync()
  .then(() => console.log('Tabelas sincronizadas.'))
  .catch((error) => console.error('Erro ao sincronizar as tabelas:', error));

app.listen(3000, () => console.log('Servidor rodando na porta 3000.'));
