# Lesson 14 — REST Integration

**Chapter 3 · Build: UI and Integration · Lesson 14 of 25**

## What you'll learn

- The fictional external system this platform integrates with, and why it's a REST callout rather than an inbound integration
- `HttpRequest` / `HttpResponse` and the full `ManufacturerWarrantyClient` class
- Serializing a request body and parsing a JSON response safely
- Why this callout still needs Lesson 15's Named Credential to actually run

## The integration: ApplianceMakers Warranty Network

Solstice doesn't manufacture the appliances it sells and services — manufacturers do, and most of them pay out warranty claims through their own claims systems. For this capstone, that external system is fictional: the **ApplianceMakers Warranty Network API**, invented for this course, is a REST API that accepts a warranty claim submission and returns a manufacturer-assigned claim ID. This is an **outbound** integration — Salesforce is the caller, the manufacturer's system is the callee — which is why it's built as an Apex callout rather than, say, a Salesforce REST API endpoint exposed for someone else to call inbound.

## `HttpRequest` and `HttpResponse`

Apex callouts to any REST API follow the same basic pattern, built from three classes: `Http` (which sends the request), `HttpRequest` (which describes it), and `HttpResponse` (which holds what comes back).

```apex
public with sharing class ManufacturerWarrantyClient {

    public static String submitClaim(String serialNumber, Decimal claimAmount) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:ApplianceMakers_Warranty/claims');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');

        Map<String, Object> body = new Map<String, Object>{
            'serialNumber' => serialNumber,
            'claimAmount' => claimAmount,
            'submittedBy' => 'Solstice Appliance Group'
        };
        req.setBody(JSON.serialize(body));

        Http http = new Http();
        HttpResponse res = http.send(req);

        if (res.getStatusCode() == 201) {
            Map<String, Object> responseBody =
                (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            return (String) responseBody.get('claimId');
        }

        throw new ManufacturerWarrantyException(
            'Claim submission failed with status ' + res.getStatusCode() + ': ' + res.getBody()
        );
    }
}
```

The endpoint starts with `callout:ApplianceMakers_Warranty` rather than a literal URL — that's not a placeholder, it's the required syntax for calling out through a **Named Credential** named `ApplianceMakers_Warranty`, which Lesson 15 sets up. Hardcoding the real URL and an API key directly in Apex would work technically, but it would also mean the secret lives in code, visible to anyone with code access and painful to rotate — exactly the problem Named Credentials exist to solve.

## Serializing the request body

`JSON.serialize()` on a `Map<String, Object>` is a simple, readable way to build a JSON body without defining a full wrapper class for every outbound payload shape — appropriate here because the request body is small and unlikely to need strong typing on the way out. `JSON.deserializeUntyped()` on the way back does the same in reverse, returning an untyped `Map<String, Object>` / `List<Object>` structure you cast field by field. For a response with more fields or nested structure than this one, this capstone would reach for a proper Apex wrapper class with `JSON.deserialize()` into a typed object instead — untyped deserialization is a fine match for a one-field response like this, not a default to reach for on every integration.

## Checking the status code, not just catching exceptions

`http.send()` does not throw an exception for a 4xx or 5xx HTTP status — a callout that reaches the manufacturer's server and gets back a "400 Bad Request" is, as far as Apex is concerned, a completely successful callout that happens to carry a response describing failure. That's why `submitClaim` explicitly checks `res.getStatusCode()` and throws its own custom exception when the call didn't actually succeed, rather than assuming "no exception thrown" means "the claim was accepted."

## Where this plugs back in

`WarrantyClaimSubmissionQueueable` from Lesson 11 calls `ManufacturerWarrantyClient.submitClaim()` directly. That Queueable already declared `Database.AllowsCallouts`, which is what makes this specific callout legal from that async context — a callout attempted from a class or trigger that hasn't declared that interface, or from true trigger context, throws a runtime error instead.

## Key terms

| Term | Meaning |
|---|---|
| Outbound integration | Salesforce acting as the caller to an external system's API |
| `HttpRequest` / `HttpResponse` | Apex classes describing an outgoing callout and the response received |
| `callout:` URL scheme | Required endpoint prefix for calling out through a Named Credential |
| `JSON.serialize()` / `JSON.deserializeUntyped()` | Methods for building a JSON request body and parsing an untyped JSON response |
| Custom exception class | A class extending `Exception` used to signal a specific, catchable failure condition |

## Lab

Write `ManufacturerWarrantyClient` and a custom `ManufacturerWarrantyException` class as shown above. Using `HttpCalloutMock` from Lesson 10, write a test that mocks a 201 response with a `claimId` and asserts `submitClaim` returns it correctly, and a second test that mocks a 500 response and asserts `ManufacturerWarrantyException` is thrown.

## Check yourself

- Why is this integration built as an outbound Apex callout rather than an inbound REST endpoint?
- Why does `req.setEndpoint()` use `callout:ApplianceMakers_Warranty/claims` instead of a literal URL?
- Why does `submitClaim` check the response status code explicitly instead of relying on a thrown exception?
