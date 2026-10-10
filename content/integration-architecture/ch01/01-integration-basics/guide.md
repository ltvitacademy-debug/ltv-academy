# Lesson 1 — Integration Basics

**Chapter 1 · Integration Foundations · Lesson 1 of 28**

## What you'll learn

- What "integration" means at the architecture level, beyond "two systems talking to each other"
- The four questions every integration decision has to answer: who initiates, how often, how much data, and how fast
- Why a Salesforce architect treats integration as a first-class design discipline, not an afterthought bolted on after go-live
- The vocabulary this course builds on: source, target, payload, endpoint, and interface

## Integration is a design discipline, not a feature

Every Salesforce org eventually needs to exchange data with something outside itself — an ERP system holding the official general ledger, a marketing platform sending email, a legacy mainframe nobody wants to touch, or another Salesforce org from an acquired company. **Integration** is the deliberate, designed connection between two or more systems so that data or a triggered action moves correctly, reliably, and securely between them. The emphasis is on *deliberate and designed*. A handful of scheduled Apex jobs calling random REST endpoints, added one at a time as needs came up with no shared plan, is not an integration architecture — it's integration debt, and it behaves like debt: every new connection added without a plan makes the next one harder to build and riskier to change.

A Solutions or Technical Architect is brought in specifically because integration decisions made early are expensive to unmake later. Choosing point-to-point connections when the org will eventually need to talk to six systems, or choosing synchronous calls for data that doesn't need to be synchronous, locks in complexity and fragility that shows up as outages and missed SLAs months or years down the road. This course is about making those decisions well, with the vocabulary and patterns an architect is expected to know.

## The four questions

Before choosing any integration pattern, an architect needs answers to four questions, and the answers constrain which pattern actually fits:

- **Who initiates?** Does Salesforce reach out to the other system (an outbound Apex callout), or does the other system reach into Salesforce (an inbound REST API call, a Platform Event subscription)? Some integrations are initiated from both sides depending on direction of data flow.
- **How often?** Is this a one-time migration, a real-time trigger on every record change, a nightly batch, or an on-demand user action? Frequency drives almost every other decision in this course, from pattern choice to error-handling strategy.
- **How much data?** A single record update is a very different integration problem than a nightly sync of two million rows. Volume determines whether synchronous APIs, Bulk API, or an ETL/iPaaS tool is the right tool.
- **How fast does it need to be?** A sales rep waiting on a credit-check result needs an answer in seconds. A finance team reconciling yesterday's orders can tolerate a batch job that runs overnight. Confusing "fast" with "important" is a common design mistake — urgency and business importance are not the same axis.

## The vocabulary this course uses

A few terms recur throughout this course and are worth fixing precisely now. The **source** system is where data originates for a given flow; the **target** is where it's going. (The same system can be a source in one flow and a target in another.) The **payload** is the actual data being moved — a JSON body, an XML document, a flat file. An **endpoint** is the specific address a system exposes to send or receive that payload — a URL, a queue name, a file drop location. An **interface** is the formal contract describing what a system will accept and return at that endpoint: field names, data types, required fields, and error responses. Architects spend a disproportionate amount of their integration time on interface contracts, because a vague or undocumented interface is where integration failures are born — not in the network layer, which is usually the most reliable part of the whole chain.

## Key terms

| Term | Meaning |
|---|---|
| Integration | The deliberate, designed connection between systems so data or an action moves correctly between them |
| Source | The system a given data flow originates from |
| Target | The system a given data flow is delivered to |
| Payload | The actual data being moved between systems |
| Endpoint | The specific address a system exposes to send or receive a payload |
| Interface | The formal contract describing what a system accepts and returns at an endpoint |

## Lab

A mid-size manufacturer wants three new connections: (1) Salesforce pushes a new Opportunity to their ERP the moment it closes, so finance can start invoicing; (2) every night, the ERP's shipment status updates flow back into Salesforce so reps can tell customers where their order is; (3) a one-time load of 500,000 historical cases needs to move from a retiring legacy system into Salesforce before cutover. For each of the three, answer the four questions from this lesson (who initiates, how often, how much data, how fast) and write one sentence on why those answers already rule out at least one integration approach for that flow.

## Check yourself

Can you explain, in your own words, why "fast" and "important" are different design axes for an integration? Can you define source, target, payload, endpoint, and interface without looking back at the table?
