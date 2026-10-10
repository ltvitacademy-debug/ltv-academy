# Lesson 12 — Review Board Simulation: Security Focus

**Chapter 3 · Practice · Lesson 12 of 14**

## What you'll learn

- How a security-focused line of questioning differs from a generalist one, in both content and persistence
- The specific security domains a board is likely to probe for a design handling sensitive data
- How to practice the same healthcare scenario from Lesson 11 with questioning deliberately concentrated on security
- A set of realistic, hard security objections to rehearse answering, each with what a strong answer actually needs to contain
- Why "we'll encrypt it" is rarely a complete answer on its own

## Why security gets its own simulation

A generalist review, like the one run in Lesson 11, spreads attention across many domains, which means any single domain — including security — gets only a few minutes of real scrutiny. A real board sometimes concentrates instead: if a scenario clearly involves sensitive data (as the healthcare scenario does), or if an earlier answer reveals a security gap, a security-focused panelist may spend a disproportionate share of the Q&A pressing on exactly that one area. Practicing only the spread-out version leaves you unprepared for sustained pressure on a single domain, which behaves differently than a single question you can answer and move past.

## What a security-focused line of questioning actually probes

Reusing Lesson 11's healthcare scenario, a security-focused reviewer would likely press on: who, specifically, can see a given patient's full record, and how that's enforced technically, not just as a stated policy; what happens to patient data in transit to the external insurance-eligibility API, and whether that third party's own handling of the data was considered at all; what's logged, and whether the logs themselves could leak sensitive information; how access is revoked when one of the 200 intake staff leaves or changes roles across 12 locations; and what the plan is if a breach is ever discovered, not just how a breach is prevented. Notice that these questions span prevention, detection, and response — a generalist's single security question usually only reaches prevention.

## Rehearsing hard security objections

Practice answering each of these, out loud, against the healthcare scenario (or your own adapted scenario):

- "You said patient data flows to a third-party eligibility API — what did you actually verify about how that vendor protects the data once it leaves your system?"
- "If an intake staff member at one of your 12 locations is terminated today, how long does it take before their access is actually gone, and who's responsible for that happening?"
- "What's actually in your audit logs, and could someone with access to the logs themselves see sensitive patient information they wouldn't otherwise be authorized to see?"
- "Walk me through what happens in the first 24 hours after your team discovers unauthorized access to patient records."

A strong answer to each names a specific mechanism (a role-based access model, an automated offboarding trigger tied to an HR system event, a log-redaction policy, a defined incident-response sequence) rather than a general assurance. "We take security seriously" or "we'll encrypt it" answers none of these questions specifically, because encryption alone doesn't address who's authorized to see decrypted data, how access is revoked, what's in a log, or what happens after a breach — it only addresses data being unreadable to someone who doesn't have the key at all.

## Why "we'll encrypt it" is rarely complete

Encryption is a real and necessary control, not a wrong answer — but offered alone, in response to a specific question about access, logging, or breach response, it answers a different question than the one that was asked. A board asking who can see a record is asking about access control, not about whether the bytes are unreadable in transit; a board asking about logging is asking about what's recorded, not about encryption at rest. Reaching for encryption as a universal answer to any security question is a pattern experienced panelists recognize quickly, and it reads as not having a specific answer rather than as a thorough one.

## Key terms

| Term | Meaning |
|---|---|
| Sustained domain pressure | A board concentrating Q&A time on one specific evaluation domain, rather than spreading questions evenly, usually because the scenario or an earlier answer invited it |
| Prevention, detection, response | The three stages a thorough security answer should be able to address, as distinct from only explaining how a breach is prevented |
| Generic security assurance | A vague, non-specific answer like "we take security seriously" that doesn't name an actual mechanism, and reads as weaker than a specific one |

## Lab

Run Lesson 11's healthcare scenario again, but this time have your study partner (or your own self-generated question list) spend the entire Q&A segment on security alone, using the four rehearsed objections in this lesson as a starting point and adding at least one more of your own. For each answer you give, write down the specific mechanism you named (not just the general assurance) and identify which of prevention, detection, or response it actually addressed.

## Check yourself

Can you explain why sustained questioning on one domain is a different test than a single question on that domain? Can you name the four security objections rehearsed in this lesson and describe what a strong answer to each actually requires? Can you explain, specifically, why "we'll encrypt it" fails to answer a question about access control, logging, or breach response?
