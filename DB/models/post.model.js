
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
   commentsIds:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
   }]
});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel