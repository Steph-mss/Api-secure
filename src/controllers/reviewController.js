const Review = require('../models/Review');
const { applyPagination } = require('../utils/pagination');

exports.getReviews = async (req, res, next) => {
  try {
    const { query, pagination } = applyPagination(Review.find(), req.query);
    const reviews = await query.populate('bookId').populate('userId', 'username');
    res.json({ reviews, pagination });
  } catch (error) {
    next(error);
  }
};

exports.getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate('bookId').populate('userId', 'username');
    if (!review) {
      return res.status(404).json({ message: 'Critique non trouvée' });
    }
    res.json(review);
  } catch (error) {
    next(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const review = new Review({ ...req.body, userId: req.user.id });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!review) {
      return res.status(404).json({ message: 'Critique non trouvée ou vous n\'êtes pas le propriétaire' });
    }
    res.json(review);
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!review) {
      return res.status(404).json({ message: 'Critique non trouvée ou vous n\'êtes pas le propriétaire' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};