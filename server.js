const express = require("express");
const { default: mongoose } = require("mongoose");
const EmployeeSchema = require("./employees")
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://shivakumar:shivakumar@shivakumar.0umpwxt.mongodb.net/employees?retryWrites=true&w=majority").then(() => console.log("db connect") ).catch((err) => console.log(err) )

app.get("/", (req,res) => {
  res.send("hello express")
} )

app.post("/employee", async(req,res) => {
  const {name,age, technology, id} = req.body;
  try{
    const newData = EmployeeSchema({
      name : name,
      age : age,
      technology : technology,
      id : id
    })

    await newData.save()
    return res.status(201).json( await EmployeeSchema.find())
  }
  catch(err){
    console.log(err)
  }
} )

app.get("/employee", async(req,res) => {
  try{
    const response = await EmployeeSchema.aggregate([
      {
        $sort : {
          age : 1
        }
      }
    ])
    return res.status(200).json(response)
  }catch(err){
    console.log(err)
  }
} )

app.get("/employee/:id", async(req,res) => {
  const {id} = req.params;
  try{  
    const response = await EmployeeSchema.find({
      id : id
    })
    return res.status(200).json(response)
  }catch(err){
    console.log(err)
  }
} )

app.put("/employee/:id", async(req,res) => {
  const {id} = req.params;
  const {name, age ,technology} = req.body;
  try{
      await EmployeeSchema.updateOne({name :name}, {age : age}, {id :id}, {technology : technology});
      return res.json(await EmployeeSchema.find({
        id : id
      }))
  }catch(err){
    console.log(err)
  }
})

app.delete("/employee/:id", async(req,res) => {
  const {id} = req.params;
  try{
    await EmployeeSchema.deleteOne({id : id})
    return res.json(`${id} user deleted successfully`)
  }catch(err){
    console.log(err)
  }
} )

app.get("/seniorEmployee", async(req,res) => {
  try{
      const users = await EmployeeSchema.aggregate([
        {
          $sort : {
            age : -1
          }
        },
        {
          $limit : 1
        }
      ])
      return res.status(200).json(users)
  }catch(err){
    console.log(err)
  }
} )



app.listen(8024,() => {
  console.log("server started")
} )