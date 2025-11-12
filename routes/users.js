const express = require('express');
const router = express.Router();

// temp in-memory store
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const id = users.length ? users[users.length - 1].id + 1 : 1;
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
});

module.exports = router;
