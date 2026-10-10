# Lesson 14 — Application Architecture Mock Review Board

**Chapter 2 · Working the Cases · Lesson 14 of 16**

## What you'll learn

- How to run a full mock review board against one of this course's case studies, start to finish
- What kinds of questions an architecture review board actually asks, grouped by what they're really testing
- Why a reviewer's hardest questions are usually about what you decided not to do
- How this mock session previews the live, interactive review-board format used in Salesforce's own CTA-style certification review

## Why a mock review board, specifically now

Chapters 1 and 2's lessons so far have each taught one piece of the skill set an architect needs in a live review: extracting requirements (Lesson 9), comparing alternatives (Lesson 10), naming risks and assumptions (Lesson 11), presenting a design (Lesson 12), and handling feedback (Lesson 13). A real review board exercises all five at once, under time pressure, with a panel asking follow-up questions you didn't get to prepare verbatim answers for. This lesson is the first place in the course those five skills get combined into a single simulated session, because that combination — not any one skill in isolation — is what a real review actually tests.

## The scenario for this mock session: Ferro Holdings, revisited

Use Ferro Holdings' single-org-vs-multi-org consolidation case from Lesson 4 as the subject. Present the design exactly as you would to a live panel: the problem as Ferro's leadership experiences it, the extracted requirement, the two alternatives compared on Lesson 10's dimensions, the recommended design (consolidate, with a business-unit field plus sharing rules), and the open risks and assumptions from Lesson 11's register. Then answer, out loud or in writing, the five panel-question categories below as if a real board just asked them.

## Five categories a review board's questions usually fall into

- **"Why not the alternative?"** — not "is your design good" but specifically "why didn't the other option win," forcing you to restate the tradeoff rather than just the recommendation. *For Ferro:* why didn't staying multi-org with a lighter integration layer win instead?
- **"What breaks this at scale?"** — pushing on whether the design holds up well beyond the scenario as described. *For Ferro:* what happens to the sharing-rule design if Ferro acquires a fifth business unit next year?
- **"What did you deliberately not solve?"** — the hardest category, because it asks you to defend a scope boundary rather than a technical choice. *For Ferro:* you scoped this design to Account, Contact, and Opportunity — what did you deliberately leave out, and why was that the right call for this phase?
- **"What's your rollback plan if this is wrong?"** — testing whether the design was built with an exit, not just an entrance. *For Ferro:* if six months into consolidation leadership decides it was the wrong call, what does un-consolidating look like, and how costly is it compared to not having consolidated in the first place?
- **"Who disagrees with you, and why might they be right?"** — testing whether you've actually engaged with the strongest counterargument, not just the easiest one to knock down. *For Ferro:* which stakeholder group is most likely to push back on this design, and what is the strongest version of their objection?

## The hardest questions are usually about what you didn't do

Notice that three of the five categories above — "what breaks this at scale," "what did you deliberately not solve," and "who disagrees with you" — are about the edges and boundaries of the design, not its center. A well-prepared architect can usually explain their own recommendation clearly; a review board is testing something harder, which is whether that same architect has genuinely thought about where the design's boundary is and why it's drawn there, rather than just being confident about the part inside the boundary. Treating these boundary questions as attacks to deflect, rather than as the actual substance of what's being tested, is the most common way an otherwise well-prepared candidate underperforms in a real review.

## How this previews Salesforce's own review-board format

Salesforce's Technical Architect (CTA) certification famously includes a live review-board panel round, where candidates present a design and then face exactly this kind of boundary-probing questioning from senior architects. This mock session is not a substitute for that specific, much higher-stakes format, but the skill underneath it — presenting a design coherently and then defending its boundaries under direct questioning rather than just restating the design louder — is the same skill, and it's worth practicing on a case with no certification stakes attached before facing it anywhere that counts.

## Key terms

| Term | Meaning |
|---|---|
| Mock review board | A simulated version of a live architecture review, combining presentation and panel questioning |
| "Why not the alternative" question | A panel question forcing the architect to restate the tradeoff behind the chosen design, not just the design itself |
| Boundary question | A question about what the design deliberately excludes, how it fails at scale, or how it could be reversed — not about its center |
| Rollback plan | A stated plan for what reversing or undoing a design decision would require if it turns out to be wrong |

## Lab

Run this same five-category mock review against a second Chapter 1 case of your choice (not Ferro). Write out the design presentation in brief, then write your own answer to each of the five panel-question categories, adapted to that case's specifics. Afterward, identify which one of the five questions was hardest for you to answer convincingly, and write one sentence on what that difficulty reveals about a gap in how fully you'd actually thought through that design's boundaries.

## Check yourself

Can you list the five panel-question categories from memory, and explain in one sentence what each one is actually testing for? Can you explain why three of the five categories specifically focus on the boundaries of a design rather than its center?
