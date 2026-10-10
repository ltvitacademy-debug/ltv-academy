# Lesson 4 — Change Control

**Chapter 1 · Release and Governance · Lesson 4 of 16**

## What you'll learn

- What change control is and the lifecycle a change moves through from request to close
- Why declarative and programmatic changes create a genuinely different risk profile on Salesforce
- How a change-control policy should treat the two differently without ignoring either
- What a standard, normal, and emergency change are, and why the distinction matters
- How change control connects to the environment path and the CAB covered later in this chapter

## Change control is a process, not a single approval

**Change control** is the formal process an organization uses to request, evaluate, approve, schedule, implement, and verify a change before and after it reaches production. It exists to make sure no single person's judgment is the only thing standing between a risky change and a live, revenue-generating system. A full change-control lifecycle typically runs through distinct stages: a change is **requested** with a description of what it does and why; it's **assessed** for risk and impact; it's **approved** (or rejected, or sent back for more information) by someone with the authority to make that call; it's **scheduled** into a release; it's **implemented**; and it's **verified** afterward to confirm it did what it was supposed to and didn't break anything else.

## The Salesforce-specific wrinkle: declarative vs. programmatic

Most change-control frameworks were designed with code deployments in mind — something a developer writes, packages, and promotes through environments with a build pipeline behind it. Salesforce complicates this because much of the platform's real, production-affecting change is **declarative**: a new field, a modified validation rule, an edited Flow, a changed permission set — all made directly through point-and-click configuration, often in minutes, by someone who may not think of what they just did as a "deployment" at all. A declarative change can be every bit as consequential as a code change — a validation rule that's too strict can block an entire sales team from closing deals, and a Flow that updates the wrong field can silently corrupt data across thousands of records — but it doesn't automatically go through the same build-test-deploy pipeline a line of Apex does.

A real change-control policy has to make a deliberate decision about this, rather than ignoring it by accident. The two common approaches:

- **Risk-based gating regardless of change type.** The policy classifies changes by actual impact (how many users affected, whether it touches a regulated process, whether it's reversible) rather than by whether the change happens to be declarative or programmatic. A low-risk Flow edit and a low-risk code change both get a light-touch path; a high-risk Flow edit and a high-risk code change both get full review.
- **A lighter default path for declarative changes, with escalation triggers.** Many orgs give small, well-understood declarative changes (a new picklist value, a report) a fast, low-ceremony path by default, but define specific triggers — the change touches a core object like Opportunity or Account, it affects automation that runs on every record, it's going to a regulated business process — that pull a declarative change into the same full review as a code deployment.

Either approach is defensible; what isn't defensible is a policy that only thinks about code and leaves every declarative change as an invisible, ungoverned side door into production — which is exactly how an org accumulates the kind of uncontrolled risk that change control exists to prevent.

## Standard, normal, and emergency changes

Change-control frameworks typically recognize at least three categories of change, each with a different process:

- **Standard changes** are low-risk, well-understood, and repeatable — they follow a pre-approved template and don't need individual case-by-case approval each time (for example, adding a new picklist value using an established naming convention).
- **Normal changes** go through the full change-control lifecycle described above: request, assessment, approval, scheduling, implementation, verification.
- **Emergency changes** address an active production incident where waiting for the normal approval cycle would cause unacceptable harm. Emergency changes still require approval — typically from a smaller, faster-acting authority — and critically, they require a full after-the-fact review once the emergency has passed, so that an emergency bypass doesn't quietly become a way to skip governance whenever something feels urgent.

## Where this leads

Change control defines the process; it doesn't by itself define who makes the approval decision for a normal or emergency change, or how disagreements get resolved — that's the Change Advisory Board's job, covered next in Lesson 5. And change control only works if there's somewhere for an approved change to actually go — the environment path and promotion sequence covered in Lesson 7.

## Key terms

| Term | Meaning |
|---|---|
| Change control | The formal process of requesting, assessing, approving, scheduling, implementing, and verifying a change |
| Declarative change | A production-affecting change made through point-and-click configuration (fields, Flows, validation rules) rather than code |
| Standard change | A low-risk, pre-approved, repeatable change that skips individual case-by-case approval |
| Normal change | A change that goes through the full change-control lifecycle |
| Emergency change | A change made to resolve an active incident, approved faster but requiring mandatory after-the-fact review |

## Lab

An admin wants to add a new validation rule to the Opportunity object that blocks saving a deal above a certain dollar amount without a specific approval field being checked. Using this lesson's risk-based framing, write a short assessment: is this a standard, normal, or emergency change, and why? What would make you reclassify it into a different category if the details changed slightly (for example, if it affected a different, lower-traffic custom object instead of Opportunity)?

## Check yourself

Can you list the stages of the full change-control lifecycle in order? Can you explain why declarative changes can't simply be excluded from change control just because they don't go through a code pipeline? Can you describe the difference between a standard, normal, and emergency change, and why emergency changes still require an after-the-fact review?
