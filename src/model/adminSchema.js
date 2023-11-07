const {Schema,model} = require('mongoose');
const { userSchema } = require('.');



const adminSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:userSchema
    },
    file:[{type:String}]
},{
    strict:false
});

module.exports= model('adminmodel',adminSchema);