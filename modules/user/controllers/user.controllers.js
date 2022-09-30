const userModel = require("../../../DB/models/user.model");
const messageModel = require("../../../DB/models/message.model");
const postModel = require("../../../DB/models/post.model");
const commentModel = require("../../../DB/models/comment.model");

const updateUser = async (req, res) => {
    const {userName} = req.body;
    const id = req.user._id;
  const updateUser =   await userModel.findByIdAndUpdate(id, {userName},{new:true});
  res.json({message:updateUser});
}


const deleteUser = async (req, res) => {
    const id = req.user._id;
    const deleteUser = await userModel.findByIdAndDelete(id);
    if(deleteUser){
        res.json({message:"user deleted"});
    }
    else{
        res.json({message:"user not found"});
    }
    
}

const getMessages = async (req, res) => {
    let {_id} = req.user;
    const messages = await messageModel.find({receiverId:_id});
    res.json({message:'messages',messages});
}


const uploadProfilePic = async (req, res) => {
    if(req.fileUploadError){
        res.status(422).json({message:"invalid file type"});
    }
    else{
    console.log(req.file);
    let fileName = `${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.file.filename}`;
    const updatedUser = await userModel.findOneAndUpdate({_id:req.user._id},{profilePic:fileName},{new:true});
    res.json({message:'profile pic uploaded',fileName,updatedUser});
    }
}

const updateCoverPics = async (req, res) => {
    if(req.fileUploadError){
        res.status(422).json({message:"invalid file type"});
    }
    else{
        let coverPics = [];
        console.log(req.files);
        for(let i=0;i<req.files.length;i++){
            let fileName = `${req.protocol}://${req.headers.host}/${req.destinationFile}/${req.files[i].filename}`;
            coverPics.push(fileName);
        }

        const updatedUser = await userModel.findByIdAndUpdate({_id:req.user._id},{coverPics},{new:true});
       res.json({message:'cover pics uploaded',updatedUser});
    }
}


const uploadCv = async (req, res) => {
    console.log(req.file);
    res.json({message:'cv uploaded'});
}



const addPost = async (req, res) => {
    let {title,description} = req.body;
   let addedPost = await postModel.insertMany({title,description,userId:req.user._id});
    res.json({message:'post added',addedPost});


}

const addComment = async (req, res) => {
    const postid = req.params.id;
    const {title} = req.body;
    const comment = await commentModel.insertMany({title,userId:req.user._id});
    let addCommentToPost = await postModel.findByIdAndUpdate({_id:postid},{$push:{commentsIds:comment[0]._id}},{new:true});
   res.json({message:'comment added',addCommentToPost});
 

}

const getAllPosts = async (req, res) => {
    const allPost = await postModel.find({}).populate('commentsIds');
    res.json({message:'all posts',allPost});
}

module.exports = {updateUser,deleteUser,getMessages,uploadProfilePic,updateCoverPics,uploadCv,addPost,addComment,getAllPosts};



