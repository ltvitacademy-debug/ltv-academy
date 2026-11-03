"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type VerificationResult =
  | { valid: true; certificateNumber: string; studentName: string; careerPath: string; difficulty: string; issuedAt: string }
  | { valid: false; certificateNumber: string };

function VerifyPageInner() {
  const params = useSearchParams();
  const initialNumber = params.get("number") ?? "";
  const [number, setNumber] = useState(initialNumber);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [pending, setPending] = useState(false);

  async function check(n: string) {
    if (!n.trim()) return;
    setPending(true);
    try {
      const res = await fetch(`/api/mock-interview-verify?number=${encodeURIComponent(n.trim())}`);
      const data = await res.json();
      setResult(data);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    if (initialNumber) check(initialNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-xl bg-parchment px-4 py-16 sm:px-6">
      <p className="eyebrow mb-2 text-center">Lifting the Veil IT Academy</p>
      <h1 className="display text-center text-3xl text-ink">Certificate Verification</h1>
      <p className="mt-3 text-center text-sm text-stone">
        Enter a Professional Mock Interview certificate number to confirm it&apos;s genuine.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          check(number);
        }}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="LTV-PMI-XXXXXXXX-XXXXXX"
          className="flex-1 border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
        >
          {pending ? "Checking…" : "Verify"}
        </button>
      </form>

      {result && result.valid && (
        <div className="mt-8 border border-gold/40 bg-gold/10 p-6 text-center">
          <p className="display text-xl text-crimson-deep">Certificate Verified</p>
          <p className="mt-3 text-ink">
            <span className="font-semibold">{result.studentName}</span> successfully completed the
          </p>
          <p className="font-semibold text-ink capitalize">
            {result.careerPath} — {result.difficulty} Professional Mock Interview
          </p>
          <p className="mt-2 text-sm text-stone">
            Issued {new Date(result.issuedAt).toLocaleDateString()} · No. {result.certificateNumber}
          </p>
        </div>
      )}

      {result && !result.valid && (
        <div className="mt-8 border border-crimson/30 bg-crimson/5 p-6 text-center">
          <p className="display text-xl text-crimson">Not a Valid Certificate</p>
          <p className="mt-2 text-sm text-stone">
            &ldquo;{result.certificateNumber}&rdquo; does not match any issued certificate.
          </p>
        </div>
      )}
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={null}>
      <VerifyPageInner />
    </Suspense>
  );
}
