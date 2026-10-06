# User Experience and Adoption

**Chapter 4 · Delivering Applications · Lesson 22 of 24**

A deployed application that nobody actually uses has failed, no matter how clean its data model or how airtight its security. This lesson is about the gap between "it works" and "people choose to use it every day" — and the declarative tools built specifically to close that gap.

## What you'll learn

- UX principles specific to the App Builder's toolkit, not general design theory
- In-app guidance tools: Prompts, Flow-based walkthroughs, field help text
- How to measure adoption, not just assume it
- A rollout approach that reduces resistance instead of forcing it

## Design for fewer clicks, not more fields

The single biggest lever an App Builder has over user experience is reducing the number of actions between "I need to do X" and "X is done." **Dynamic Forms** (Lesson 9) let a page show only the fields relevant to the current record state instead of one long static layout. **Dynamic Actions** do the same for buttons — a "Submit for Approval" quick action only appears when the record is actually eligible. **Compact layouts** (Lesson 7) control what a user sees in the highlights panel and related-record hovers without opening the full record. None of this is cosmetic — every field a user has to scroll past to find the one they need is friction, and friction is why people route around a well-built app with a spreadsheet instead.

## In-app guidance

- **In-App Guidance (Prompts)** — floating or docked messages attached to a specific Lightning page, shown once, on a schedule, or until dismissed; the standard way to announce a new feature or walk a user through a changed flow without an email nobody reads
- **Field-level help text** — the small info icon next to a field label; cheap to write, consistently skipped by builders, and the first thing a confused user actually looks for
- **A guided screen Flow** — for a genuinely multi-step process (Lesson 17), walking a new user through each step with validation along the way beats a wiki page explaining the same process in prose

## Measuring adoption, not assuming it

"We shipped it" is not the same claim as "people use it." Salesforce's own **Optimizer** app surfaces unused fields, inactive validation rules, and other signs of a build that shipped but didn't land. Login frequency, feature usage reports (built the same way as Lesson 19's reports, against login history and record creation dates), and simply asking the actual users in the first two weeks are the practical ways to tell the difference between adopted and merely deployed.

## Rollout that reduces resistance

- **Phase by permission set**, not by flipping a switch for everyone at once — assign the new app's permission set to a pilot group first, gather feedback, fix what's actually broken, then expand
- **Train on the workflow, not the feature list** — "here's how you log a visit" lands better than "here's every field on this object"
- **Use Chatter or a feedback field** on the record itself so friction gets reported where the work is happening, not three weeks later in a survey
- **Expect a transition period** where old habits (a spreadsheet, an email thread) compete with the new app, and plan communication for it rather than being surprised by it

## Recap

Reduce clicks with Dynamic Forms, Dynamic Actions, and compact layouts before adding more guidance on top. Use Prompts, help text, and guided Flows to teach in the moment, not after the fact. Measure adoption with Optimizer and usage reports instead of assuming a deployment equals adoption. Roll out in phases by permission set, and train on workflows, not field lists. This closes the chapter's pipeline — reports to see it, security to trust it, deployment to ship it, adoption to make it matter.

## Check yourself

A new custom app has been live for three weeks, but login data shows only 20% of the assigned permission set holders have opened it. Name two specific, declarative actions from this lesson you'd take next, and what each is meant to diagnose or fix.
