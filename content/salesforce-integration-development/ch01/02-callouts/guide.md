# Lesson 2 — Callouts

**Chapter 1 · Outbound Integration · Lesson 2 of 23**

## What you'll learn

- What a "callout" means in Apex, precisely
- The two callout families: HTTP and SOAP
- Why an org must allow-list an endpoint before Apex can reach it
- The one transaction-ordering rule that governs every callout you'll write
- How callouts relate to the tools you'll learn in the rest of this chapter

## What a callout actually is

A callout is Apex code reaching outside the Salesforce org to talk to another system over the network, and waiting (within limits) for that system to respond. It's the fundamental building block underneath every outbound integration mechanism in this chapter — Named Credentials, External Services, and even Flow's HTTP Callout action are all built on the same underlying callout capability that Apex exposes directly.

Apex supports two families of callout:

- **HTTP callouts** — built with the `Http`, `HttpRequest`, and `HttpResponse` classes, used for REST-style JSON APIs (by far the most common case today, and the focus of Lesson 4).
- **SOAP callouts** — built by generating an Apex class from a WSDL (Web Services Description Language) document, used to talk to older enterprise systems that only expose SOAP endpoints.

Both share the same underlying rules: they run over HTTP(S), they count against the same governor limits (Lesson 7), and they both require the org to trust the destination before Apex is allowed to reach it.

## Why endpoints must be trusted first

Salesforce won't let Apex code call out to an arbitrary URL with no org-level awareness of it. Historically this meant adding the destination to Remote Site Settings in Setup. Named Credentials (Lesson 3) largely replace that pattern for new work: because a Named Credential itself defines a trusted endpoint and its authentication, Apex code built against a Named Credential doesn't need a separate Remote Site Setting for that same endpoint. Either way, the principle is the same — an org administrator has to explicitly approve where Apex is allowed to send data before any callout code can reach it, which is a deliberate security boundary, not an oversight.

## The transaction-ordering rule

The single most important rule to internalize in this chapter: **a transaction can't make a callout while it has pending, uncommitted DML, asynchronous work, or outbound email in that same transaction.** Concretely, this means code structured like "insert a record, then call out about it" in one synchronous Apex transaction will throw a runtime error. The callout has to happen *before* any DML in that transaction, or the DML has to be deferred into a separate async context (`@future(callout=true)` or Queueable Apex) so the callout and the DML each get their own transaction.

This rule exists because a callout is a real network round-trip to a system Salesforce doesn't control — if that external system is slow or down, the platform doesn't want an open database transaction sitting uncommitted and locking rows while it waits. You'll apply this rule directly in Lesson 21's Order Sync project.

## How callouts relate to the rest of this chapter

Lesson 3 covers Named Credentials and External Credentials — the modern way to store an endpoint and its authentication so your callout code never hard-codes a secret. Lesson 4 covers the actual `Http`/`HttpRequest`/`HttpResponse` syntax for building a callout. Lesson 5 covers how to test callout code, since real network calls aren't allowed in Apex tests. Lesson 6 covers handling the ways a callout can fail. Lesson 7 returns to the governor limits around callouts in full detail. Each lesson builds directly on this one.

## Key terms

| Term | Meaning |
|---|---|
| Callout | Apex code making an outbound HTTP or SOAP request to an external system |
| HTTP callout | A callout built with the Http/HttpRequest/HttpResponse classes, typically for REST/JSON APIs |
| SOAP callout | A callout built from an Apex class generated from a WSDL document |
| Remote Site Setting | The legacy, pre-Named-Credential way to allow-list a callout endpoint |
| Transaction-ordering rule | Callouts can't run in a transaction with pending DML, async work, or email |

## Lab

In a free Developer Edition or scratch org, open Setup and search for "Remote Site Settings." Without creating anything yet, read the "New Remote Site" form and note which fields it asks for (name, URL, and whether it requires a secure connection). Then search for "Named Credentials" in the same org and compare: which of those same concerns (endpoint URL, security/auth) does a Named Credential also capture? You're building intuition for why Lesson 3 presents Named Credentials as the modern replacement for a plain Remote Site Setting, not an unrelated feature.

## Check yourself

State the transaction-ordering rule for callouts in your own words, and describe one way to restructure code that violates it. Then explain, without re-reading, the difference between an HTTP callout and a SOAP callout.
