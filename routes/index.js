const express = require('express');
const router = express.Router();
const controller = require('../controllers');


router.get('/inicio', controller.skateCo);
router.post('/criar', controller.criarSkate);
router.put('/atulizarSetup/:id', controller.atualizarSetup);
router.delete('/excluir/:id', controller.excluirSkate);
router.get('/buscarShape/:modelo', controller.buscarSkatePorModelo);
router.get('/maiorPreco', controller.buscarSkatesPorPrecoDecrescente);
router.get('/buscarModeloPorInicial/:letraInicial', controller.buscarModeloPorInicial);
module.exports = router;
