import api from "../../api/axios";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Applications() {
    const {id} =useParams();
    const [applications,setApplications]=useState([]);
    const [job,setJob] =useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    useEffect(() =>{
        const fetchApplications = async() =>{
            try{
                const [applicationsResponse, jobResponse] = await Promise.all([
                    api.get(`/jobs/${id}/applications`),
                    api.get(`/jobs/public/${id}`),
                ]);
                setApplications(applicationsResponse.data);
                setJob(jobResponse.data);
            }
            catch(err){
                setError(err.response?.data?.message || "Failed to load applications");
            }
            finally{
                setLoading(false);
            }
        };
        fetchApplications();
        },[id]);
        if(loading) return <p>Loading...</p>
        if(error) return <div style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>
        return (
            <>
            <h1>{job.title}</h1>
            <h2>Applications for this job</h2>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Match Score</th>
                    <th>View Application</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((application) => (
                        <tr key={application._id}>
                            <td>{application.candidateName}</td>
                            <td>{application.candidateEmail}</td>
                            <td>{application.status}</td>
                            <td>
                                {application.aiAnalysis?.matchScore != null
                                    ? `${application.aiAnalysis.matchScore}%`
                                    : "Not analyzed"}
                            </td>
                            <td>
                                <Link to={`/applications/${application._id}`}>
                                    View Application
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>
        );
    };