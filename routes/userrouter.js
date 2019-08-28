var express=require('express');
const router=express.Router();
var path=require('path');

var mongoose=require("mongoose");
var bodyparser=require("body-parser");
var url="mongodb+srv://ann:ann@cluster0-vctj5.mongodb.net/plant?retryWrites=true&w=majority";
router.use(bodyparser.urlencoded({extended:true}));

var prd=require("../model/productmodel");


router.get('/',function(req,res){
    res.render("userhome");
})

// router.get('/usercart',function(req,res){
//     res.render("usercart");
// })
router.get('/usercart/:pid',function(req,res){
    var productid=req.params.pid;
})

router.get('/usershop',function(req,res){
    prd.find({},function(err,data){
        if(err)
        throw err;
        else{
            res.render("usershop",{product:data});
        }
    })
})



router.use(express.static(path.join(__dirname,"../public")));
module.exports=router;