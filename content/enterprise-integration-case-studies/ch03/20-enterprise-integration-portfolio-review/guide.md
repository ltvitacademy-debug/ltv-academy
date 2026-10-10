# Lesson 20 — Enterprise Integration Portfolio Review

**Chapter 3 · Review and Defense · Lesson 20 of 20**

## What you'll learn

- How to assemble everything from this course into one coherent architecture portfolio piece
- What a hiring manager or review board actually looks for when reading a candidate's case-study portfolio
- Which gaps are worth closing before presenting this work, and which are acceptable to leave as "future work"
- How this course's skill set connects to the rest of the Salesforce Architect path

## From twenty lessons to one portfolio

This course covered five integration case studies (Chapter 1), six deep dives into their harder mechanics (Chapter 2), and a full review-and-defense sequence (Chapter 3). On its own, each lesson is a piece of reasoning about one design decision. Assembled together, they're something more useful for an actual career purpose: a portfolio piece that demonstrates sustained, consistent architectural reasoning across a realistic multi-system landscape — exactly the kind of work sample a CTA review board or a hiring manager for a Salesforce architect role wants to see, because it's rare for a candidate to show the same depth across five related but distinct integration problems rather than one shallow example repeated five times.

## What a reviewer actually looks for in a portfolio

A reviewer skimming a case-study portfolio is not primarily checking whether every individual technical fact is correct — they're checking for a smaller number of higher-level signals: Does the same decision framework (Lesson 8's four questions: ownership, freshness/pattern fit, blast radius, access) show up applied consistently across different cases, or does each case look like it was reasoned about from scratch with no connecting thread? Does the portfolio include failure analysis (Lesson 7) and resilience design (Lessons 10, 14), or does it only show the happy path? Does it include evidence of defending the design under objection (Lessons 18-19), or does it only present conclusions with no visible stress-testing of the reasoning behind them? A portfolio with all three signals reads as architect-level work; a portfolio with only the initial designs and none of the failure analysis or defense reads as junior-level work, even if the initial designs themselves are technically sound.

## Gaps worth closing vs. gaps acceptable to leave as future work

Not every gap needs to be closed before presenting this portfolio. The honest, useful distinction is: a gap in an area the portfolio's own narrative claims to have covered (e.g., presenting the ERP sync as "fully resilient" while never actually describing a dead-letter queue or retry strategy) undermines the portfolio's credibility and should be closed first. A gap explicitly named as future work (e.g., "the multi-IdP routing design from Lesson 12 hasn't been load-tested yet; here's the test plan") is honest, expected, and often strengthens the portfolio rather than weakening it, because it demonstrates the same honest-gap-admission skill from Lesson 18 applied to the whole body of work, not just a single live objection.

## Where this connects in the Salesforce Architect path

This course sits inside the Technical Architect ladder of the Salesforce Architect destination, alongside the Application Architecture Case Studies course covering a parallel set of application-design (rather than integration) scenarios. The skills built here — system-of-record decisions, sync pattern selection, failure and resilience design, and review-board presentation and defense — are domain-specific applications of the broader architecture judgment the rest of the path builds; the four-question framework from Lesson 8 and the comparison-matrix habit from Lesson 15 are reusable well beyond integration problems specifically, and should show up again in how you approach the application-architecture and security-architecture material elsewhere in this path.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio piece | A connected body of work demonstrating sustained reasoning across related problems, not isolated examples |
| Credibility gap | A gap in an area the portfolio's narrative claims to have already covered, which undermines trust if left unaddressed |
| Future-work gap | An honestly named, not-yet-closed gap with a stated plan, which strengthens rather than weakens a portfolio |

## Lab

Take your own answers from this course's twenty labs (or a representative five of them, one per lesson you found most useful) and assemble a one-page portfolio summary: which four-question-framework answer applied to each, one failure or resilience consideration included for at least two of them, and one honestly-named future-work gap for the portfolio as a whole. This is the actual deliverable a review board or hiring manager would want to see first.

## Check yourself

Can you name the three higher-level signals a reviewer looks for in a case-study portfolio, beyond individual technical correctness? Can you explain, using your own example, the difference between a credibility gap and an acceptable future-work gap?
