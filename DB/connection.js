
const mongoose = require('mongoose');
require('dotenv').config()



const connect  = () => {
    mongoose.connect(process.env.DB_CONNECTION ).then(res => console.log('db connected'))
    .catch(
        err => console.log(err)
 )
 
}   




module.exports = connect;