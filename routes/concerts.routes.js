const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getById);
router.post('/concerts', ConcertController.addConc);
router.delete('/concerts/:id', ConcertController.delConc);
router.put('/concerts/:id', ConcertController.updateConc);

module.exports = router;