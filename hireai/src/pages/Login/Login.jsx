import { useState,useContext} from "react";
import {useNavigate,Link} from "react-router-dom";
import api from "../../api/axios";
import AuthContext from "../../context/AuthContext";
export default function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [submitting,setSubmitting]=useState(false);
    const {login}=useContext(AuthContext);
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{ 
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try{
            const response = await api.post('/auth/login',{email,password});
            const {token,...userData}=response.data;
            login(userData,token);
            navigate('/dashboard');
        }
        catch(err){
            console.error("Login network failed:",err);
            if(err.response&&err.response.data&&err.response.data.message){
                setError(err.response.data.message);
            }
            else{
                setError("Network error: Unable to connect to the backend server.");
            }
        }
        finally{
            setSubmitting(false);
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="user-email">Enter the email address</label>
            <input id="user-email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <label htmlFor="user-password">Enter the password</label>
            <input id="user-password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            {error &&  <div style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
    ⚠️ {error}
  </div>}
            <button type="submit" disabled={submitting}>{submitting?"Logging in ...":"Login In"}</button>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>


        </form>
    );


};

