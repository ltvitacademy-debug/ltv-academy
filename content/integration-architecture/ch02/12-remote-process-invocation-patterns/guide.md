# Lesson 12 — Remote Process Invocation Patterns

**Chapter 2 · Integration Design · Lesson 12 of 28**

## What you'll learn

- What "remote process invocation" means as a category of integration pattern, distinct from data-synchronization patterns
- Remote Procedure Call (RPC) style vs. Request-Reply messaging as two ways to invoke work on another system
- How Salesforce implements remote process invocation concretely: synchronous Apex callouts, Queueable Apex, and External Services actions
- Why remote invocation patterns need a clear answer to "what happens if the remote process fails partway through," specifically because they trigger action, not just move data

## Invoking work, not just moving data

Several of this course's patterns so far — Bulk sync, Change Data Capture — are fundamentally about moving *data* from one place to another. **Remote process invocation** is a different category: it's about triggering a *unit of work* on another system and, in most cases, caring about the outcome of that work, not just about a data value changing. Calling an external tax-calculation service to compute sales tax for an order, invoking an external fraud-check before approving a transaction, or triggering a third-party document-generation service to produce a signed contract are all remote process invocations — the point of the call is to make something happen on the other system, with the result mattering to what Salesforce does next.

## RPC-style vs. request-reply messaging

Two closely related ways of invoking remote work are worth distinguishing precisely, because they imply different coupling and different failure-handling needs:

- **RPC-style (Remote Procedure Call) invocation** makes calling a remote operation look and feel as much like calling a local function as possible — pass in parameters, get back a return value, more or less synchronously. This is the mental model behind a synchronous Apex HTTP callout to a REST API or SOAP service: Apex code calls out, waits, and gets a structured response back, much like calling a local Apex method. The appeal is simplicity for the calling developer; the cost is the same availability coupling covered in Lesson 6 — the caller is exposed to the remote system's latency and failure modes as if they were its own.
- **Request-reply messaging** decouples the call from the response using a message-based mechanism rather than a direct, blocking call: the request is published as a message, the remote system processes it on its own schedule, and the reply comes back as a separate message correlated to the original request (the same correlation-ID idea from Lesson 7). This trades RPC's simplicity for resilience: the calling system isn't blocked waiting, and a temporarily unavailable remote system doesn't immediately break the caller — the request simply waits until the remote system is ready to process it.

## How this shows up concretely on the Salesforce platform

A synchronous Apex HTTP callout to an external service, waiting for the response within the same transaction, is the textbook RPC-style pattern — subject to the same 100-callout, 120-second cumulative timeout limits covered in Lesson 6. **Queueable Apex** lets a process be invoked and continue running asynchronously relative to the transaction that enqueued it, useful when the remote process invocation doesn't need to block the user's save and can be processed moments later instead. **External Services** (Lesson 9) generates invocable actions from an external API's specification, letting Flow Builder invoke a remote process declaratively — under the hood, this is still fundamentally an RPC-style call, just with Salesforce generating the callout code instead of a developer writing it by hand.

## Failure handling is not optional for invocation patterns

Because remote process invocation triggers an action rather than just moving a data value, a failure partway through has sharper consequences than a failed data sync: if a tax-calculation call fails after an order has already been partially committed, or a document-generation request times out after the remote system actually started generating the document, the two systems can end up disagreeing about what actually happened — Salesforce thinks the call failed, the remote system thinks it succeeded (or vice versa). An architect designing a remote process invocation has to explicitly answer: is this operation safe to retry if the response is ambiguous? Lesson 15's idempotency concept is the direct tool for answering that question, and it's covered in depth specifically because this ambiguity is so common in invocation patterns.

## Key terms

| Term | Meaning |
|---|---|
| Remote process invocation | Triggering a unit of work on another system, where the outcome matters, not just a data value |
| RPC-style invocation | A remote call designed to feel like a local function call — parameters in, return value out, largely synchronous |
| Request-reply messaging | Decoupling a remote invocation's request and response using correlated messages instead of a direct blocking call |
| Queueable Apex | A Salesforce mechanism for running a process asynchronously relative to the transaction that enqueued it |

## Lab

An insurance company's Salesforce org needs to invoke an external underwriting-risk-scoring service every time a new policy application is submitted, and the result (an approve/review/decline recommendation) determines what the rep sees next on screen. Using this lesson's two invocation styles, recommend RPC-style or request-reply messaging for this specific case, and separately describe what should happen if the underwriting service times out after the application was already marked Submitted in Salesforce — is a safe retry possible, and what information would you need to know that for certain (a preview of Lesson 15's idempotency problem)?

## Check yourself

Can you explain the difference between RPC-style invocation and request-reply messaging in your own words, including which one trades simplicity for resilience? Can you name three concrete Salesforce mechanisms that implement remote process invocation and which invocation style each one most resembles?
