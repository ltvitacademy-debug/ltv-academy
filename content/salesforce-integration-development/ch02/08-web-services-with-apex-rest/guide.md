# Lesson 8 — Web Services With Apex REST

**Chapter 2 · Inbound Integration · Lesson 8 of 23**

## What you'll learn

- How `@RestResource` exposes an Apex class as a custom REST endpoint
- The five HTTP-verb annotations and the rule limiting each to one per class
- How to read the incoming request and write the response with `RestContext`
- A complete working Apex REST service for GET and POST
- Why you'd reach for Apex REST instead of Salesforce's own standard REST API

## From outbound to inbound

Chapter 1 was entirely about Salesforce calling out. This chapter flips the direction: an external system calling into Salesforce. The most common way to expose custom logic (not just plain record CRUD) as something an external caller can invoke is Apex REST — an ordinary Apex class, annotated so the platform routes HTTP requests to it.

## The annotations

Per the Apex Developer Guide's REST annotations reference:

- **`@RestResource(urlMapping='/yourPath/*')`** goes on the class. The class must be declared `global`. The mapping is appended to the base Apex REST endpoint path (`/services/apexrest/...`), is case-sensitive, and can use a `*` wildcard to capture a trailing segment (like a record ID).
- **`@HttpGet`**, **`@HttpPost`**, **`@HttpPut`**, **`@HttpPatch`**, **`@HttpDelete`** go on methods that must be `global static`. **Each annotation can be used only once per class** — one method per HTTP verb, per class.
- **`@ReadOnly`** is an optional performance hint for GET methods that only read data and never write it.

## A complete Apex REST service

```apex
@RestResource(urlMapping='/Accounts/*')
global with sharing class AccountRestService {

    @HttpGet
    global static Account getAccount() {
        RestRequest req = RestContext.request;
        String accountId = req.requestURI.substring(
            req.requestURI.lastIndexOf('/') + 1
        );
        return [SELECT Id, Name, Phone, Industry FROM Account WHERE Id = :accountId];
    }

    @HttpPost
    global static Id createAccount(String name, String industry) {
        Account acc = new Account(Name = name, Industry = industry);
        insert acc;
        return acc.Id;
    }
}
```

`RestContext.request` (a `RestRequest`) exposes `requestURI`, `httpMethod`, `params` (query-string parameters), and `requestBody` (the raw request body as a `Blob`, which you'd typically parse with `JSON.deserializeUntyped` for a POST/PUT/PATCH payload). `RestContext.response` (a `RestResponse`) lets you set a custom `statusCode` and `responseBody` when the default serialization of your method's return value isn't what you want to send back.

## Why Apex REST instead of the standard REST API?

Salesforce's standard REST API already lets any authenticated external caller do CRUD on any object with no custom code at all. Apex REST earns its place when the caller needs something beyond plain CRUD: custom business logic, validation, or a response shape that doesn't match a raw SObject — for example, an endpoint that accepts an order and runs multiple related DML operations and some calculation logic in one call, rather than making the external system orchestrate several separate standard-API calls itself.

## Key terms

| Term | Meaning |
|---|---|
| @RestResource | Class-level annotation exposing an Apex class as a custom REST endpoint |
| @HttpGet / @HttpPost / @HttpPut / @HttpPatch / @HttpDelete | Method-level annotations routing a specific HTTP verb to a method; one per class each |
| RestContext.request / RestContext.response | Access to the incoming RestRequest and outgoing RestResponse |
| Apex REST vs standard REST API | Apex REST is for custom logic beyond plain record CRUD, which the standard API already covers |

## Lab

In a free Developer Edition or scratch org, create the `AccountRestService` class above. In Setup, confirm the class is deployed, then use a tool like Postman or `curl` (or Workbench's REST Explorer, which doesn't require installing anything) to call `GET https://<your-instance>/services/apexrest/Accounts/<a real Account Id>` with a valid OAuth session, and confirm you get back real Account JSON. Then call the POST endpoint with a JSON body containing a name and industry, and confirm a new Account is created and its Id is returned.

## Check yourself

Without looking back, write the annotation and method signature for an Apex REST method that handles a DELETE request. Then explain why a class can't have two separate `@HttpGet` methods.
