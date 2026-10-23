# Lesson 12 — Designing an Enterprise Integration Strategy

**Chapter 4 · Integration Architecture · Lesson 12 of 32**

## What you'll learn

- A one-sentence recap of the integration patterns course 7 taught (REST Messages, Scripted REST APIs, IntegrationHub) — and why none of them are the subject of this lesson
- Why an enterprise needs an integration **strategy**, not just a set of working integrations
- What an integration inventory/catalog is, who should own it, and what it actually documents
- The three concrete, expensive problems a missing strategy causes: duplicate integrations, inconsistent authentication, and nobody holding a complete picture
- How a deliberate strategy turns course 7's technical patterns into enterprise-wide policy

## What you already know, applied differently here

Course 7 taught you how to build an individual integration: when to reach
for a REST Message versus a Scripted REST API, how IntegrationHub
simplifies the plumbing, and — in its Chapter 3 — how to authenticate a
single integration correctly, with OAuth preferred over Basic Auth. That
course answered "how do I build this one integration well?" This lesson
answers a different question that only shows up once an enterprise has
dozens of integrations built by dozens of different people: "how do we
make sure the *next* integration, and the one after that, don't quietly
repeat the mistakes of the first ten?"

## Why "it works" isn't the same as "it's strategic"

A single integration can be built correctly — solid error handling, a
reasonable auth pattern, clean field mapping — and the enterprise can
still be in trouble, because that integration was designed in isolation.
Nobody on the integration team necessarily knew that another team, six
months earlier, built a different integration to the exact same external
system. Nobody necessarily checked what authentication pattern the rest
of the instance's integrations use. Nobody owns a single list of what's
actually connected to this instance, built by whom, and why.

That's the real gap an integration *strategy* closes. A strategy isn't
a technology choice — it's the enterprise deciding, deliberately and in
advance, how integrations get designed, documented, and governed, so
that "well-built" and "well-governed" become the same thing instead of
two separate outcomes that only sometimes line up.

## The integration inventory: the artifact a strategy actually produces

The concrete deliverable of an integration strategy is an **integration
inventory** (sometimes called an integration catalog) — a maintained
record of every integration touching the instance. At minimum, a real
inventory entry answers:

```
Integration inventory entry:
- External system:      which system is on the other end
- Direction:             inbound, outbound, or bidirectional
- Pattern:                REST Message / Scripted REST API / IntegrationHub spoke / MID Server
- Authentication:        OAuth, Basic Auth, mutual TLS, API key — and which credential record
- Business owner:        who in the business requested/depends on this integration
- Technical owner:       who maintains the code/configuration
- Volume & criticality:  roughly how much traffic, and what breaks if it goes down
```

Without this record, "what's integrated with our instance?" is a
question only answerable by interviewing every team that's ever touched
the platform — and even then, the answer is usually wrong, because
integrations outlive the people who remember building them.

## Three real problems a strategy — and the inventory behind it — prevents

**Duplicate integrations.** Two different teams, months or years apart,
each discover they need data from the same external HR or finance
system. Neither checks an inventory, because none exists, so neither
knows the other integration is there. The enterprise ends up maintaining
two separate connections to the same system — twice the credentials to
rotate, twice the code to patch when the external API changes, and two
sets of field mappings that will quietly drift apart over time.

**Inconsistent authentication.** Course 7's Chapter 3 taught OAuth as
the stronger pattern for a single integration. Without an enterprise
policy enforcing that choice, different teams make different calls:
one integration uses OAuth because the developer building it knew
better, another uses Basic Auth because it was faster to stand up under
deadline pressure, and a third uses a hardcoded API key nobody's
rotated since it was created. There's no single answer anymore to "how
do our integrations authenticate?" — and a security review now has to
audit each integration individually instead of checking against one
documented standard.

**Nobody has the complete picture.** When an external system goes
down, or a security team needs to know everywhere a given data element
flows, or the instance is being migrated, the question "what actually
depends on this?" needs a fast, reliable answer. Without an inventory,
that answer comes from tribal knowledge, Slack threads, and whoever's
been here longest — which is slow, incomplete, and gets worse every
year integrations keep being added without being recorded.

## Turning course 7's technical content into enterprise policy

Course 7 gave you the technical tools: REST Messages, Scripted REST
APIs, IntegrationHub, and OAuth-based authentication. An integration
strategy is the architectural decision to make those tools' *best
practices* into a required, enterprise-wide standard rather than a
judgment call left to whichever developer builds the next integration.
Concretely, that means: every new integration gets an inventory entry
before it ships, OAuth is the default authentication pattern unless
there's a documented exception, and a named owner — usually an
architect or an integration center of excellence — reviews new
integrations against the existing inventory before they're built, not
after.

## Key terms

| Term | Meaning |
|---|---|
| Integration strategy | An enterprise-wide, deliberate policy for how integrations are designed, authenticated, and governed |
| Integration inventory/catalog | A maintained record of every integration touching the instance — system, pattern, auth, owner |
| Duplicate integration | Two separate integrations built independently to the same external system, because neither team knew about the other |
| Authentication standard | An enterprise-wide default (e.g., OAuth) that replaces ad hoc, per-integration authentication choices |
| Integration owner | The named person or team accountable for a specific integration's design, security, and upkeep over time |

## Check yourself

Your enterprise has 40 integrations and no inventory. A new developer is
about to build integration #41 to a payroll vendor. Walk through, in
order, the three things an integration strategy would require happen
*before* that developer writes a single line of code — and explain what
real problem each one is preventing.
