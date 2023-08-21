const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');


const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        max:40,
        trim:true

    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email address')
            }
        },
        required:true,
        unique:true,
        trim:true
    },
    mobile:{
        type:Number,
        trim:true, 
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:Number,
        default:0,
    },

    tokens:[{
        token:{
type:String,
require:true
        }
    }]  

})

adminSchema.methods.authmethod = async function(){
const token =  jwt.sign({_id:this.id},process.env.SECRET_KEY)
this.tokens = await this.tokens.concat({token});
await this.save();
return token;

}



adminSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.cpassword = undefined;
        this.password = await bcrypt.hash(this.password,10);
    }
   next();
})

const Admin = new mongoose.model('admin',adminSchema);

module.exports = Admin;
