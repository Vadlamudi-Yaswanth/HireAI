const Application=require('../models/Application');
const {evaluateApplication} =require("../services/geminiService");
exports.submitApplication = async(req,res)=>{
    try{
        const {job,candidateName,candidateEmail,resumeText}=req.body;
        if(!job||!candidateName||!candidateEmail||!resumeText){
            return res.status(400).json({message:'Please provide all mandatory fields'});
        }
        const applicationExists = await Application.findOne({job,candidateEmail});
        if(applicationExists){
            return res.status(409).json({message:'Application already submitted for this job with the same email address'});
        }
        const application = await Application.create({
             job,
             candidateName,
             candidateEmail,
             resumeText
        });
        res.status(201).json(application);
    }
    catch(error){
        console.error("🔥 CRITICAL CONTROLLER CRASH LOG:", error);
        return res.status(500).json({message:'Server error',error:error.message});
    }
};
exports.analyzeApplication = async(req,res) =>{
    try{
        const {id}=req.params;
        const application = await Application.findById(id).populate('job');
        if(!application){
            return res.status(404).json({message:'Application not found'});
        }
        if(application.job.createdBy.toString() !==req.user.id){
            return res.status(403).json({message:'You are not authorized to analyze this application'}); 
        }
        const job = application.job;
        const resumeText = application.resumeText;
        const analysis = await evaluateApplication(job,resumeText);
        application.aiAnalysis = analysis;
        await application.save();
        return res.json(application);
    }
    catch(error){
        console.error("Critical log error:",error);
        return res.status(500).json({message:'Server error',error:error.message});
    }
};
exports.getApplicationById = async(req,res) =>{
    try{
        const {id} =req.params;
        const application = await Application.findById(id).populate('job');
        if(!application){
            return res.status(404).json({message:'Application not found'});
        }
        if(application.job.createdBy.toString() !==req.user.id){
            return res.status(403).json({message:'You are not allowed to view this applicantion related details'});
        }
        return res.json(application);
    }
    catch(error){
        console.error("Critical log error:", error);
        return res.status(500).json({message:'Server error', error:error.message});
    }
};