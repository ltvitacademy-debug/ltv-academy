# Deployment and Go-Live

The rehearsed cutover plan from Lesson 21 now runs for real. This lesson covers the go-live event itself: the final decision to proceed, how the first days of live use are typically staffed, and the realistic limits of a rehearsal no matter how well it was run.

## What you'll learn

- Who makes the final go/no-go call, and on what evidence
- How day-one support is typically staffed — the "command center" model
- Why go-live almost always surfaces something testing didn't catch
- How Brightfield's go-live weekend actually went

## The final go/no-go decision

Cutover's last major checkpoint (Lesson 21) is the final go/no-go decision: does the project proceed to go-live, or does it pause? This decision is typically made by a **steering committee** — the Executive Sponsor, the Project Managers from both sides, and the Solution Architect — based directly on the cutover validation results: did the final data load tie out? Did every rehearsed step complete successfully? This isn't a vote on confidence or morale; it's a decision grounded in the same validation discipline the whole project has practiced since Chapter 3.

## Staffing day one: the command center

Once go-live happens, the implementation team doesn't disappear — it typically staffs a **command center** (sometimes called a war room), either physical or virtual, where Functional and Technical Consultants are available in real time to triage issues as business users start transacting in the live system for the first time. Super users (introduced in Lesson 2) are often the first line of contact for their colleagues, escalating to the command center only when they can't resolve something themselves.

## Why issues still surface

Even a thoroughly tested, well-rehearsed go-live almost always surfaces something new — a business user doing something slightly outside any scripted scenario, an edge case that only occurs with real production transaction volume, or a legacy habit colliding with a new process for the first time under real pressure. This isn't a sign that testing failed; it's the expected, planned-for reality of any go-live, and it's precisely why the command center exists and why Lesson 23's hypercare period follows immediately rather than the team walking away the moment go-live happens.

## Brightfield Industrial Group: go-live weekend

Brightfield's steering committee reviews Saturday's validation results — the trial balance ties out, every open AP and AR item loaded correctly, the Cash Management reconciliation data matches — and gives a formal go for Monday morning. The command center, staffed by all four functional consultants and both technical consultants, fields eleven issues on day one, mostly user-navigation questions handled by super users, plus one real configuration issue (a missing approval rule for a specific invoice type) fixed within hours by the AP functional consultant.

## Key terms

| Term | Meaning |
|---|---|
| Steering committee | The group making the final go/no-go decision, based on validation evidence |
| Command center / war room | Where the implementation team triages issues in real time after go-live |
| Super user | First line of support for colleagues before an issue escalates further |

## Recap

Go-live is a formal, evidence-based decision by a steering committee, followed by real-time support through a command center, because even a well-rehearsed cutover almost always surfaces something testing didn't catch. Brightfield's go-live weekend produced exactly that: mostly minor questions, one real fix, resolved fast because the team was staffed and ready. Next up, lesson 23: hypercare, the sustained support period that follows.
