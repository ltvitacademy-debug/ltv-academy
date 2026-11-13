// Career paths enabled for the Professional Mock Interview. Pure, client-safe
// constant (no fs) shared between the selection page and the session page so
// the two can't drift out of sync. The session/turn engine (Netlify
// Functions) is already careerPath-driven — adding a path here is enough to
// make it selectable; each path falls back gracefully if its optional
// competency/scenario/project-ownership content hasn't been authored yet
// (see lib/mockInterview.ts).
export const MOCK_INTERVIEW_PATHS = ["snowflake-data-engineer", "microsoft-data-bi-developer"];
