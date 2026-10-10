# Lesson 23 — Demo Preparation

**Chapter 5 · Wrap-Up · Lesson 23 of 25**

## What you'll learn

- The difference between a demo and a feature tour, and why this platform's demo needs a narrative
- The specific end-to-end scenario this demo walks through, start to finish
- A demo script structure that survives something going wrong live
- What to deliberately leave out of the demo, and why

## A demo is a story, not a feature tour

It would be technically accurate to open this capstone's scratch org and click through all ten Definition of Done requirements in order — and it would also be a genuinely bad demo. A feature tour shows that things exist; a **demo** shows *why they matter* by following one realistic scenario from beginning to end, letting the audience watch the platform's pieces work together the way they actually would on a real day at Solstice, rather than as ten disconnected proofs.

## The end-to-end scenario

This demo follows one warranty repair from first contact to resolution, touching nearly every piece built across this capstone in the order a real event would trigger them:

1. **A Service Agent creates a Case** for a customer's range that stopped heating, linked to the customer's existing Asset — this is the moment the Lesson 6 Flow fires.
2. **The Case to Installation Job Flow runs automatically**, checking the Asset's Service_Contract__c and creating an `Installation_Job__c` assigned to an available technician.
3. **The technician opens the job board LWC** (Lesson 12–13) on their phone or tablet, sees the new job, and marks it In Progress on arrival.
4. **The technician determines the repair is covered under warranty** and a Service Agent creates a `Warranty_Claim__c` — this is where `WarrantyClaimTriggerHandler` (Lesson 9) validates the amount against the contract's coverage limit.
5. **The claim submission queues asynchronously** (Lesson 11) and calls the ApplianceMakers Warranty Network API (Lesson 14), handled through the Named Credential (Lesson 15); the claim updates with a `Manufacturer_Claim_Id__c` moments later.
6. **Renata checks the Executive Dashboard** (Lesson 17) the next morning and sees this claim reflected in the Warranty Claims by Status donut chart.

Six steps, one continuous story, and every major piece of this capstone appears exactly once, in the order it would actually fire.

## A demo script that survives something going wrong

Live demos fail — a scratch org hiccups, a network call times out, a field you swear you populated turns out blank. A demo script written as a rigid list of clicks has no recovery path; one written around **narration-first, clicks-second** does. For each of the six steps above, write one sentence of narration that's true and useful *even if the click fails*: "Here's where the Flow would check the service contract and assign a technician automatically — let's look at the job it created." If the live click doesn't cooperate, you can still show the resulting record from a moment ago and keep the story moving, instead of stalling on a frozen screen.

## What to leave out, deliberately

Lesson 22's retrospective named real technical debt — the simplified technician assignment, the unfinished batch notification. A demo is not the place to walk through that list; raising debt unprompted during a demo undermines confidence in the parts that genuinely work well. The right place for technical debt is a direct answer to a direct question ("how does technician assignment handle certifications?") — honest and specific if asked, not volunteered as a disclaimer before anyone's seen the platform work.

## Key terms

| Term | Meaning |
|---|---|
| Demo | A narrative walkthrough of one realistic scenario, showing why features matter together |
| Feature tour | A disconnected, checklist-style walkthrough of individual features |
| Narration-first script | A demo script built around spoken narration that stays true even if a live click fails |

## Lab

Write the full six-step demo script described above, with one narration sentence per step that remains accurate even if that step's live action doesn't work. Rehearse it once against your scratch org, timing how long the full walkthrough takes.

## Check yourself

- Why is a feature tour a worse choice than a scenario-based demo for this platform?
- What makes a demo script resilient to a live failure, specifically?
- Why does this lesson say technical debt should be answered if asked, not volunteered during the demo itself?
