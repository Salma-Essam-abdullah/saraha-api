const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config()
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:Number,
    profilePic:String,
    coverPics: Array,
    role:{
        type: String,
        default: 'user'
    },
    lastSeen:String,
    isConfirmed:{
        type: Boolean,
        default: false
    },
},
{
    timestamps: true
}
)


const updatedHooks = ['findOneAndUpdate','findOneAndDelete','findOneAndReplace','findByIdAndUpdate','findByIdAndDelete','findByIdAndReplace'];
updatedHooks.forEach((key)=>{
    userSchema.pre(key,async function (){
        let data = await this.model.findOne(this.getQuery());
        this.set({__v:data.__v+1});
    
    });
})
userSchema.pre('save',async function(next){
  this.password = await bcrypt.hash(this.password,saltRounds);
  next();
});



const userModel = mongoose.model('user', userSchema);


module.exports = userModel