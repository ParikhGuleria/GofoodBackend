const express=require('express');
const router=express.Router();
const User=require("../Models/User");
const {body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const JWT_SECRET	="MynameisNarutandiamthefuturehokage$#"

router.post('/createuser',[
    body('email').isEmail(),
    body('password').isLength({min:5}),
    body('name').isLength({min:5})
],
async (req,res)=>{
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
      }

      const salt=await bcrypt.genSalt(10);
      const secPassword=await bcrypt.hash(req.body.password,salt)
    try{
      await User.create({
        name:req.body.name,
        password:secPassword,
        email:req.body.email,
        location:req.body.location
       })
       res.json({success:true})
    }catch(err){
        console.log(err)
        res.json({success:false})
    }
})

router.post('/loginuser',[
  body('email').isEmail(),
  body('password').isLength({min:5}),
],async(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }

  const email=req.body.email;
    try{
     let userData= await User.findOne({email});
     if(!userData){
      return res.status(400).json({errors:"User doesn't exists"})
     }

       const comparePwd=await bcrypt.compare(req.body.password,userData.password)

     if(!comparePwd){
      return res.status(400).json({errors:"User doesn't exists"})
     }

     const data={
      user:{
        id:userData.id
      }
     }

     const authToken=jwt.sign(data,JWT_SECRET	);
     return res.json({success:true,authToken:authToken});

    }catch(err){
      console.log(err);
      res.json({success:false})

    }
})

module.exports=router;



