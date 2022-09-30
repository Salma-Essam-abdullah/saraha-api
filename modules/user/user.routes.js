const router = require('express').Router();
const {auth} = require('../../middleware/auth');
const validationFun = require('../../middleware/validationFun');
const {multerFun,validationFileType} = require('../../service/multer');
const {updateUser,deleteUser,getMessages,uploadProfilePic,updateCoverPics,uploadCv,addPost,addComment,getAllPosts} = require('./controllers/user.controllers');
const { endPoint } = require('./user.endPoint');
const { updateUserValidation } = require('./user.validation'); 


router.patch('/user',auth(endPoint.updateUser),validationFun(updateUserValidation),updateUser);

router.patch('/user/profilePic',auth(endPoint.updateUser),multerFun('user/ProfilePic',validationFileType.image).single('image'),uploadProfilePic)

router.patch('/user/coverPics',auth(endPoint.updateUser),multerFun('user/CoverPics',validationFileType.image).array("images",5),updateCoverPics)

router.patch('/user/cv',auth(endPoint.updateUser),multerFun('user/Cv',validationFileType.pdf).single('image'),uploadCv)

router.get('/user/message',auth(endPoint.getMessages),getMessages)

router.post('/post',auth(endPoint.addpost),addPost); 

router.get('/posts',getAllPosts)

router.post('/post/:id/comment',auth(endPoint.addcomment),addComment);

router.delete('/user',auth(endPoint.deleteUser),deleteUser);  

module.exports = router;