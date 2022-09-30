const router = require('express').Router();
const {addMessage} = require('./controllers/message.controllers');
const validationFun = require('../../middleware/validationFun');
const {addMessageValidator} = require('./message.validation');


router.post('/message/:id',validationFun(addMessageValidator),addMessage)


module.exports = router;