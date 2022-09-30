const messageModel = require('../../../DB/models/message.model');
const userModel = require('../../../DB/models/user.model');
const addMessage =async (req,res) =>{
    try{
    const {id} = req.params;
    const {messageBody} = req.body;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            message: 'User not found'
        })
    }
    else{
     const message = await messageModel.insertMany({messageBody,receiverId: id});
     res.json({message: 'Message sent successfully',message})
       
    }
}catch(err){  
    res.json({message: 'Error sending message',err})
}
}

module.exports = {addMessage}