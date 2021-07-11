const User= require("../models/User");
const usersCtrl = {};

usersCtrl.getUser = async (req,res)=>{
   const user= await User.find();
   res.json(user)
};

usersCtrl.createUser = async (req,res)=>{
    const {username}= req.body;
    const user = new User({username});
    await user.save();
    res.json({messages:"User created"})
};

usersCtrl.deleteUser = async (req,res)=>{
    const {id} = req.params;

    await User.findByIdAndDelete(id);
    res.json({messages:"The user went deleted"});
};

module.exports = usersCtrl;

