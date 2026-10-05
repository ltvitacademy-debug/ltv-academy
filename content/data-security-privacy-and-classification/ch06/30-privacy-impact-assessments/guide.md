# Lesson 30 — Privacy Impact Assessments

**Chapter 6 · Applied Security and Privacy · Lesson 30 of 30**

## What you'll learn

- What a privacy impact assessment is, and when GDPR's version of it is actually required
- The core questions a PIA has to answer, regardless of which template an organization uses
- How a PIA on Brightfield's dashboard project would have surfaced the Lesson 28 incident before launch
- Where the Data Governance career path continues from here

## Assessing risk before you build, not after

A **privacy impact assessment (PIA)** — called a **Data Protection Impact Assessment (DPIA)** under GDPR specifically — is a structured review of a planned data processing activity, done *before* it launches, to identify privacy risks and decide how to address them. It's the formal version of a question every earlier chapter has been pushing toward: before this system touches personal data, what could go wrong, and what are we doing about it in advance?

GDPR's **Article 35** requires a DPIA specifically when processing is "likely to result in a high risk" to individuals — the regulation calls out large-scale processing of sensitive data and systematic monitoring as examples that typically meet that bar. Not every project needs a formal DPIA; a PIA-style review as a general good practice, though, is useful far more broadly than just the legally-mandated cases.

## The core questions, regardless of template

Different organizations use different PIA templates, but a usable one answers the same core questions:

- **What data, and why?** A description of exactly what personal data the processing involves and the specific purpose it serves
- **Is it necessary and proportionate?** Whether the same purpose could be achieved with less data, or in a less invasive way — the minimization principle applied before the system exists, not after
- **What are the risks to individuals?** Not just "could we get breached," but what actually happens to a real person if this specific processing goes wrong — exposure, discrimination, loss of control over their own information
- **What mitigates those risks?** The specific controls — classification, access restriction, masking, retention limits — being applied in response to the risks just identified, tying directly back to Chapters 2 through 5 of this course
- **Who signed off?** A named reviewer, usually a privacy officer or DPO, confirming the assessment was actually done, not just filled out as a formality

## Running Lesson 28's dashboard project through a PIA

If Brightfield had run a PIA before building the contractor's dashboard, the "what data, and why" question alone would have forced someone to notice the project only needed aggregated regional totals, not row-level customer records with payment fragments. The "is it necessary and proportionate" question would have flagged the broad access grant immediately — a dashboard summarizing regional sales doesn't need read access to individual shipping addresses. A PIA wouldn't have replaced the access governance model from Lesson 29; it would have caught the problem earlier, at design time, instead of relying entirely on a recertification cycle to catch it months later.

## Where the Data Governance path continues

This closes **Data Security, Privacy & Classification**. You've now worked through sensitive data foundations, classification, access control, data protection techniques, lifecycle and compliance concepts, and applied all of it to realistic scenarios. The Data Governance career path continues next with **Microsoft Purview** — the platform where many of these concepts (classification, cataloging, lineage, governance workflows) get implemented hands-on in a real enterprise governance tool, building directly on the vocabulary and judgment you've developed across these thirty lessons.

Congratulations on finishing the course. The ideas here — classify before you expose, grant the minimum, log what happened, know your obligations before an incident forces you to learn them — don't go out of date the way a specific tool's interface eventually does. They're worth carrying into whatever platform you learn next.

## Key terms

| Term | Meaning |
|---|---|
| Privacy impact assessment (PIA) | A structured pre-launch review of a planned data processing activity's privacy risks |
| Data Protection Impact Assessment (DPIA) | GDPR's specific, legally-required version of a PIA, triggered by likely high-risk processing |
| Necessity and proportionality | The test of whether a processing activity's data use is the minimum needed for its stated purpose |

## Lab

Pick a project from this course's case study (Lesson 28) or a hypothetical project of your own involving personal data. Write a short PIA answering the five core questions from this lesson: what data and why, necessity and proportionality, risks to individuals, mitigations, and who would sign off. Compare what your PIA surfaces against what a recertification cycle alone would have caught.

## Check yourself

Can you state the five core questions a privacy impact assessment answers from memory, and explain specifically how running one on the Brightfield dashboard project would have surfaced its risk before launch rather than three months after?
