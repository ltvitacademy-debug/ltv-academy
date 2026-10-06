# Ticket: REST API Call Returns an Error

**Chapter 6 · Data and Integration Tickets · Lesson 3 of 4**

## What you'll learn

- The difference between a 400 and a 401 response, and why that distinction changes where you look
- A specific, common 400 cause: a field that's optional on the UI but mandatory via the API
- Why reading the response body matters more than the status code alone
- A resolution note written for a developer audience, not an end user

## Status codes point you in different directions

A REST API error isn't a mystery to guess at — the status code itself narrows the investigation. **401 Unauthorized** means the request's credentials are missing, invalid, or expired; the fix lives in authentication (token source, token expiry, which host issued it), not in the request body. **400 Bad Request** means the request reached the server and was rejected for a content reason — a missing required field, invalid filter syntax, or an unsupported operation on that resource. These point to completely different places, so the first thing to check is which one you're actually looking at.

## The ticket

> **Ticket #40825 — Harbor & Vance Logistics.** Integration developer reports: "Our middleware calls the Invoices REST resource to create AP invoices automatically, and it just started returning 400 errors overnight. Nothing changed on our end." Severity: High.

## Investigating

1. **Confirm the status code.** 400, not 401 — so this is a content problem with the request, not a credentials problem.
2. **Read the actual response body**, not just the status code. It specifies a missing required field: `BusinessUnit`.
3. **Compare against what's normally sent.** The integration has never explicitly sent `BusinessUnit` — it relied on a default that used to apply. Checking Oracle's own release notes/announcements for this environment: a recent quarterly update changed this specific resource's behavior so that `BusinessUnit` is now a required field on the request, rather than being defaulted server-side.
4. **Confirm what's actually required now**, using the resource's `describe` metadata (e.g., `.../invoices/describe?metadataMode=minimal`) rather than guessing from the full schema, which lists far more fields than are actually mandatory.

## Root cause

A quarterly Oracle Fusion update changed the Invoices REST resource so that `BusinessUnit` is now a required field on the request body, where it previously defaulted server-side; the integration's middleware was never updated to send it, so every call started failing with 400 the moment the update applied — "nothing changed on our end" is accurate, but something changed on Oracle's end.

## Resolving it

Update the integration's middleware to explicitly include `BusinessUnit` on every Invoices resource call, using the resource's `describe` metadata to confirm exactly what else may now be required, rather than only patching this one field and hoping nothing else changed.

## Documenting it

> **Ticket #40825 — Harbor & Vance Logistics.** Integration calls to the Invoices REST resource began returning 400 errors overnight with no change on the integration side.
> **Root cause:** A quarterly Oracle Fusion update made `BusinessUnit` a required field on Invoices resource requests, where it had previously defaulted server-side; the middleware was never updated to send it.
> **Fix:** Updated the middleware to explicitly send `BusinessUnit` on every request; checked the resource's describe metadata to confirm no other newly required fields were missed.
> **Verified:** Test calls now return 201 Created successfully; production integration resumed.
> **Note:** Recommend the integration team review Oracle's quarterly update readiness notes for REST resource changes before each update window, rather than discovering changes via a failed integration.

## Key terms

| Term | Meaning |
|---|---|
| 400 Bad Request | The request reached the server but was rejected for a content reason |
| 401 Unauthorized | The request's credentials are missing, invalid, or expired |
| describe metadata | A resource endpoint showing exactly which fields are actually required, distinct from the full schema |

## Check yourself

Why was it important to check Oracle's own update notes rather than assuming the integration team's own code was the source of the change?
