"use client";

import { useState } from "react";

type PendingCredit = {
  id: string;
  wixOrderId: string;
  wixMemberId: string;
  planId: string | null;
  status: string;
  attempts: number;
  nextAttemptAt: string;
  lastError: string | null;
  resolution: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function MockInterviewCreditRecoveryPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Same posture as the grading review page — held only in memory, not
  // browser storage, since this token can trigger real credit grants.
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<PendingCredit[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [retrying, setRetrying] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function login() {
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Invalid email or password.");
      setToken(data.token);
      setPassword("");
      await loadItems(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  async function loadItems(tokenOverride?: string) {
    const activeToken = tokenOverride ?? token;
    if (!activeToken) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/mock-interview-admin-pending-credits", { headers: { authorization: `Bearer ${activeToken}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Not authorized.");
      setItems(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setItems(null);
    } finally {
      setPending(false);
    }
  }

  async function retryNow(wixOrderId: string) {
    if (!token) return;
    setRetrying(wixOrderId);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/mock-interview-admin-pending-credits", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ wixOrderId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not retry this order.");
      const r = data.result;
      if (r.granted) {
        setMessage(`Order ${wixOrderId}: credit granted (${r.alreadyExisted ? "already existed" : "newly created"}).`);
      } else {
        setMessage(`Order ${wixOrderId}: still not resolved — ${r.reason}.`);
      }
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setRetrying(null);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl bg-parchment px-4 py-10 sm:px-6">
      <p className="eyebrow mb-2">Administrator only</p>
      <h1 className="display text-3xl text-ink">Mock Interview — Credit Recovery</h1>
      <p className="mt-2 max-w-2xl text-sm text-stone">
        Orders whose Wix payment couldn&apos;t be authoritatively verified on delivery land here instead of
        silently losing their credit. Most resolve automatically (Wix&apos;s own retries, plus a scheduled
        recheck) — this page is for anything still pending or exhausted after that.
      </p>

      {!token && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="flex-1 border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="flex-1 border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />
          <button
            type="button"
            onClick={login}
            disabled={pending || !email || !password}
            className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
          >
            {pending ? "Logging in…" : "Log in"}
          </button>
        </div>
      )}

      {token && (
        <div className="mt-6 flex items-center justify-between border border-ink/15 bg-white p-3 text-sm">
          <span className="text-stone">Logged in as {email}</span>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => loadItems()} className="text-crimson hover:text-crimson-deep">
              Refresh
            </button>
            <button
              type="button"
              onClick={() => {
                setToken(null);
                setItems(null);
              }}
              className="text-crimson hover:text-crimson-deep"
            >
              Log out
            </button>
          </div>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-crimson">{error}</p>}
      {message && <p className="mt-4 text-sm text-crimson-deep">{message}</p>}

      {items && items.length === 0 && <p className="mt-8 text-sm text-stone">Nothing needs attention right now.</p>}

      <div className="mt-8 space-y-4">
        {items?.map((item) => (
          <section key={item.id} className="border border-ink/15 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-mono text-xs text-ink">{item.wixOrderId}</p>
              <span
                className={`rounded-[2px] px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
                  item.status === "exhausted" ? "bg-crimson/10 text-crimson" : "bg-gold/10 text-crimson-deep"
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-xs text-stone">
              Member {item.wixMemberId} · Plan {item.planId ?? "—"} · Attempt {item.attempts}
            </p>
            <p className="mt-1 text-xs text-stone">
              Next automatic check: {new Date(item.nextAttemptAt).toLocaleString()}
            </p>
            {item.lastError && <p className="mt-1 text-xs text-crimson">Last error: {item.lastError}</p>}

            <button
              type="button"
              onClick={() => retryNow(item.wixOrderId)}
              disabled={retrying === item.wixOrderId}
              className="mt-4 rounded-[2px] bg-crimson px-5 py-2 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
            >
              {retrying === item.wixOrderId ? "Retrying…" : "Retry now"}
            </button>
          </section>
        ))}
      </div>
    </main>
  );
}
