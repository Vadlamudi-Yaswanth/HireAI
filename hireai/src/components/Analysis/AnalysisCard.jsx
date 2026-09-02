import { FiInfo } from "react-icons/fi";
import "./AnalysisCard.css";
function AnalysisCard({ title, children }) {
    return (
        <div className="analysis-card">
            <div className="card-header">
                <h3>{title}</h3>
                <FiInfo className="info-icon" />
            </div>
            <div className="card-content">
                {children}
            </div>
        </div>

    );
}
export default AnalysisCard;