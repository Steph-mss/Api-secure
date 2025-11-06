const express = require('express');
const router = express.Router();
const { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');
const { protect, admin } = require('../middlewares/auth');
const { validate, createAuthorRules, updateAuthorRules } = require('../middlewares/validator');

router.route('/')
  .get(getAuthors)
  .post(protect, admin, createAuthorRules(), validate, createAuthor);

router.route('/:id')
  .get(getAuthorById)
  .put(protect, admin, updateAuthorRules(), validate, updateAuthor)
  .delete(protect, admin, deleteAuthor);

module.exports = router;
