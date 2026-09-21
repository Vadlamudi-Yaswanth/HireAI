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
        <form className="mx-auto mt-16 w-[calc(100%-2rem)] max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-lg" onSubmit={handleSubmit}>
            <label className="mt-4 block font-semibold text-slate-700 first:mt-0" htmlFor="user-email">Enter the email address</label>
            <input className="mt-1 block min-h-11 w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20" id="user-email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <label className="mt-4 block font-semibold text-slate-700" htmlFor="user-password">Enter the password</label>
            <input className="mt-1 block min-h-11 w-full rounded-md border border-slate-400 bg-white px-3 py-2 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20" id="user-password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            {error &&  <div style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
    ⚠️ {error}
  </div>}
            <button className="mt-6 w-full rounded-md bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-65" type="submit" disabled={submitting}>{submitting?"Logging in ...":"Login In"}</button>
            <p className="mt-4 text-center text-slate-600">Don't have an account? <Link className="font-semibold text-blue-600" to="/register">Register here</Link></p>


        </form>
    );


};

