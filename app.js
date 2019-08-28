var express=require('express');
const app=express();
var path=require('path');

var adminrouter=require("./routes/adminrouter")
var userrouter=require("./routes/userrouter")

var mongoose=require("mongoose");
var bodyparser=require("body-parser");
var url="mongodb+srv://ann:ann@cluster0-vctj5.mongodb.net/plant?retryWrites=true&w=majority";
app.use(bodyparser.urlencoded({extended:true}));
var log=require("./model/loginmodel");

mongoose.connect(url,function(err){
    if(err) throw err;
    else console.log("DB Connected..");
})

app.get('/',function(req,res){
    res.render("index");
})

app.get('/about',function(req,res){
    res.render("about");
})
app.get('/homeabout',function(req,res){
    res.render("homeabout");
})
app.get('/homecontact',function(req,res){
    res.render("homecontact");
})

app.get('/login',function(req,res){
    res.render("login");
})

app.get('/signup',function(req,res){
    res.render("signup");
})

app.get('/contact',function(req,res){
    res.render("contact");
})


app.post("/signin",function(req,res){

    var sn=new log();
    sn.fname=req.body.fname;
    sn.uname=req.body.uname;
    sn.email=req.body.email;
    sn.password=req.body.password;
    sn.role=req.body.role;
    sn.save(function(err){
        if(err) throw err
        else
        {
            res.render("login")
            //window.alert("Welcome!");
        }
    });
})

app.post('/loginaction',function(req,res){
    log.find({"uname":req.body.uname,"password":req.body.password},function(err,data)
    {
        var name=req.body.uname;
        if(err)
        throw err;
        else
        {
            if(data.length!=0){
                
                log.find({"uname":req.body.uname,"password":req.body.password,"role":"admin"},function(erro,result){
                    if(erro)
                        throw erro;
                    else
                    {
                        if(result.length!=0)
                            res.redirect('/admin')
                        else
                            res.redirect('/user')
                    }
                })
            }
            else
            res.redirect('/login')
        }
            
    })
})

app.set("view engine","ejs");
app.set("views","./views")
app.use(express.static(path.join(__dirname,"/public")));

app.use("/admin",adminrouter);
app.use("/user",userrouter);
app.listen(process.event.PORT || 3000,function(req,res){
    console.log("Server started!");
})