const Author = require('../models/Author');
const { applyPagination } = require('../utils/pagination');

exports.getAuthors = async (req, res, next) => {
  try {
    const { query, pagination } = applyPagination(Author.find(), req.query);
    const authors = await query;
    res.json({ authors, pagination });
  } catch (error) {
    next(error);
  }
};

exports.getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Auteur non trouvé' });
    }
    res.json(author);
  } catch (error) {
    next(error);
  }
};

exports.createAuthor = async (req, res, next) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
};

exports.updateAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!author) {
      return res.status(404).json({ message: 'Auteur non trouvé' });
    }
    res.json(author);
  } catch (error) {
    next(error);
  }
};

exports.deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Auteur non trouvé' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};