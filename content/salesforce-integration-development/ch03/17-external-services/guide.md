# Lesson 17 — External Services

**Chapter 3 · Asynchronous and Event-Based Integration · Lesson 17 of 23**

## What you'll learn

- What External Services actually generate, and from what input
- The registration flow in Setup, step by step
- What you still have to write yourself versus what's auto-generated
- How to call a generated External Service action from Apex
- Where External Services sit relative to hand-written callouts and Flow HTTP Callouts

## What External Services generate

External Services let you register a third-party REST API by importing its **OpenAPI (OAS) specification** (or a MuleSoft service) through a Setup wizard, rather than hand-writing the callout code yourself. Given a valid spec and a Named Credential for the endpoint, Salesforce generates:

- An **invocable action for each operation** defined in the spec — usable immediately in Flow Builder with no code.
- **Apex "stub" classes**, grouped under "dynamic classes" in the Apex Classes list in Setup, which Apex code can call directly.

This makes External Services the bridge between hand-written Apex HTTP callouts (Chapter 1) and no-code Flow automation (Lesson 16) — the same registered service backs both a Flow action and a set of Apex classes.

## The registration flow

In Setup, search "External Services" and start the wizard: select a **Named Credential** (the endpoint and authentication, exactly as built in Lesson 3), then import the **OpenAPI specification** for the third-party API — either pasted in, uploaded, or pulled from a URL. Salesforce validates the schema and attempts to reach the endpoint using the Named Credential's configuration. If that succeeds, it registers the service and generates the stub classes and invocable actions for every operation the spec defines.

## What you still write yourself

Because the integration code is generated directly from the spec, Salesforce's own guidance is that you don't need to write unit tests for the generated code itself — it's been produced by the platform, not hand-written, and its correctness against the spec is the platform's responsibility. What you *do* still need to write: **integration tests** that verify the real end-to-end behavior against the actual third-party service (or a mock of it, using the mocking techniques from Lesson 5), plus any business logic that calls the generated action and does something useful with its result.

## Calling a generated action from Apex

The exact generated class and method names depend on the service name and each operation's ID in the OpenAPI spec, but the shape is consistent: a service class, paired with request and response wrapper classes for each operation, something like:

```apex
ExternalService.ShippingAPI shipping = new ExternalService.ShippingAPI();
ExternalService.ShippingAPI_getRate_Request req = new ExternalService.ShippingAPI_getRate_Request();
req.destinationZip = '30301';
ExternalService.ShippingAPI_getRate_Response res = shipping.getRate(req);
System.debug('Quoted rate: ' + res.rate);
```

Treat this as an illustration of the pattern, not a literal API you can copy — your own generated class and field names will follow your specific service's operation IDs and schema.

## Where External Services fit

A rough decision guide across this course's outbound mechanisms: a third-party API that already publishes an OpenAPI spec is the ideal candidate for External Services — you get both a Flow action and Apex stub classes essentially for free, with far less hand-written code than Chapter 1's manual `HttpRequest`/`HttpResponse` approach. Hand-written Apex callouts (Lesson 4) still earn their place when no usable spec exists, when the API's behavior needs custom logic the generated stubs can't express cleanly, or when fine-grained control over the request/response handling matters more than generation speed.

## Key terms

| Term | Meaning |
|---|---|
| External Service | A registered third-party API, generated from an OpenAPI spec plus a Named Credential |
| OpenAPI (OAS) specification | The machine-readable API description External Services imports to generate code |
| Dynamic classes | The Setup grouping where External Services' auto-generated Apex stub classes live |
| Invocable action | The auto-generated, no-code Flow action produced for each operation in the spec |

## Lab

Find a small, free, public API that publishes an OpenAPI specification (many sample/demo APIs do — search for one, or use a simple one you can describe yourself in a minimal OAS document). In a scratch org, set up a Named Credential pointing at that API, then register it as an External Service by importing its OpenAPI spec. Confirm the invocable action appears in Flow Builder's action picker, and confirm the generated Apex stub classes appear under Setup's Apex Classes "dynamic classes" grouping. Write a short Apex script calling one generated action and debugging its response.

## Check yourself

Explain, from memory, the two inputs External Services needs to register a third-party API, and the two things it generates from them. Then explain why Salesforce's own guidance says you don't need to unit-test the generated code, and what you should write instead.
