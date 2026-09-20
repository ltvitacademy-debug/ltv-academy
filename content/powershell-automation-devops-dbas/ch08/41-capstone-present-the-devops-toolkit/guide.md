# Capstone: Present the DevOps Toolkit

You've built the whole thing: `MeridianDBAOps`'s automation scripts (Lesson 38), a
CI/CD pipeline for schema changes (Lesson 39), and tuned monitoring and alerting
(Lesson 40). None of that matters in an interview or a performance review if you can't
explain it in two or three sentences. This lesson is about the story, not the code.

## What you'll learn

- Why the story matters as much as the scripts when you're presenting this work
- The four-beat arc this whole capstone maps onto, and why the order matters
- How to adjust the same story for an interviewer versus your own manager

## Why the story matters more than the scripts

Nobody in an interview is going to read `Invoke-MeridianBackups.ps1` line by line, and
your manager already has a dozen other things competing for attention. What both
audiences actually want is the same thing: proof you can take something broken and
messy — a manual, error-prone routine — and turn it into something reliable, on your
own initiative. The code is evidence. The story is what gets remembered.

## The four-beat arc

Every lesson in this capstone maps directly onto one beat of the same story:

- **Before — manual and error-prone.** Backups by hand, a 40-minute manual health
  check, schema changes deployed from emailed scripts with no review (Lesson 37).
  This beat needs to be specific and honest — "backups sometimes got missed before a
  long weekend" lands harder than "the process wasn't great."
- **The automation suite.** Real dbatools scripts — `Invoke-MeridianBackups`,
  `Invoke-MeridianHealthCheck`, `Invoke-MeridianIndexMaintenance` — replacing manual
  work with tested, repeatable PowerShell (Lesson 38).
- **Source control and CI/CD.** A real schema change (new columns and an index on
  `dbo.Orders`) moving through a pull request and an Azure DevOps pipeline with a
  production approval gate, instead of an emailed `.sql` file (Lesson 39).
- **Monitoring, tuned.** Alerting that actually distinguishes a real problem from
  noise — routed by severity, requiring a sustained condition before paging a phone
  (Lesson 40).

The order isn't arbitrary. Leading with "I built a CI/CD pipeline" without the "before"
means the listener has no way to judge whether it mattered. Leading with the pain point
first is what makes everything after it land as a solution to something real.

## Framing it for an interviewer vs. your manager

The same four beats, told differently depending on who's listening:

- **In an interview**, lean on specifics and technical depth — the interviewer is
  evaluating whether you actually did the work, not just heard about it. Naming real
  tools (`dbatools`, SSDT, `SqlPackage.exe`, Azure DevOps Pipelines) and being ready to
  go one layer deeper into any of them signals hands-on experience, not a rehearsed
  summary.
- **To your manager**, lean on outcomes and risk reduction — time saved, incidents
  avoided, noise reduced. A manager cares less about `Invoke-DbaDbIndexOptimize`'s
  internals and more that a manual process with a track record of near-misses no longer
  depends on one person remembering to run something by hand.

## The one demo to have ready

If asked to show something live rather than just describe it, the schema-change pull
request (Lesson 39) is the strongest single artifact: it visibly shows the diff, the
review comment, the pipeline run, and the approval gate in one place — the clearest
proof that "email me a script" really did become a reviewed, auditable process.

## Key terms

| Term | Meaning |
|---|---|
| Four-beat arc | Before (manual) → automation suite → CI/CD → monitoring, the story structure this capstone follows |
| Outcome framing | Describing the work by what it saved or prevented, not just what was built — the framing a manager responds to |
| Technical framing | Describing the work by tools and implementation depth — the framing an interviewer responds to |

## Check yourself

If you only had thirty seconds to describe this entire capstone — not three minutes,
thirty seconds — which one or two beats of the four-beat arc would you keep, and which
would you cut? What does that choice reveal about what actually matters most to convey?
