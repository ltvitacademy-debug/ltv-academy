"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { CareerProfileDTO } from "@/lib/careerLaunchTypes";

const DEV_EMAIL_KEY = "careerLaunchDevEmail";

const EMPTY: Omit<CareerProfileDTO, "baseResumeText" | "baseResumeApprovedAt"> = {
  targetRoles: [],
  locations: [],
  compFloor: null,
  workAuth: "",
  excludedCompanies: [],
  weeklyTarget: 5,
  startAvailability: "",
};

export default function CareerLaunchIntakePage() {
  const [devEmail, setDevEmail] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [targetRoles, setTargetRoles] = useState("");
  const [locations, setLocations] = useState("");
  const [compFloor, setCompFloor] = useState<number | "">("");
  const [workAuth, setWorkAuth] = useState("");
  const [excluded, setExcluded] = useState("");
  const [weeklyTarget, setWeeklyTarget] = useState(5);
  const [startAvailability, setStartAvailability] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDevEmail(window.localStorage.getItem(DEV_EMAIL_KEY) ?? "");
  }, []);

  useEffect(() => {
    const query = devEmail ? `?devStudentEmail=${encodeURIComponent(devEmail)}` : "";
    fetch(`/api/career-launch-profile${query}`)
      .then((res) => res.json())
      .then((data: { profile: CareerProfileDTO | null; error?: string }) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        const profile = data.profile ?? EMPTY;
        setTargetRoles(profile.targetRoles.join("; "));
        setLocations(profile.locations.join("; "));
        setCompFloor(profile.compFloor ?? "");
        setWorkAuth(profile.workAuth);
        setExcluded(profile.excludedCompanies.join("; "));
        setWeeklyTarget(profile.weeklyTarget || 5);
        setStartAvailability(profile.startAvailability);
        setLoaded(true);
      })
      .catch(() => setError("Could not load your preferences."));
  }, [devEmail]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    setError(null);
    try {
      const res = await fetch("/api/career-launch-profile", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          devStudentEmail: devEmail || undefined,
          targetRoles: targetRoles.split(";").map((s) => s.trim()).filter(Boolean),
          locations: locations.split(";").map((s) => s.trim()).filter(Boolean),
          compFloor: compFloor === "" ? null : Number(compFloor),
          workAuth,
          excludedCompanies: excluded.split(";").map((s) => s.trim()).filter(Boolean),
          weeklyTarget,
          startAvailability,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setSaved(true);
    } catch {
      setError("Could not save your preferences.");
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app/career-launch" className="hover:text-crimson">
          LTV Career Launch
        </Link>
        {" · "}
        <span>Preferences</span>
      </nav>

      <p className="eyebrow mb-3">Tell us what to look for</p>
      <h1 className="display text-3xl">Your search preferences</h1>
      <p className="mt-3 max-w-xl text-stone">
        We only apply to roles inside the boundaries you set here. Update this anytime — changes
        apply to new matches going forward, not applications already submitted.
      </p>

      {error && <p className="mt-6 border border-crimson/40 bg-crimson/5 p-3 text-sm text-crimson-deep">{error}</p>}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink">Target roles</span>
          <input
            value={targetRoles}
            onChange={(e) => setTargetRoles(e.target.value)}
            className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />
          <span className="mt-1 block text-xs text-stone">Semicolon-separated (e.g. &quot;Data Engineer; Analytics Engineer&quot;). Order doesn&apos;t matter.</span>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink">Locations</span>
          <input
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Remote; Atlanta, GA"
            className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />
          <span className="mt-1 block text-xs text-stone">Semicolon-separated — a city/state can have its own comma.</span>
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-ink">Minimum salary</span>
            <input
              type="number"
              value={compFloor}
              onChange={(e) => setCompFloor(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-ink">Applications per week</span>
            <input
              type="number"
              min={1}
              max={50}
              value={weeklyTarget}
              onChange={(e) => setWeeklyTarget(Number(e.target.value))}
              className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink">Work authorization</span>
          <input
            value={workAuth}
            onChange={(e) => setWorkAuth(e.target.value)}
            className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink">Start availability</span>
          <input
            value={startAvailability}
            onChange={(e) => setStartAvailability(e.target.value)}
            className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink">Companies to never apply to</span>
          <input
            value={excluded}
            onChange={(e) => setExcluded(e.target.value)}
            placeholder="e.g. a current or former employer"
            className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />
        </label>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={!loaded}
            className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep disabled:opacity-50"
          >
            Save preferences
          </button>
          {saved && <span className="text-sm text-crimson-deep">Saved.</span>}
        </div>
      </form>

      <details className="mt-10 text-xs text-stone">
        <summary className="cursor-pointer">Dev mode (local testing only)</summary>
        <input
          type="email"
          value={devEmail}
          onChange={(e) => {
            setDevEmail(e.target.value);
            window.localStorage.setItem(DEV_EMAIL_KEY, e.target.value);
          }}
          placeholder="dev email, ignored in production"
          className="mt-2 w-full max-w-xs rounded-[2px] border border-ink/15 px-2 py-1"
        />
      </details>
    </main>
  );
}
