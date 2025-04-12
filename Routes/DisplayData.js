const express=require('express');
const router=express.Router();

router.post('/showfoodData',(req,res)=>{
   try{
         res.send([global.foodData,global.foodCategory])
   }catch(err){
    console.error(err)
   }
})

module.exports=router;