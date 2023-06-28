const database = require('mime-db');
const pool = require('../database');

const skateCo = (req, res) => {
    // Lógica do controlador para buscar dados do banco de dados
    pool.query('SELECT * FROM skateSetup', (error, results) => {
        if (error) {
            console.error('Erro ao consultar dados:', error);
            res.status(500).json({ error: 'fazendo um teste' });
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const criarSkate = (req, res) => {
    const novoSkate = req.body;
    const query = 'INSERT INTO skateSetup(shape, rodinha, rolamentos, trucks, lixa, parafusos, preco, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [novoSkate.shape, novoSkate.rodinha, novoSkate.rolamentos, novoSkate.trucks, novoSkate.lixa, novoSkate.parafusos, novoSkate.preco, novoSkate.imagem];

    pool.query(query, values)
        .then(() => {
            res.status(200).send({ mensagem: 'Skate cadastrado com sucesso!' });
        })
        .catch((erro) => {
            res.status(500).send({ erro: erro });
        });
}




  


  const atualizarSetup = (req, res) => {
    const skateId = req.params.id; // Obtém o ID do skate a ser atualizado
    const skateAtualizado = req.body; // Obtém os dados atualizados do skate
    const query = 'UPDATE skateSetup SET shape = $1, rodinha = $2, rolamentos = $3, trucks = $4, lixa = $5, parafusos = $6, preco = $7 WHERE id = $8';
    const values = [skateAtualizado.shape, skateAtualizado.rodinha, skateAtualizado.rolamentos, skateAtualizado.trucks, skateAtualizado.lixa, skateAtualizado.parafusos, skateAtualizado.preco, skateId];
  
    pool.query(query, values)
      .then(() => {
        res.status(200).send({ mensagem: 'Skate atualizado com sucesso!' });
      })
      .catch((erro) => {
        res.status(500).send({ erro: erro });
      });
  };
  


const excluirSkate = (req, res) => {
    // Lógica do controlador para excluir um registro do banco de dados
    const id = req.params.id;
    pool.query('DELETE FROM skateSetup WHERE id = $1', [id], (error) => {
        if (error) {
            console.error('Erro ao excluir skate:', error);
            res.status(500).json({ error: 'Erro ao excluir skate' });
        } else {
            res.status(200).json({ message: 'Skate excluído com sucesso' });
        }
    });
};



const buscarSkatePorModelo = (req, res) => {
    const shape = req.params.shape; // Obtém o modelo do skate a ser buscado

    const query = 'SELECT * FROM skateSetup WHERE shape ILIKE $1';
    const values = [shape];

    pool.query(query, values)
        .then((result) => {
            if (result.rows.length === 0) {
                res.status(404).send({ mensagem: 'Nenhum skate encontrado com o modelo especificado.' });
            } else {
                res.status(200).send(result.rows);
            }
        })
        .catch((erro) => {
            res.status(500).send({ erro: erro });
        });
}

const buscarSkatesPorPrecoDecrescente = (req, res) => {
    const query = 'SELECT * FROM skateSetup ORDER BY preco DESC';

    pool.query(query)
        .then((result) => {
            res.status(200).send(result.rows);
        })
        .catch((erro) => {
            res.status(500).send({ erro: erro });
        });
}

const buscarModeloPorInicial = (req, res) => {
    const letraInicial = req.params.letraInicial;

    const query = 'SELECT * FROM skateSetup WHERE shape ILIKE $1 || \'%\'';

    pool.query(query, [letraInicial])
        .then((result) => {
            if (result.rows.length === 0) {
                res.status(404).send({ mensagem: 'Nenhum skate encontrado com a letra inicial fornecida.' });
            } else {
                res.status(200).send(result.rows);
            }
        })
        .catch((erro) => {
            res.status(500).send({ erro: erro });
        });
}


module.exports = {

    skateCo,
    criarSkate,
    atualizarSetup,
    excluirSkate,
    buscarSkatePorModelo,
    buscarSkatesPorPrecoDecrescente,
    buscarModeloPorInicial
};
