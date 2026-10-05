# Lesson 7 — Standards and Procedures

**Chapter 2 · Policies, Standards and Processes · Lesson 7 of 25**

## What you'll learn

- A quick recap of policy vs. standard (Foundations Lesson 20), and the third layer this lesson adds: procedure
- How to write a standard document that's actually checkable
- What a procedure is, and why it's where most people actually encounter governance
- How the three layers — policy, standard, procedure — stack without duplicating each other

## Three layers, not two

Foundations Lesson 20 drew the line between **policy** (what's required and why) and **standard**
(the concrete, checkable rule that implements it — a format, a threshold, a control). In a running
program there's a third layer underneath both: the **procedure** — the step-by-step instructions
for actually doing the thing the standard requires. If the policy is "customer financial data is
confidential," and the standard is "access requires manager approval plus a logged business
reason," the procedure is the literal screen-by-screen walkthrough of how someone submits that
access request in whatever system the organization actually uses.

## Writing a standard that's actually checkable

A standard document, to be useful, needs to answer a yes/no question, not a matter of opinion.
Compare:

- **Weak standard**: "Customer data should be reasonably protected." (Not checkable — what counts
  as "reasonable"?)
- **Working standard**: "Customer PII fields must be encrypted at rest using AES-256 or stronger."
  (Checkable — you can look at a system and answer yes or no.)

A standards document should name: the specific field, format, or control; the exact threshold or
value; who's responsible for verifying compliance; and which policy it implements (closing the
loop back to the policy template from Lesson 6).

## What a procedure actually is

Most employees never read a policy document and rarely read a standard — but they follow
procedures constantly, often without realizing it's "governance" at all. A procedure is the
operational instructions: exact steps, in order, for a specific task — submitting an access
request, classifying a new dataset, reporting a data quality issue. Because procedures are where
most people actually experience governance, they're also where a well-designed program is
judged: a clear, short procedure makes compliance the easy path; a confusing one pushes people
toward workarounds that quietly violate the policy and standard above it.

## How the three layers stack without repeating each other

| Layer | Answers | Example | Changes how often |
|---|---|---|---|
| Policy | What, and why | "Customer financial data is confidential" | Rarely |
| Standard | Exactly what, specifically | "PII fields must use AES-256 encryption at rest" | Occasionally (as tech changes) |
| Procedure | How, step by step | "To request access: submit Form X, get manager sign-off, IT provisions within 2 business days" | Often (as tools/systems change) |

Each layer should only state what belongs at its own altitude. A policy that specifies exact
screen-by-screen steps is really a misplaced procedure; a procedure that re-explains *why* the
rule exists is wasting the reader's time re-litigating something the policy already settled.

## Key terms

| Term | Meaning |
|---|---|
| Procedure | Step-by-step operational instructions for carrying out what a standard requires |
| Checkable standard | A standard specific enough that compliance can be answered yes or no, not by opinion |
| Layer altitude | The principle that policy, standard, and procedure each answer a different question and shouldn't duplicate each other's content |

## Lab

Take the standard you wrote in Foundations Lesson 20's lab (or write a new one). Write the
companion procedure: the literal numbered steps someone would follow to comply with that standard
in your organization's actual systems and roles.

## Check yourself

Can you explain the difference between a policy, a standard, and a procedure using the three-layer
table above, and give an example of a "weak" standard versus a "working," checkable one?
