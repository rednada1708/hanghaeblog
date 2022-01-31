const express = require("express");
const mongoose = require("mongoose");
const loginRouter = require("./routes/login")



mongoose.connect("mongodb://localhost/hanghae2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();
const router = express.Router();







app.use("/api", express.urlencoded({ extended: false }), [loginRouter]);
app.use(express.static("assets"));




app.get("/",(req,res)=>{
    res.send("연결완료")
})





app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});