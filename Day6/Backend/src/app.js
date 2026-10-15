const express=require("express");
const app=express();
const cors=require("cors")
const noteModel=require("./models/note.model")
const path=require("path")
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(cors())
const notes=[];
app.post("/api/notes",async(req,res)=>{
  const {title,description}=req.body
    const note=await noteModel.create({
    title,description
   })

   res.status(201).json({
    message:"note created succesfully",
    note
   })
})

app.get("/api/notes",async(req,res)=>{
 const note= await noteModel.find()

 res.status(200).json({
   message:"notes fetch succesfully",
   note
 })
})
app.delete("/api/notes/:id",async(req,res)=>{
  const id=req.params.id

  await noteModel.findByIdAndDelete(id)

  res.status(200).json({
    message:"notes deleted successfully",
  })
})
app.patch("/api/notes/:id",async(req,res)=>{
  const id=req.params.id
  const {description}=req.body
  await noteModel.findByIdAndUpdate(id,{description})

  res.status(200).json({
    message:"note Change succesfully"
  })
})

app.use("*name",(req,res)=>{
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
})
module.exports=app;