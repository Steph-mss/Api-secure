const { MongoClient } = require("mongodb");
require("dotenv").config();

async function init() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const db = client.db();

    const requiredCollections = ["users", "books", "reviews", "authors"];

    // Liste des collections existantes
    const existingCollections = await db.listCollections().toArray();
    const existingNames = existingCollections.map((col) => col.name);

    for (const col of requiredCollections) {
      if (!existingNames.includes(col)) {
        await db.createCollection(col);
        console.log(`Collection créée : ${col}`);
      } else {
        console.log(`Collection déjà existante : ${col}`);
      }
    }
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données:",
      error
    );
  } finally {
    await client.close();
  }
}

module.exports = init;
