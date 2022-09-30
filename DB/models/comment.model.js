
const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
   
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
});

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel