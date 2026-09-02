const Job = require('../models/Job');
const Application=require("../models/Application");
exports.createJob = async (req, res) => {
    try{
        const {title, description, requiredSkills,experienceRequired}=req.body;
        if(!title||!description||!requiredSkills||experienceRequired===undefined){
            return res.status(400).json({message:'please provide all mandatory fields'});
        }
        const job =await Job.create({
            title,
            description,
            requiredSkills,
            experienceRequired,
            createdBy:req.user.id
        });
        res.status(201).json(job);
    }
    catch(error){
        return res.status(500).json({message:'Server error',error:error.message});
    }
};
exports.getRecruiterJobs = async (req, res) => {
    try{
        const jobs=await Job.find({ createdBy: req.user.id });
        res.status(200).json(jobs);
    }
    catch (error) {
        res.status(500).json({ message: 'Server fetching jobs error', error: error.message });
    }
};
exports.getApplicationsForJob = async(req,res) =>{
    try{
        const {id}=req.params;
        const job= await Job.findById(id);
        if(!job){
          return res.status(404).json({message: 'Job not found'});
        }
        if(job.createdBy.toString() !== req.user.id){
            return res.status(403).json({message: 'You are not authorized to view applications for this job'});
        }
        const applications= await Application.find({job:id}).select('candidateName candidateEmail status aiAnalysis.matchScore aiAnalyis.recommendation').sort({'aiAnalysis.matchScore':-1});

        return res.json(applications);
        
    }
    catch(error){
        console.error("Error fetching applications:", error);
        return res.status(500).json({message: 'Server error', error: error.message});
    }
}