const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/:id', TestimonialController.getById);
router.route('/testimonials/random', TestimonialController.getRandom);
router.post('/testimonials', TestimonialController.addTesti);
router.put('/testimonials/:id', TestimonialController.updateTesti);
router.delete('/testimonials/:id', TestimonialController.deleteTesti);

module.exports = router;