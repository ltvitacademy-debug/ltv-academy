# Lesson 1 — The Technical Architect Role

**Chapter 1 · Thinking Like a Technical Architect · Lesson 1 of 19**

## What you'll learn

- What a Salesforce technical architect actually does day to day, as distinct from an admin or a developer
- How the architect role sits above a single project, across an org's whole technical landscape
- Why Salesforce splits its own architect credentials into two domains (System and Application) that both feed the Technical Architect credential
- The shape of the Salesforce Certified Technical Architect (CTA) review board, at a high level
- Why this course exists: the on-ramp into the rest of the Technical Architect ladder

## From "how do I configure this" to "will this still work in three years"

Every course in this catalog's Salesforce track so far has answered a version of the same question: how do I configure, build, or automate something that works today. An admin configures security and automation correctly for the requirements in front of them. A developer writes Apex and Lightning Web Components that meet a specification. A technical architect asks a different question: will this still work, scale, and stay secure three years from now, under requirements nobody has written down yet, built by a team that isn't in the room for this decision?

That shift — from "does this satisfy today's ticket" to "does this hold up under everything this org will eventually throw at it" — is the entire reason the technical architect role exists. It isn't a bigger admin job or a senior developer job. It's a different job: owning the technical integrity of a solution across its whole lifecycle, not just the parts that happen to be visible this sprint.

## What the role actually covers

A Salesforce technical architect is accountable for the end-to-end technical design of a solution: how data is modeled and moves, how identity and access are governed, how the org integrates with everything else the business runs, how security is enforced, and how changes get built, tested, and deployed without breaking what already works. None of those domains belong to the architect alone — data architecture decisions still involve a data team, security decisions still involve the business's actual risk owners — but the architect is the person accountable for making sure all of those domains fit together into one coherent, defensible design, rather than five good decisions that quietly conflict with each other.

Crucially, the architect role is not "the person who writes the most Apex" or "the most senior admin." A technical architect frequently writes little to no code personally. Their output is decisions, diagrams, and documented trade-offs — the solution design process this course spends the next eighteen lessons building toward.

## Where this sits in the Salesforce certification ladder

Salesforce's own architect career ladder is built around two credentials below the top: **System Architect**, focused on what happens off the core Salesforce platform — integration, identity and access between systems, and the governance and testing practices around deploying and changing an org over time — and **Application Architect**, focused on what happens on the native platform itself: data modeling, sharing and visibility, and the deep configuration of Salesforce's built-in features. Both of those domain credentials feed into the capstone: the **Salesforce Certified Technical Architect (CTA)** credential, which Trailhead describes as being for architects experienced in designing and implementing secure, high-performance, integrated technical solutions on the platform within the context of a client's broader architectural landscape.

Earning the CTA credential itself works differently than a normal multiple-choice certification exam. It runs as a two-step **Architect Review Board**: first an evaluation of the candidate's prerequisites and experience, then a review board exam in which the candidate is given a realistic, complex scenario, builds a solution and supporting diagrams against it, and then presents and defends that solution live in front of a panel of existing CTAs who challenge the design and expect the candidate to justify or revise it under real-time questioning. (Salesforce has changed exam logistics before — it moved the review board to an all-online format in 2023 — so always confirm the current format, timing, and panel size directly on Trailhead before treating any specific number as fixed.)

This course does not prepare you to sit that review board. It's the foundation underneath it: the habits of thinking, the domains of knowledge, and the communication skills that every later course in this path — and eventually the review board itself — assumes you already have.

## Key terms

| Term | Meaning |
|---|---|
| Technical architect | The role accountable for a solution's end-to-end technical integrity across its full lifecycle, not just one project's scope |
| Salesforce System Architect | A Salesforce credential focused on off-platform systems, integration, identity/access between systems, and deployment governance |
| Salesforce Application Architect | A Salesforce credential focused on native platform depth: data modeling, sharing, and application design |
| Salesforce Certified Technical Architect (CTA) | The capstone architect credential, earned through an Architect Review Board rather than a standard exam |
| Architect Review Board | The CTA's two-step evaluation: a prerequisites/experience review, then a scenario-based exam presented and defended before a panel of CTAs |

## Lab

You're an admin at a mid-size company who has just been asked to take over as the org's first dedicated technical architect. Write a short before/after comparison (5-6 sentences) describing two decisions you used to make as an admin versus how you'd approach the same two decisions now that you're accountable for the org's long-term technical integrity. Pick realistic examples — e.g., adding a new custom object, or granting a integration user broad API access — and be concrete about what question you'd now ask that you didn't ask before.

## Check yourself

Can you explain, in your own words, what distinguishes a technical architect's accountability from an admin's or a developer's? Can you name the two Salesforce architect domain credentials that feed into the CTA credential, and what each one is focused on? Can you describe, at a high level, what happens during a CTA Architect Review Board exam?
