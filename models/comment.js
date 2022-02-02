const mongoose = require("mongoose")

const commentsSchema = new mongoose.Schema({
    articleId:{
        type:Number,
        require:true,
    },
    commentId:{
        type:Number,
        require:true,
        unique:true
    },
    nickname:{
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


module.exports = mongoose.model("Comment",commentsSchema)