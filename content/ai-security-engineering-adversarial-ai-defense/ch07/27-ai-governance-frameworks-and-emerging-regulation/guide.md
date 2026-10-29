# Lesson 27 — AI Governance Frameworks and Emerging Regulation

**Chapter 7 · AI Governance, Red-Teaming, and Compliance · Lesson 3 of 4**

## What you'll learn

- How the **NIST AI Risk Management Framework** functions at the
  organizational-policy level, beyond the technical risk categories
  you learned it for in Chapter 1
- The **EU AI Act's** real, risk-tiered structure — what's banned,
  what's heavily regulated, and what's left alone
- **ISO/IEC 42001**, the published international standard for an AI
  management system, and how it compares to the frameworks above
- How an industry AI governance board actually uses these frameworks
  day to day, rather than treating them as a one-time compliance
  checkbox

## NIST's AI RMF, revisited as organizational policy

Chapter 1 introduced the NIST AI Risk Management Framework as a
source of technical risk categories. At the organizational level, the
AI RMF is structured around four functions that a governance program
runs continuously, not once:

- **Govern** — establish the policies, roles, and accountability
  structures for managing AI risk across the organization, before any
  specific system is even built.
- **Map** — identify the context a specific AI system operates in:
  its intended use, its stakeholders, and the risks specific to that
  use case — this is where the threat model from Lesson 26 plugs in.
- **Measure** — generate evidence about how the system actually
  performs and fails, including through red-teaming (Lesson 25) and
  other testing.
- **Manage** — act on what Measure found: prioritize, respond to, and
  track risks over the system's lifecycle, not just at launch.

A governance program that only ever does Govern — writing a policy
document and stopping — hasn't actually managed any risk. The
framework is designed to be a continuous loop across a system's life,
which is exactly why Lessons 25 and 26 (red-teaming and threat
modeling) aren't separate from governance — they're how Measure and
Map actually get executed.

## The EU AI Act's risk-tiered approach

The **EU AI Act** is real, enacted regulation — not a hypothetical.
Its core structure is a risk pyramid with obligations that scale with
risk:

- **Unacceptable risk** — practices the Act bans outright, such as
  social scoring of individuals by public authorities and certain
  forms of manipulative or exploitative AI.
- **High-risk** — systems used in contexts like employment, credit
  scoring, or critical infrastructure face the heaviest obligations:
  documented risk management, conformity assessments, human oversight
  requirements, and detailed technical documentation before they can
  be deployed.
- **Limited risk** — systems like chatbots face transparency
  obligations — users must be told they're interacting with an AI
  system, and certain AI-generated content (like deepfakes) must be
  labeled as such.
- **Minimal risk** — the large majority of AI systems, which face no
  additional obligations under the Act beyond existing law.

The tiering matters because it tells an organization exactly where to
invest compliance effort: a high-risk HR screening tool and a
low-stakes internal chatbot face completely different obligations
under the same law.

## ISO/IEC 42001: the management-system standard

**ISO/IEC 42001** is the published international standard for an AI
management system — the AI-specific counterpart to how ISO/IEC 27001
standardizes an information security management system. It gives
organizations a certifiable structure for AI governance: documented
policies, defined roles, risk assessment processes, and continual
improvement, which an external auditor can actually assess against.
Where the NIST AI RMF is voluntary guidance and the EU AI Act is
binding law, ISO/IEC 42001 is the standard an organization can be
independently certified against — useful evidence for customers and
regulators that the Govern function above isn't just a document
nobody follows.

## How an AI governance board actually works

In practice, these frameworks get operationalized through a
cross-functional **AI governance board** — typically security, legal,
data science/ML, and often a dedicated responsible-AI or ethics role,
reviewing systems before and after deployment. A real board's job
isn't to rubber-stamp; it's to ask, for each new AI system: what risk
tier does this fall under (EU AI Act), has Map and Measure actually
been done (NIST AI RMF), and does our documentation hold up against
our certified management system (ISO/IEC 42001)? That review is where
the threat model and red-team findings from the last two lessons
actually land.

## Key terms

| Term | Meaning |
|---|---|
| NIST AI RMF (organizational level) | A continuous Govern → Map → Measure → Manage loop for AI risk across an organization, not a one-time checklist |
| EU AI Act | Enacted EU regulation using a risk-tiered structure (unacceptable, high-risk, limited risk, minimal risk) with obligations that scale by tier |
| ISO/IEC 42001 | The published international standard for a certifiable AI management system, the AI-specific counterpart to ISO/IEC 27001 |
| AI governance board | A cross-functional group (security, legal, data science, responsible AI) that reviews AI systems against these frameworks before and after deployment |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: name
the four functions of the NIST AI RMF, and explain why a high-risk
system under the EU AI Act faces different obligations than a
minimal-risk one.
