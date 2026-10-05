# Lesson 30 — Building an AI Governance Program

**Chapter 6 · Applied AI Governance · Lesson 30 of 30**

## What you'll learn

- A concrete, ordered sequence for actually standing up an AI governance program at a real organization
- How every chapter of this course becomes one specific piece of that sequence, not a separate topic to remember
- What to build first when you have limited time and no existing program
- Where the Data Governance career path continues after this course

## You already know everything this requires

This course didn't teach eight separate subjects. It taught one program, one chapter at a time. This lesson's only job is to hand you the assembled version: the order to build things in, and why that order matters more than most people expect.

## Step 1 — Name who's accountable, before anything else

Nothing in the rest of this sequence works without this. Go back to Lesson 4's governance roles: someone has to own AI governance overall, and every individual AI system needs a named accountable owner — not "the data science team," a person. Harrow Peak's case study in Lesson 28 only worked because an accountable role existed *before* the drift incident, not after it. If your organization has AI systems and no named owner for any of them, this is step zero, not an eventual nice-to-have.

## Step 2 — Inventory every AI system you actually have

You cannot govern what you haven't counted. Build the model inventory and registry from Lesson 13 — every model, who owns it, what it does, what data it touches. Most organizations discover shadow AI systems during this step: a spreadsheet macro using a vendor's embedded model, a team quietly running a chatbot nobody approved. The inventory is uncomfortable and necessary in roughly equal measure.

## Step 3 — Risk-tier everything in the inventory

Apply Lesson 24's likelihood-times-impact method to every system in your new inventory. This single step is what makes the rest of the program affordable: you are never going to apply Harrow Peak-level rigor to every system, and you shouldn't — you apply it to the systems that actually carry that level of risk. Risk tier is the dial every other control in this sequence turns on.

## Step 4 — Set standards for the data feeding your highest-tier systems first

Apply Chapter 2's training-data governance — provenance (Lesson 7), quality (Lesson 8), bias checks (Lesson 9) — starting with your highest-risk systems, not alphabetically or by whoever asks first. This is where Harrow Peak's hidden labeling bias would have been caught earliest, if the organization had done this step before building the model rather than after.

## Step 5 — Require documentation for anything above your lowest risk tier

Model cards (Lesson 12) are not bureaucratic overhead — they're the thing an audit, an incident response, and a new team member all rely on later. Require one for every system above your lowest risk tier, and refuse to let a system go live without it. Brightfield's chatbot case study in Lesson 29 worked specifically because its limitation was written down before launch.

## Step 6 — Put access, monitoring, and approval gates around anything live

Chapter 4's controls — access restriction (Lesson 18), production monitoring and drift detection (Lessons 20–21), and an approval workflow before major changes (Lesson 16) — apply to every system once it's live, scaled to its risk tier. This is the step that turns documentation into an actually-operating program instead of a one-time compliance exercise.

## Step 7 — Define incident response and an audit cadence before you need them

Lesson 22's incident response process and Lesson 27's audit structure should exist *before* the first incident, not get improvised during one. Set an audit schedule tied to risk tier — your highest-risk systems audited far more frequently than your lowest.

## Step 8 — Know which frameworks and regulations might actually apply, then bring in real expertise

Use Lessons 25 and 26 as your vocabulary, not your compliance determination. Once you know roughly which frameworks and regulatory patterns are relevant to your organization's specific systems and jurisdictions, that's the point to engage legal and compliance professionals for an actual determination — this course gave you the map, not the legal opinion.

## What to build first if you're starting from nothing

If your organization has zero AI governance today, do not try to build all eight steps simultaneously. Start with Steps 1 and 2 — a named accountable owner and a real inventory — because every later step depends on both existing first. Most organizations that fail at AI governance didn't fail at the hard parts; they tried to start with model cards or audits before anyone had agreed who owned what.

## Key terms

| Term | Meaning |
|---|---|
| AI governance program | The ordered set of roles, inventory, risk-tiering, documentation, controls, and audit practices that make AI governance an operating reality, not a policy document |
| Shadow AI | An AI system in active use that was never inventoried, approved, or assigned an owner |
| Program sequencing | Building governance capabilities in a dependency-aware order, rather than all at once |

## Lab

For your own organization (or a plausible one), write the eight-step sequence from this lesson as a one-line action item each, specific to that organization. Mark which step you'd actually be able to start on this week versus which ones depend on something you don't have yet.

## Where the path continues

This closes **AI & Machine Learning Governance** — all six chapters, all thirty lessons. The Data Governance career path continues next with **Data Governance Program Management**, which zooms out from AI specifically to building and running a full data governance program end to end: the same kind of sequencing you just learned, applied to an organization's entire data estate, not just its AI systems.

## Check yourself

Can you recite the eight-step sequence from this lesson in order, from memory, and explain in one sentence why the order itself — not just the individual steps — is what makes a governance program actually work?
