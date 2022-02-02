const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    articleId:{
        type:Number,
        require:true,
    },
    nickname:{
        type:String,
        required:true
    },
})


module.exports = mongoose.model("Like",likeSchema)