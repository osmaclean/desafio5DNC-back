function routes(app) {
  app.use('/users', require('./routes/users.js'));
  app.use('/livros', require('./routes/books.js'));
  return;
}

module.exports = routes;