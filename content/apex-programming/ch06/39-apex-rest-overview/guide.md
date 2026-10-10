# Lesson 39 — Apex REST Overview

**Chapter 6 · Apex Beyond the Basics · Lesson 39 of 43**

## What you'll learn

- How to expose an Apex class as a custom REST web service
- The `@RestResource`, `@HttpGet`, `@HttpPost`, `@HttpPut`, `@HttpDelete`, and `@HttpPatch` annotations
- Why both the class and its REST methods must be declared `global`
- Using `RestContext.request` and `RestContext.response` to read the inbound request and shape the outbound response
- How Salesforce decides whether to deserialize the request body into method parameters or leave it raw

## Why expose Apex as REST

Salesforce already gives every org a comprehensive REST API for standard CRUD operations. Apex REST exists for the cases that API doesn't cover: custom business logic that needs to run server-side in response to an external system's call — validating and transforming incoming data, combining several operations into one atomic call, or exposing a purpose-built endpoint shaped exactly the way an external integration needs it, rather than making that integration assemble several generic API calls itself.

## The annotations

```apex
@RestResource(urlMapping='/ContactService/*')
global with sharing class ContactRestService {

    @HttpGet
    global static Contact doGet() {
        RestRequest req = RestContext.request;
        String contactId = req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
        return [SELECT Id, FirstName, LastName, Email FROM Contact WHERE Id = :contactId LIMIT 1];
    }

    @HttpPost
    global static Id doPost(String firstName, String lastName, String email) {
        Contact c = new Contact(FirstName = firstName, LastName = lastName, Email = email);
        insert c;
        RestContext.response.statusCode = 201;
        return c.Id;
    }
}
```

`@RestResource(urlMapping='...')` goes on the class and defines the URL path (relative to the org's REST base, `/services/apexrest/`) that routes to this service. `@HttpGet`, `@HttpPost`, `@HttpPut`, `@HttpDelete`, and `@HttpPatch` each go on a method, mapping that method to the matching HTTP verb. URL mappings are case-sensitive, and a trailing `/*` in the mapping (as above) means the path accepts additional segments after `/ContactService/`, which is how `doGet()` extracts a specific Id from the end of the URI.

## Why global

Both the class and each annotated method must be declared `global`. Apex REST is meant to be called from outside the org (or from a different namespace), and `global` is the access modifier that makes a member visible across package and namespace boundaries — a `public` method would not be reachable the same way from an external REST caller. This is a case where the normal "keep access as narrow as possible" instinct from Lesson 8 gives way to the actual requirement of the feature.

## RestContext.request and RestContext.response

Inside any annotated method, `RestContext.request` (a `RestRequest`) gives you the inbound HTTP request — its URI, headers, and raw body — and `RestContext.response` (a `RestResponse`) lets you set the outbound status code, headers, and body:

```apex
RestResponse res = RestContext.response;
res.addHeader('Content-Type', 'application/json');
res.statusCode = 201;
```

## How the request body gets parsed

If an annotated method has **no parameters**, Apex REST hands you the raw request body as bytes on `RestRequest.requestBody`, and you parse it yourself (often with `JSON.deserializeUntyped()`, covered in Lesson 42). If the method **does have parameters** — as `doPost` does above — Apex REST attempts to deserialize the incoming JSON body directly into those named parameters automatically, matching JSON keys to parameter names.

## Key terms

| Term | Meaning |
|---|---|
| `@RestResource` | Class-level annotation defining the URL mapping for an Apex REST service |
| `@HttpGet` / `@HttpPost` / etc. | Method-level annotations mapping a method to a specific HTTP verb |
| `global` | The access modifier required for an Apex REST class and its annotated methods |
| `RestContext.request` / `RestContext.response` | Access points for the inbound request and outbound response inside a REST method |

## Lab

In a Developer Edition org, create the `ContactRestService` class exactly as shown. Using a REST client (or `curl`), call `POST https://<your-instance>.salesforce.com/services/apexrest/ContactService/` with a JSON body containing `firstName`, `lastName`, and `email`, using a valid session token in the Authorization header. Confirm a new Contact was created and the response returned its Id with a 201 status code.

## Check yourself

Why must both the class and its REST methods be declared `global` rather than `public`? What's the difference in how the request body is handled when a REST method has parameters versus when it has none?
