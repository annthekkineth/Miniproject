var mongoose=require("mongoose");
var schema=mongoose.Schema;
var productschema=new schema(
    {
        pid:{type:String,required:true},
        pname:{type:String,required:true},
        category:{type:String,required:true},
        description:{type:String,required:true},
        rate:{type:String,required:true},
        image:{type:String,required:true}
    }
)

var productmodel=mongoose.model("product",productschema,"products");  
module.exports=productmodel;