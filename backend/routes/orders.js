const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.post('/add', async (req, res) => {
  try {
    const { user, products } = req.body;

    if (!user) {
      throw new Error('Invalid user!');
    }

    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('Invalid products');
    }

    const ordersCollection = req.app.locals.db.collection('orders');
    const productsCollection = req.app.locals.db.collection('products');

    for (const product of products) {
      const { productId, quantity } = product;

      if (!ObjectId.isValid(productId)) {
        throw new Error(`Invalid productId: ${productId}`);
      }

      const productIdObjectID = new ObjectId(productId);
      const existingProduct = await productsCollection.findOne({ _id: productIdObjectID });

      if (!existingProduct || existingProduct.lager === 0 || quantity === 0) {
        throw new Error(`Product ${productId} not found or out of stock`);
      }

      if (quantity > existingProduct.lager) {
        throw new Error(`Order quantity for product ${productId} exceeds available stock`);
      }
    }

    const newOrder = { user, products };
    const result = await ordersCollection.insertOne(newOrder);

    for (const product of products) {
      const { productId, quantity } = product;
      const productIdObjectID = new ObjectId(productId);
      await productsCollection.updateOne(
        { _id: productIdObjectID },
        { $inc: { lager: -quantity } }
      );
    }

    res.status(201).json({ message: 'Order placed successfully!', result });
  } catch (error) {
    console.error('Error processing order: ', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const ordersCollection = req.app.locals.db.collection('orders');
    const orders = await ordersCollection.find({}).toArray();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
