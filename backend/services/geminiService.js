const {GoogleGenAI}=require("@google/genai");
const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
function buildPrompt(job, resumeText) {
  return `
You are an AI assistant that evaluates how well a candidate's resume matches a job opening.

JOB DETAILS:
Title: ${job.title}
Required Skills: ${job.requiredSkills.join(", ")}
Required experience: ${job.experienceRequired}
Description: ${job.description}

CANDIDATE RESUME:
${resumeText}

EVALUATION RULES:
- Compare the resume only with the supplied job details.
- Identify skills that appear in both the job requirements and resume.
- Identify required skills that are not shown in the resume.
- Consider transferable skills. For example, a related technology may partially support a missing requirement.
- Do not invent skills, qualifications, or experience that are not present in the resume.
- Give a matchScore from 0 to 100.
- Give a confidence score from 0 to 100.

For the response:
- matchScore: overall job-fit score from 0 to 100.
- matchedSkills: list only skills supported by both the resume and job details.
- missingSkills: list each missing job skill with skill, transferableFrom, and note.
- recommendation: a brief hiring recommendation.
- confidence: confidence in this evaluation from 0 to 100, based on the completeness of the resume and job details.
- reasoning: concise explanation of the assessment.
- For transferableFrom, use null when no relevant transferable skill exists.

Return only valid JSON matching the provided response schema. Do not include Markdown, code fences, or extra text.
`;
}
const analysisSchema = {
    type: "object",
    properties: {
        matchScore: { type: "number" },
        matchedSkills: {
            type: "array",
            items: { type: "string" }
        },
        missingSkills: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    skill: { type: "string" },
                    transferableFrom: { type: "string", nullable: true },
                    note: { type: "string" }
                },
                required: ["skill"]
            }
        },
        recommendation: { type: "string" },
        confidence: { type: "number" },
        reasoning: { type: "string" }
    },
    required: ["matchScore", "matchedSkills", "missingSkills", "recommendation", "confidence", "reasoning"]
};
async function evaluateApplication(job,resumeText){
    const prompt=buildPrompt(job,resumeText);
    const response = await ai.models.generateContent({
         model: "gemini-3.1-flash-lite",
         contents: prompt,
         config: {
            responseMimeType: "application/json",
            responseSchema :analysisSchema,
         },
    });
    const parsed = JSON.parse(response.text);
    return parsed;
}
module.exports ={evaluateApplication};