# Lesson 7 — Compliance

**Chapter 1 · Nonfunctional Requirements · Lesson 7 of 18**

## What you'll learn

- Compliance as an NFR category: legal, regulatory, and contractual constraints that shape design
- Why compliance NFRs are different from the others — they often aren't negotiable
- The real certifications and attestations Salesforce publishes, and what they do (and don't) transfer to a customer's org
- How to translate a regulation into an architectural constraint, using GDPR and HIPAA as worked examples

## Compliance NFRs don't get traded off the way others do

Every other NFR category in this course is ultimately a judgment call balanced against cost, timeline, and other NFRs — you can usually decide to accept slightly worse performance in exchange for lower cost. **Compliance** NFRs are different: they usually come from a law, a regulation, or a contractual obligation the business has already accepted, and an architect doesn't get to negotiate away a legal requirement the way they might negotiate a performance target. This doesn't mean compliance requirements are unlimited or automatically override everything else — it means the negotiation happens with legal and compliance stakeholders, not inside the architecture review, and the architect's job is to implement what's actually required, confirmed with those stakeholders, rather than guessing at what a regulation demands.

A common and costly mistake is treating a compliance requirement as self-evidently satisfied because "Salesforce is compliant." Salesforce's own platform-level certifications describe what Salesforce has done to its infrastructure and shared responsibilities — they do not automatically make a customer's specific implementation compliant with a specific regulation. A HIPAA-relevant certification on Salesforce's infrastructure says nothing about whether a specific org's field-level security, sharing model, or integration design actually protects patient data the way HIPAA requires for that specific use case.

## What Salesforce actually publishes, and what it means

Salesforce maintains **compliance.salesforce.com**, a trust portal publishing the company's compliance certifications and attestations. The published program categories include **SOC 2 and SOC 3** audit reports (independent auditor attestations on security, availability, and confidentiality controls), **ISO 27001** certification (an internationally recognized information security management standard, which Salesforce has held company-wide since 2008), **FedRAMP Moderate** authorization for Salesforce Government Cloud specifically (not the general commercial platform), and support for **HIPAA**-relevant use cases through a HITRUST-audited report rather than a direct "HIPAA certification" — HIPAA itself is not a certification any vendor can be awarded, since it's enforced through Business Associate Agreements and each covered entity's own compliance program, not a pass/fail audit of the platform. Salesforce also publishes ISO 27017 and ISO 27018 (cloud security and personal-data-in-the-cloud standards) and a range of regional attestations for customers operating under non-U.S. regulatory regimes.

The architectural takeaway: these attestations establish that Salesforce's infrastructure and shared responsibilities meet a recognized bar — they are a necessary foundation, and a real reason an enterprise can build a compliant solution on the platform at all — but the customer's specific implementation (which fields hold what data, who can see them, how data moves in and out, how long it's retained) is the customer's own compliance responsibility, not something inherited automatically from Salesforce's certifications.

## Translating a regulation into an architectural constraint

Compliance becomes useful to an architect only once it's translated from legal language into a specific, checkable design constraint. Two examples:

- **GDPR's right to erasure** (Article 17) requires that an individual can request deletion of their personal data, subject to specific exceptions. Translated into an NFR: "every object storing EU resident personal data must support a documented deletion procedure covering the primary record and any copies in integrated systems, backups, and archives, completable within the regulation's required timeframe." That's a data-architecture decision (do backups and integrations even support selective deletion?), not just a policy statement.
- **HIPAA's requirement to protect PHI (protected health information)** translates into specific field-level and access-control NFRs: which fields on which objects hold PHI, who (which profiles/permission sets) is allowed to view them, whether Platform Encryption or Shield Event Monitoring is needed to meet the access-logging expectations a Business Associate Agreement implies, and how integrations handle PHI in transit.

In both cases, the architect's job isn't to interpret the law from scratch — that's legal and compliance's job — but to take the compliance team's stated requirement and turn it into something the design can actually satisfy and that a reviewer can check.

## Key terms

| Term | Meaning |
|---|---|
| Compliance NFR | A requirement driven by a law, regulation, or contractual obligation, generally not subject to the same cost/benefit trade-offs as other NFRs |
| compliance.salesforce.com | Salesforce's trust portal publishing its compliance certifications and attestations |
| SOC 2 / SOC 3 | Independent auditor attestation reports on security, availability, and confidentiality controls |
| ISO 27001 | An internationally recognized information security management system standard |
| Business Associate Agreement (BAA) | The contractual mechanism through which HIPAA compliance obligations are formally established between a covered entity and a vendor, since HIPAA itself is not a certification |

## Lab

A client says: "We're on Salesforce, so we're already HIPAA compliant." Write a short response (as if speaking to this client) explaining what Salesforce's own certifications actually cover, what is still the client's responsibility, and name two specific architectural decisions (field-level, access-control, or logging) that would need to be verified before anyone could honestly call this specific org's implementation HIPAA-compliant.

## Check yourself

Can you explain why compliance NFRs are treated differently from the other five NFR categories in terms of negotiability? Can you name two real certifications or attestations Salesforce publishes on compliance.salesforce.com, and explain the limit of what each one guarantees for a specific customer's org?
