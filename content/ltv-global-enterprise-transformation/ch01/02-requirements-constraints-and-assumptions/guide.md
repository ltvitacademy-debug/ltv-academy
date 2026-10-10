# Lesson 2 — Requirements, Constraints and Assumptions

**Chapter 1 · Scenario and Requirements · Lesson 2 of 33**

## What you'll learn

- The difference between a requirement, a constraint, and an assumption, and why conflating them causes real design failures
- LTV Global's specific functional and nonfunctional requirements for this transformation
- The hard constraints you cannot design around, including the legacy systems you must integrate with
- The explicit assumptions you're entitled to make, and why writing them down protects you later

## Three different kinds of statement

A Technical Architect's intake from a client is never one clean list — it's a mix of three fundamentally different kinds of statement, and treating them as interchangeable is a common early-career mistake. A **requirement** is something the solution must do or provide ("dealers must be able to place parts orders online"). A **constraint** is a boundary you cannot design around, usually because it's already fixed by something outside the project ("the financial system cannot be replaced or given a real-time API in this phase"). An **assumption** is something you're treating as true because confirming it definitively isn't practical right now, and you're explicitly flagging that the design depends on it ("we assume LTV Global's 10,000 users already have corporate email accounts provisioned"). Mixing these up is dangerous: treating a constraint as a requirement wastes effort trying to solve something that was never solvable in this project's scope, and treating an assumption as a confirmed fact is exactly how a design collapses months later when the assumption turns out to be false.

## LTV Global's stated requirements

The engagement brief for LTV Global is explicit: Salesforce must integrate with the company's **ERP system**, its **financial system**, its **data warehouse**, its **identity provider**, a **customer portal**, and a set of **external APIs**. Translated into Technical Architect language, the functional requirements are: a single Salesforce platform must support all four business units with a true 360-degree view of each customer and the equipment they own; dealers and end customers must be able to self-service through a portal rather than calling in for routine tasks; internal users must authenticate through the company's existing identity provider rather than maintaining separate Salesforce credentials; and data must flow correctly, and be reportable, across Salesforce, the ERP, the financial system, and the data warehouse without manual reconciliation becoming a full-time job for someone.

The nonfunctional requirements are just as real: the platform must support roughly 10,000 internal users and millions of customer records without degrading, it must respect data residency expectations for EMEA's GDPR-governed personal data, and it must tolerate the fact that at least one of the systems it integrates with (you'll meet it in Lesson 4) cannot support real-time integration at all.

## The constraints that aren't going away

Three constraints are fixed facts of this engagement, not design choices: LTV Global's legacy **financial system** is a decades-old mainframe platform with no modern API, reachable only through batch file transfer — a constraint, not a gap to be "fixed" by this project. LTV Global's **ERP system** is an existing on-premises platform that the business has no appetite to replace as part of this transformation — integration has to work around it, not replace it. And LTV Global operates across three regions with genuinely different regulatory obligations, which constrains where and how certain personal data can be handled, regardless of what would otherwise be the simplest technical design.

## The assumptions worth writing down now

Three assumptions are reasonable to make at this stage, and writing them down protects you if they later prove wrong: that LTV Global's existing identity provider can support standard federation protocols for both workforce and (optionally) large-dealer identity; that the data warehouse platform selected by LTV Global's data team can ingest extracts on a nightly batch cadence without requiring real-time streaming; and that LTV Global's leadership has already committed to a single, global Salesforce org rather than mandating region-by-region isolation — an assumption Lesson 7 will test directly against a real tradeoff.

## Key terms

| Term | Meaning |
|---|---|
| Requirement | Something the solution must do or provide |
| Constraint | A fixed boundary the design cannot change, usually imposed from outside the project |
| Assumption | A stated, unconfirmed belief the design is built on, flagged explicitly so it can be revisited |
| Functional requirement | A requirement describing what the system must do |
| Nonfunctional requirement | A requirement describing a quality the system must have (scale, security, residency), covered in depth in Lesson 17 |

## Lab

LTV Global's VP of Sales says during intake: "Obviously the new system needs to talk to our ERP in real time — that's not up for discussion." Based on what Lesson 2 has told you about the financial system's constraints (not the ERP's), write two or three sentences distinguishing what in that statement is a genuine requirement versus what might actually be an assumption worth testing before you commit the design to it. (Hint: the VP named the ERP, not the financial system — don't let the two legacy systems blur together in your answer.)

## Check yourself

Can you state, in one sentence each, the difference between a requirement, a constraint, and an assumption? Can you name one real constraint from LTV Global's scenario that no design decision in this course is allowed to contradict?
