# Script — Ticket: REST API Call Returns an Error

## Segment 1 (title)

Harbor & Vance Logistics, ticket forty-eight-twenty-five. An integration developer's middleware calls the Invoices REST resource to create AP invoices automatically, and overnight it started returning 400 errors. Nothing changed on their end. High severity.

## Segment 2 (steps)

The status code itself tells you where to look. 401 Unauthorized means the credentials are missing, invalid, or expired — the fix lives in authentication, not the request body. 400 Bad Request means the request reached the server fine and got rejected for a content reason — a missing field, bad filter syntax, an unsupported operation. Completely different places to look, so confirm which one you've actually got before doing anything else.

## Segment 3 (steps)

Here it's 400, not 401 — a content problem. Reading the actual response body instead of just the code: missing required field, BusinessUnit. The integration has never explicitly sent that field — it always relied on a server-side default. Checking Oracle's own release notes for this environment explains it: a recent quarterly update changed this resource so BusinessUnit is now required on the request, no longer defaulted server-side.

## Segment 4 (code)

So "nothing changed on our end" is actually true — something changed on Oracle's end instead. The fix: update the middleware to explicitly send BusinessUnit on every call, and check the resource's describe metadata rather than guessing from the full schema, since that tells you exactly what's required now, not everything that's merely possible to send.

## Segment 5 (outro)

Resolution note: name the specific field and the specific Oracle update that changed its behavior, and verify with a real test call returning a success status. Recommend the integration team review quarterly update readiness notes before each update window, instead of finding out through a failed integration. Up next, lesson twenty-nine, the final lesson: a report that's technically running fine, but showing the wrong numbers.
