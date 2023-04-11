const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let item = ["test"];

mongoose
  .connect(
    "mongodb+srv://nelsoncanonce99:test123@cluster0.w54qa4p.mongodb.net/todoListDB"
  )
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log("Mongo Error", err));

//Schema
const todoSchema = new mongoose.Schema({
  todoTitle: {
    type: String,
    required: true,
  },
});

const Todo = new mongoose.model("todo", todoSchema);

app.get("/", async (req, res) => {
  const allItems = await Todo.find({});
  let day = date.getDate();
  // res.render("list");
  res.render("list", { listTitle: day, newListItem: allItems }); // kindOfday = ejs Variable
  //render-just return the rendered HTML.
});

app.post("/", async (req, res) => {
  item = req.body.newItem;

  const result = await Todo.create({
    todoTitle: item,
  });
  console.log("result", result);

  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const checkedItemId = req.body.checkBox;

  await Todo.findByIdAndDelete(checkedItemId)
    .then(() => console.log("deleted succesfully"))
    .catch((err) => console.log(err));

  res.redirect("/");
});

app.get("/work", async (req, res) => {
  const allItems = await Todo.find({});
  res.render("list", { listTitle: "Work List", newListItem: allItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
