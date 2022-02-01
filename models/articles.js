const mongoose = require("mongoose")

const articlesSchema = new mongoose.Schema({
    articleId:{
        type:Number,
        require:true,
        unique:true
    },
    title:{
        type:String,
        required: true,
    },
    nickname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required: true
    }
})


module.exports = mongoose.model("Articles",articlesSchema)