const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    messageBody:{
        type: String,
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},
{
    timestamps: true
}
)





const messageModel = mongoose.model('message', messageSchema);


module.exports = messageModel