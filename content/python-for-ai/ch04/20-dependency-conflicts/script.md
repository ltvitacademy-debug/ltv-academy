# Lesson 20 — Dependency Conflicts · Voiceover script

Segments map 1:1 to slides. Target: ~2.5 minutes total.

---

## S1 · TITLE CARD

Libraries depend on other libraries. Install enough packages into one
environment, and eventually two of them will want incompatible versions
of the same shared dependency. This lesson covers spotting that, reading
pip's error, and fixing it.

## S2 · CODE: What a conflict looks like

package-a needs httpx 0.27 or newer. package-b needs httpx older than
0.25. There's no single httpx version that satisfies both, so pip refuses
to guess — it reports the exact conflict instead of silently installing
something broken.

## S3 · STEPS: Resolving it

Four strategies, roughly in order of how often they work. Upgrade the
stricter package, since maintainers update their own dependency ranges
over time. Loosen a pin you added yourself. Isolate the two conflicting
tools into separate environments if they're never actually needed
together. Or look for a compatible middle version.

## S4 · CODE: Checking consistency

pip check scans everything currently installed and reports any broken
dependency relationships. Run it after manually installing or upgrading
packages one at a time, to confirm you haven't quietly broken something
pip's own installer let slip through.

## S5 · STEPS: The real prevention

Most dependency headaches only happen because everything's crammed into
one shared environment. This is the actual payoff of virtual
environments — give each project, or each genuinely incompatible pair of
tools, its own isolated environment, and most conflicts never happen in
the first place.

## S6 · OUTRO CARD

Read the conflict, try upgrading or loosening a pin, isolate if needed,
and verify with pip check. Next lesson: a tour of the actual AI libraries
you'll be installing throughout the rest of this course.
