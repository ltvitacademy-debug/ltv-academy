// Client-side (browser-only) companion to lib/mockInterviewAuth.ts. Keeps
// each session's accessToken in localStorage, keyed by sessionId, so the
// student can come back later (history -> report -> certificate) on the
// SAME device without re-entering anything. Never sent anywhere but back to
// this site's own API, and never readable by Claude or anyone else — purely
// a per-browser convenience, same as any other remembered-session pattern.
const PREFIX = "mock-interview-token:";

export function saveSessionAccessToken(sessionId: string, accessToken: string) {
  try {
    localStorage.setItem(`${PREFIX}${sessionId}`, accessToken);
  } catch {
    // localStorage can throw (private browsing, blocked storage) — the
    // caller still has the token in memory for the current page view.
  }
}

export function getSessionAccessToken(sessionId: string): string | null {
  try {
    return localStorage.getItem(`${PREFIX}${sessionId}`);
  } catch {
    return null;
  }
}
