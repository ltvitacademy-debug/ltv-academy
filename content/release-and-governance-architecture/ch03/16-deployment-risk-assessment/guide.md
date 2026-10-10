# Lesson 16 — Deployment Risk Assessment

**Chapter 3 · Architecture Practice · Lesson 16 of 16**

## What you'll learn

- How to build a structured risk assessment for a specific deployment, using likelihood and impact
- The Salesforce-specific risk factors a generic risk framework often misses
- How a completed risk assessment feeds directly into the CAB decision and the rollback plan
- How this final lesson ties every governance mechanism in the course back into one practical artifact
- A checklist you can reuse for any real deployment going forward

## Risk assessment as likelihood times impact

A **deployment risk assessment** is a structured evaluation of what could go wrong with a specific change, scored along two dimensions: **likelihood** (how probable is this failure mode, given the change and the evidence so far) and **impact** (how bad would it actually be if it happened). A risk that's both likely and severe demands real attention and mitigation before deployment; a risk that's unlikely and minor can reasonably be accepted without extra work. Plotting risks this way — often informally, sometimes on an explicit likelihood/impact grid — is what turns "this feels risky" into something a CAB (Lesson 5) can actually evaluate and compare consistently across different proposed changes.

## Risk factors a generic framework misses on Salesforce

A risk assessment template built for generic enterprise software misses several risk factors that are specific to how Salesforce actually works, and a mature Salesforce release practice adds them explicitly:

- **Seasonal release interaction (Lesson 2).** Is this deployment scheduled close to a seasonal upgrade weekend, where a failure would be hard to attribute to the right cause? Does the change depend on current platform behavior that a pending Release Update might alter?
- **Metadata conflict exposure (Lesson 8).** Does this change touch an object or automation other teams are also actively building on, per the shared release calendar? The more shared the object, the higher the likelihood term in the assessment.
- **Data-change irreversibility (Lesson 6).** Does this change create, update, or delete records, and if something goes wrong, what's the actual data-recovery path — not a hoped-for one, a real one? A change with a clean rollback story and a change with none should never be scored as equally risky just because they look similar technically.
- **Declarative-change blast radius.** A Flow or validation rule on a widely-used object like Account or Opportunity can affect every user who touches that object the moment it's active — the impact term for a declarative change should reflect how many users and processes touch the object it's deployed to, not just how complex the change looks to build.
- **Dependency and integration exposure.** Does this change depend on, or get depended on by, an external system or integration whose own availability and behavior the Salesforce team doesn't fully control?

## From assessment to decision

A completed risk assessment isn't paperwork for its own sake — it's the input two other mechanisms in this course directly depend on. The **CAB** (Lesson 5) uses it to decide whether a change is safe to deploy now, informed by exactly how likely and how severe its risks actually are rather than a vague gut feeling in the room. The **rollback plan** (Lesson 6) should respond directly to the specific risks the assessment surfaced — if the highest-scored risk is "this Flow might update the wrong records," the rollback plan needs a real answer for that specific scenario, not a generic "we'll roll back the metadata" that ignores the data question entirely.

## A reusable checklist

Pulling this course's concepts together into one practical artifact, a deployment risk assessment for a real Salesforce change should answer:

1. What does this change actually do, and is it declarative or programmatic? (Lesson 4)
2. Who and what does it touch — how many users, which objects, which other teams' known work? (Lesson 8)
3. Does it interact with the current seasonal release calendar in any way? (Lesson 2)
4. What's the realistic rollback story, for both metadata and any affected data? (Lesson 6)
5. What's the likelihood and impact of its worst plausible failure mode, scored honestly rather than optimistically?
6. Has it already passed design-time review if it was significant enough to need one? (Lesson 15)

## Closing the course

This lesson deliberately mirrors the Lesson 11 case study from the other direction: instead of watching a release fail because none of this machinery existed, this lesson gives you the one artifact — a real risk assessment — that ties change control, the CAB, rollback planning, the release calendar, and architecture review together into something you can actually produce for a real deployment, starting with the next one.

## Key terms

| Term | Meaning |
|---|---|
| Deployment risk assessment | A structured evaluation of a change's potential failure modes, scored by likelihood and impact |
| Likelihood | How probable a given failure mode is, given the change and the evidence available |
| Impact | How severe the consequences would be if a given failure mode actually occurred |
| Blast radius | How many users, records, or processes a change could affect if something goes wrong |

## Lab

Using the six-item checklist above, write a complete deployment risk assessment for a proposed Flow that automatically applies a 10% discount to any Opportunity over $50,000 when a specific approval checkbox is checked, deployed to a shared org with three other teams actively building on the Opportunity object this same month. Score its likelihood and impact honestly, and state what your assessment implies the rollback plan needs to specifically cover.

## Check yourself

Can you explain the difference between likelihood and impact in a risk assessment, and why a risk needs both dimensions scored, not just one? Can you name at least three Salesforce-specific risk factors a generic risk framework would miss? Can you explain how a completed risk assessment should directly shape both a CAB's decision and a rollback plan, rather than existing as a separate, disconnected document?
