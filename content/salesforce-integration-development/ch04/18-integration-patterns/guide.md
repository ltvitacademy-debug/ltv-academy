# Lesson 18 — Integration Patterns

**Chapter 4 · Patterns and Practice · Lesson 18 of 23**

## What you'll learn

- Why Salesforce publishes a named vocabulary of integration patterns at all
- The five core patterns and which mechanism from Chapters 1-3 implements each
- How to recognize a pattern name as a description, not an implementation
- Why patterns are a shared vocabulary for architects, not a new technology
- How this chapter connects everything from Chapters 1-3 into one framework

## Why name patterns at all

Chapters 1 through 3 taught you specific mechanisms: HTTP callouts, Apex REST, Platform Events, Change Data Capture, External Services. What none of those chapters gave you yet is a vocabulary for describing *which kind* of integration requirement you're looking at before you pick a mechanism. Salesforce's own Integration Patterns and Practices guide names exactly that vocabulary — a small set of recurring shapes that integration requirements tend to take, regardless of which specific Salesforce feature ends up implementing them.

## The five core patterns

- **Remote Call-In** — an external system calls into Salesforce synchronously to read or write data. This is the pattern name for everything in Chapter 2: the standard REST/SOAP API, custom Apex REST, custom Apex SOAP.
- **Remote Process Invocation – Request-Reply** — Salesforce calls out to a remote process and holds state, waiting for the answer, before continuing. Implemented with a synchronous Apex HTTP callout (Chapter 1) or a Flow HTTP Callout, when the very next step depends on the response.
- **Remote Process Invocation – Fire and Forget** — Salesforce calls out to kick off remote work but doesn't wait for it to finish; the remote system just acknowledges receipt. Implemented with `@future(callout=true)` or Queueable Apex (Chapter 3), or with Outbound Messaging's SOAP notification (Lesson 16).
- **Batch Data Synchronization** — data syncs between Salesforce and an external system in bulk, scheduled batches rather than record-by-record in real time. Implemented with Batch Apex plus Scheduled Apex (Lesson 13).
- **UI Update Based on Data Changes** — keeping a user's screen current as underlying data changes asynchronously, rather than requiring a manual refresh. Implemented with Platform Events or Change Data Capture (Lessons 14-15) driving a Lightning Web Component or similar subscriber.

## A pattern name describes a shape, not an implementation

This is the single most important idea in this lesson: a pattern name like "Request-Reply" describes the *shape* of a requirement — synchronous, waits for an answer — not a specific piece of code or a specific Salesforce feature. The same pattern can be implemented with a hand-written Apex callout, a Flow HTTP Callout, or (in principle) a custom Apex REST service calling back out itself. Recognizing which pattern a requirement matches is the first design step; choosing which specific mechanism implements it (Lesson 20) is the second, separate step.

## A shared vocabulary, not new technology

Nothing in this lesson introduces a new Salesforce feature — every mechanism behind these five patterns was already covered in Chapters 1-3. What's new is the ability to say "this is a Request-Reply requirement" or "this is Batch Data Synchronization" to another architect or developer and be instantly understood, the same way naming a design pattern in general software engineering (like Singleton or Observer) communicates a shape faster than describing the code from scratch every time. This vocabulary becomes especially valuable in architecture review conversations, where a Salesforce Technical Architect needs to justify a design choice quickly and precisely.

## How this connects everything so far

Lesson 19 goes deeper on the three process-oriented patterns (Request-Reply, Fire and Forget, Batch Sync) with concrete scenario examples. Lesson 20 gives you Salesforce's own decision framework for choosing between them. Lessons 21-22 are hands-on projects applying these patterns for real. Lesson 23 closes the chapter (and the course) with how to monitor a pattern once it's live in production.

## Key terms

| Term | Meaning |
|---|---|
| Remote Call-In | An external system calling into Salesforce synchronously (Chapter 2's territory) |
| Remote Process Invocation – Request-Reply | Salesforce calls out and waits for the answer before continuing |
| Remote Process Invocation – Fire and Forget | Salesforce calls out without waiting for the remote work to finish |
| Batch Data Synchronization | Bulk, scheduled data sync rather than real-time, record-by-record |
| UI Update Based on Data Changes | Keeping a screen current via asynchronous, event-driven updates |

## Lab

Scenario-analysis exercise: for each of the following four requirements, name the single best-fitting pattern from this lesson, and name the specific Salesforce mechanism from Chapters 1-3 you'd use to implement it: (1) a partner's ERP needs to create and update Salesforce Opportunities whenever their own deals change; (2) a checkout flow needs a tax calculation before it can let the user submit an order; (3) a warehouse system needs to know an order was placed, but Salesforce doesn't need to wait for a response; (4) a support dashboard needs to update live the moment a Case's status changes, without the agent refreshing the page.

## Check yourself

Name all five patterns from memory, and one Salesforce mechanism that could implement each. Then explain, without looking back, why a pattern name describes a shape rather than a specific implementation.
