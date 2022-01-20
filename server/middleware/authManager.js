const jwt = require('jsonwebtoken')
function auth(req,res,next){
    try{
        // console.log(req.cookies)
        const token = req.cookies.token;
        const role = req.cookies.role;


             if (token && role === 'manager') {  
            const verified = jwt.verify(token,process.env.JWT_SECRET)
            req.user = verified.user
            next();
         } else {
            return res.status(401).json({errorMessage:'Non autorisé'})
        }
       
    } catch (err){
        console.error(err);
        res.status(401).json({errorMessage:'Non autorisé'})
    }
}

module.exports = auth;