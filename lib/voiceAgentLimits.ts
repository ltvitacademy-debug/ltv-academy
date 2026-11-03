// Phase F safeguards — "safeguards for concurrency, cost limits, and
// session expiration". Deliberately simple and DB-backed: Netlify Functions
// share no in-memory state between invocations, so any limit that must
// hold across concurrent requests has to be enforced via a query against
// persisted rows, not a counter kept in process memory.
import { prisma } from "./db";

// How many hands-free Fish Audio Agents sessions (at $0.06/min each) may be
// live at once, across all students. Defaults conservatively low — this is
// a cost/capacity ceiling the administrator should raise deliberately, not
// something that should silently scale with traffic.
export function getMaxConcurrentVoiceAgentSessions(): number {
  const raw = process.env.MOCK_INTERVIEW_MAX_CONCURRENT_VOICE_AGENTS;
  const n = raw ? parseInt(raw, 10) : 3;
  return Number.isFinite(n) && n > 0 ? n : 3;
}

// Note: the hard per-session duration ceiling (belt-and-suspenders against
// a stuck/runaway session burning paid Fish Audio Agents minutes) is
// configured on the Agent itself in Fish's console
// (conversation.max_duration_seconds) — corrected after verifying Fish's
// actual API, which takes only {agent_id} at session-creation time, not an
// inline conversation config. There is nothing for this codebase to pass
// per-session any more.

export async function countActiveVoiceAgentSessions(): Promise<number> {
  return prisma.mockInterviewSession.count({ where: { voiceAgentStatus: "active" } });
}
