const mongoose = require('mongoose');
const MissingSkillSchema =new mongoose.Schema({
    skill: {type: String, required: true},
    transferableFrom: {type: String, default:null},
    note: {type: String, default:""}
},{_id:false});
const AiAnalysisSchema =new mongoose.Schema({
    matchScore: {type: Number, required: true},
    matchedSkills: {type: [String], required: true},
    missingSkills: {type: [MissingSkillSchema], default: []},
    recommendation: {type: String, default: ""},
    confidence: {type: Number, default:0},
    reasoning: {type: String, default:""}
},{_id: false});
const ApplicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    candidateName: {
        type: String,
        required: [true, 'Please add the candidate name'],
        trim: true
    },
    candidateEmail: {
        type: String,
        required: [true, 'Please add the candidate email'],
        lowercase: true,
        trim: true
    },
    resumeText: {
        type: String,
        required: [true, 'Please add extracted resume plaintext string']
    },
    aiAnalysis: {
        type: AiAnalysisSchema
    },
    status: {
        type: String,
        enum: ['pending', 'shortlisted', 'rejected', 'interview_scheduled'],
        default: 'pending'
    },
     createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', ApplicationSchema);