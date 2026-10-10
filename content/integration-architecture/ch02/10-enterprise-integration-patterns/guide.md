# Lesson 10 — Enterprise Integration Patterns

**Chapter 2 · Integration Design · Lesson 10 of 28**

## What you'll learn

- What "Enterprise Integration Patterns" refers to as a body of named, reusable design patterns
- Four foundational patterns every architect should recognize by name: Message Router, Message Translator, Content-Based Router, and Aggregator
- Why naming these patterns matters — it gives architects a shared vocabulary instead of reinventing the same idea with different words each time
- How these patterns show up inside Salesforce-centric integrations, even when nobody calls them by these names

## A shared vocabulary for recurring integration problems

**Enterprise Integration Patterns** is both the name of a well-known reference (the 2003 book by Gregor Hohpe and Bobby Woolf) and, more importantly for this course, the general body of named, reusable patterns it catalogued for solving recurring messaging and integration problems. The value of having named patterns isn't academic — it means two architects discussing a design can say "this needs a Content-Based Router" and both immediately know roughly what's being proposed, instead of one person describing a custom one-off mechanism that turns out to be a pattern that's already well understood, already has known trade-offs, and is already supported out of the box by most integration tools.

## Four patterns worth knowing by name

- **Message Router.** A component that receives a message and decides where to send it next, based on some rule, without altering the message's content. The simplest version routes purely on the message's origin or type; more advanced versions route based on content (see Content-Based Router below).
- **Message Translator.** A component that converts a message from one format or structure to another so that two systems with different data shapes can still exchange information — translating a legacy system's flat XML structure into the nested JSON a modern REST API expects, for example. This is the core job a middleware layer's "transformation" capability (Lesson 4, Lesson 5) actually performs.
- **Content-Based Router.** A specialized Message Router that inspects the actual content of a message — not just its type or origin — and routes it differently depending on what's inside. An order over a certain dollar amount might route to a manual-approval queue, while a smaller order routes straight to automatic fulfillment; the router made that decision by looking inside the message itself.
- **Aggregator.** A component that collects multiple related messages and combines them into a single, consolidated message before passing it on. A classic example: individual line-item updates from a warehouse system arrive separately throughout the day, and an Aggregator waits for a defined condition (all items for an order received, or a time window elapsing) before combining them into one complete order-status update sent downstream, rather than passing each line item along as a separate, incomplete event.

## Where these patterns show up in Salesforce integrations, unnamed

These four patterns aren't abstract theory confined to a textbook — they appear constantly inside real Salesforce integration work, usually without anyone using the formal name. An Apex trigger or Flow that decides which external system to notify based on a record's Record Type or a custom field is a Message Router. A piece of integration logic (in Apex, or in an iPaaS flow) that reshapes a Salesforce Opportunity's JSON into the structure an ERP's API expects is a Message Translator. Routing a high-value Case to a different support queue based on its Amount field, while smaller Cases flow through an automated queue, is a Content-Based Router. A batch job that waits for every expected feed file to arrive before running a combined nightly reconciliation report is functioning as an Aggregator.

## Why naming matters for an architect specifically

Recognizing these patterns by name matters for two practical reasons. First, it means an architect reviewing someone else's integration design can recognize "this is actually a Content-Based Router with the routing logic buried inside an if/else chain in Apex" and ask whether a declarative tool (a Flow decision element, or an iPaaS tool's built-in router component) would express the same intent more maintainably. Second, it's directly testable exam vocabulary on Salesforce's architect-track credentials — questions describe a scenario and expect the candidate to recognize which named pattern it's actually asking about, which is exactly the skill Chapter 4's exam-style scenario lessons will drill.

## Key terms

| Term | Meaning |
|---|---|
| Message Router | A component that decides where to send a message next, without altering its content |
| Message Translator | A component that converts a message from one format or structure to another |
| Content-Based Router | A Message Router that routes based on the actual content inside the message |
| Aggregator | A component that collects multiple related messages and combines them into one consolidated message |

## Lab

A logistics company's integration receives individual package-scan events throughout the day from a shipping carrier's API, and separately needs to route any scan event flagged as "damaged" to a claims-processing queue while all other scans flow to a standard delivery-tracking update. Identify which named Enterprise Integration Pattern from this lesson handles each of the two needs, and explain, for each, what it would mean in plain language if that pattern were missing from the design.

## Check yourself

Can you define Message Router, Message Translator, Content-Based Router, and Aggregator in one sentence each, without looking back at the lesson? Can you give one example of each pattern showing up in ordinary Salesforce Apex or Flow logic, even when nobody calls it by its formal name?
