const express = require("express");
const mongoose = require("mongoose");
const loginRouter = require("./routes/login")
const articleRouter = require("./routes/articles")
const ejs = require("ejs")
const authMiddleware = require("./middlewares/auth-middleware")


mongoose.connect("mongodb://localhost/hanghae2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();
const router = express.Router();

app.set('view engine', 'ejs')
app.set('views', './views');




app.use("/api", express.urlencoded({ extended: false }), [loginRouter, articleRouter]);
app.use(express.static("assets"));




app.get("/",(req,res)=>{
    res.render("index",{})
})

app.get("/main",(req,res)=>{
  res.render("main",{})
})

app.get("/reform",(req,res)=>{
  res.render("reform",{})
})

app.get("/register",(req,res)=>{
  res.render("register",{})
})

app.get("/write" ,(req,res)=>{
  res.render("write",{})
})

app.get("/detail",(req,res)=>{
  res.render("deetail",{})
})





app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});