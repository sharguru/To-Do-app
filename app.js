const express =require ("express")

const mongodb = require("mongodb")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/uTodoApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const todoSchema = new mongoose.Schema({
  text:String,
  checked:Boolean,
})

const Todo = new mongoose.model("Todo",todoSchema)

app.get("/",(req,res)=>{
    Todo.find({},(err,foundList)=>{
  
      err ? console.log(err) : res.send(foundList)
    })
})

app.post("/",(req,res)=>{
  const newTodo = req.body;
  Todo.insertMany([newTodo],err => err && console.log(err))
})

app.delete("/",(req,res)=>{
  Todo.deleteOne({_id:req.body.id},(err,res) => err ? console.log(err) : console.log("Deleted") );
  res.redirect("/")
})

app.put("/",(req,res)=>{
  const putData = req.body
  // const {id , checked} = req.body
  // console.log([id,checked]);
  Todo.updateOne({"_id":putData._id},{"checked":putData.checked},(err)=> err ? console.log(err) : console.log("Updated") );
  res.redirect("/")
})



app.listen(4000, ()=>console.log("server started at 4000"))