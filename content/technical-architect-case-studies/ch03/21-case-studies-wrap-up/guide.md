# Lesson 21 — Case Studies Wrap-Up

**Chapter 3 · Presenting and Defending · Lesson 21 of 21**

## What you'll learn

- A recap of the seven case studies and which architecture domains each one centered on
- The full methodology chain this course built, lesson by lesson, and how each piece depends on the one before it
- A self-check against the four-category rubric from Lesson 20, applied honestly to your own overall progress
- What's next on the Technical Architect ladder after this course

## Seven companies, seven domain combinations

This course ran seven fictional scenarios, each one requiring a defensible design across multiple architecture domains at once rather than one domain in isolation: **Meridian Outfitters** (global retail) combined data architecture, integration, and system architecture around a deadline-driven decision not to merge three orgs. **Alder Trust Bank** (financial services onboarding) combined Financial Services Cloud's data model, Shield encryption trade-offs, segregation of duties, and named-credential integration. **Brightwell Health Network** (patient engagement) combined Health Cloud's household model, a real consent-record design, PHI-driven sharing, and step-up authentication. **Carrow Equipment** (manufacturing dealer network) combined territory-based partner sharing, Salesforce Connect versus replication, and B2B Commerce. A state **Department of Health & Human Services** (public sector case management) combined need-to-know sharing stricter than role hierarchy, cross-program consent gates, and data residency. **Nimbus Mobile** (telecom omnichannel service) combined Omni-Channel routing, event-driven outage alerts, and tiered storage for scale. **Fenwick State University** (higher education advising) combined EDA's relationship model, FERPA-driven sharing defaults, and a system-of-record/system-of-engagement split with the SIS. No two scenarios leaned on the same combination of domains, which was deliberate — the goal was never memorizing one playbook, it was practicing the same underlying judgment across enough different shapes of problem that the judgment itself transfers.

## The methodology chain, start to finish

Chapter 2 built a sequence where each skill depends on the one before it: you can't state a good assumption (Lesson 10) until you've correctly separated explicit requirements from implied constraints and decorative detail (Lesson 9); you can't prioritize risk sensibly (Lesson 11) without knowing which assumptions you're actually making; you can't build a coherent blueprint (Lesson 12) without knowing which risks the design most needs to answer; and you can't honestly justify a rejected alternative (Lesson 13) without the blueprint already showing what was chosen instead. Chapter 3 then took that same chain live: pacing a presentation (Lesson 14) around the blueprint artifacts, defending decisions under three families of objection (Lessons 15–17) by restating the reasoning already built into the design rather than inventing new justifications under pressure, running the full chain twice under realistic time pressure (Lessons 8 and 18), building a portfolio to make the work reusable (Lesson 19), and giving and receiving feedback against a concrete rubric (Lesson 20) rather than vague impressions.

## An honest self-check

Score your own progress against the four rubric categories from Lesson 20, applied to the course as a whole rather than one session: **Breadth** — can you work through a scenario touching domains you haven't drilled as heavily, not just the ones you're most comfortable with? **Defensibility** — when you look back at your own case-study labs, can you still explain *why* each major decision was made, or do some of them feel like guesses you can no longer justify? **Communication** — in your most recent mock session, did your walkthrough read as one connected story, or still as separate topics bolted together? **Time management** — did your most recent timed rehearsal actually protect real Q&A time, or did it still run long? Answering these honestly matters more than any single number — the point of the self-check is identifying which category still needs deliberate practice, not generating a passing grade.

## What comes next

This course sits inside the broader Technical Architect ladder within the Salesforce Architect destination, following the domain-specific courses that built the individual skills this course asked you to synthesize — data architecture, security architecture, sharing and visibility, integration architecture, identity, DevOps/ALM, application and system architecture. The judgment this course practiced — reading an ambiguous scenario, building a defensible multi-domain design, and presenting and defending it under real questioning — is the same judgment a live CTA-style review board and a real solution-architecture engagement both actually test. Carry your portfolio (Lesson 19) forward; it's built to be reused, not retired the moment this course ends.

## Key terms

| Term | Meaning |
|---|---|
| Domain combination | The specific mix of architecture domains a given scenario required designing across together |
| Methodology chain | The dependency sequence linking requirements extraction through rejected alternatives, each step building on the last |
| Honest self-check | Evaluating your own readiness against the rubric categories rather than assuming completion equals mastery |

## Lab

Write a half-page honest self-assessment using the four rubric categories from Lesson 20, applied to your overall performance across this course's labs and mock sessions, not just one session. For the weakest category, name one specific case study from this course you'd redo, and what you'd specifically do differently this time.

## Check yourself

Can you name all seven case-study companies from memory and the primary domain combination each one centered on? Can you explain, in your own words, why each step in Chapter 2's methodology chain depends on the step before it?
