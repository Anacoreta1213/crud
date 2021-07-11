const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    username:{type:String,required:true,trim:true,
    unique:true},


},{timestamps:true})

// timestamps nos permitirá guardar el la fecha de la creación del document.
// trim borra los espacios en blanco;
// unique no permite otros iguales;
module.exports = model("User",userSchema);