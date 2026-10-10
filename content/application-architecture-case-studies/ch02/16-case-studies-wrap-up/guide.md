# Lesson 16 — Case Studies Wrap-Up

**Chapter 2 · Working the Cases · Lesson 16 of 16**

## What you'll learn

- The one pattern that recurred across all eight Chapter 1 case studies, stated explicitly
- How the eight domain-specific cases map back onto the five general-purpose skills from Chapter 2
- Which other courses in this catalog go deeper on each domain this course only had room to touch once
- How to keep using this course's method on a real design problem after the course ends

## The pattern underneath all eight cases

Look back across Harrow's sales segments, Corvell's case routing, Renwick's portal, Ferro's business units, Castellan's field technicians, Veltrix's billing, Harlow's programs, and Meridian's onboarding, and the same underlying move shows up every time, dressed in different Salesforce objects: **separate the question of what shape this thing takes from the question of who gets to see or touch it, and don't let a request's vague, high-altitude phrasing stand in for the specific, checkable requirement underneath it.** Record type vs. sharing rule. License tier vs. sharing set. Business-unit field vs. sharing rule. Work rule vs. service objective. System of record vs. the handoff between systems of record. Program model vs. donor model. Household structure vs. Action Plan enforcement. Eight different domains, one repeated architectural habit of mind — and that habit, not any single domain's specific objects, is the actual transferable skill this course was built to practice.

## Mapping the eight cases back onto the five skills

Chapter 2 named five skills explicitly — requirements extraction, comparing alternatives, naming risks and assumptions, presenting a design, and handling reviewer feedback — and each of Chapter 1's eight cases was already secretly practicing all five, even though the lessons only named one skill at a time as they went. Revisit any one Chapter 1 case now and you should be able to point to: the vague ask that needed extraction (Lesson 9's skill), the alternative that wasn't chosen and why (Lesson 10's skill), at least one risk or assumption the design depended on (Lesson 11's skill), how you'd present it differently to a technical board versus a business sponsor (Lesson 12's skill), and a plausible piece of reviewer pushback you'd need to triage (Lesson 13's skill). If you can't do that for a given case without rereading it, that's worth noticing — it means the case was absorbed as a solution to memorize rather than as reasoning to internalize, which was never the point.

## Where to go deeper on each domain

This course deliberately went one lesson deep on eight different domains rather than many lessons deep on one, because the transferable habit of mind is the point, not mastery of any single domain. For real depth on the specific mechanics this course only had room to touch once, this catalog's other Salesforce Technical Architect courses go further: sharing and visibility mechanics (role hierarchy, OWD, sharing rules, teams) get a full course of their own; integration patterns (and the companion Integration Architecture Case Studies course) go deeper on the Veltrix-style system-of-record and handoff questions; data architecture at enterprise scale extends the Harrow and Ferro-style data-modeling questions well past what one lesson each could cover. Treat this course as the map that shows where those deeper domains connect to each other, not as a substitute for walking through any one of them in full.

## Keeping the method after the course ends

The five skills from Chapter 2 and the one pattern named above don't require a Salesforce-specific case to stay useful — they apply to the next real, messy, underspecified request that lands on your desk, Salesforce or not. The habit worth keeping isn't "remember what Harrow needed" — it's the question, asked out loud every time a stakeholder hands over a vague sentence: what is this person actually experiencing, what would count as fixed, what's being assumed that hasn't been said, and is there a solution hiding inside the ask before the real requirement has even been named. That question, asked consistently, is what separates an architect who designs good solutions to the problems stakeholders state from one who designs good solutions to the problems stakeholders actually have — which are not reliably the same problem, as every case in this course demonstrated at least once.

## Key terms

| Term | Meaning |
|---|---|
| Shape vs. visibility | This course's recurring pattern: separating what a record/process looks like from who can see or act on it |
| Transferable habit of mind | The underlying reasoning skill (extraction, comparison, risk-naming, presentation, feedback-handling) that outlasts any single case's specific domain |
| Domain depth | Full-course-length treatment of one architecture domain, as opposed to this course's one-lesson-per-domain survey |

## Lab

Pick a real, current, or recent request you've personally received (at work, in a volunteer role, or in any project) that was stated as vaguely as any of this course's eight opening asks — "fix the routing," "one portal," "track everything." Run it through this course's full method in miniature: extract the real requirement, name one alternative you didn't pursue and why, name one risk or assumption your actual decision depended on, and write two sentences on how you'd present it differently to a technical peer versus a non-technical stakeholder. This is the one Lab in the course that isn't about a fictional company — it's the first real test of whether the method actually transfers.

## Check yourself

Can you state, in one sentence, the single pattern this lesson says recurred across all eight Chapter 1 cases? Can you pick any one Chapter 1 case from memory and name, without rereading it, which of the five Chapter 2 skills it was already practicing before those skills had names?
