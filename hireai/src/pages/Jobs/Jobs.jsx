import "./Jobs.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [jobsError, setJobsError] = useState("");
    const [search, setSearch] = useState("");
    const [copiedJobId, setCopiedJobId] = useState(null);
    const [editingJobId, setEditingJobId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [editError, setEditError] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await api.get(`/jobs`);
                setJobs(response.data);
            }
            catch (err) {
                setJobsError("Failed to fetch your jobs. Please try again later.");
            }
            finally {
                setJobsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleCopyLink = (jobId) => {
        const link = `${window.location.origin}/jobs/${jobId}/apply`;
        navigator.clipboard.writeText(link);
        setCopiedJobId(jobId);
        setTimeout(() => setCopiedJobId(null), 2000); // reset the "Copied!" label after 2 seconds
    };

    if (jobsLoading) return <p role="status" aria-live="polite">Loading your jobs...</p>;
    if (jobsError) return <div role="alert" className="error">{jobsError}</div>;

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase())
    );
    const handleEditClick = (job) => {
        setEditingJobId(job._id);
        setEditError("");
        setEditForm({
            title: job.title,
            description: job.description,
            requiredSkills: job.requiredSkills.join(","),
            experienceMin: job.experienceMin,
            experienceMax: job.experienceMax
        });
    };

    const handleSaveEdit = async (jobId) => {
        try {
            setEditError("");
            const updatedJobData = {
                ...editForm,
                requiredSkills: editForm.requiredSkills.split(",").map((skill) => skill.trim()).filter(Boolean),
                experienceMin: Number(editForm.experienceMin),
                experienceMax: Number(editForm.experienceMax)
            }
            const response = await api.patch(`/jobs/${jobId}`, updatedJobData);
            setJobs((currentJobs) => currentJobs.map((job) =>
                job._id === jobId ? response.data : job
            ));
            setEditingJobId(null);
            setEditForm({});
        } catch (err) {
            setEditError(err.response?.data?.message || "Failed to update the job. Please try again.");
        }
    };
    const handleDelete = async (jobId) => {
        const confirmed = window.confirm("Are you sure you want to delete this job?");
        if (!confirmed) return;
        setDeleteError("");
        try {
            await api.delete(`/jobs/${jobId}`);
            setJobs((currentJobs) => currentJobs.filter((job) => job._id !== jobId));
        }
        catch (error) {
            setDeleteError(error.response?.data?.message || "Failed to delete this job.");
        }
    };

    return (
        <>
            <div className="header">
                <div className="job-header">
                    <h1>Your Jobs</h1>
                    <p>Manage your open positions and view candidates.</p>
                </div>
                <button onClick={() => navigate('/jobs/create')}>+ Create Job</button>
            </div>

            <input
                type="text"
                placeholder="Search jobs by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {deleteError && (
                <p role="alert" className="error">
                    {deleteError}
                </p>
            )}

            {filteredJobs.length === 0 ? (
                <p>You haven't posted any jobs yet. Click "Create Job" to get started.</p>
            ) : (
                <div className="job-list">
                    {filteredJobs.map((job) => (
                        <div key={job._id} className="job-card">
                            {editingJobId === job._id ? (
                                <div className="job-editor">
                                    <input
                                        value={editForm.title}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                title: e.target.value
                                            })
                                        }
                                        placeholder="Job title"
                                    />
                                    <textarea
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({
                                            ...editForm,
                                            description: e.target.value
                                        })}
                                        placeholder="Describe the job responsibilities and requirements"
                                    />
                                    <input
                                        value={editForm.requiredSkills}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                requiredSkills: e.target.value
                                            })
                                        }
                                        placeholder="React, JavaScript, Node.js"
                                    />
                                    <input
                                        value={editForm.experienceMin}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                experienceMin: e.target.value
                                            })
                                        }
                                        placeholder="Minimum experience in years"
                                    />
                                    <input
                                        value={editForm.experienceMax}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                experienceMax: e.target.value
                                            })
                                        }
                                        placeholder="Maximum experience in years"
                                    />

                                    {editError && <p role="alert" className="error">{editError}</p>}

                                    <button onClick={() => handleSaveEdit(job._id)}>
                                        Save Changes
                                    </button>

                                    <button onClick={() => setEditingJobId(null)}>
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3>{job.title}</h3>
                                    <p>{job.requiredSkills.join(", ")}</p>
                                    <p>{job.experienceMin} to {job.experienceMax} years experience is preferred</p>
                                    <div className="job-actions flex gap-2">
                                        <button onClick={() => navigate(`/jobs/${job._id}/applications`)}>
                                            View Applications
                                        </button>
                                        <button onClick={() => handleCopyLink(job._id)}>
                                            {copiedJobId === job._id ? "Copied!" : "Copy Apply Link"}
                                        </button>
                                        <button onClick={() => handleEditClick(job)}>
                                            Edit Job
                                        </button>
                                        <button className="bg-red-600 rounded-md text-white py-2 px-10 hover:bg-red-700 transition-colors focus-visible:ring-2" onClick={() => handleDelete(job._id)}>
                                            Delete Job
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
export default Jobs;