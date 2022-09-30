const router = require('express').Router();
const {signUp,login} = require('./controllers/auth.controller');
const validationFun = require('../../middleware/validationFun');
const {signUpValidation,LoginValidation} = require('./user.validation');



router.post('/signUp',validationFun(signUpValidation),signUp)
router.post('/login',validationFun(LoginValidation),login)


module.exports = router;