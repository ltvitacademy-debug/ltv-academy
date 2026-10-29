# Lesson 6 — TOGAF, and Where Security Fits Into Enterprise Architecture

**Chapter 2 · Security Architecture Frameworks · Lesson 6 of 4**

## What you'll learn

- What TOGAF is, who maintains it, and how its starting point differs
  from SABSA's
- The four architecture domains TOGAF organizes around, and the
  Architecture Development Method (ADM) that drives the whole practice
- Why security isn't a fifth domain in TOGAF, and what "cross-cutting
  concern" actually means in practice
- How a security architect embeds into specific ADM phases instead of
  working off to one side

## What TOGAF is

**TOGAF** — **The Open Group Architecture Framework** — is maintained
by The Open Group, an industry consortium (not a single vendor), and
it's the most widely adopted enterprise architecture framework in use
today. Where SABSA starts from business attributes and works down,
TOGAF starts from an organization's broader IT and business
architecture practice as a whole, and gives that practice a repeatable
method for planning, designing, and governing change.

TOGAF organizes architecture work into four domains, often
abbreviated **BDAT**:

- **Business** architecture — strategy, governance, organization,
  key business processes
- **Data** architecture — the structure and management of an
  organization's logical and physical data assets
- **Application** architecture — a blueprint for the individual
  systems to be deployed, their interactions, and their relationships
  to core business processes
- **Technology** architecture — the hardware, software, and network
  infrastructure needed to support the other three domains

## The Architecture Development Method (ADM)

The engine of TOGAF is the **ADM**, a cyclical, iterative method with
phases lettered A through H, wrapped around a central **Requirements
Management** activity that feeds every phase:

- **Preliminary** — establish the architecture capability itself
- **A. Architecture Vision** — scope, stakeholders, and the vision
  for the engagement
- **B. Business Architecture**
- **C. Information Systems Architectures** (Data and Application)
- **D. Technology Architecture**
- **E. Opportunities & Solutions** — group changes into
  work packages
- **F. Migration Planning** — sequence and prioritize those packages
- **G. Implementation Governance** — ensure what gets built matches
  the architecture
- **H. Architecture Change Management** — handle change requests and
  keep the architecture current

Each phase produces specific artifacts, and the cycle repeats as the
organization evolves — TOGAF is explicitly not a one-and-done project
plan.

## Where security actually fits

Here's the uncomfortable part for a security architect coming to
TOGAF fresh: **security is not one of the four BDAT domains.**
There's no dedicated "Security Architecture" box on the ADM diagram.
Historically, this led to security being treated as an afterthought —
something a security team reviewed near the end of Phase D or bolted
on during implementation governance, after the real architectural
decisions had already been made.

The Open Group has addressed this directly. Its published guidance —
most notably the **TOGAF Series Guide: Integrating Risk and
Security** — treats security (along with risk) as a **cross-cutting
concern**: a set of considerations that has to be addressed inside
every ADM phase, not confined to one of them. In practice, that
means:

- **Phase A (Vision)** — security objectives and risk appetite get
  captured as part of the architecture vision itself, alongside
  business goals
- **Phase B (Business Architecture)** — compliance obligations and
  risk tolerances are documented as business architecture inputs
- **Phase C (Information Systems)** — data classification and
  application-level controls are designed in, not reviewed after
- **Phase D (Technology Architecture)** — security services (identity,
  encryption, logging) are specified as part of the technology
  architecture, not a separate add-on
- **Phase E/F (Solutions & Migration Planning)** — security work
  packages get sequenced alongside everything else, instead of
  deferred to "later"
- **Phase G (Implementation Governance)** — architecture compliance
  reviews explicitly check security conformance

## SABSA and TOGAF working together

Because SABSA is a *content* framework (what the security
architecture should contain) and TOGAF is a *process* framework (how
an enterprise architecture practice runs), the two are frequently
paired rather than treated as competitors. The Open Group and the
SABSA Institute have published joint guidance showing how SABSA's
layers and Business Attributes Profile can populate the security
content inside each TOGAF ADM phase — TOGAF supplies the overall
cadence and governance; SABSA supplies the business-traceable
substance that fills it in.

## Key terms

| Term | Meaning |
|---|---|
| TOGAF | The Open Group Architecture Framework — the most widely adopted enterprise architecture framework, maintained by The Open Group |
| BDAT | TOGAF's four architecture domains: Business, Data, Application, Technology |
| ADM | Architecture Development Method — TOGAF's cyclical, lettered (A-H) process for developing and governing architecture |
| Cross-cutting concern | A consideration (like security or risk) addressed inside every ADM phase rather than confined to one dedicated domain |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
isn't security one of TOGAF's four BDAT domains, and what does it
mean in practice for security to be a "cross-cutting concern" across
ADM phases A through H?
