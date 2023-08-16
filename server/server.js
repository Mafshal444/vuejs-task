const fs = require('fs');
const express  = require("express");
const app = express();
var cors = require('cors')
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
  try{
    let rawdata = fs.readFileSync('books.json');
    let student = JSON?.parse?.(rawdata) ?? "";
    console.log(student);
    console.log("get is called")
    res.status(200).send({success: true, message: "books found.", books: student})
  } catch(err){
    console.log("error", err)
    res.status(500).send({success: false, message: "Server Error."})
  }
 
})


app.post("/", (req, res) => {
  try{
    console.log(req.body)
    let book = {
      id: new Date().getTime(),
      title: req?.body?.title,
      description: req?.body?.description, 
      due_date: req?.body?.due_date,
      status: req?.body?.status,
    };
   
    let rawdata = fs.readFileSync('books.json');
    let student = JSON?.parse?.(rawdata) ?? [];
    student.push(book)
    console.log(student);
    let data = JSON.stringify(student);
    fs.writeFileSync('books.json', data);
    console.log("post is called")
    res.status(200).send({success: true, message: "book added."})
  } catch(err){
    console.log("error", err)
    res.status(500).send({success: false, message: "Server Error."})
  }
})

app.delete("/", (req, res) => {
  
  try{
    console.log(req.query.id)
    let id = req.query.id;
    let rawdata = fs.readFileSync('books.json');
    let student = JSON?.parse?.(rawdata) ?? [];
    let newBooks = student?.filter?.(x => x.id != id)
    let data = JSON.stringify(newBooks);
    fs.writeFileSync('books.json', data);
    console.log("delete is called")
    res.status(200).send({success: true, message: "book deleted."})
  } catch(err){
    console.log("error", err)
    res.status(500).send({success: false, message: "Server Error."})
  }
})

app.put("/", (req, res) => {
  
  try{
    console.log(req.body)
    let book = {
      id: req?.body?.id,
      title: req?.body?.title,
      description: req?.body?.description, 
      due_date: req?.body?.due_date,
      status: req?.body?.status,
    };
   
    let rawdata = fs.readFileSync('books.json');
    let student = JSON?.parse?.(rawdata) ?? [];
    let index = student?.findIndex?.(x => x.id == req?.body?.id)
    student[index] = book;
    let data = JSON.stringify(student);
    fs.writeFileSync('books.json', data);
    console.log("update is called");
    res.status(200).send({success: true, message: "book updated."})
  } catch(err){
    console.log("error", err)
    res.status(500).send({success: false, message: "Server Error."})
  }
})

app.listen(3000)
