const multer =  require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const fs = require('fs');


const validationFileType ={
    image : ['image/jpeg','image/jpg','image/png'],
    video : ['video/mp4','video/avi','video/mkv'],
    audio : ['audio/mp3','audio/wav','audio/mpeg'],
    pdf : ['application/pdf'],
    doc : ['application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ppt : ['application/vnd.ms-powerpoint','application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    xls : ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    zip : ['application/zip','application/x-7z-compressed','application/x-rar-compressed'],
    text : ['text/plain'],
}
function multerFun(customDest,acceptType){
    if(!customDest || customDest == ''){
        customDest = 'genalData';
    }
if(!fs.existsSync(path.join(__dirname,`../uploads/${customDest}`))){
    fs.mkdirSync(path.join(__dirname,`../uploads/${customDest}`),{recursive:true});
}
    const storage = multer.diskStorage({
        destination : function (req,file,cb) {
            req.destinationFile = `uploads/${customDest}`;
            cb(null,path.join(__dirname,`../uploads/${customDest}`));
        },
        filename : function (req,file,cb) {
            const fullname = nanoid() + '-' + file.originalname;
            cb(null,fullname);
        },
    });
    const fileFilter = function (req,file,cb) {
       if(acceptType.includes(file.mimetype)){
           cb(null,true);
       }
        else{
            req.fileUploadError = true
            cb(null,false);
        }
    }
    const upload = multer({dest:path.join(__dirname,`../uploads/${customDest}`),fileFilter,storage});
    return upload;
}

module.exports = {multerFun,validationFileType};

