const jwt = require('jsonwebtoken');
const Admin = require("../models/userschema");





const auth = async (req,res,next)=>{

try{

    const token =  req.cookies.jwt;
    const verifyuser = jwt.verify(token,process.env.SECRET_KEY);

    const user = await Admin.findOne({_id:verifyuser._id,status:1})
   
    
    req.session.message = {
        text:"",
        class:""
      }

      req.user = user;
      req.token = token;

    next();

}catch(e){
    req.session.message = {
        text:"",
        class:""
      }
    res.status(400).redirect("/riddhisiddhilogin");
}
}


module.exports = auth;

