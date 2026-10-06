# Lesson 19 — Exchanging Financial Data with External Applications

**Chapter 4 · Integration Patterns · Lesson 19 of 19**

## What you'll learn

- How to match an integration pattern and direction to four common financial data exchange scenarios
- What a Financials consultant's actual role is in an integration project (requirements and validation, not code)
- A one-sentence recap of what each of the four chapters covered
- Where this course's integration foundation connects to Oracle Fusion Security next

## Four scenarios, matched to what this course covered

| Scenario | Typical direction | Typical pattern |
|---|---|---|
| Bank statement feed | Inbound | Batch, scheduled |
| Tax engine lookup | Outbound | Real-time REST, per transaction |
| Expense system feed | Inbound | Real-time or event-driven |
| Consolidation/group reporting extract | Outbound | Batch or scheduled |

These aren't rigid rules — they're the typical shape each scenario
takes, based on its volume, latency, and frequency needs, exactly as
Lesson 15 described.

## What a Financials consultant actually does on an integration project

Rarely does a consultant write the integration code directly. The real
contribution is:

1. **Gathering requirements** — what data is involved, which direction
   it moves, how fast it needs to move, and how often.
2. **Validating sample payloads** — testing real calls in a REST
   client (Lesson 10) before anyone builds anything against
   assumptions.
3. **Defining field mappings** — translating Fusion's attribute names
   to the other system's field names, and back.
4. **Documenting clearly** — so an OIC developer or integration team
   can build the actual flow without having to guess at requirements.

## This course, in one sentence per chapter

- **Chapter 1** — Resources, HTTP verbs, JSON, and reading
  documentation are the shared language every REST API speaks.
- **Chapter 2** — Oracle Fusion Financials speaks that language
  through real GET, POST, and PATCH calls against resources like
  invoices, receivablesInvoices, and journals.
- **Chapter 3** — Every one of those calls has to prove who it is,
  safely, through properly chosen authentication and a dedicated,
  least-privilege integration user.
- **Chapter 4** — Pattern (batch/real-time/event-driven), direction
  (inbound/outbound), Oracle Integration Cloud, and business events
  decide how any of this actually connects Fusion to the outside
  world.

## What's next

This catalog's **Oracle Fusion Security** course picks up directly
from here, covering the role-based access and data security that
govern exactly who — and what, including the integration users this
course introduced — is allowed to use everything built in this course.
## Key terms

| Term | Meaning |
|---|---|
| Field mapping | The documented translation between one system's data fields and another's |
| Requirements gathering | Defining what data, direction, speed, and frequency an integration needs, before it's built |
| Integration vocabulary | The shared set of concepts (resources, verbs, auth, patterns) needed to scope any Fusion integration |

## Lab

Without access to a live Fusion REST client, write out — on paper or in a text file — a complete requirements summary for one of the four scenarios in this lesson (bank feed, tax engine, expense system, or consolidation extract): the resource(s) involved, the direction, the pattern, and three specific field mappings you'd expect to define.

## Check yourself

A client asks for a new integration pulling AR aging data into a collections tool every morning. Using everything from this course, describe the direction, the likely pattern, and the three or four requirements questions you'd ask before anything gets built.
