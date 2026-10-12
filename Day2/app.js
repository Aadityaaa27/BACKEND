const express=require("express");
const app=express();

app.get("/",(req,res)=>{
  res.send("server ne data bhej diya ")
})
app.get("/about",(req,res)=>{
  res.send("this is about")
})

app.listen(8000);