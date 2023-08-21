const jwt = require('jsonwebtoken');
const Admin = require("../models/userschema");

const loginauth = async (req, res, next) => {
try{
 
    if(req.cookies.jwt){
        res.status(200).redirect('/msg')
    }
    next()
}catch(e){
    res.status(200).redirect('/riddhisiddhilogin')

}
}
module.exports = loginauth;
