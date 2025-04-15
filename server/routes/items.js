const express = require('express');
const router = express.Router();
const {db} = require('../config/firebaseAdmin');
const { FieldValue } = require('firebase-admin').firestore;

// Collection reference
const inventoryRef = db.collection('inventory');

// GET all items for a specific user
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  try {
    const snapshot = await inventoryRef.where('userId', '==', userId).get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST a new item
router.post('/', async (req, res) => {
  const { name, quantity, category, price, userId } = req.body;

  if (!userId || !name || quantity === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newItem = {
      name,
      quantity,
      category,
      price,
      userId,
      createdAt: new Date(),
    };

    const docRef = await inventoryRef.add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// PUT to update an item
router.put('/:id', async (req, res) => {
  const itemId = req.params.id;
  const { name, quantity, category, price } = req.body;

  try {
    await inventoryRef.doc(itemId).update({ name, quantity, category, price });
    res.json({ message: 'Item updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE an item
router.delete('/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    await inventoryRef.doc(itemId).delete();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
