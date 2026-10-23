# Lesson 20 — Compliance Frameworks Relevant to ServiceNow

**Chapter 6 · Governance, Compliance & Audit · Lesson 20 of 24**

## What you'll learn

- Four real, well-known compliance frameworks a ServiceNow implementation commonly has to support
- The honest, important distinction between what the platform provides and what compliance actually requires
- Why "we use ServiceNow" is never, by itself, a compliance claim
- How the capabilities from earlier in this chapter and course map onto real framework expectations
- How to talk about compliance honestly with a stakeholder who wants a simple yes/no answer

## Four frameworks worth knowing by name

Depending on what an organization does and what data its ServiceNow
instance touches, one or more of these frameworks is likely to come up
in a real implementation:

- **SOC 2** — a set of trust service criteria (security, availability,
  processing integrity, confidentiality, privacy) that customers and
  auditors commonly expect of any SaaS vendor and, by extension, of how
  that vendor's platform is configured and used. It's less a single
  checklist and more a standard a service organization is independently
  audited against.
- **HIPAA** — relevant the moment a ServiceNow instance stores or
  processes protected health information (PHI), such as a healthcare
  organization using ServiceNow for IT service management tickets that
  reference patient-related systems or data.
- **GDPR** — relevant for any personal data belonging to people in the
  EU, regardless of where the organization operating the instance is
  headquartered. It governs things like data subject access requests,
  the right to erasure, and lawful bases for processing personal data.
- **PCI-DSS** — relevant if any payment card data ever touches the
  instance, even indirectly, such as a ticket or attachment that
  happens to reference card numbers.

## The honest framing: platform capability vs. customer responsibility

This is the single most important idea in this lesson, and it's worth
stating plainly rather than overselling it: ServiceNow the platform
provides capabilities that *help* an implementation meet these
frameworks. It does not make an implementation automatically compliant
just because the organization happens to run on ServiceNow. Encryption
at rest and in transit, the audit logging covered in Lesson 19,
scripted and field-level ACLs, data anonymization and masking, and
attachment and export controls — every one of these, covered across
this course, is a *capability* the platform makes available. Whether
any of it is actually configured correctly, applied to the right data,
reviewed on a real cadence, and operated consistently by real people
day to day is the customer's responsibility, not something the platform
guarantees on its own.

```
What the platform provides:             What the customer owns:
- Encryption (edge, column-level)       - Deciding WHICH fields need it
- Audit logging (sys_audit)             - Deciding WHICH fields to audit
- ACLs, field-level security            - Designing the actual role/ACL
                                           model correctly
- Masking, export controls              - Applying masking/export rules
                                           to the right data

Capability exists <> Compliance achieved. The gap is configuration,
operation, and review -- all customer-side.
```

## Why "we use ServiceNow" is never a compliance claim on its own

A stakeholder will sometimes ask, in effect, "doesn't ServiceNow handle
compliance for us?" The honest answer is no — in the same way that
using a bank vault doesn't automatically mean a company's financial
controls are sound. The vault (the platform) is a real, strong tool.
Whether the company actually uses it correctly — who holds keys, how
access is reviewed, what gets locked inside it versus left on a desk —
determines whether the underlying control objective is actually met.
ServiceNow implementations that get audited successfully against SOC 2,
or that can demonstrate HIPAA-relevant controls, do so because a real
team configured real ACLs, turned on real selective auditing on the
right fields, and can produce real evidence of all of it on request —
not because the platform's marketing says it supports compliance.

## Mapping this chapter's capabilities to real framework expectations

Concretely, this is how the pieces connect: SOC 2's security and
confidentiality criteria lean heavily on the ACL and encryption work
from Chapters 1, 2, and 4. HIPAA's requirement to track who accessed or
changed PHI-adjacent records leans directly on the selective audit
logging from Lesson 19. GDPR's data-subject rights lean on being able
to locate, export, and (where legitimate) erase a specific person's
data — which depends on the same attachment and export controls from
Chapter 4 being configured deliberately, not loosely. PCI-DSS's
requirement to tightly restrict and log access to cardholder data leans
on the same combination of field-level security, masking, and audit
logging this course has built up piece by piece. None of these
frameworks are satisfied by a single ServiceNow feature in isolation —
each depends on several of this course's capabilities being configured
together, correctly, for the specific data that framework cares about.

## Key terms

| Term | Meaning |
|---|---|
| SOC 2 | Trust service criteria (security, availability, confidentiality, and more) commonly expected of SaaS vendors and their customers' configurations |
| HIPAA | U.S. framework governing protected health information (PHI); relevant whenever an instance touches PHI |
| GDPR | EU framework governing personal data of EU individuals, including data-subject rights like erasure and access |
| PCI-DSS | Framework governing payment card data; relevant whenever card data touches the instance, even indirectly |
| Shared responsibility | The platform provides compliance-relevant capabilities; configuring, operating, and evidencing them correctly is the customer's job |

## Check yourself

You're ready for Lesson 21 when you can explain, without looking: why
is "we run on ServiceNow" never itself a valid answer to "are we
compliant with SOC 2 / HIPAA / GDPR / PCI-DSS" — and what specific,
customer-side work has to happen on top of the platform for that answer
to actually become true?
