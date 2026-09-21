import "./ApplicationDetails.css";
import AnalysisCard from "../../components/Analysis/AnalysisCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";
function ApplicationDetails() {
    const { id } = useParams();
    const [application, setApplication] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [actionError, setActionError] = useState("");
    useEffect(() => {
        const fetchApplicationDetails = async () => {
            try {
                const response = await api.get(`/applications/viewdetails/${id}`);
                setApplication(response.data);
            }
            catch (err) {
                setLoadError(err.response?.data?.message || "Failed to load application details. Please try again later.");

            }
            finally {
                setLoading(false);
            }
        };
        fetchApplicationDetails();

    }, [id]);
    if (loading) return <p>Loading.....</p>
    if (loadError) {
        return <div role="alert">{loadError}</div>;
    }
    const analyzeApplication = async () => {
        try {
            setAnalyzing(true);
            const response = await api.post(`/applications/analyze/${id}`);
            setApplication(response.data);
        }
        catch (err) {
            setActionError(err.response?.data?.message || "Failed to analyze application. Please try again later.");
        }
        finally {
            setAnalyzing(false);
        }
    };
    const updateStatus = async (newStatus) => {
        try {
            setUpdating(true);
            setActionError("");
            const response = await api.patch(`/applications/update/${id}`, { status: newStatus });
            setApplication(response.data);
        }
        catch (err) {
            setActionError(err.response?.data?.message || "Failed to update application status. Please try again later.");
        }
        finally {
            setUpdating(false);
        }
    };
    const handleReject = () => {
        const confirmed = window.confirm(
            "Are you sure you want to reject this application?"
        );
        if (confirmed) {
            updateStatus("rejected");
        }
    }
    return (
        <>
            <h1>Application Details</h1>
            {actionError && (
                <p className="error-message" role="alert">
                    {actionError}
                </p>
            )}
            {!application.aiAnalysis && (
                <div>
                    <p> This application has not been analyzed yet.</p>
                    <p>Applicant details are provided below </p>
                    <p><strong>Name:</strong> {application.candidateName}</p>
                    <p><strong>Email:</strong> {application.candidateEmail}</p>
                    <button onClick={analyzeApplication} disabled={analyzing}>
                        {analyzing ? "Analyzing..." : "Analyze Application"}
                    </button>
                </div>
            )}
            {application.aiAnalysis && (
                <>
                    <AnalysisCard title="Match Score">
                        <strong>
                            {application.aiAnalysis.matchScore}%
                        </strong>

                        <p>
                            {application.aiAnalysis.matchedSkills.length} out of{" "}
                            {application.job?.requiredSkills?.length ?? 0} required skills matched
                        </p>
                    </AnalysisCard>

                    <AnalysisCard title="Matched Skills">
                        <div className="skill-badges">
                            {(application.aiAnalysis.matchedSkills || []).map((skill) => (
                                <span className="skill-badge" key={skill}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </AnalysisCard>

                    <AnalysisCard title="Missing Skills">
                        <div className="missing-skills">
                            {(application.aiAnalysis.missingSkills || []).map(({ skill, transferableFrom, note }) => (
                                <div className="missing-skill-item" key={skill}>
                                    <span className="missing-skill-badge">{skill}</span>
                                    {transferableFrom ? (
                                        <p className="transferable-note">
                                            Transferable from {transferableFrom} — {note}
                                        </p>
                                    ) : (
                                        <p className="genuine-gap-note">{note}</p>
                                    )}

                                </div>
                            ))}
                        </div>
                    </AnalysisCard>
                    <section className="evidence-breakdown">
                        <h2>Evidence Breakdown</h2>
                        <div className="evidence-list">
                            {application.aiAnalysis?.evidence?.map((item, index) => (
                                <div key={index} className={`evidence-item evidence-${item.status}`}>
                                    <div className="evidence-header">
                                        <span className="evidence-requirement">{item.requirement}</span>
                                        <span className={`evidence-status-badge status-${item.status}`}>{item.status}</span>
                                        <span className={`evidence-strength strength-${item.evidenceStrength}`}>{item.evidenceStrength}</span>
                                    </div>
                                    <p className="evidence-quote">"{item.evidence}"</p>
                                    <p className="evidence-explanation">{item.explanation}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="ai-recommendation">
                        <h2>AI Recommendation</h2>
                        <p>{application.aiAnalysis.recommendation}</p>
                        <p>Confidence: {application.aiAnalysis.confidence}%</p>
                        <p>Reasoning: {application.aiAnalysis.reasoning}</p>
                    </section>

                </>
            )}
            <section className="application-status">
                <h2>Application Status</h2>
                <p>Current Status: <strong>{application.status}</strong></p>
                <div className="status-actions">
                    <button className="button-shortlist" onClick={() => updateStatus("shortlisted")} disabled={updating}>Shortlist</button>
                    <button className="button-reject" onClick={handleReject} disabled={updating}>Reject</button>
                    <button className="button-interview" onClick={() => updateStatus("interview_scheduled")} disabled={updating}>Schedule Interview</button>
                </div>

            </section>
        </>
    );
}
export default ApplicationDetails;