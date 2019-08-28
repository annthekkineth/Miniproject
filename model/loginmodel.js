var mongoose=require("mongoose");
var schema=mongoose.Schema;
var loginschema=new schema(
    {
        fname:{type:String,required:true},
        uname:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        role:{type:String,required:true}
    }
)

var logmodel=mongoose.model("log",loginschema,"user");  
module.exports=logmodel;