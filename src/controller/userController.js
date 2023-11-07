const { userSchema } = require("../model");
const adminSchema = require("../model/adminSchema");
const { GenerateHashedPassword, ComparePasswords } = require("../utils");

module.exports = {
  userSignup: async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await GenerateHashedPassword(password)
    try{
        const user = new userSchema({name,email,hashedPassword,role});
        await user.save();
        return res.status(201).json({message:"User created successfully"})

    }catch(error){
        return res.status(500).send({message:"something went worng while adding user"})
    }
  },

  userLogin:async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userSchema.findOne({email:email});
        if(user){
            const verifyPassword= await ComparePasswords(password,user.password);
            if(verifyPassword){
                return res.status(200).json(user.name);
            }
        }
        return res.status(401).json("wrong authentication credential");

    }catch(error){
        return res.status(500).send({message:"unable to fetch user"});

    }

  },

  adminUploadproject: async (req, res) => {
    const { file } = req.body;
    try{
        const adminupload= new  adminSchema(file);
        await adminupload.save();
        return res.status(201).json({message:"Project uploaded successfully"})

    }catch(error){
       return res.status(500).send({message:"something went worng while adding file to admin"})

    }
  },

  userLowestbit:async(req,res)=>{
    try{
        const userlowestbit=await adminSchema.find({});
        return res.status(200).send(userlowestbit);



    }catch(error){
        return res.status(500).send({message:"Error"});

    }
  }
};
