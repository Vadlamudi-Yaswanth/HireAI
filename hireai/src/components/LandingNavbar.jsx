import AiImage from "../assets/Hire_ai.svg";
import {Link} from "react-router-dom";
function LandingNavbar(){
    return(
         <nav className="flex items-center justify-between px-8 py-3 border-b border-gray-200">
            <Link to="/" className="flex items-center">
             <img src={AiImage} alt="HireAI" className="h-16 w-auto" />
            </Link>
            <div className=" hidden md:flex gap-8 text-gray-600">
                <a href="#features" className="hover:text-gray-900">Features</a>
                <a href="#how-it-works" className="hover:text-gray-900">How It Works</a>
                <a href="#why-hireai" className="hover:text-gray-900">Why HireAI</a>
            </div>
            <div className="flex items-center gap-4">
                <Link to ="/login" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 ">Log In</Link>
                <Link to ="/register" className="bg-blue-600 hover:bg-blue-700 !text-white font-medium px-4 py-2 rounded-lg transition-colors">Get Started</Link>
            </div>
         </nav>
    );
}
export default LandingNavbar;