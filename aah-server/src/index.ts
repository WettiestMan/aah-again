import express from "express";
import { connectToDB, fetchUsers, fetchUserById, insertUser, updateUser, deleteUser } from "./dbcalls.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.SERVER_PORT ?? "9001";

app.get("/api", (request, response) => {
  response.send("Hello world!");
  console.log("Response sent");
});

app.get("/api/users", (request, response) => {
  fetchUsers()
    .then((users) => response.json(users))
    .catch(() => {
      response.status(500).send("unable to fetch data");
    });
});

app.get("/api/users/:id", (request, response) => {
  fetchUserById(parseInt(request.params.id))
    .then((user) => {
      if (user) {
        response.json(user);
      } else {
        response.status(404).send("User not found");
      }
    })
    .catch(() => response.status(500).send("Internal server error"));
});

app.post("/api/users", (request, response) => {
  insertUser(request.body.name, request.body.email)
    .then((user) => {
      if (user) {
        response.status(201).json({ updated: true });
      } else {
        response.status(400).send("Error at adding user");
      }
    })
    .catch(() => response.status(500).send("Internal server error"));
});

app.put("/api/users/:id", (request, response) => {
  updateUser(request.body.email, parseInt(request.params.id))
    .then((user) => {
      if (user) {
        response.json({ updated: true });
      } else {
        response.status(404).send("Error at updating user");
      }
    })
    .catch(() => response.status(500).send("Internal server error"));
});

app.delete("/api/users/:id", (request, response) => {
  deleteUser(parseInt(request.params.id))
    .then((user) => {
      if (user) {
        response.json({ updated: true });
      } else {
        response.status(404).send("Error at deleting user");
      }
    })
    .catch(() => response.status(500).send("Internal server error"));
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "../../aah-client/dist")));
app.get(/.*/, (request, response) => {
  response.sendFile(path.join(__dirname, "../../aah-client/dist/index.html"));
});

app.listen(port, () => {
  connectToDB();
  console.log(`aah listening on port ${port}`);
});
