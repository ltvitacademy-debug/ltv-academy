# Lesson 19 — PCI DSS and HIPAA: When Industry-Specific Regulation Applies

**Chapter 5 · Regulatory Compliance Frameworks · Lesson 19 of 20**

## What you'll learn

- Why PCI DSS and HIPAA are fundamentally different from SOC 2 and
  ISO 27001: they aren't optional attestations an organization chooses
  to pursue — they're **mandatory requirements triggered by handling a
  specific type of data**
- What the **Cardholder Data Environment (CDE)** is under PCI DSS, and
  why **scope** is the first and most consequential question in any
  PCI assessment
- What **Protected Health Information (PHI)** is under HIPAA, who
  counts as a **covered entity** versus a **business associate**, and
  why a **Business Associate Agreement** is the legal hinge the whole
  obligation turns on
- Why "we don't need to worry about PCI or HIPAA" is sometimes
  completely correct — and why getting that determination wrong in
  either direction is expensive

## These frameworks are triggered, not chosen

SOC 2 and ISO 27001 are things an organization voluntarily pursues to
demonstrate trustworthiness to customers. PCI DSS and HIPAA work
differently: they apply because of what data an organization actually
touches, not because it decided to opt in. Get the applicability
question wrong — assuming a framework doesn't apply when it does, or
over-engineering for one that doesn't apply at all — and the cost
shows up later, either as a real compliance violation or as wasted
security spend on controls the organization never needed.

## PCI DSS: scope is everything

The **Payment Card Industry Data Security Standard (PCI DSS)**,
maintained by the PCI Security Standards Council, applies to any
organization that stores, processes, or transmits cardholder data —
full card numbers (PAN), cardholder name, expiration date, or the
security code. The standard is organized around 12 core requirements
covering things like network segmentation, encryption of cardholder
data in transit and at rest, access control, and logging.

The question that determines almost everything else in a PCI
assessment is **scope**: which systems actually touch cardholder data,
and which don't. That's the concept of the **Cardholder Data
Environment (CDE)** — the people, processes, and technology that
store, process, or transmit cardholder data, plus anything connected
to or that could impact the security of that environment. A huge
amount of practical PCI compliance work is actually **scope
reduction**: isolating the systems that truly need to touch card data
behind network segmentation, and routing everything else — most of a
typical e-commerce checkout flow, for instance — through a
PCI-validated third-party payment processor so that the organization's
own systems never actually see raw card numbers at all. Done well,
that can shrink an assessment from "our entire environment is in
scope" to a small, tightly controlled segment.

## HIPAA: covered entities, business associates, and PHI

The **Health Insurance Portability and Accountability Act (HIPAA)**
is U.S. federal law, not an industry standard body's publication, and
its Security and Privacy Rules apply based on two roles:

- A **covered entity** — health plans, healthcare clearinghouses, and
  healthcare providers who transmit health information electronically
  in connection with certain transactions.
- A **business associate** — a vendor or service provider that
  creates, receives, maintains, or transmits **Protected Health
  Information (PHI)** on behalf of a covered entity — a cloud hosting
  provider, a billing company, an analytics vendor with access to
  patient data.

PHI is individually identifiable health information — not just
diagnoses, but anything that links health data to an identifiable
person: a name next to a lab result, a medical record number, even an
appointment date tied to a patient's identity.

The legal hinge that turns a vendor relationship into a HIPAA
obligation is the **Business Associate Agreement (BAA)** — a required
contract specifying how the business associate will protect PHI, use
it only for permitted purposes, and report breaches. A vendor that
never actually touches PHI — even if it serves a healthcare client —
may not need a BAA at all. A vendor that does touch PHI without one in
place is a serious, independently sanctionable gap, regardless of how
good its technical controls otherwise are.

## Why the applicability question matters so much

Both frameworks share the same practical lesson: the trigger is the
**data**, not the industry label. A B2B software company whose
product happens to be sold to hospitals is not automatically subject
to HIPAA — it is, only to the extent it actually creates, receives,
maintains, or transmits PHI as a business associate. A SaaS company
that never stores a cardholder's PAN, because it fully outsources
checkout to a payment processor, may have no PCI DSS obligation of its
own at all. Getting this determination right — and documenting *why*
— is itself a real piece of compliance work, not a formality to skip.

## Key terms

| Term | Meaning |
|---|---|
| PCI DSS | Industry-mandated standard for any organization handling cardholder data; scope is defined by the CDE |
| Cardholder Data Environment (CDE) | The people, processes, and technology that store, process, transmit, or could impact the security of cardholder data |
| HIPAA | U.S. federal law governing Protected Health Information, applying to covered entities and business associates |
| PHI | Protected Health Information — individually identifiable health information |
| Business Associate Agreement (BAA) | Required contract specifying how a business associate protects PHI on behalf of a covered entity |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why
is "scope" the single most consequential question in a PCI DSS
assessment, and what specifically makes a vendor a HIPAA business
associate versus a company that simply happens to sell to healthcare
clients?
