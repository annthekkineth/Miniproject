var express=require('express');
const router=express.Router();
var path=require('path');
var multer=require('multer');

var mongoose=require("mongoose");
var bodyparser=require("body-parser");
var url="mongodb+srv://ann:ann@cluster0-vctj5.mongodb.net/plant?retryWrites=true&w=majority";
router.use(bodyparser.urlencoded({extended:true}));
var prd=require("../model/productmodel");

var storage =   multer.diskStorage({  
    destination: (req, file, callback)=>{  
      callback(null, path.join(__dirname,'/image/'));  
    },  
    filename: (req, file, callback)=>{  
      callback(null, file.originalname);  
    }  
  }); 
var upload = multer({ storage : storage})
var type=upload.single('file1');; 

router.get('/addshop',function(req,res){
    res.render("addshop");
})

router.get('/shop-details/:id',function(req,res){
    //res.render("shop-details");
    var id=req.params.id;
    prd.find({"pid":req.params.id},function(err,data)
    {
        if(err)
        throw err;
        else
        {
           // console.log(data);
            res.render("adshopdetails",{product:data});
        }
            
    })
})

router.get('/',function(req,res){
    res.render("adminhome");
})

router.get('/view/:image',function(req,res){
    res.sendFile(__dirname+"/image/"+req.params.image);
})

router.get("/delete/:id",function(req,res){
    prd.deleteOne({pid:req.params.id},(err)=>{
        if(err) throw err;
        else{
            console.log("Deleted");
            res.redirect("/admin/shop");
        }
    })
})

router.get("/update/:id",function(req,res)
{
    var id=req.params.id
    //res.render("edit",{id})
    prd.find({"pid":req.params.id},function(err,data)
    {
        if(err)
        throw err;
        else
        {
           // console.log(data);
            res.render("editshop",{product:data});
        }
            
    })
})

router.post("/up",function(req,res){
    //console.log(req.body.pid);
    //console.log(req.body.pname);
    prd.updateOne({pid:req.body.pid},{$set:{pname:req.body.pname,category:req.body.category,description:req.body.description,rate:req.body.rate}},function(err,result){
        if(err)
        throw err;
        else{
            prd.find({},function(err,result)
            {
                if(err)
                throw err;
                else
                {
                    console.log(result);
                    res.redirect("/admin/shop");
                }
                    
            })
        }
    })
})

router.post("/pdtaction",type,function(req,res){

    var p=new prd();
    p.pid=req.body.pid;
    p.pname=req.body.pname;
    p.category=req.body.category;
    p.description=req.body.description;
    p.rate=req.body.rate;
    p.image = req.file.filename;
    p.save(function(err){
        if(err) throw err
        else
        {
            res.redirect("/admin/addshop");
        }
    });
    
})

router.get('/shop',function(req,res){
    prd.find({},function(err,data){
        if(err)
        throw err;
        else{
            res.render("adminshop",{product:data});
        }
    })
})

router.use(express.static(path.join(__dirname,"../public")));
module.exports=router;