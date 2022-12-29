const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth_routes = require('./routes/auth.routes');

const connectionString =
  "mongodb+srv://shaily:shaily@upgradcluster.exw4wt8.mongodb.net/Capstone";

mongoose
  .connect(connectionString)
  .then((res) => console.log("Connected to db successfully"))
  .catch((ex) => console.log(ex));

const app = express();

const corsOptions = {
  exposedHeaders: ["x-auth-token", "Authorization"],
};

app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

auth_routes(app);

app.listen(3001, () => console.log("Listening on port 3001....."));