# Lesson 16 — Integration Architecture

**Chapter 3 · Architecture Domains · Lesson 16 of 19**

## What you'll learn

- The core distinction between synchronous and asynchronous integration, and why it matters more than which specific technology gets used
- Four real Salesforce integration patterns and when each one actually fits
- Why choosing a pattern should come before choosing a technology, not after
- How this chapter's data architecture (Lesson 15) and this lesson connect directly

## Pattern first, technology second

A common mistake in integration design is starting with a technology question — "should we use REST or the Bulk API?" — before answering a more fundamental question: what shape of interaction does this integration actually need? Salesforce's own architecture guidance frames this deliberately in that order: understand the integration pattern the business need actually calls for, then pick the Salesforce technology (REST API, SOAP API, Bulk API, Platform Events, Change Data Capture, and others) that implements that pattern well. Picking a technology first and then forcing a pattern to fit it tends to produce a design that's technically functional but doesn't actually match how the business process really needs to behave.

## Synchronous vs. asynchronous: the distinction that matters most

The most important split among integration patterns is timing. A **synchronous** integration is blocking: the caller sends a request and waits for a response before moving on, like Salesforce calling out to a banking system to fetch a customer's credit score before continuing a flow that depends on that score. A synchronous call is appropriate exactly when the calling process genuinely cannot proceed without the answer. An **asynchronous** integration doesn't block: the caller fires off a request and continues immediately, without waiting for the remote process to finish, trusting that it will complete (or get handled) on its own timeline. Asynchronous patterns fit situations where the calling process doesn't actually need an immediate answer to keep going.

## Four patterns worth knowing by name

- **Request and Reply** (synchronous Remote Process Invocation). Salesforce calls a remote process and waits for its result before continuing — the credit-score example above is the canonical case. Use it when the answer is genuinely required before the next step can happen.
- **Fire and Forget** (asynchronous Remote Process Invocation). Salesforce invokes a remote process but doesn't wait for it to finish; the remote system acknowledges receipt and handles the rest independently. A classic example: when an Opportunity is marked Closed Won, Salesforce sends the order details to an ERP system to generate an invoice, without needing to wait around for that invoice to actually be created before the sales rep can move on.
- **Batch Data Synchronization** (asynchronous). Data is created or refreshed between systems on a scheduled, batched basis rather than record by record in real time — appropriate for larger data volumes where some delay in freshness is acceptable in exchange for efficiency and simplicity.
- **Data Virtualization** (synchronous). Rather than copying and storing external data inside Salesforce at all, Salesforce reads it live from the external system at the moment it's needed, commonly through Salesforce Connect and external objects — removing the need to keep two copies of the same data reconciled, at the cost of depending on the external system being available and responsive whenever that data is viewed.

A fifth pattern, **Remote Call-In**, flips the direction: the external system initiates contact with Salesforce to create, read, update, or delete records, rather than Salesforce initiating the call outward. Its timing (synchronous or asynchronous) depends on how it's implemented rather than being fixed by the pattern itself.

## Where this connects back to data architecture

Lesson 15's master data question — which system owns the truth for a given piece of data — turns directly into an integration pattern choice once answered. If the ERP system owns product pricing, the question becomes: does Salesforce need that price synchronously, in real time, every time it's viewed (pointing toward data virtualization), or is a scheduled nightly batch sync acceptable because pricing doesn't change minute to minute (pointing toward batch synchronization)? The data architecture decision and the integration pattern decision aren't separate problems — the first one directly shapes which of the second one actually makes sense.

## Key terms

| Term | Meaning |
|---|---|
| Synchronous integration | A blocking call where the caller waits for a response before continuing |
| Asynchronous integration | A non-blocking call where the caller continues immediately without waiting for completion |
| Request and Reply | A synchronous pattern where Salesforce calls out and waits for the result |
| Fire and Forget | An asynchronous pattern where Salesforce invokes a remote process without waiting for it to finish |
| Data virtualization | Reading external data live at the moment it's needed, instead of storing a copy in Salesforce |

## Lab

A warehouse system needs to know immediately whenever a Salesforce order is submitted, so it can begin picking inventory, but Salesforce doesn't need to wait for the warehouse to confirm anything before the sales rep moves on to their next task. Identify which of the four named patterns fits this scenario best, and explain in one or two sentences why a synchronous Request and Reply pattern would be the wrong choice here.

## Check yourself

Can you explain the difference between synchronous and asynchronous integration, with your own example of each? Can you name all four patterns covered in this lesson and describe a scenario that fits each one? Can you explain why Salesforce's own guidance recommends choosing the integration pattern before choosing the specific technology that implements it?
