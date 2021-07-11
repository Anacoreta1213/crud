const Note = require("../models/Notes");

const notesCtrl = {};

notesCtrl.getNotes = async (req,res)=>{
  const notas = await  Note.find();
//   console.log(notas);
  res.json(notas);
}

notesCtrl.postNote = async (req,res)=>{
    
    const {title,content,author}= req.body;
    
    const notes =new Note({title,content,author});

    await notes.save();
    res.json({messages:"Note saved"});
}

notesCtrl.oneGet = async(req,res)=>{
    const {id} = req.params;

    const note = await Note.findById(id);

    res.json(note);
} 

notesCtrl.updateNote = async(req,res)=>{
    const {id} = req.params;
    const {title,content,author}=req.body;
    await Note.findOneAndUpdate(id,
        {title,
        content,
        author}
    ) 

    res.json({message:"THe note has been updated"});
}
 
notesCtrl.deleteNote = async(req,res)=>{
    const {id} = req.params;
    await  Note.findOneAndDelete(id);
    res.json({message:"THe note has been deleted"});

};

module.exports = notesCtrl;