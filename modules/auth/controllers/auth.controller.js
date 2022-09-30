const userModel = require('../../../DB/models/user.model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()

const signUp = async (req, res) => {
   try{
        const {userName,email,password} = req.body;
        const newUser = new userModel({userName,email,password});
        const savedUser = await newUser.save();
        res.json({message: 'user created successfully',savedUser})
   }
    catch(err){
        res.json({message: err.message})
    }
}


const login = async (req,res)=>{
    const {email,password} = req.body;
    const findUser = await userModel.findOne({email});
    if(!findUser){
        res.json({message: 'Invalid email'})
    }else{
        bcrypt.compare(password,findUser.password,(err,result)=>{
           if(result){
            var token = jwt.sign({ id: findUser._id,role:findUser.role,isLogin:true }, process.env.JWT_KEY,{expiresIn: '1h'});
                res.json({message: 'user logged in successfully',token})
           }
              else{
                 res.json({message: 'invalid password'})
              }
        });
    }   
}


module.exports = {signUp,login}