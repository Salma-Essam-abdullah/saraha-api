const { roles } = require("../../middleware/auth")



const endPoint = {
    updateUser : [roles.user,roles.admin],
    deleteUser:[roles.admin],
    getMessages:[roles.user],
    addpost : [roles.user],
    addcomment : [roles.user]
}


module.exports = {endPoint}