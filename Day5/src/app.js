const express=require("express");
const app=express();

const noteModels=require("./models/notes.model")
app.use(express.json())

app.post("/notes",async(req,res)=>{
  const {title,description}=req.body;
 const note=await noteModels.create({
    title,description
  })
  res.status(201).json({
    message:"Note created succesfully",
    note
  })
})

app.get("/notes",async(req,res)=>{
  const notes=await noteModels.find()
  res.status(200).json({
    message:"Note get succesfully",
    notes
  })
})


module.exports=app