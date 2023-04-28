const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const {
  getCompliment,
  getFortune,
  getDescription,
  postToDo,
  editToDo,
  deleteList,
} = require("./controller");

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/describe", getDescription);
app.post("/api/todo", postToDo);
app.put("/api/todo", editToDo);
app.delete("/api/todo", deleteList);

app.listen(4000, () => console.log("Server running on 4000"));
