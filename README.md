# Mon API Sécurisée

Ceci est une API REST sécurisée Express.js pour une bibliothèque numérique.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-nom-utilisateur/my-secure-api.git
   cd my-secure-api
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :
   ```
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/api_secure
   JWT_SECRET=votre_secret_jwt
   CORS_ORIGIN=http://localhost:5173
   ```

## Utilisation

1. Démarrez le serveur :
   ```bash
   npm start
   ```

   Pour le développement avec rechargement automatique :
   ```bash
   npm run dev
   ```

## Points de terminaison de l'API

### Authentification

- `POST /auth/register`: Enregistrer un nouvel utilisateur.
- `POST /auth/login`: Connecter un utilisateur et obtenir un jeton JWT.

### Livres

- `GET /books`: Obtenir tous les livres.
- `GET /books/:id`: Obtenir un livre par son ID.
- `POST /books`: Créer un nouveau livre.
- `PUT /books/:id`: Mettre à jour un livre par son ID.
- `DELETE /books/:id`: Supprimer un livre par son ID (Admin uniquement).

### Critiques

- `GET /reviews`: Obtenir toutes les critiques.
- `GET /reviews/:id`: Obtenir une critique par son ID.
- `POST /reviews`: Créer une nouvelle critique.
- `PUT /reviews/:id`: Mettre à jour une critique par son ID.
- `DELETE /reviews/:id`: Supprimer une critique par son ID.

### Auteurs

- `GET /authors`: Obtenir tous les auteurs.
- `GET /authors/:id`: Obtenir un auteur par son ID.
- `POST /authors`: Créer un nouvel auteur.
- `PUT /authors/:id`: Mettre à jour un auteur par son ID.
- `DELETE /authors/:id`: Supprimer un auteur par son ID.

## Schémas

### Utilisateur

- `username` (String, requis)
- `password` (String, requis)
- `role` (String, enum: ['user', 'admin'], défaut: 'user')

### Livre

- `title` (String, requis)
- `author` (ObjectId, ref: 'Author', requis)
- `year` (Number, requis)
- `tags` (Tableau de chaînes de caractères)

### Critique

- `bookId` (ObjectId, ref: 'Book', requis)
- `userId` (ObjectId, ref: 'User', requis)
- `rating` (Number, requis, min: 1, max: 5)
- `comment` (String)

### Auteur

- `name` (String, requis)
- `nationality` (String, requis)
- `birthYear` (Number, requis)

## Exemples

### Enregistrer un nouvel utilisateur

```bash
curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'
```

### Se connecter

```bash
curl -X POST http://localhost:4000/auth/login -H "Content-Type: application/json" -d '{"username": "testuser", "password": "password123"}'
```

### Obtenir tous les livres

```bash
curl http://localhost:4000/books
```