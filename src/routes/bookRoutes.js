const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect, admin } = require('../middlewares/auth');
const { validate, createBookRules, updateBookRules } = require('../middlewares/validator');

router.route('/')
  .get(getBooks)
  .post(protect, admin, createBookRules(), validate, createBook);

router.route('/:id')
  .get(getBookById)
  .put(protect, admin, updateBookRules(), validate, updateBook)
  .delete(protect, admin, deleteBook);

module.exports = router;
