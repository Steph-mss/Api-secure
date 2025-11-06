const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

const registerRules = () => {
  return [
    body('username').notEmpty().withMessage('Le nom d\'utilisateur est requis'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  ];
};

const loginRules = () => {
  return [
    body('username').notEmpty().withMessage('Le nom d\'utilisateur est requis'),
    body('password').notEmpty().withMessage('Le mot de passe est requis'),
  ];
};

const createBookRules = () => {
  return [
    body('title').notEmpty().withMessage('Le titre est requis'),
    body('author').notEmpty().withMessage('L\'auteur est requis'),
    body('year').isNumeric().withMessage('L\'année doit être un nombre'),
  ];
};

const updateBookRules = () => {
  return [
    body('title').optional().notEmpty().withMessage('Le titre ne peut pas être vide'),
    body('author').optional().notEmpty().withMessage('L\'auteur ne peut pas être vide'),
    body('year').optional().isNumeric().withMessage('L\'année doit être un nombre'),
  ];
};

const createReviewRules = () => {
  return [
    body('bookId').notEmpty().withMessage('L\'ID du livre est requis'),
    body('rating').isFloat({ min: 1, max: 5 }).withMessage('La note doit être comprise entre 1 et 5'),
  ];
};

const updateReviewRules = () => {
  return [
    body('rating').optional().isFloat({ min: 1, max: 5 }).withMessage('La note doit être comprise entre 1 et 5'),
  ];
};

const createAuthorRules = () => {
  return [
    body('name').notEmpty().withMessage('Le nom est requis'),
    body('nationality').notEmpty().withMessage('La nationalité est requise'),
    body('birthYear').isNumeric().withMessage('L\'année de naissance doit être un nombre'),
  ];
};

const updateAuthorRules = () => {
  return [
    body('name').optional().notEmpty().withMessage('Le nom ne peut pas être vide'),
    body('nationality').optional().notEmpty().withMessage('La nationalité ne peut pas être vide'),
    body('birthYear').optional().isNumeric().withMessage('L\'année de naissance doit être un nombre'),
  ];
};

module.exports = {
  validate,
  registerRules,
  loginRules,
  createBookRules,
  updateBookRules,
  createReviewRules,
  updateReviewRules,
  createAuthorRules,
  updateAuthorRules,
};