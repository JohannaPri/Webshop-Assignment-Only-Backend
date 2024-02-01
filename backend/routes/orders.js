const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');


router.post('/add', async(req, res) => {
  try {
    const { user, products } = req.body;
    const ordersCollection = req.app.locals.db.collection('orders');
    const productsCollection = req.app.locals.db.collection('products');
    const newOrder = { user, products };
    const result = await ordersCollection.insertOne(newOrder);

    products.forEach(async (product) => {
      const { productId, quantity } = product;

      if (!ObjectId.isValid(productId)) {
        throw new Error(`Invalid productId: ${productId}`);
      }

      const productIdObjectID = new ObjectId(productId);
      const existingProduct = await productsCollection.findOne({ _id: productIdObjectID });

      if (!existingProduct || existingProduct.lager === 0 || quantity === 0) {
        throw new Error(`Product ${productId} not found or lager is 0`);
      }

      const updateResult = await productsCollection.updateOne(
        { _id: productIdObjectID },
        { $inc: { lager: -quantity } }
      );

      if (updateResult.modifiedCount === 0) {
        throw new Error(`Failed to update product ${productId}`);
      }
    });

    res.status(201).json(result);
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
