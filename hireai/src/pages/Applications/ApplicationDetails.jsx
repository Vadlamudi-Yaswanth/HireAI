import "./ApplicationDetails.css";
import { FiUploadCloud, FiInfo, FiStar, FiCircle } from "react-icons/fi";
import {LuStar} from "react-icons/lu";
import AnalysisCard from "../../components/Analysis/AnalysisCard";
function ApplicationDetails() {
    return (
        <>
            <div className="application-details-page">
                <header className="page-header">
                    <div className="page-header-content">
                        <h1>AI Resume Analysis</h1>
                        <p className="page-description">Upload a candidate's resume and receive AI-powered insights.</p>
                    </div>
                    <button className="upload-resume-button">+ Upload Resume</button>
                </ header>
                <section className="resume-upload-section">
                    <FiUploadCloud size={56} className="upload-icon" />
                    <p className="upload-title">Drag & Drop Resume</p>
                    <p className="upload-description">or click to browse and upload a candidate's resume</p>
                    <button className="browse-files-button">Browse Files</button>
                    <p className="resume-description">Supported: PDF • DOC • DOCX (Max 10 MB)</p>
                </section>
                <section className="analysis-overview">
                    <h2>Analysis Overview</h2>
                    <div className="overview-cards">
                        <AnalysisCard title="Resume Match">
                            <div className="resume-match-body">
                                <p className="match-score">92%</p>
                                <p className="match-status">Excellent</p>
                                <div className="progress-bar">
                                    <div className="progress-fill"></div>
                                </div>
                                <p className="match-description">Matches 18 of 20 required skills</p>
                            </div>
                        </AnalysisCard>
                        <AnalysisCard title="Top Skill Match">
                                <div className="skill-match-badge">
                                    <LuStar  size={20} className="star-icon" />
                                    <span>React.js</span>
                                </div>

                                <p className="skill-alignment">
                                    95% Skill Alignment
                                </p>

                                <p className="skill-description">
                                    Strong experience across 4 production projects
                                </p>
                            
                        </AnalysisCard>
                        <AnalysisCard title="Missing Skills">
                            <div className="missing-skill-content">
                            <div className="missing-skills">
                                <span className="skill-badge">AWS</span>
                                <span className="skill-badge">Kubernetes</span>
                            </div>

                            <p className="skill-missing">
                                2 critical skills missing
                            </p>
                        </div>
                        </AnalysisCard>
                            
                            
                    </div>
                </section>
                <section className="ai-recommendation">
                    <div className="recommendation-header">
                        <h2>AI Recommendation</h2>
                        <p className="recommendation-subtitle">Recommendation based on resume analysis and job requirements.</p>
                    </div>
                    <div className="recommendation-status">
                        <FiCircle className="recommendation-status-icon" />
                        <span className="recommendation-status-text">Technical Interview</span>
                    </div>
                    <p className="recommendation-description">The candidate demonstrates strong proficiency in React.js, Node.js and
                        modern frontend development with relevant production projects. While
                        cloud technologies like AWS are not evident, the overall profile aligns
                        well with the requirements for this role.</p>
                    <div className="confidence-section" >
                        <p className="confidence-label">AI Confidence</p>
                        <p className="confidence-score">High (96%)</p>
                    </div>
                </section>
            </div>
        </>
    );
}
export default ApplicationDetails ;