const express = require('express');
const connectBD = require('../middlewares/connectBD');
const handleExpectedErrors = require('../functions/handleExpectedErrors');
const EsquemaLivros = require('../models/livro');
const router = express.Router();


router.post('/criar', connectBD, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']
    let { titulo, paginas, isbn, editora } = req.body;
    const respostaBD = await EsquemaLivros.create({ titulo, paginas, isbn, editora });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro criado com sucesso",
      resposta: respostaBD
    })

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});

router.put('/editar/:id', connectBD, async function (req, res) {
  try {
    // #swagger.tags = ['Livros']
    let idBook = req.params.id
    let { titulo, paginas, isbn, editora } = req.body;

    const checkBook = await EsquemaLivros.findOne({ _id: idBook });
    if (!checkBook) throw new Error("Livro não encontrado")

    const updateBooks = await EsquemaLivros.updateOne({ _id: idBook }, { titulo, paginas, isbn, editora });

    if (updateBooks?.modifiedCount > 0) {
      const dataBooks = await EsquemaLivros.findOne({ _id: idBook });

      res.status(200).json({
        status: "OK",
        statusMensagem: "Livro atualizado com sucesso",
        resposta: dataBooks
      })
    }

  } catch (error) {
    return tratarErrosEsperados(res, error);
  }
});





module.exports = router;
