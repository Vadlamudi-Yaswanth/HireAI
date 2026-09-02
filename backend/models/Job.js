const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a job title'],
        trim: true
    },
    description:{
        type:String,
        required:[true,"Please add a job description"]
    },
    requiredSkills:{
        type:[String],
        required:[true,"Please add required skills"]
    },
    experienceRequired:{
        type:Number,
        default:0,
        required:[true,"Please add required experience in years"]
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model("Job",JobSchema);