# Lesson 3 — REST vs. SOAP vs. Event-Driven Integration

**Chapter 1 · Integration Fundamentals · Lesson 3 of 29**

## What you'll learn

- What REST actually is, and why it's the default choice for new integrations
- What SOAP is, why it's more rigid and verbose, and why it's still common in legacy enterprise systems
- How event-driven (webhook/message-queue) integration differs from both request/response styles
- Why a working ServiceNow integration developer has to be comfortable with all three, not just the newest one

## REST: resource-based, verb-driven, usually JSON

REST — **Representational State Transfer** — is an architectural style, not a formal standard with its own rulebook. A REST API organizes itself around **resources**, each addressed by a URL: `/incident/{sys_id}` represents one specific Incident. You act on that resource using standard HTTP verbs — `GET` to retrieve it, `POST` to create a new one, `PUT` or `PATCH` to update it, `DELETE` to remove it — and the payload going back and forth is almost always **JSON**, a lightweight, human-readable format that maps directly onto JavaScript objects.

```
GET /api/now/table/incident/9d385017c611228701d22104cc95c371
Accept: application/json

Response:
{
  "result": {
    "number": "INC0010023",
    "short_description": "Email server down",
    "priority": "1",
    "state": "2"
  }
}
```

REST's appeal is simplicity: no separate contract document is required to understand the API, the URL structure is usually self-explanatory, and JSON is light enough to read in a browser's network tab while debugging. That's why REST is the modern default — it's what you built in course 6's Scripted REST APIs, and it's what the REST Message record (next chapter) consumes from external systems.

## SOAP: XML, WSDL contracts, and why it hasn't disappeared

SOAP — **Simple Object Access Protocol** — predates REST's dominance and takes a stricter approach. Every SOAP service is described by a **WSDL** (Web Services Description Language) document — a formal, machine-readable contract spelling out exactly which operations exist, what parameters each one takes, and what shape the response will be. Every request and response body is **XML**, which is more verbose than JSON but self-describing in a way that made sense for the enterprise systems SOAP was built for.

```
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetAccountBalance xmlns="http://example.com/billing">
      <AccountId>00123456</AccountId>
    </GetAccountBalance>
  </soap:Body>
</soap:Envelope>
```

SOAP is more rigid and harder to hand-write than a REST call, but that rigidity is exactly why it's still alive: once a WSDL contract is published, every consumer of that service gets strong, tooling-enforced guarantees about what they're sending and receiving. That's valuable in regulated, slow-moving industries — finance, government, telecom, healthcare billing — where a core system might be fifteen or twenty years old and was never going to be rewritten just because REST became fashionable. If you integrate with a bank's core ledger system or a government records system, there's a real chance the only interface available is SOAP, and ServiceNow does provide SOAP Message support specifically for this reason.

## Event-driven integration: pushed, not polled

Both REST and SOAP, used in their typical form, are **request/response**: something asks a question, and something else answers it — right now, synchronously. Event-driven integration is a different shape entirely. Instead of ServiceNow (or an external system) having to ask "has anything changed?" on a loop, the side where something happened pushes a notification the instant it happens — through a **webhook** (an HTTP callback the receiving side registers in advance) or a **message queue** (where the producer drops a message and one or more consumers pick it up when ready).

```
Polling (REST/SOAP request-response):      Event-driven (webhook/queue):
every 60 seconds:                          the moment it happens:
  ask "anything new?"                        producer pushes a message
  get back "no" ... "no" ... "yes"           consumer reacts immediately
```

The Datadog-outage-creates-an-Incident example from Lesson 1 is event-driven: Datadog doesn't wait for ServiceNow to ask; it pushes the moment it detects the problem. Event-driven integration usually still rides on top of HTTP (a webhook is typically a REST-shaped POST), which is why it's a separate category by *behavior*, not by protocol — the distinguishing trait is who initiates and when, not JSON vs. XML.

## Why you need all three, not just REST

It's tempting to treat REST as the only one worth learning, since it's the default for anything built today. In practice, the external system's **existing architecture** — not your preference — dictates which pattern you use. A newly built SaaS product will almost certainly offer REST. A twenty-year-old mainframe billing system might only offer SOAP, or no API at all beyond a nightly file (which pushes you back to the Import Set pattern from Lesson 2). A modern event-streaming platform might only support webhooks or a message queue. A ServiceNow integration developer who can only speak REST will eventually hit a legacy SOAP system and be stuck — which is exactly why this comparison belongs at the start of the course, before any hands-on building begins.

## Key terms

| Term | Meaning |
|---|---|
| REST | Resource-based architectural style using standard HTTP verbs and typically JSON payloads |
| SOAP | XML-based protocol defined by a formal WSDL contract; more rigid but common in legacy systems |
| WSDL | Web Services Description Language — the formal contract document describing a SOAP service |
| Webhook | A registered HTTP callback that fires the instant an event occurs, instead of being polled |
| Message queue | A system where a producer drops a message and consumers pick it up when ready |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why might a bank's twenty-year-old core ledger system only expose a SOAP interface rather than REST, and what does the existence of that system tell you about why "just use REST for everything" isn't realistic advice for an integration developer?
