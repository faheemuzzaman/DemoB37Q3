const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var todos = [
  {
    id: 1,
    todo: "Learn Next.js",
    isDone: true,
  },
  {
    id: 2,
    todo: "Start JS Project",
    isDone: false,
  },
  {
    id: 3,
    todo: "Attend Online Session",
    isDone: false,
  },
];

app.get("/", (req, res) => {
  res.send(todos);
});

app.post("/addtodo", (req, res) => {
  var todo = {
    id: todos.length + 1,
    todo: req.body.todo,
    idone: false,
  };
  todos.push(todo);
  // console.log(todo);
  res.json({ message: "Todo added" });
});

app.delete("/deletetodo/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  const todo = todos.find((s) => s.id === idToDelete);

  if (!todo) {
    res.send(`Todo # ${idToDelete} not found to DELETE`);
  } else {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
  }
});

app.put("/updatetodo/:id", (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  const todo = todos.find((s) => s.id === idToUpdate);

  if (!todo) {
    res.send(`Todo # ${idToUpdate} not found to DELETE`);
  } else {
    todo.isDone = !todo.isDone;

    res.json({ message: "Todo Updated" });
  }
});

app.listen(5000, () => {
  console.log("Server is up and running on http://127.0.0.1:5000");
});
