# Lesson 10 — Reviewing Your Integration Designs

**Chapter 2 · Reviewing Designs · Lesson 10 of 14**

## What you'll learn

- How to combine Lessons 6-9 into a single self-review pass you can run on any design, including your own
- Why self-reviewing your own work requires deliberately arguing against it, not just rereading it
- A worked example applying the full self-review pass to the Vantage Utilities case study
- How to tell the difference between a design that's actually ready and one that just looks finished

## Four lessons, one pass

Chapter 2 has built four separate tools so far: a comparison method (Lesson 6), a failure-mode checklist (Lesson 7), a security checklist (Lesson 8), and a documentation format (Lesson 9). Used in isolation, each one catches a different class of problem. Used together, in order, they form a single self-review pass any architect can run before taking a design in front of a review board:

1. **Name at least one real alternative** and run Lesson 6's comparison against it, honestly.
2. **Walk the design through Lesson 7's five failure categories**, one at a time, stating what happens for each.
3. **Walk the design through Lesson 8's four security questions**, one at a time.
4. **Write it up as an ADR** using Lesson 9's six sections, so the result of steps 1-3 is captured on paper, not just in your head.

A design that's been through all four steps and still holds up is meaningfully more reviewed than one that's just been read over a few times for typos.

## Why self-review requires arguing against yourself

The hardest part of this pass isn't doing the steps — it's doing them honestly when you're reviewing your own design. It's natural to unconsciously pick a weak alternative in step 1, skim past the failure category that's actually a real gap in step 2, or answer the security questions with the version of the design you intended to build rather than the one you actually documented. The discipline this lesson is asking for is specific: when you reach a step that would be awkward to answer honestly, that's the step that most needs an honest answer, not the one to soften.

## Worked example: self-reviewing Vantage Utilities

Walking Lesson 4's external-application case study through the pass surfaces a real gap:

- **Comparison (step 1).** The honest alternative to building a dedicated authenticated API is letting the portal query Salesforce directly with a shared service-account token passed to the browser. That alternative is faster to build and should be named — and then rejected, because a token usable from the browser is a token exposed to anyone who opens their browser's developer tools.
- **Failure modes (step 2).** Out-of-order delivery, flagged in Lesson 7, was named but never given a concrete fix in Lesson 4's original write-up — just acknowledged. That's a real gap, not a solved problem, and this is exactly the moment self-review is supposed to catch it rather than let it ride into the review board meeting.
- **Security (step 3).** Lesson 8 named the authorization-scope question (can customer A's token read customer B's case) as the highest-stakes item for this case study, but never stated *how* that's actually enforced — only that it needs to be. Writing the self-review forces a real answer: request-time filtering scoped to the authenticated customer's own Account ID, enforced server-side, not just assumed from the token's issuance.
- **ADR (step 4).** Writing this up surfaces that two of the six ADR sections — alternatives and failure handling — were thinner than the other four, which is useful information in itself: it shows exactly where more work is still needed before this design is presentation-ready.

## Looking finished vs. being ready

A design that's been polished for a slide deck — clean diagram, confident bullet points — can look completely finished and still have an unresolved failure mode or a hand-waved security answer sitting underneath the polish. The self-review pass exists specifically to find that gap before a reviewer does, because a reviewer finding it live is a worse outcome than finding it yourself the day before.

## Key terms

| Term | Meaning |
|---|---|
| Self-review pass | Running Lessons 6-9's tools against your own design, in order, before presenting it |
| Honest alternative | A genuinely competitive option named in step 1, not a strawman chosen to make the real decision look obviously correct |
| Presentation-ready | A design whose self-review pass surfaced no unresolved gaps, not merely one that looks polished |

## Lab

Run the full four-step self-review pass from this lesson against the Bellwood Apparel marketing-platform case study from Lesson 5. For each step, write at least two sentences: one stating what the step produced, and one stating whether it surfaced a real gap or confirmed the design held up. End with an honest statement of whether you'd call this design presentation-ready yet, and if not, name the single gap you'd close first.

## Check yourself

Can you list this lesson's four-step self-review pass from memory and explain which earlier lesson each step comes from? Can you explain, using the Vantage Utilities worked example, the difference between a failure mode that was "named" versus one that was actually "solved" — and why that distinction matters?
