const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Joi = require("joi")


router.get("/", (req,res)=>{
    console.log('로그인 라우터 입니다.')
    res.send('작업완료')
})

const postUsersSchema = Joi.object({
    nickname: Joi.string().min(3).pattern(new RegExp('[a-zA-Z0-9]')).required(),
    password: Joi.string().min(4).required(),
    confirmPassword:Joi.string().min(4).required()
})


router.post("/users", async(req,res)=>{
    try{
        const {nickname, password,confirmPassword} = await postUsersSchema.validateAsync(req.body)

        if(password !== confirmPassword){
            res.status(400).send({
                errorMessage: "비밀번호와 비밀번호확인이 일치하지 않습니다."
            })
            return
        } else if(password.includes(nickname)){
            res.status(400).send({
                errorMessage: "비밀번호에 닉네임과 같은 값을 포함할 수 없습니다."
            })
            return
        }
    
        const existUsers = await User.find({nickname})
        if(existUsers.length){
            res.status(400).send({
                errorMessage: "중복된 닉네임입니다."
            })
            return
        }
    
        const user = new User({nickname , password})
        await user.save()
    
        res.send({}) 

    }catch(err){
        console.log(err)
        res.status(400).send({
            errorMessage: err.message
        })
        return
    }


   
})






module.exports = router