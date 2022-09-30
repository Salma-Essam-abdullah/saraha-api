const validationTerms = ['body', 'params', 'query'];

const validationFun = (schema) => {
    return (req, res, next) => {
        var validationErrors = [];
        validationTerms.forEach((key)=>{
            if(schema[key]){
                const validate = schema[key].validate(req[key],{abortEarly:false});
                if(validate.error){
                    validationErrors.push(validate.error.details);
                }
            }
        });
        if(validationErrors.length){
            res.json({ error: validationErrors});
        }
        else{
            next();
        }
        
    }
}

module.exports = validationFun;