# Lesson 22 — Identity Design Trade-Offs

**Chapter 4 · Review and Practice · Lesson 22 of 24**

## What you'll learn

- How to recognize that most identity architecture decisions are trade-offs, not objectively "correct" answers
- Five recurring trade-off axes that show up across nearly every real identity project
- How to frame a trade-off decision for a client so they understand what they're actually choosing
- Why an architect's job is often to make a trade-off explicit, not to eliminate it

## Why identity architecture is full of trade-offs

Earlier lessons sometimes stated a clear recommendation (use Authorization Code + PKCE over Username-Password; prefer a hub-and-spoke IdP model). But many real decisions don't have a universally correct answer — they trade one property for another, and the right choice depends on the specific client's priorities. A mature architect names the trade-off explicitly instead of pretending one option is strictly better in all cases.

## Five recurring trade-off axes

**1. Friction vs. identity confidence.** Lesson 21's case study made this explicit: every piece of friction added at signup or login (a password requirement, an MFA step, a manual verification) increases confidence that the user is who they claim to be, but also increases abandonment. There's no setting that maximizes both simultaneously — progressive profiling is a mitigation, not an elimination, of the trade-off.

**2. Centralization vs. autonomy.** A hub-and-spoke IdP model (Lesson 14) centralizes control (consistent MFA enforcement, one deactivation point) but also centralizes risk (a hub outage or compromise affects every downstream app) and reduces each application's autonomy to set its own login rules. Fully independent per-app authentication avoids that concentrated risk but reintroduces the password-sprawl and inconsistent-enforcement problems centralization was meant to solve.

**3. Legacy compatibility vs. modernization.** Delegated authentication (Lesson 17) and the Legacy Named Credential schema (Lesson 19) both persist in real orgs specifically because migrating away from them costs engineering time and carries cutover risk, even though the modern alternative is technically superior. An architect has to weigh the ongoing cost of staying on the legacy path against the one-time cost and risk of migrating, not just declare the modern option "correct" and move on.

**4. Named Principal simplicity vs. Per-User accountability.** Lesson 19's choice isn't free: Named Principal is simpler to configure and maintain, but Per-User is the only choice that supports external-system-level accountability for individual users. Picking Named Principal for convenience when the business genuinely needs per-user audit trails on the external side is a trade-off made badly, not a shortcut.

**5. Self-service speed vs. administrative control.** JIT provisioning (Lesson 12) and open self-registration (Lesson 15) grant fast, low-touch onboarding, but hand over some control that admin-approved provisioning would have retained — the trade-off is speed and reduced admin burden against tighter gatekeeping and review.

## Making trade-offs explicit to a client

The architect's job in most of these situations isn't to eliminate the trade-off — it's usually structurally impossible to do so — but to **surface it clearly enough that the client is making an informed choice**, not an accidental one. A useful habit: when presenting an identity recommendation, explicitly state what the client is gaining and what they're giving up, rather than presenting the recommendation as though it has no downside. Clients who later discover an unstated trade-off (slower onboarding than they expected, less individual accountability than they assumed) tend to blame the architect for not warning them, even when the chosen option was genuinely the best available fit.

## Key terms

| Term | Meaning |
|---|---|
| Trade-off axis | A pair of competing properties where gaining more of one costs some of the other |
| Informed choice | A decision made with the trade-off's downside explicitly understood, not hidden |

## Lab

Pick any two of the five trade-off axes above. For each, write a short paragraph (75–125 words) describing a realistic client scenario where that axis would push toward one side versus the other, and explain what you'd tell the client they're giving up with your recommended choice.

## Check yourself

- Name three of the five recurring identity trade-off axes covered in this lesson.
- Why is "centralization" both a benefit and a risk in identity architecture?
- Why does the lesson argue an architect's job is usually to surface a trade-off rather than eliminate it?
