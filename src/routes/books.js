const express = require('express');
const connectBD = require('../middlewares/connectBD');
const handleExpectedErrors = require('../functions/handleExpectedErrors');
const EsquemaLivros = require('../models/livro');
const router = express.Router();

/* GET users listing. */
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





module.exports = router;
