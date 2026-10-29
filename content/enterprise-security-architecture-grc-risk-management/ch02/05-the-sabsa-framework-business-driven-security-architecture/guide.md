# Lesson 5 — The SABSA Framework: Business-Driven Security Architecture

**Chapter 2 · Security Architecture Frameworks · Lesson 5 of 4**

## What you'll learn

- What SABSA actually is, who maintains it, and why it was built by
  practitioners instead of a standards body
- SABSA's six-layer model, from business requirements all the way
  down to day-to-day operations
- The "six W" questions SABSA asks at every layer, and why asking
  the same questions at every layer is the whole point
- Why SABSA's defining rule is traceability: every control has to
  justify itself in business terms, not just technical ones

## What SABSA is

**SABSA** stands for **Sherwood Applied Business Security
Architecture**. It was created in the 1990s by John Sherwood, Andrew
Clark, and David Lynas — three working security architects, not a
standards committee — and it's maintained today by the SABSA
Institute, which publishes the official SABSA Matrix and certifies
practitioners (SCF, SABSA Chartered Foundation, through to SCP and
beyond). That origin matters: SABSA reads like a framework built by
people who got tired of watching security teams design controls that
had no clear connection to anything the business actually cared about.

SABSA's whole premise is captured in one sentence you'll hear
repeated throughout the certification track: **security architecture
has to trace back to a real business requirement, or it isn't
architecture — it's just a control someone liked.** Encrypting a
database isn't automatically "good security." Encrypting a database
*because the business has a confidentiality requirement on customer
financial data, and this control satisfies it* — that's SABSA
thinking.

## The six-layer model

SABSA organizes everything into six layers, each one answering the
same questions as the layer above it, just translated into more
concrete language the further down you go:

1. **Contextual** — the business itself: its goals, risk appetite,
   and the attributes it needs from security (availability, legal
   compliance, cost-effectiveness, and so on)
2. **Conceptual** — the architect's high-level security strategy and
   principles for meeting those business attributes
3. **Logical** — security services described in architecture terms
   (an "access control service," an "assurance service") without
   naming specific products yet
4. **Physical** — the logical services mapped onto real technology
   choices (a specific IAM platform, a specific data loss prevention
   tool)
5. **Component** — the actual products, standards, and configurations
   that implement the physical architecture
6. **Operational** — the day-to-day running of it all: who operates
   it, how it's monitored, how incidents get handled

The point isn't that six layers are magic. It's that **every layer
below Contextual has to be traceable back up to it.** If you can't
explain which business attribute a component-layer configuration
setting ultimately serves, you've broken the chain, and that broken
link is exactly what a SABSA-trained reviewer will flag first.

## The six W's: asking the same questions at every layer

SABSA pairs its six layers with six questions — **What, Why, How,
Who, Where, When** — asked at every single layer. "What" at the
Contextual layer is a business asset; "What" at the Component layer
is a specific piece of hardware or software protecting that asset.
"Why" at the Contextual layer is a business driver; "Why" at the
Operational layer is the specific operating procedure that exists
because of that driver. This produces the full **SABSA Matrix** — six
layers by six questions, 36 cells — and it's this matrix, not any
single diagram, that's SABSA's actual deliverable in a mature
practice.

You won't fill in all 36 cells for every project. What you're
borrowing from the matrix in practice is the discipline: pick any
control you're proposing, and be ready to answer what business asset
it protects, why it's needed, how it works, who's accountable for it,
where it lives, and when it applies.

## The Business Attributes Profile

The artifact that makes SABSA distinctly *business-driven* rather
than just "yet another layered model" is the **Business Attributes
Profile**. Early in a SABSA engagement, the architect works with
business stakeholders — not IT — to produce a list of attributes the
business actually needs: things like "regulatory compliance,"
"customer confidence," "operational resilience," or "time to market."
Each attribute gets a plain-language definition and, ideally, a
measurable target.

That profile becomes the yardstick for everything downstream. A
proposed control either clearly serves one or more of those named
attributes, or it doesn't belong in the architecture — at least not
without someone revisiting the profile first. This is also what
makes SABSA genuinely useful in audits and board conversations: you
can point to a specific business attribute and show the control
trail that satisfies it, in language a non-technical stakeholder
already agreed to.

## Key terms

| Term | Meaning |
|---|---|
| SABSA | Sherwood Applied Business Security Architecture — a practitioner-built, business-driven security architecture framework |
| SABSA Matrix | The six layers (Contextual → Operational) crossed with the six W questions (What/Why/How/Who/Where/When) |
| Business Attributes Profile | The stakeholder-defined list of business needs (e.g. compliance, resilience) every control must trace back to |
| Traceability | SABSA's core discipline: every lower-layer control must justify itself against a higher-layer, ultimately business, requirement |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
does SABSA insist on six layers instead of just "business
requirements" and "technical controls," and what breaks when a
control can't be traced back to a named business attribute?
