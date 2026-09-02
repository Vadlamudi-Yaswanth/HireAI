const express = require('express');
const router = express.Router();
const { createJob, getRecruiterJobs,getApplicationsForJob} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
router.route('/')
    .post(protect, createJob)
    .get(protect, getRecruiterJobs);
router.get('/:id/applications',protect,getApplicationsForJob);
module.exports = router;