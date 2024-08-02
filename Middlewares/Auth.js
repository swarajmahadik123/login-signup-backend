const jwt=require('jsonwebtoken');

const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(401)
        .json({ message : 'unauthorized , jwt token require'});
    }
    try {
        const decoded =  jwt.verify(auth,process.env.JWT_SECRET);
        res.user=decoded;
        next();
    } catch (error) {
        return res.status(401)
        .json({ message : 'unauthorized , jwt token wrong'});
    }
}

module.exports=ensureAuthenticated;