import api from "../../api/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function ApplyJob() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [jobError, setJobError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [candidateName, setCandidateName] = useState("");
    const [candidateEmail, setCandidateEmail] = useState("");
    const [resumeText, setResumeText] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await api.get(`/jobs/public/${id}`);
                setJob(response.data);
            }
            catch (err) {
                setJobError(err.response?.data?.message || "Failed to load job details. Please try again later.");
            }
            finally {
                setLoading(false);
            }
        }
        fetchJobDetails();
    }, [id]);
    if (loading) {
        return (
            <p role="status" aria-live="polite">
                Loading application details...
            </p>
        );
    }
    if (jobError) {
        return (
            <div role="alert" className="error">
                {jobError}
            </div>
        );
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError("");
        try {
            await api.post(`/applications/submit`, { job: id, candidateName, candidateEmail, resumeText });
            setSuccess(true);
        }
        catch (err) {
            setSubmitError(err.response?.data?.message || "Failed to submit application. Please try again later.");
        }
        finally {
            setSubmitting(false);
        }
    }
    if (success) {
        return (
            <p role="status" aria-live="polite">
                Application submitted successfully!
            </p>
        );
    }
    return (
        <div className="apply-page">
            <section className="job-details">
                <h1>{job.title}</h1>
                <p>{job.description}</p>
                <div className="skill-badges">
                    {job.requiredSkills.map((skill) => (
                        <span key={skill} className="skill-badge">{skill}</span>
                    ))}
                </div>
                <p>Experience required: {job.experienceRequired} years</p>
            </section>
            <form onSubmit={handleSubmit} className="application-form">
                <h2>Apply for this position</h2>
                <label htmlFor="candidateName">Full Name</label>
                <input id="candidateName" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} required />
                <label htmlFor="candidateEmail">Email</label>
                <input id="candidateEmail" type="email" value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} required />
                <label htmlFor="resumeText">Resume Text</label>
                <textarea id="resumeText" value={resumeText} onChange={(e) => setResumeText(e.target.value)} required />
                {submitError && (
                    <p className="error" role="alert">
                        {submitError}
                    </p>
                )}
                <button type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
}
export default ApplyJob;