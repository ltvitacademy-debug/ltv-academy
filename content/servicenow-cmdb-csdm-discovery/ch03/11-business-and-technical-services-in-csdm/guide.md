# Lesson 11 — Business & Technical Services in CSDM

**Chapter 3 · The Common Service Data Model (CSDM) · Lesson 11 of 26**

## What you'll learn

- The real distinction between a Business Service and a Technical Service in CSDM
- Why the business doesn't think in terms of servers and databases, but does think in terms of named services
- How Business Services depend on Technical Services, which are in turn built from CIs
- Why this layering is what lets you translate "this CI is down" into "this is what breaks for the business"
- How to tell, when looking at a real service, whether it's acting as a Business Service or a Technical Service

## Two kinds of "service," not one

It's tempting to model "service" as a single, generic concept — one record type that covers everything from "Email" down to "the application server that runs the mail transport agent." CSDM deliberately separates those into distinct kinds of service record, because a business executive and a systems administrator genuinely mean different things when they both use the word "service."

## Business Service: what the business recognizes

A Business Service represents a service from the business or customer's point of view — something a non-technical stakeholder would recognize by name and care about directly: "Email," "Customer Portal," "Payroll," "Order Processing." A Business Service is defined by the outcome it provides to the organization, not by the technology underneath it. Nobody in finance asks "is the payroll database healthy" — they ask "can we run payroll," and that question is answered at the Business Service level.

## Technical Service: what actually delivers it

A Technical Service represents the underlying technical capability that actually makes a Business Service work — built from real CIs: specific application instances, databases, servers, and the infrastructure connecting them. Where "Email" is the Business Service, the Technical Service underneath it might be the messaging application stack: the mail transport servers, the mailbox database, the directory service it authenticates against. The Technical Service is where the CIs and relationships you built in Chapters 1 and 2 actually live.

## The dependency chain

CSDM's core principle here is a chain, not a flat list: a Business Service depends on one or more Technical Services, and each Technical Service is built from, and depends on, individual CIs. That chain is what lets someone ask a question like "what breaks if this database server goes down" and get an answer at the right altitude for whoever's asking. A database administrator wants the CI-level answer. A VP wants the Business Service-level answer: "Email is degraded for the East region." The chain is what connects those two answers to the same underlying fact.

## Why this layering is the whole point

Without this split, impact analysis stays stuck at the technical level — accurate, but meaningless to most of the people who actually need to make a decision based on it. With the Business Service / Technical Service split properly maintained, the same relationship data Chapter 2 taught you to build and trace now also answers a business question automatically, because the chain from CI, through Technical Service, to Business Service was modeled correctly from the start.

## Key terms

| Term | Meaning |
|---|---|
| Business Service | A service as the business/customer recognizes it — defined by business outcome, not by technology |
| Technical Service | The underlying technical capability that delivers a Business Service, built from real CIs |
| Depends on / consumes | The relationship direction: a Business Service depends on the Technical Services beneath it |
| Impact altitude | The idea that the same outage can be described correctly at different levels — CI, Technical Service, or Business Service |

## Check yourself

"Payroll" is a Business Service. Name one plausible Technical Service it might depend on, and one specific CI that Technical Service might be built from — and explain, in one sentence, why a VP would only ever hear about the first of those three.
