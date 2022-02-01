const express = require("express")
const router = express.Router()
const Articles = require("../models/articles")


router.get("/", async(req,res)=>{
    res.send("This is root page")
})

router.get("/articles", async(req,res)=>{
    const existArticles = await Articles.find()
    const articles = existArticles.sort((a,b)=>b.date-a.date)
    console.log(articles)
    res.render("main",{articles:articles})
})

router.get("/articles/:articleId", async(req,res)=>{
    const {articleId} = req.params
    console.log(articleId)
    const articles = await Articles.findOne({articleId:Number(articleId)})
    res.render("detail",{articles})
})

router.get("/articles/:articleId/reform", async(req,res)=>{
    const {articleId} = req.params
    console.log(articleId)
    const articles = await Articles.findOne({articleId:Number(articleId)})
    res.render("reform",{articles})
})





router.post("/articles",async(req,res)=>{
    const {title, author, password, content} = req.body
    if ( !(title && author && password && content)){
        return res.json({success:false,errorMessage:"값을 모두 입력하지 않았습니다."})
    }
    const date = new Date()
    const articles = await Articles.find()
    console.log(articles)
    const ids = articles.map((item)=>item.articleId)
    let articleId = 1
    if (ids.length !== 0){
        articleId = Math.max(...ids) + 1
    } 
    const createdArticle = await Articles.create({articleId,title,author,password,content,date})
    res.json({ result : "작성완료" })
})


router.put("/articles/:articleId", async(req,res)=>{
    console.log('수정 요청 받았습니다.')
    const {articleId} = req.params
    const {title,content,author,password} = req.body
    const [oldArticle] = await Articles.find({articleId:Number(articleId)})
    if (password !== oldArticle.password ){
        return res.status(400).json({succses:false, errorMessage:"비밀번호가 틀렸습니다."})
    }
    const date = new Date()
    await Articles.updateOne({articleId:Number(articleId)},{$set:{title,content,date}})
    res.json({result:'수정완료'})
})

router.delete("/articles/:articleId", async(req,res)=>{
    const {articleId} = req.params
    const {password} = req.body
    const [oldArticle] = await Articles.find({articleId:Number(articleId)})
    if (password !== oldArticle.password ){
        return res.status(400).json({succses:false, errorMessage:"비밀번호가 틀렸습니다."})
    }
    await Articles.deleteOne({articleId})
    res.json({result:'삭제완료'})
})








module.exports = router