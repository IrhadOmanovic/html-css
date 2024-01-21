const express = require('express');
const productsRouter = require('./routes/products.js');
var cors = require('cors')
const app = express();

app.use(cors());
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/products', productsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});