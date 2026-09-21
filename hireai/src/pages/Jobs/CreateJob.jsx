import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
function CreateJobs() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [minimumExperienceRequired, setMinimumExperienceRequired] = useState(0);
    const [maximumExperienceRequired, setMaximumExperienceRequired] = useState(1);
    const [requiredSkills, setRequiredSkills] = useState([]);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [skillInput, setSkillInput] = useState("");
    const addSkill = () => {
        const trimmed = skillInput.trim();
        if (trimmed === "") return;
        if (requiredSkills.includes(trimmed)) return;
        setRequiredSkills([...requiredSkills, trimmed]);
        setSkillInput("");
    }
    const removeSkill = (skillToRemove) => {
        setRequiredSkills(requiredSkills.filter(skill => skill !== skillToRemove));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try {
            await api.post(`/jobs`, { title, description, experienceMin: minimumExperienceRequired, experienceMax: maximumExperienceRequired,requiredSkills });
            navigate('/jobs/jobsPage');
        }
        catch(err) {
            setError(err.response?.data?.message);
        }
        finally {
            setSubmitting(false);
        }
    }
return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-5">
        <div>
            <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
            </label>
            <input
                id="job-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div>
            <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
            </label>
            <textarea
                id="job-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div>
            <label htmlFor="experience-minimum" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Experience Required(years)
            </label>
            <input
                id="experience-minimum"
                type="number"
                value={minimumExperienceRequired}
                onChange={(e) => setMinimumExperienceRequired(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
            <label htmlFor="experience-maximum" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Experience Required(years)
            </label>
            <input
                id="experience-maximum"
                type="number"
                value={maximumExperienceRequired}
                onChange={(e) => setMaximumExperienceRequired(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div>
            <label htmlFor="skill-input" className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills
            </label>
            <div className="flex gap-2">
                <input
                    id="skill-input"
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill();
                        }
                    }}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    +
                </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
                {requiredSkills.map((skill) => (
                    <span
                        key={skill}
                        className="flex items-center gap-1 bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
                    >
                        {skill}
                        <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-blue-500 hover:text-blue-800 font-bold"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>

        {error && (
            <p className="text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 text-sm">
                {error}
            </p>
        )}

        <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
            {submitting ? "Creating job..." : "Create Job"}
        </button>
    </form>
);
}
export default CreateJobs;