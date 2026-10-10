# Lesson 4 — Case Study: Salesforce and External Applications

**Chapter 1 · Integration Case Studies · Lesson 4 of 14**

## What you'll learn

- How designing for an external, untrusted caller differs from Lessons 1-3's internal, trusted integrations
- Why authentication and authorization are two separate questions an inbound design must answer
- What rate limiting and API versioning protect against, and why both matter for a public-facing integration
- How to reason about an integration where Salesforce is the one being called, not the one calling out

## The scenario: Vantage Utilities

Vantage Utilities runs customer service in Salesforce Service Cloud. Case records, account balances, and outage status all live there. The company is building a customer-facing self-service portal — a separate web application, built and hosted outside Salesforce — where customers can log in, view their open cases, and check outage status without calling support. That portal needs to read (and in some cases create) Salesforce records on behalf of whichever customer is logged into it.

This case study flips the direction of every integration so far. Lessons 1-3 were all about Salesforce reaching out to another system, or another system pushing changes into Salesforce, in both cases under Vantage's own control end to end. Here, an external application that Vantage's architects don't fully control the lifecycle of is calling in to Salesforce, acting on behalf of a specific end customer who is not a Salesforce user at all. That reversal changes which questions matter most.

## Two separate questions: authentication and authorization

**Authentication** answers "who, or what, is making this call?" The portal needs to prove its own identity to Salesforce using an OAuth flow appropriate for a server-side web application, so Salesforce knows it's really talking to Vantage's portal and not an impostor.

**Authorization** answers a completely different question: "what is this specific caller allowed to do, for this specific customer?" Authenticating the portal itself is not enough — the design also has to make sure that when customer A is logged into the portal, the API calls made on their behalf can only read or touch customer A's own case and account data, never customer B's. Conflating these two questions is one of the most common integration mistakes: a system can be perfectly authenticated and still catastrophically over-permissioned if authorization isn't scoped per end user on top of it.

## Rate limiting: protecting Salesforce from its own integration

An external-facing API, even one only called by Vantage's own portal, needs rate limiting: a cap on how many requests a given caller (or a given end customer) can make in a time window. Without it, a bug in the portal's own code — a retry loop that doesn't back off, a page that re-fetches on every keystroke — can hammer the Salesforce org with far more traffic than any real customer would generate, potentially exhausting API capacity that other, unrelated integrations also depend on. Rate limiting isn't a defense against malicious attackers only; in practice it most often saves an org from its own well-intentioned but buggy client code.

## Versioning: protecting the integration from its own future

Vantage's portal and Salesforce's API surface will not change on the same schedule. At some point, the Salesforce-side team will need to change how a case's data is shaped or exposed — and if the portal is calling an unversioned endpoint, that change breaks the portal the moment it ships, with no warning. The standard fix is **API versioning**: the external-facing integration point is published with an explicit version identifier, old versions keep working unchanged for a defined support window, and the portal team upgrades to a new version on their own schedule rather than being forced to react to a surprise. Versioning is what lets two teams that don't deploy in lockstep keep working against the same integration without breaking each other.

## What a review board will focus on here

Because this case study's caller is external and acts on behalf of individual customers, Lesson 8's security review will spend disproportionate time on this one: exactly how customer-level authorization is enforced (not just assumed), what happens if a customer's session token is stolen, and what's logged so a suspicious access pattern can actually be detected after the fact.

## Key terms

| Term | Meaning |
|---|---|
| Authentication | Verifying the identity of the system or caller making a request |
| Authorization | Determining what a specific authenticated caller is allowed to do, scoped to a specific end user |
| Rate limiting | Capping how many requests a caller can make in a time window to protect shared capacity |
| API versioning | Publishing an integration point with an explicit version so existing callers keep working while new versions roll out |
| Inbound integration | An integration where an external system initiates the call into Salesforce, rather than Salesforce calling out |

## Lab

Vantage's product team wants to add a feature where a customer can upload a photo of storm damage directly from the portal into their case. Write a short design note covering: (1) what authentication the portal needs to prove its own identity to Salesforce, (2) what authorization check has to happen so a customer can only attach the photo to their own case, never someone else's, and (3) one reason rate limiting still matters even though photo uploads happen far less often than case lookups.

## Check yourself

Can you explain the difference between authentication and authorization in your own words, and describe a scenario where a system is authenticated correctly but still has an authorization bug? Can you explain why API versioning matters specifically when the calling application and the Salesforce org are owned or deployed by different teams on different schedules?
