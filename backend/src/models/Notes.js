const {Schema,model} = require("mongoose");

const noteSchema = new Schema({
    title:{type:String, required:true},
    content:{type:String, required:true},
    date:{type:Date,dafault:Date.now},
    author:String,
},{timestamps:true})

// timestamps nos permitirá guardar el la fecha de la creación del document.

module.exports = model("Note",noteSchema);