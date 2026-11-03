// @vitest-environment jsdom
//
// Phase F — the browser side of hands-free voice: this is the ONE
// component-level test in the whole project (everything else is a
// Netlify-Function/lib integration test against the real test DB), added
// specifically because the code in MockInterviewChat.tsx that talks to
// @fishaudio/agent-client otherwise has zero automated coverage beyond
// tsc's type-checking. Scoped to jsdom via the magic comment above so it
// doesn't change the environment for the rest of the suite (which runs
// against a real SQLite DB and assumes Node, not a browser DOM).
//
// @fishaudio/agent-client itself is mocked — this never makes a real
// WebRTC/LiveKit connection or a paid Fish Audio call. It verifies the
// component's OWN logic: that it calls AgentSession.start with the
// backend's session object verbatim, that it falls back to text mode
// cleanly on disconnect/mic-denial, and that ending a hands-free session
// calls the cost-control cleanup endpoint.
import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";
import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

type FakeAgentSessionCallbacks = {
  onStatusChange?: (status: string) => void;
  onModeChange?: (mode: string) => void;
  onUserTranscript?: (event: { text: string; final: boolean }) => void;
  onMessage?: (message: { role: "user" | "agent"; text: string }) => void;
  onDisconnect?: (event: { reason: string }) => void;
  onError?: (error: { code?: string; message?: string }) => void;
};

type FakeStartOptions = { sessionToken: unknown; callbacks?: FakeAgentSessionCallbacks };

let capturedCallbacks: FakeAgentSessionCallbacks | undefined;
let startAgentSessionMock: Mock<(options: FakeStartOptions) => Promise<unknown>>;

vi.mock("@fishaudio/agent-client", () => {
  return {
    AgentSession: {
      start: (options: FakeStartOptions) => startAgentSessionMock(options),
    },
  };
});

import MockInterviewChat from "../MockInterviewChat";
import { saveSessionAccessToken } from "@/lib/mockInterviewClientAuth";

// jsdom doesn't implement scrollIntoView or HTMLMediaElement.pause (used by
// the component's pre-existing scroll-to-bottom effect and push-to-talk's
// stopSpeaking(), both unrelated to Phase F) — polyfilled so mounting and
// the fallback-to-text-mode path don't throw/log noise.
Element.prototype.scrollIntoView = vi.fn();
HTMLMediaElement.prototype.pause = vi.fn();

const SESSION_ID = "session-handsfree-test";
const ACCESS_TOKEN = "test-access-token";

function fakeSession(overrides: Record<string, unknown> = {}) {
  return {
    id: SESSION_ID,
    currentSection: "technical-competency",
    status: "in-progress",
    startedAt: new Date().toISOString(),
    turns: [],
    ...overrides,
  };
}

function makeFakeAgentSession() {
  return {
    getTranscript: () => [],
    startAudio: vi.fn(async () => undefined),
    end: vi.fn(async () => undefined),
  };
}

describe("MockInterviewChat — hands-free voice (Phase F)", () => {
  beforeEach(() => {
    capturedCallbacks = undefined;
    startAgentSessionMock = vi.fn(async (options: { callbacks?: FakeAgentSessionCallbacks }) => {
      capturedCallbacks = options.callbacks;
      return makeFakeAgentSession();
    });
    saveSessionAccessToken(SESSION_ID, ACCESS_TOKEN);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  async function renderResumedInterview() {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init?: RequestInit) => {
        if (url.includes("/api/mock-interview-session") && (!init || init.method === undefined)) {
          return new Response(JSON.stringify({ session: fakeSession() }), { status: 200 });
        }
        if (url.includes("/api/mock-interview-voice-agent-start")) {
          return new Response(
            JSON.stringify({ agentSession: { session_id: "fish-sess-1", expires_at: "2099-01-01T00:00:00Z", token: "fish-token-1" } }),
            { status: 200 }
          );
        }
        if (url.includes("/api/mock-interview-voice-agent-end")) {
          return new Response(JSON.stringify({ ended: true }), { status: 200 });
        }
        return new Response(JSON.stringify({ error: "unexpected request in test" }), { status: 500 });
      })
    );
    // React.createElement rather than JSX — this project's vitest/Vite
    // transform pipeline has never needed to parse JSX in a test file
    // before (every other test is a backend/lib integration test), and
    // adding that is out of scope for this one component test.
    render(React.createElement(MockInterviewChat, { pathSlug: "snowflake-data-engineer", pathTitle: "Snowflake Data Engineer", difficulty: "beginner", resumeSessionId: SESSION_ID }));
    await waitFor(() => expect(screen.getByText("Try hands-free (beta)")).toBeInTheDocument());
  }

  it("connects via AgentSession.start with the backend's session object passed through verbatim, and shows live status", async () => {
    await renderResumedInterview();

    fireEvent.click(screen.getByText("Try hands-free (beta)"));

    await waitFor(() => expect(startAgentSessionMock).toHaveBeenCalledTimes(1));
    const callArgs = startAgentSessionMock.mock.calls[0][0];
    expect(callArgs.sessionToken).toEqual({ session_id: "fish-sess-1", expires_at: "2099-01-01T00:00:00Z", token: "fish-token-1" });

    await waitFor(() => expect(screen.getByText("Hands-free voice (beta)")).toBeInTheDocument());

    // Simulate the SDK announcing the agent is now listening.
    capturedCallbacks?.onModeChange?.("listening");
    await waitFor(() => expect(screen.getByText("Listening — just speak naturally")).toBeInTheDocument());

    // Simulate a finalized agent utterance arriving over the live event stream.
    capturedCallbacks?.onMessage?.({ role: "agent", text: "Can you walk me through your approach to dimensional modeling?" });
    await waitFor(() => expect(screen.getByText(/Can you walk me through your approach to dimensional modeling\?/)).toBeInTheDocument());
  });

  it("falls back to text mode and calls the cost-control end endpoint on a real disconnect", async () => {
    await renderResumedInterview();
    fireEvent.click(screen.getByText("Try hands-free (beta)"));
    await waitFor(() => expect(startAgentSessionMock).toHaveBeenCalledTimes(1));

    const fetchSpy = vi.mocked(global.fetch);
    fetchSpy.mockClear();

    capturedCallbacks?.onDisconnect?.({ reason: "user_hangup" });

    await waitFor(() => expect(screen.getByText("Text mode")).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Your hands-free voice connection ended/)).toBeInTheDocument());
    await waitFor(() => expect(fetchSpy).toHaveBeenCalledWith("/api/mock-interview-voice-agent-end", expect.objectContaining({ method: "POST" })));
  });

  it("falls back to text mode with a clear message when the microphone permission is denied", async () => {
    await renderResumedInterview();
    startAgentSessionMock.mockRejectedValueOnce(Object.assign(new Error("Permission denied"), { code: "mic_permission_denied" }));

    fireEvent.click(screen.getByText("Try hands-free (beta)"));

    await waitFor(() => expect(screen.getByText(/Microphone access was denied/)).toBeInTheDocument());
    expect(screen.getByText("Text mode")).toBeInTheDocument();
  });
});
