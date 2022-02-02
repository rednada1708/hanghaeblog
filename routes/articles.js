const express = require("express")
const router = express.Router()
const Articles = require("../models/articles")
const authMiddleware = require("../middlewares/auth-middleware")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { status } = require("express/lib/response")

router.get("/", async(req,res)=>{
    res.send("This is root page")
})

router.get("/articles", async(req,res)=>{
    const existArticles = await Articles.find()
    const articles = existArticles.sort((a,b)=>b.date-a.date)
    res.render("main",{articles:articles})
})

router.get("/articles/:articleId", async(req,res)=>{
    const {user} = req.query
    const {articleId} = req.params
    const articles = await Articles.findOne({articleId:Number(articleId)})
    //const status = (articles.nickname === )
    res.render("detail",{articles,user})
})

router.get("/articles/:articleId/reform", async(req,res)=>{
    const {articleId} = req.params
    console.log(articleId)
    const articles = await Articles.findOne({articleId:Number(articleId)})
    res.render("reform",{articles})
})





router.post("/articles", authMiddleware, async(req,res)=>{
    const {user} = res.locals
    const {title, content} = req.body

    const nickname = user.nickname
    const password = user.password

    console.log(user, title,content)
    const date = new Date()
    
    const articles = await Articles.find()
    const ids = articles.map((item)=>item.articleId)
    let articleId = 1
    if (ids.length !== 0){
        articleId = Math.max(...ids) + 1
    }

    const createdArticle = await Articles.create({articleId,title,nickname,password,content,date})
    res.json({ result : "작성완료" })
})


router.put("/articles/:articleId", authMiddleware, async(req,res)=>{
    console.log('수정 요청 받았습니다.')
    const {nickname} = res.locals.user
    const {articleId} = req.params
    const {title,content} = req.body
    const [oldArticle] = await Articles.find({articleId:Number(articleId)})
    console.log(oldArticle.nickname)
    if (nickname !== oldArticle.nickname ){
        res.status(400).send({
            errorMessage: "자기글만 수정할 수 있습니다."
        })
        return  
    }
    const date = new Date()
    await Articles.updateOne({articleId:Number(articleId)},{$set:{title,content,date}})
    res.send({result:'수정완료'})
})

router.delete("/articles/:articleId", authMiddleware, async(req,res)=>{
    const {nickname} = res.locals.user
    const {articleId} = req.params
    const [oldArticle] = await Articles.find({articleId:Number(articleId)})
    console.log(oldArticle.nickname)
    if (nickname !== oldArticle.nickname ){
        res.status(400).send({
            errorMessage: "자기글만 삭제할 수 있습니다."
        })
        return  
    }
    await Articles.deleteOne({articleId})
    res.json({result:'삭제완료'})
})








module.exports = router