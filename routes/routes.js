const express = require("express");
const Msg = require("../models/msgschema");
const Admin = require("../models/userschema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");
const loginauth = require("../auth/loginpageauth");

const router = new express.Router();

router.get("/", (req, res) => {
  const message = req.session.message;
  req.session.message = null;

  res.render("index", { message });
});

router.post("/message", async function (req, res) {
  try {
    const msg = new Msg(req.body);
    await msg.save();
    req.session.message = {
      text: "Message send successfully",
      class: "text-success",
    };
    res.status(200).redirect("/");
  } catch (e) {
    req.session.message = {
      text: "Error occurred while sending the message",
      class: "text-danger",
    };
    res.redirect("/");
  }
});

router.get("/riddhisiddhimessages", auth, async (req, res) => {
  const data = await Msg.find();

  count = data.length;
  const message = req.session.message;
  req.session.message = null;

  res.render("message", { data, count, message });
});

router.get("/deletemsg/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Msg.findByIdAndDelete(id);
    req.session.message = {
      text: "Message deleted successfully",
      class: "text-success",
    };
    res.status(201).redirect("/riddhisiddhimessages");
  } catch (e) {
    req.session.message = {
      text: "Something Went Wrong",
      class: "text-danger",
    };
    res.status(400).redirect("/riddhisiddhimessages");
  }
});

router.get("/deleteallmsgs", auth, async (req, res) => {
  try {
    const data = await Msg.deleteMany({});
    req.session.message = {
      text: "Message deleted successfully",
      class: "text-success",
    };
    res.status(201).redirect("/riddhisiddhimessages");
  } catch (e) {
    req.session.message = {
      text: "Something Went Wrong",
      class: "text-danger",
    };
    res.status(400).redirect("/riddhisiddhimessages");
  }
});

router.get("/riddhisiddhiregistration", loginauth, (req, res) => {

  const message = req.session.message;
  req.session.message = null;
  res.render("registration", { message });
});

router.post("/riddhisiddhiregistration", loginauth, async (req, res) => {
  const pass = req.body.password;
  const cpass = req.body.cpassword;

  try {
    if (pass === cpass) {
      const data = await new Admin(req.body);

      const token = await data.authmethod();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 60000),
        httpOnly: true,
      });

      req.session.message = {
        text: "Successfully Added",
        class: "text-success",
      };
      res.status(201).redirect("/riddhisiddhiregistration");
    } else {
      req.session.message = {
        text: "Something Went Wrong",
        class: "text-danger",
      };

      res.status(400).redirect("/riddhisiddhiregistration");
    }
  } catch (error) {
    req.session.message = {
      text: "Something Went Wrong",
      class: "text-danger",
    };

    res.status(400).redirect("/riddhisiddhiregistration");
  }
});

router.get("/riddhisiddhilogin", loginauth, (req, res) => {
  const message = req.session.message;

  res.render("login", { message });
});

router.post("/riddhisiddhilogin", loginauth, async (req, res) => {
  try{
    const email = req.body.email;
    const pass = req.body.password;
  
    const user = await Admin.findOne({ email: email,status:1 });
  
    const usercheck = await bcrypt.compare(pass, user.password);
      const token = await user.authmethod();
  
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 60000),
        httpOnly: true,
      });
      req.session.message = {
        text: "",
        class: "",
      };
      res.status(200).redirect("/riddhisiddhimessages");
  
  }catch(e){
    req.session.message = {
      text: "Invalid Details",
      class: "text-danger",
    };
    res.status(400).redirect("/riddhisiddhilogin");
  }

});

router.get('/logout',auth,async (req,res)=>{

    try {
      console.log(req.cookies.jwt)
      
      res.clearCookie('jwt');

   

      req.session.message = {
        text: "",
        class: "",
      };


      req.user.tokens = req.user.tokens.filter((elem)=>{
      
       return elem.token !== req.token;
      })
      req.user.save();
    
   
      
    

      res.redirect("/riddhisiddhilogin");

    
    

    } catch (error) {
      console.log(error);
    }
})

module.exports = router;
