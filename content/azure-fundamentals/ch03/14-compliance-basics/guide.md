# Lesson 14 — Compliance Basics

**Chapter 3 · Security, Pricing & Governance · Lesson 14 of 18**

## What you'll learn

- What "compliance" means in a cloud context, and why it's a shared responsibility
- The Microsoft Trust Center — where Microsoft publishes its compliance posture
- A few compliance frameworks you'll hear by name: SOC 2, ISO 27001, GDPR, HIPAA
- Why deep compliance work is its own specialization, not something AZ-900 requires mastering

## Compliance as a shared responsibility

**Compliance** means meeting a specific set of external rules or standards —
legal, industry, or contractual — about how data is handled, secured, and
audited. In the cloud, compliance is shared between Microsoft and the
customer. Microsoft is responsible for the compliance of the underlying
platform: the physical data centers, the hypervisor, the network backbone.
The customer is responsible for how they configure and use what Microsoft
provides — who they grant access to, what data they store where, whether
they've turned on the right logging. Buying Azure doesn't make a company
automatically compliant with anything; it gives them a platform that's
*capable* of meeting those requirements, if configured correctly.

## The Microsoft Trust Center

The **Microsoft Trust Center** (at microsoft.com/trust-center) is where
Microsoft publishes its compliance posture — which certifications and
standards Azure meets, audit reports, and documentation a company's own
compliance or legal team can use as evidence when they need to prove Azure
is an acceptable platform for their regulated data. This isn't marketing
copy; it's the actual reference point compliance teams pull audit
documentation from.

## Frameworks you'll hear by name

You don't need to memorize the details of these for AZ-900 — you need to
recognize the names and know roughly what problem each one addresses:

| Framework | What it addresses |
|---|---|
| SOC 2 | An auditor's report on security, availability, and confidentiality controls |
| ISO 27001 | An international standard for information security management systems |
| GDPR | EU regulation on personal data privacy and protection |
| HIPAA | US regulation on protecting health information |

A healthcare company evaluating Azure for patient data cares about HIPAA. A
company doing business in the EU cares about GDPR. A SaaS vendor's
enterprise customers will often ask for a SOC 2 report before signing a
contract. Different frameworks matter to different organizations depending
on industry and geography — Azure is built to support many of them at once,
not just one.

## Where this fits, honestly

Deep compliance work — mapping specific controls to specific regulations,
managing audits, working with legal teams — is its own specialization, often
a full career path (compliance officer, security auditor). AZ-900 doesn't
require mastering any of that, and neither does this lesson. What it does
require is recognizing that compliance exists as a real constraint on cloud
decisions, knowing where to point someone (the Trust Center) when a
compliance question comes up, and understanding that "we're on Azure" is
never, by itself, an answer to "are we compliant with X."

## Key terms

| Term | Meaning |
|---|---|
| Compliance | Meeting external legal, industry, or contractual data-handling standards |
| Shared responsibility | Microsoft secures the platform; the customer secures how they configure and use it |
| Microsoft Trust Center | Microsoft's published compliance posture, certifications, and audit documentation |
| SOC 2 / ISO 27001 / GDPR / HIPAA | Common frameworks — security auditing, security management, EU privacy, US health data |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why doesn't
"our data is on Azure" automatically make a company compliant with something
like HIPAA or GDPR?

---

**Chapter 3 complete.** You've covered identity and access with RBAC, pricing
and cost management tools, the governance layer of Policy, tags, and
management groups, and now compliance at an awareness level. Chapter 4,
**Working in Azure**, moves from concepts to practice: the Azure CLI, ARM and
Bicep as Infrastructure as Code, and deploying your first real resource.
