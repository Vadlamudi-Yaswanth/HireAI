const express = require('express');
const router = express.Router();
const {submitApplication, analyzeApplication, getApplicationById}=require("../controllers/applicationController");
const {protect}=require("../middleware/authMiddleware");
router.post('/submit',submitApplication);
router.post('/analyze/:id',protect,analyzeApplication);
router.get('/viewdetails/:id', protect,getApplicationById);
module.exports=router;