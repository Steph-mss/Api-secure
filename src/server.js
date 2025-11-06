require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");
const corsOptions = require("./config/cors");
const { globalLimiter, loginLimiter } = require("./config/rateLimit");
const errorHandler = require("./middlewares/errorHandler");
const initDB = require("./config/init.mongodb.js");

const startServer = async () => {
  await initDB();
  await connectDB();

  const app = express();

  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(corsOptions));
  app.use(globalLimiter);

  app.use("/auth", loginLimiter, require("./routes/authRoutes"));
  app.use("/books", require("./routes/bookRoutes"));
  app.use("/reviews", require("./routes/reviewRoutes"));
  app.use("/authors", require("./routes/authorRoutes"));

  app.use(errorHandler);

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () =>
    console.log(`Serveur en cours d\'exécution sur le port ${PORT}`)
  );
};

startServer();
