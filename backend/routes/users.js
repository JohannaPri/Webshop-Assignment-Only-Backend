const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

router.post('/add', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const usersCollection = req.app.locals.db.collection('users');
    const newUser = {  name, email, password };
    const result = await usersCollection.insertOne(newUser);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

router.get('/', async (req, res) => {
  try {
    const usersCollection = req.app.locals.db.collection('users');
    const users = await usersCollection.find({}, { projection: { password: 0 } }).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.body.id;
    const userIdObjectID = new ObjectId(userId);
    const usersCollection = req.app.locals.db.collection('users');
    const user = await usersCollection.findOne({ _id: userIdObjectID });
    if (!user) {
      res.status(404).json({ message: 'User not found'});
      return;
    }
    res.json(user);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const usersCollection = req.app.locals.db.collection('users');
  const user = await usersCollection.findOne({ email: email, password: password});
  if (user) {
    res.json({ message: 'Login successful', user});
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
