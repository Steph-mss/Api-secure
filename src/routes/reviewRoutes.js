const express = require('express');
const router = express.Router();
const { getReviews, getReviewById, createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middlewares/auth');
const { validate, createReviewRules, updateReviewRules } = require('../middlewares/validator');

router.route('/')
  .get(getReviews)
  .post(protect, createReviewRules(), validate, createReview);

router.route('/:id')
  .get(getReviewById)
  .put(protect, updateReviewRules(), validate, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
