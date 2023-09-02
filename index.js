const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoList = require("./models/todo_list");
const User = require("./models/user");
const cors = require("cors");

mongoose.connect("mongodb+srv://joetiger22222:joetiger22222@cluster0.gtfavmm.mongodb.net/");

app.use(express.json());
app.use(cors());

app.get("/api/todoList/:userId", async (req, res) => {
  try {
    const todoList = await TodoList.find({userId:req.params.userId});
    res.status(200).json(todoList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }  
  
});

// app.get("/api/todoList/:id", async (req, res) => {
//   try {
//     const todoList = await TodoList.findById(req.params.id);
//     res.status(200).json(todoList);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

app.post("/api/todoList", async (req, res) => {
  try {
    const todoList = new TodoList({ name: req.body.name,userId: req.body.userId});
    const newTodoList = await todoList.save();
    res.status(201).json(newTodoList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch("/api/todoList/:id", async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);
    if (req.body.isChecked != null) {
      todoList.isChecked = await req.body.isChecked;
      await todoList.save();
      res.status(200).json(todoList);
    } else {
      res.status(404).json({ message: "error happned" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/todoList/:id", async (req, res) => {
  try {
    await TodoList.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/api/users/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const checkUser=await User.findOne({userName:req.body.userName})
    if(!checkUser){
      const user = await new User({
        userName: req.body.userName,
        password: req.body.password,
      });
      await user.save();
      res.status(200).json(user);
    }else {
      res.status(400).json({message:'userName already exists'})
    }
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/login",async (req, res) => {
  try{
    const user=await User.findOne({userName: req.body.userName, password: req.body.password});
    if(!user){
      return res.status(404).json({ message:'Not Found' });
    }
    res.status(200).json(user);
  }catch(err){
    res.status(400).json({ message: err.message });
  }
})

app.listen(3001, () => {
  console.log("listening on http://localhost");
});
