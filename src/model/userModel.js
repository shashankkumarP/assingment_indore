const {Schema,model} = require('mongoose');


const userSchema = new Schema({
    name: {type:String, required:[true,'Must Provide your name']},
    email:{type:String, required:[true,'Must Provide your email'],unique:true},
    password:{type:String, required:[true,'Must Provide your Password']},
    role:{type:String, required:[true,'Must Provide your role']}
},{
    strict:false
});

module.exports= model('usermodel',userSchema);