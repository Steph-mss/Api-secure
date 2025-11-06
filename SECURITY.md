# Politique de Sécurité (version plus humaine)

Ici on explique comment l’API est protégée et ce qu’on a mis en place pour éviter les soucis de sécu.

## Les protections qu’on utilise

- **JWT** : Quand un utilisateur se connecte avec succés, on lui donne un jeton JWT. Il doit ensuite le mettre dans l’en-tête `Authorization` pour accéder aux routes protégées. Sans ça, ça passe pas.

- **bcrypt** : Les mots de passe ne sont jamais gardés en clair. Ils sont d’abord hashés avec `bcrypt` avant de finir dans la base. Comme ça, même si quelqu’un fouine dedans, il verra rien d’utilisable.

- **Rate Limiting** : Pour éviter les attaques en mode force brute, y’a une limite sur le nombre de requêtes possibles. Il y a une limite générale pour tout le monde, et une limite encore plus strict sur les tentatives de login.

- **CORS** : On bloque les origines qu’on veux pas. Seule une origine précise peut envoyer des requêtes. Le reste, c’est refusé direct.

- **RBAC** : L’API gère des rôles (genre admin). Certaines routes sont juste pour les admins, les utilisateurs normaux peuvent pas y toucher.

- **Validation des entrées** : On vérifie toutes les données envoyées avec `express-validator`. Ça évite les injections cheloues, le XSS, etc. Bref on nettoie ce qui rentre.

- **Logging** : On utilise `morgan` pour garder une trace des requêtes. Ça aide si on doit comprendre un comportement bizarre ou trouver une activité suspecte.

- **Helmet** : Le middleware `helmet` met en place tout un tas d’en-têtes de sécu. Ça protège contre plusieurs attaques web connues sans qu’on ai besoin d’y penser tous les jours.

## Signaler un problème

Si jamais vous tombez sur une faille ou un truc suspect, ouvrez une issue sur GitHub. On s’en occupera dès que possible.

---

Si tu veux une version encore plus relachée, plus technique, ou plus courte, dis-moi ce que tu préfére.
