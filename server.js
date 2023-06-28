const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importe a biblioteca cors
const routes = require('./routes');

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors()); // Use o middleware cors antes das suas rotas
app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
