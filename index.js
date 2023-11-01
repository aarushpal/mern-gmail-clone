import express from "express";
import Connection from "./database/db.js";
import routes from "./routes/route.js";
import cors from "cors";
import path from "path";

const __dirname = path.resolve();

const app = express();

//cors - Cross Origin Resource Sharing
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
//all urls go through routes
//following mvt(model- view- template) type of scheme
app.use("/", routes);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const PORT = process.env.PORT || 8000;

//makes connection to the database
Connection();
app.listen(PORT, () => console.log(`Server is started on PORT ${PORT}`));
