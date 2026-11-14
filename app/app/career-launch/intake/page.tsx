"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_PREFERENCES } from "@/lib/careerLaunchMockData";

// Prototype only — local state stands in for a real save. No backend call.

export default function CareerLaunchIntakePage() {
  const [targetRoles, setTargetRoles] = useState(MOCK_PREFERENCES.targetRoles.join(", "));
  const [locations, setLocations] = useState(MOCK_PREFERENCES.locations.join(", "));
  const [compFloor, setCompFloor] = useState(MOCK_PREFERENCES.compFloor);
  const [workAuth, setWorkAuth] = useState(MOCK_PREFERENCES.workAuth);
  const [excluded, setExcluded] = useState(MOCK_PREFERENCES.excludedCompanies.join(", "));
  const [weeklyTarget, setWeeklyTarget] = useState(MOCK_PREFERENCES.weeklyApplicationTarget);
  const [startAvailability, setStartAvailability] = useState(MOCK_PREFERENCES.startAvailability);
  const [saved, setSaved] = useState(false);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-6 border border-gold bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-crimson-deep">
        Prototype — placeholder data, not a live feature
      </div>

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

      <form
        className="mt-8 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink">Target roles</span>
          <input
            value={targetRoles}
            onChange={(e) => setTargetRoles(e.target.value)}
            className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />
          <span className="mt-1 block text-xs text-stone">Comma-separated. Order doesn&apos;t matter.</span>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-ink">Locations</span>
          <input
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-ink">Minimum salary</span>
            <input
              value={compFloor}
              onChange={(e) => setCompFloor(e.target.value)}
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
            className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
          >
            Save preferences
          </button>
          {saved && <span className="text-sm text-crimson-deep">Saved (prototype only — not persisted).</span>}
        </div>
      </form>
    </main>
  );
}
