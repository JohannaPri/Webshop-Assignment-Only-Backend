const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.post('/add', async (req, res) => {
  try {
    const { name, description, price, lager } = req.body;
    const productsCollection = req.app.locals.db.collection('products');
    const newProduct = { name, description, price, lager };
    const result = await productsCollection.insertOne(newProduct);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const productsCollection = req.app.locals.db.collection('products');
    const products = await productsCollection.find({}).toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const productIdObjectID = new ObjectId(productId);
  const productsCollection = req.app.locals.db.collection('products');
  const product = await productsCollection.findOne({ _id: productIdObjectID });
  if (productId) {
    res.json({ product });
  } else {
    res.status(401).json({ message: 'Product not found'});
  }
});

module.exports = router;
