"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { saveSessionAccessToken, getSessionAccessToken } from "@/lib/mockInterviewClientAuth";
import { SECTION_SCHEDULE, TOTAL_INTERVIEW_MINUTES, type InterviewSectionId } from "@/lib/mockInterviewTypes";

// Timing lives in ONE place (lib/mockInterviewTypes.ts) and is imported
// here rather than duplicated — the schedule drifted out of sync with the
// backend once already (the old copy here still said "Introduction, 3 min"
// after the administrator removed that section everywhere else).
const TOTAL_MINUTES = TOTAL_INTERVIEW_MINUTES;

type Turn = {
  id: string;
  section: InterviewSectionId;
  aiMessage: string;
  studentResponse: string | null;
};

type Session = {
  id: string;
  currentSection: InterviewSectionId;
  status: "in-progress" | "interrupted" | "complete";
  startedAt: string;
  turns: Turn[];
};

export default function MockInterviewChat({
  pathSlug,
  pathTitle,
  difficulty,
  resumeSessionId,
  requestedVoiceMode,
  resumeAccessToken,
}: {
  pathSlug: string;
  pathTitle: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  // Spec Phase D priority 6 — resuming an interrupted interview instead of
  // starting a brand-new one (which would consume another credit). Set when
  // the student got here from their history list via an in-progress entry.
  resumeSessionId?: string;
  // Set only by the new tab openVoiceInNewTab() opens (see below) via the
  // ?voice= URL param — getUserMedia() needs a REAL click in THIS tab's own
  // document (a click in the embedded iframe doesn't transfer), so this
  // can't auto-start voice; it's used purely to make the one remaining
  // click impossible to miss instead of leaving the student staring at a
  // plain text-mode screen with no indication anything is different.
  requestedVoiceMode?: "push-to-talk" | "hands-free";
  // Also set only by openVoiceInNewTab() via the ?token= URL param — see
  // the comment there for why this can't just rely on localStorage.
  resumeAccessToken?: string;
}) {
  const [phase, setPhase] = useState<"pre-check" | "resuming" | "in-progress" | "error">(resumeSessionId ? "resuming" : "pre-check");
  const [email, setEmail] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  // The per-session secret handed back ONLY at creation (spec requirement
  // 9) — kept in localStorage via lib/mockInterviewClientAuth.ts (not shared
  // further) so a refresh, or coming back later for the report/certificate,
  // doesn't orphan the session, and passed on every subsequent request so
  // the backend can verify it's really this session's owner asking.
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Set only on a 402 from the backend (no unused credit for this path and
  // not on the admin test-email allowlist) so the error view can offer a
  // real purchase link instead of just the plain error text.
  const [needsPurchase, setNeedsPurchase] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Three interview modes. Text is the one guaranteed to always work (spec
  // requirement 7, every phase). Push-to-talk (Phase E) is turn-based:
  // synthesize the AI's text, play it, let the student record an answer,
  // transcribe it, then feed that text through the EXACT SAME submitTurn()
  // the text UI already uses below — voice never bypasses the
  // transcript/scoring pipeline, it only feeds it. Hands-free (Phase F) is
  // Fish Audio Agents: a persistent, continuous voice connection that owns
  // its own turn-taking/interruption/VAD — see startHandsFree() below.
  // Any failure in either voice mode falls back to text, never losing the
  // interview itself (the credit was already consumed when the interview
  // STARTED, not by anything voice-related).
  type InterviewUIMode = "text" | "push-to-talk" | "hands-free";
  const [mode, setMode] = useState<InterviewUIMode>("text");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  // window.open() from inside the Wix iframe is NOT reliable — mobile
  // browsers in particular will silently block it, especially on a second
  // attempt, with no error to catch. Rather than trust it blindly, this
  // also renders a real, visible link as a guaranteed fallback the student
  // can tap directly; a genuine click on an <a target="_blank"> is treated
  // very differently from a popup than a script-triggered window.open().
  const [voiceTabUrl, setVoiceTabUrl] = useState<string | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const spokenTurnIdsRef = useRef<Set<string>>(new Set());

  function fallbackToTextMode(message: string) {
    stopSpeaking();
    setMode("text");
    setVoiceNotice(message);
  }

  // Wix embeds this page in an iframe, and Wix's HTML-embed component only
  // ever grants an embedded iframe "camera", "encrypted-media", or
  // "fullscreen" — confirmed against Wix's own Velo docs for $w.HtmlComponent's
  // `allow` property, which does not list "microphone" among the permissions
  // it supports at all. There is no Wix-side configuration that fixes this;
  // getUserMedia() is silently blocked by the browser's Permissions Policy
  // before either voice mode can ever connect. The workaround is to run the
  // voice session in a real top-level tab instead, where that restriction
  // doesn't apply — resuming the SAME session via localStorage's saved
  // accessToken (lib/mockInterviewClientAuth.ts), so no credit or progress
  // is reused/lost by opening a second tab.
  function isEmbeddedInIframe(): boolean {
    try {
      return window.self !== window.top;
    } catch {
      // A cross-origin parent throws on window.top access — that IS being embedded.
      return true;
    }
  }

  function openVoiceInNewTab(targetVoiceMode: "push-to-talk" | "hands-free") {
    if (!session || !accessToken) return;
    // The new tab can't rely on localStorage alone to pick up the access
    // token: on mobile Safari/Chrome, storage written by this component
    // while running inside the Wix iframe (a third-party context) is
    // partitioned away from a direct top-level visit to the same origin,
    // so the new tab's own localStorage read can come back empty even
    // though this tab clearly has the token. Carrying it in the URL (the
    // same thing the resume GET request already does, see the
    // resumeSessionId effect below) means the new tab is never stuck
    // waiting on storage that may never arrive.
    const url = `${window.location.origin}/app/mock-interview/session?path=${encodeURIComponent(pathSlug)}&difficulty=${encodeURIComponent(difficulty)}&resume=${encodeURIComponent(session.id)}&voice=${targetVoiceMode}&token=${encodeURIComponent(accessToken)}`;
    const opened = window.open(url, "_blank", "noopener");
    // A blocked popup returns null/undefined (no exception) — can't be
    // caught, only detected after the fact. Either way, show the real
    // link too, so there's always a guaranteed way to actually get there.
    setVoiceTabUrl(url);
    setVoiceNotice(
      opened
        ? "Voice modes need their own browser tab to use your microphone — opened your interview there. If you don't see the new tab, use the link below. This tab can stay open or be closed; nothing is lost either way."
        : "Your browser blocked the new tab. Use the link below to open your interview and start voice there — nothing is lost."
    );
  }

  // --- Phase F: Fish Audio Agents (hands-free, continuous voice) ---------
  // Verified against the real @fishaudio/agent-client package (its shipped
  // .d.ts, not just docs) before writing any of this — AgentSession.start()
  // takes the backend's session object verbatim as `sessionToken`, mic
  // capture and the permission prompt happen inside start() itself (must
  // be called from a user gesture), and natural interruption/turn-taking
  // are entirely the Agent's own server-side behavior — this component
  // never calls session.interrupt() itself, there is no "tap to interrupt"
  // button here the way push-to-talk needs one.
  type HandsFreeStatus = "idle" | "connecting" | "connected" | "reconnecting" | "ended" | "error";
  const [handsFreeStatus, setHandsFreeStatus] = useState<HandsFreeStatus>("idle");
  const [handsFreeAgentMode, setHandsFreeAgentMode] = useState<"listening" | "thinking" | "speaking" | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<{ role: "user" | "agent"; text: string }[]>([]);
  const [livePartialUserText, setLivePartialUserText] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const agentSessionRef = useRef<any>(null);
  const handsFreeReconnectAttemptedRef = useRef(false);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopSessionPolling() {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }

  // While hands-free, the browser never calls /api/mock-interview-turn
  // itself — Fish Audio's own servers do, through the Custom LLM webhook
  // (mock-interview-agent-llm.ts), which is why the on-screen "official"
  // transcript/progress/section/completion state has to be polled rather
  // than updated from the local submitTurn() flow the other two modes use.
  function startSessionPolling(sessionId: string, token: string | null) {
    stopSessionPolling();
    pollIntervalRef.current = setInterval(async () => {
      try {
        const url = token
          ? `/api/mock-interview-session?id=${encodeURIComponent(sessionId)}&accessToken=${encodeURIComponent(token)}`
          : `/api/mock-interview-session?id=${encodeURIComponent(sessionId)}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok && data.session) {
          setSession(data.session);
          if (data.session.status === "complete") {
            stopSessionPolling();
            await endHandsFreeSession();
          }
        }
      } catch {
        // Transient — the next tick retries. A genuine connection loss
        // surfaces through the SDK's own onStatusChange/onDisconnect
        // callbacks below, not through this polling loop.
      }
    }, 4000);
  }

  async function endHandsFreeSession() {
    stopSessionPolling();
    try {
      await agentSessionRef.current?.end();
    } catch {
      // best-effort
    }
    agentSessionRef.current = null;
    setHandsFreeStatus("ended");
    if (session && accessToken) {
      try {
        await fetch("/api/mock-interview-voice-agent-end", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sessionId: session.id, accessToken }),
        });
      } catch {
        // best-effort cost-control cleanup — never blocks the student
      }
    }
  }

  // Called from a button click (a user gesture, required for mic
  // permission + audio autoplay) — and also called again, automatically,
  // exactly once per disconnect, if the connection drops and needs a fresh
  // Fish session (see handleHandsFreeDisconnect below). Either way, the
  // interview/credit are completely unaffected: they live in
  // MockInterviewSession/InterviewTurn, not in whichever Fish session_id
  // happens to be attached at the moment.
  async function startHandsFree() {
    if (!session || !accessToken) {
      // Previously a silent no-op — if this ever fires again (missing
      // session/token for some other reason), the student should see
      // something instead of a dead button.
      setVoiceNotice("Couldn't start hands-free voice — your interview session didn't load correctly. Try reloading this tab.");
      return;
    }
    setVoiceNotice(null);
    setHandsFreeStatus("connecting");
    try {
      const startRes = await fetch("/api/mock-interview-voice-agent-start", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId: session.id, accessToken }),
      });
      const startData = await startRes.json();
      if (!startRes.ok || !startData.agentSession) {
        throw new Error(startData?.error || "Could not start hands-free voice mode.");
      }

      const { AgentSession } = await import("@fishaudio/agent-client");
      const agentSession = await AgentSession.start({
        // The backend's Fish Audio response, passed through verbatim —
        // confirmed from @fishaudio/agent-client's own type definitions:
        // "Session token created by the host backend, passed through
        // verbatim." Never reshaped or narrowed on the way here.
        sessionToken: startData.agentSession,
        callbacks: {
          onStatusChange: (status: HandsFreeStatus) => {
            if (status === "connected") handsFreeReconnectAttemptedRef.current = false;
            setHandsFreeStatus(status);
          },
          onModeChange: (agentMode: "listening" | "thinking" | "speaking") => setHandsFreeAgentMode(agentMode),
          onUserTranscript: (event: { text: string; final: boolean }) => {
            setLivePartialUserText(event.final ? "" : event.text);
          },
          onMessage: (message: { role: "user" | "agent"; text: string }) => {
            setLivePartialUserText("");
            setLiveTranscript((prev) => [...prev, message]);
          },
          onDisconnect: (event: { reason: string }) => {
            void handleHandsFreeDisconnect(event.reason);
          },
          onError: (err: { code?: string; message?: string }) => {
            if (err.code === "mic_permission_denied") {
              fallbackToTextMode("Microphone access was denied — allow it to speak naturally, or use push-to-talk or text instead.");
            } else {
              setVoiceNotice(err.message || "A voice connection problem occurred.");
            }
          },
        },
      });

      agentSessionRef.current = agentSession;
      setLiveTranscript(agentSession.getTranscript().map((seg: { role: "user" | "agent"; text: string }) => ({ role: seg.role, text: seg.text })));
      setHandsFreeStatus("connected");
      setMode("hands-free");
      startSessionPolling(session.id, accessToken);
      try {
        // Satisfies browser autoplay policy for the agent's speech — safe
        // to call defensively; a failure here just means the first
        // utterance may need a second interaction to actually play.
        await agentSession.startAudio();
      } catch {
        // non-fatal
      }
    } catch (err) {
      setHandsFreeStatus("error");
      // Confirmed from @fishaudio/agent-client's own types: a permission
      // denial REJECTS start() itself (as a FishAgentError with this code),
      // it does not just surface later via onError — so this is checked
      // here too, not only in the onError callback above.
      const code = (err as { code?: string } | undefined)?.code;
      if (code === "mic_permission_denied") {
        fallbackToTextMode("Microphone access was denied — allow it to speak naturally, or use push-to-talk or text instead.");
      } else {
        fallbackToTextMode(err instanceof Error ? err.message : "Could not start hands-free voice mode.");
      }
    }
  }

  // "connection_lost" is client-derived (the SDK's own transport-level
  // reconnect already failed) — everything else (user_hangup, agent_hangup,
  // conversation_timeout, escalated) is a real end, not a glitch to retry.
  // Capped at ONE automatic retry so a persistently bad connection falls
  // back to push-to-talk/text instead of looping forever.
  async function handleHandsFreeDisconnect(reason: string) {
    stopSessionPolling();
    if (reason === "connection_lost" && !handsFreeReconnectAttemptedRef.current) {
      handsFreeReconnectAttemptedRef.current = true;
      setHandsFreeStatus("reconnecting");
      await startHandsFree();
      return;
    }
    setHandsFreeStatus("ended");
    agentSessionRef.current = null;
    if (session && accessToken) {
      try {
        await fetch("/api/mock-interview-voice-agent-end", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sessionId: session.id, accessToken }),
        });
      } catch {
        // best-effort
      }
    }
    if (reason !== "conversation_timeout") {
      fallbackToTextMode("Your hands-free voice connection ended — continuing in text mode. Nothing was lost.");
    } else {
      setMode("text");
    }
  }

  // Cleanup on unmount — never leave a live Fish Agents session (billed by
  // the minute) or a polling interval running after the component itself
  // is gone.
  useEffect(() => {
    return () => {
      stopSessionPolling();
      agentSessionRef.current?.end().catch(() => {});
    };
  }, []);

  function stopSpeaking() {
    audioElRef.current?.pause();
    setIsSpeaking(false);
  }

  async function speak(sessionId: string, token: string | null, text: string) {
    if (!token) return;
    setIsSpeaking(true);
    try {
      const res = await fetch("/api/mock-interview-voice-synthesize", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, accessToken: token, text }),
      });
      if (!res.ok) throw new Error("voice synthesis unavailable");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audioEl = audioElRef.current;
      if (!audioEl) return;
      audioEl.src = url;
      audioEl.onended = () => setIsSpeaking(false);
      await audioEl.play();
    } catch {
      fallbackToTextMode("Voice playback isn't available right now — continuing in text mode.");
    }
  }

  // Interruption support (spec requirement 2/9): starting to record stops
  // whatever the AI is currently saying immediately, same as interrupting a
  // real person — there's no server-side "interrupt" concept (Fish Audio
  // has no duplex API to interrupt), so this is entirely client-side.
  async function startRecording() {
    stopSpeaking();
    setVoiceNotice(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      fallbackToTextMode("Couldn't access your microphone — continuing in text mode.");
    }
  }

  async function stopRecordingAndSend() {
    const recorder = mediaRecorderRef.current;
    if (!recorder || !session || !accessToken) return;
    setIsRecording(false);
    setIsTranscribing(true);
    const audioBlob: Blob = await new Promise((resolve) => {
      recorder.onstop = () => {
        recorder.stream.getTracks().forEach((t) => t.stop());
        resolve(new Blob(audioChunksRef.current, { type: recorder.mimeType || "audio/webm" }));
      };
      recorder.stop();
    });

    try {
      const form = new FormData();
      form.append("sessionId", session.id);
      form.append("accessToken", accessToken);
      form.append("audio", audioBlob, "answer.webm");
      const res = await fetch("/api/mock-interview-voice-transcribe", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || typeof data.text !== "string") throw new Error(data?.error || "transcription failed");
      setIsTranscribing(false);
      await submitTurn(session.id, data.text);
    } catch {
      setIsTranscribing(false);
      fallbackToTextMode("Couldn't transcribe that answer — continuing in text mode. Please type your last answer below.");
    }
  }

  // Auto-speak each new AI question once, in push-to-talk mode only —
  // hands-free mode has Fish Audio speak its own agent turns directly, this
  // component never calls the synthesize endpoint in that mode.
  useEffect(() => {
    if (mode !== "push-to-talk" || !session || !accessToken) return;
    const pendingTurn = session.turns.find((t) => t.studentResponse === null && !spokenTurnIdsRef.current.has(t.id));
    if (!pendingTurn) return;
    spokenTurnIdsRef.current.add(pendingTurn.id);
    speak(session.id, accessToken, pendingTurn.aiMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, session?.turns.length, accessToken]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session?.turns.length]);

  useEffect(() => {
    if (!resumeSessionId) return;
    // A real, logged-in Wix student can resume even without the stored
    // token (authorizeSessionAccess also accepts their verified identity —
    // spec Phase D priority 6); the stored token just saves a round-trip
    // when we do have it, and is the ONLY path for a dev-mode/local session.
    // resumeAccessToken (carried in the URL by openVoiceInNewTab) takes
    // priority over localStorage — see the comment there for why the
    // stored copy can be missing in this exact new-tab-for-voice case.
    const storedToken = resumeAccessToken || getSessionAccessToken(resumeSessionId);
    const url = storedToken
      ? `/api/mock-interview-session?id=${encodeURIComponent(resumeSessionId)}&accessToken=${encodeURIComponent(storedToken)}`
      : `/api/mock-interview-session?id=${encodeURIComponent(resumeSessionId)}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.error || !data.session) {
          setError(data.error || "Could not resume this interview.");
          setPhase("error");
          return;
        }
        setSession(data.session);
        if (storedToken) {
          setAccessToken(storedToken);
          saveSessionAccessToken(resumeSessionId, storedToken);
        }
        setPhase("in-progress");
      })
      .catch(() => {
        setError("Could not resume this interview.");
        setPhase("error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeSessionId]);

  useEffect(() => {
    if (!session || session.status === "complete") return;
    const start = new Date(session.startedAt).getTime();
    const tick = () => setElapsedSeconds(Math.floor((Date.now() - start) / 1000));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [session]);

  async function startInterview() {
    setPending(true);
    setError(null);
    setNeedsPurchase(false);
    try {
      // A real, logged-in Wix member needs no email at all — their identity
      // comes from the ltv_wm cookie server-side (spec Phase D priority 1).
      // devStudentEmail is only read by the backend when there's no Wix
      // identity AND this isn't production, so leaving it blank is fine for
      // a real student; it's only required for local/dev testing.
      const res = await fetch("/api/mock-interview-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ careerPath: pathSlug, difficulty, mode: "text", devStudentEmail: email.trim() || undefined }),
      });
      // A server-side crash (a timeout, a misconfiguration) can return a
      // non-JSON body — showing the raw JSON.parse error to a student
      // ("Unexpected token...") is both confusing and unhelpful, so this
      // falls back to one clear message instead of letting that exception
      // propagate as-is.
      let data: { session?: Session; accessToken?: string; error?: string };
      try {
        data = await res.json();
      } catch {
        throw new Error("Something went wrong starting the interview. Please try again in a moment.");
      }
      if (!res.ok || !data.session || !data.accessToken) {
        if (res.status === 402) setNeedsPurchase(true);
        throw new Error(data?.error || "Could not start the interview.");
      }
      const { session: newSession, accessToken: newAccessToken } = data;
      setSession(newSession);
      setAccessToken(newAccessToken);
      saveSessionAccessToken(newSession.id, newAccessToken);
      setPhase("in-progress");
      await submitTurn(newSession.id, "", newAccessToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong starting the interview.");
    } finally {
      setPending(false);
    }
  }

  async function submitTurn(sessionId: string, studentResponse: string, tokenOverride?: string) {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/mock-interview-turn", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, studentResponse, accessToken: tokenOverride ?? accessToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setSession(data.session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  async function send() {
    const response = draft.trim();
    if (!response || pending || !session) return;
    setDraft("");
    await submitTurn(session.id, response);
  }

  if (phase === "resuming") {
    return <p className="text-center text-sm text-stone">Resuming your interview…</p>;
  }

  if (phase === "error" && !session) {
    if (needsPurchase) {
      return (
        <div className="mx-auto max-w-xl border border-crimson/30 bg-crimson/5 p-6 text-center">
          <p className="eyebrow mb-2">Purchase required</p>
          <h2 className="display text-xl text-ink">You&apos;ll need a Mock Interview to begin</h2>
          <p className="mt-3 text-sm text-stone">
            This interview isn&apos;t included with your current plan. A Professional Mock
            Interview is a one-time $19.97 purchase — once it&apos;s on your account, come back
            here and pick any difficulty to start.
          </p>
          <a
            href="https://www.ltvacademy.com/pricing-plans/plans-pricing"
            target="_top"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
          >
            Purchase a Mock Interview — $19.97
          </a>
          <div className="mt-4">
            <Link href="/app/mock-interview/history" className="text-sm text-crimson-deep hover:underline">
              Back to my history
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-xl border border-crimson/30 bg-crimson/5 p-6 text-center">
        <p className="text-sm text-crimson">{error ?? "Something went wrong."}</p>
        <Link href="/app/mock-interview/history" className="mt-4 inline-block text-sm text-crimson-deep hover:underline">
          Back to my history
        </Link>
      </div>
    );
  }

  if (phase === "pre-check" && needsPurchase) {
    return (
      <div className="mx-auto max-w-xl border border-crimson/30 bg-crimson/5 p-6 text-center">
        <p className="eyebrow mb-2">Purchase required</p>
        <h2 className="display text-xl text-ink">You&apos;ll need a Mock Interview to begin</h2>
        <p className="mt-3 text-sm text-stone">
          This interview isn&apos;t included with your current plan. A Professional Mock
          Interview is a one-time $19.97 purchase — once it&apos;s on your account, come back
          here and pick any difficulty to start.
        </p>
        <a
          href="https://www.ltvacademy.com/pricing-plans/plans-pricing"
          target="_top"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
        >
          Purchase a Mock Interview — $19.97
        </a>
        <div className="mt-4">
          <Link href="/app/mock-interview" className="text-sm text-crimson-deep hover:underline">
            Back to interview selection
          </Link>
        </div>
      </div>
    );
  }

  if (phase === "pre-check") {
    return (
      <div className="mx-auto max-w-xl">
        <div className="border border-ink/15 bg-parchment p-6">
          <p className="eyebrow mb-2">Before you begin</p>
          <h2 className="display text-xl">{pathTitle} — {difficulty} interview</h2>
          <ul className="mt-4 space-y-2 text-sm text-stone">
            <li>• Total length: 54 minutes (45 formal assessment + 9 coaching, after a brief greeting)</li>
            <li>• Text mode by default; two beta voice options let you speak with an authorized AI voice — never a human pretending, and never your own voice — including a hands-free mode where you never have to press a button</li>
            <li>• If voice has any trouble (microphone, network, connection), you&apos;ll drop back to typing automatically — nothing is lost, and your purchased interview is never consumed twice</li>
            <li>• You can&apos;t pause the clock once you start — budget the full 54 minutes</li>
          </ul>

          <label className="mt-6 block text-sm font-semibold text-ink">
            Email (local/dev testing only — a real logged-in member needs this blank)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />

          {error && <p className="mt-3 text-sm text-crimson">{error}</p>}

          <button
            type="button"
            onClick={startInterview}
            disabled={pending}
            className="mt-6 w-full rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
          >
            {pending ? "Starting…" : "Begin interview"}
          </button>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const isComplete = session.status === "complete";
  const progressPct = Math.min(100, (elapsedSeconds / 60 / TOTAL_MINUTES) * 100);
  const remainingMinutes = Math.max(0, TOTAL_MINUTES - Math.floor(elapsedSeconds / 60));

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 mb-6 border-b border-ink/10 bg-parchment/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center justify-between text-xs text-stone">
          <span className="font-semibold text-crimson-deep">
            {SECTION_SCHEDULE.find((s) => s.id === session.currentSection)?.label ?? "Interview"}
          </span>
          <span>{isComplete ? "Complete" : `${remainingMinutes} min remaining`}</span>
        </div>
        <div className="mt-2 h-1.5 w-full bg-ink/10">
          <div className="h-full bg-crimson transition-all" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {!isComplete && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-stone">
            {mode === "hands-free" ? "Hands-free voice (beta)" : mode === "push-to-talk" ? "Push-to-talk voice (beta)" : "Text mode"}
          </span>
          <div className="flex flex-wrap gap-2">
            {mode !== "text" && (
              <button
                type="button"
                onClick={() => {
                  if (mode === "push-to-talk") stopSpeaking();
                  if (mode === "hands-free") void endHandsFreeSession();
                  setMode("text");
                  setVoiceNotice(null);
                }}
                className="border-2 border-crimson px-4 py-2 text-xs font-semibold uppercase tracking-wide text-crimson transition hover:bg-crimson hover:text-parchment"
              >
                Switch to text
              </button>
            )}
            {mode !== "push-to-talk" && (
              <button
                type="button"
                onClick={() => {
                  if (isEmbeddedInIframe()) {
                    openVoiceInNewTab("push-to-talk");
                    return;
                  }
                  if (mode === "hands-free") void endHandsFreeSession();
                  setMode("push-to-talk");
                  setVoiceNotice(null);
                }}
                className="border-2 border-crimson px-4 py-2 text-xs font-semibold uppercase tracking-wide text-crimson transition hover:bg-crimson hover:text-parchment"
              >
                Try push-to-talk (beta)
              </button>
            )}
            {mode !== "hands-free" && (
              <button
                type="button"
                onClick={() => {
                  if (isEmbeddedInIframe()) {
                    openVoiceInNewTab("hands-free");
                    return;
                  }
                  if (mode === "push-to-talk") stopSpeaking();
                  void startHandsFree();
                }}
                className="border-2 border-crimson px-4 py-2 text-xs font-semibold uppercase tracking-wide text-crimson transition hover:bg-crimson hover:text-parchment"
              >
                Try hands-free (beta)
              </button>
            )}
          </div>
        </div>
      )}
      {voiceNotice && (
        <div className="mb-4 border border-gold/40 bg-gold/10 p-3 text-sm text-ink">
          <p>{voiceNotice}</p>
          {voiceTabUrl && (
            <a
              href={voiceTabUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-crimson px-4 py-2 text-xs font-semibold uppercase tracking-wide text-parchment hover:bg-crimson-deep"
            >
              Open voice interview in a new tab
            </a>
          )}
        </div>
      )}
      {requestedVoiceMode && mode === "text" && !isComplete && (
        <div className="mb-4 border-2 border-crimson bg-crimson/5 p-4 text-center">
          <p className="mb-2 text-sm text-ink">
            One more tap to start {requestedVoiceMode === "hands-free" ? "hands-free" : "push-to-talk"} voice — your browser needs you to
            start it directly in this tab.
          </p>
          <button
            type="button"
            onClick={() => {
              if (requestedVoiceMode === "hands-free") {
                void startHandsFree();
              } else {
                setMode("push-to-talk");
              }
            }}
            className="bg-crimson px-6 py-3 text-sm font-semibold uppercase tracking-wide text-parchment hover:bg-crimson-deep"
          >
            Start {requestedVoiceMode === "hands-free" ? "hands-free" : "push-to-talk"} voice
          </button>
        </div>
      )}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioElRef} className="hidden" />

      <div className="space-y-4">
        {session.turns.map((turn) => (
          <div key={turn.id}>
            <div className="border-l-2 border-gold pl-4 text-sm text-ink">
              <p className="eyebrow mb-1 text-xs">Interviewer</p>
              <p className="whitespace-pre-wrap">{turn.aiMessage}</p>
            </div>
            {turn.studentResponse && (
              <div className="mt-3 border-l-2 border-ink/20 pl-4 text-sm text-ink">
                <p className="eyebrow mb-1 text-xs">You</p>
                <p className="whitespace-pre-wrap">{turn.studentResponse}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={transcriptEndRef} />
      </div>

      {error && <p className="mt-4 text-sm text-crimson">{error}</p>}

      {!isComplete && mode === "hands-free" && (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-[2px] border border-ink/10 bg-white/60 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-crimson-deep">
            {handsFreeStatus === "connecting" && "Connecting…"}
            {handsFreeStatus === "connected" &&
              (handsFreeAgentMode === "speaking" ? "Interviewer speaking" : handsFreeAgentMode === "thinking" ? "Interviewer thinking…" : "Listening — just speak naturally")}
            {handsFreeStatus === "reconnecting" && "Reconnecting…"}
            {handsFreeStatus === "ended" && "Call ended"}
            {handsFreeStatus === "error" && "Connection problem"}
            {handsFreeStatus === "idle" && "Not connected"}
          </p>
          {livePartialUserText && <p className="text-sm italic text-stone">&ldquo;{livePartialUserText}&rdquo;</p>}
          {liveTranscript.length > 0 && !livePartialUserText && (
            <p className="text-sm text-stone">&ldquo;{liveTranscript[liveTranscript.length - 1].text}&rdquo;</p>
          )}
          <p className="text-xs text-stone">No buttons to press — speak whenever you&apos;re ready, and feel free to talk over the interviewer if you need to.</p>
        </div>
      )}

      {!isComplete && mode === "push-to-talk" && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-xs text-stone">
            {isSpeaking ? "Interviewer speaking… tap to interrupt and answer" : isTranscribing ? "Transcribing your answer…" : isRecording ? "Recording — tap to finish" : "Tap to answer by voice"}
          </p>
          <button
            type="button"
            onClick={() => (isRecording ? stopRecordingAndSend() : startRecording())}
            disabled={isTranscribing || pending}
            className={`rounded-full px-8 py-4 text-sm font-semibold text-parchment disabled:opacity-40 ${
              isRecording ? "bg-crimson-deep" : "bg-crimson hover:bg-crimson-deep"
            }`}
          >
            {isRecording ? "Stop & send" : isSpeaking ? "Interrupt & answer" : "Record answer"}
          </button>
        </div>
      )}

      {!isComplete && mode === "text" && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Type your answer…"
            rows={3}
            disabled={pending}
            className="flex-1 border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none disabled:opacity-60"
          />
          <button
            type="button"
            onClick={send}
            disabled={pending || !draft.trim()}
            className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
          >
            {pending ? "…" : "Send"}
          </button>
        </div>
      )}

      {isComplete && (
        <div className="mt-8 border border-gold/40 bg-gold/10 p-6 text-center">
          <p className="display text-xl">Interview complete</p>
          <p className="mt-2 text-sm text-stone">
            Your transcript is saved. Your full performance report — score breakdown, detailed
            answer review, and certificate if you earned one — is prepared separately; open it
            below once it&apos;s ready.
          </p>
          <Link
            href={`/app/mock-interview/report?sessionId=${session.id}`}
            className="mt-4 inline-block rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
          >
            View my report
          </Link>
        </div>
      )}
    </div>
  );
}
