# Lesson 9 — Making REST Calls With Postman

**Chapter 2 · Using the APIs · Lesson 9 of 22**

## What you'll learn

- What Postman is for, and why this course references it by name only
- Environments and variables: avoiding hardcoded instance URLs and tokens
- Setting up Bearer token authorization on a request
- A realistic request/collection structure for testing Salesforce REST calls

## What Postman is for

**Postman** is a general-purpose API client application — not a Salesforce product — widely used across the industry to build, test, and share collections of HTTP requests without writing a full client application first. Nothing about it is Salesforce-specific; it just sends HTTP requests and shows you the response, which makes it a natural tool for learning and testing an API before writing integration code against it. This lesson teaches Postman's relevant concepts by name, in plain text — no screenshots of its interface, per this course's policy — because what matters is the HTTP request itself, which transfers directly to any tool, including code.

## Environments and variables

Hardcoding your org's instance URL and access token into every request is brittle — tokens expire, and you don't want to find-and-replace them across dozens of saved requests. Postman's **environments** solve this: you define variables like `instance_url` and `access_token` once, and reference them in any request with double curly braces:

```http
GET {{instance_url}}/services/data/v61.0/sobjects/Account/001xx000003DGb2AAG
Authorization: Bearer {{access_token}}
```

When you obtain a new access token (Lesson 7), you update the `access_token` variable once in the environment, and every saved request that references it picks up the new value automatically.

## Setting Bearer token authorization

Rather than typing the `Authorization: Bearer ...` header by hand on every request, Postman has a dedicated **Authorization** tab per request (or per collection) where you choose "Bearer Token" as the type and supply the token value — Postman then adds the correctly formatted header for you. Using the collection-level setting, you can configure it once and have every request in that collection inherit it, rather than repeating it per request.

## A realistic collection structure

A typical Salesforce testing collection groups requests by resource, mirroring the course's own structure:

```
Salesforce REST Collection
├── Auth
│   └── POST  /services/oauth2/token
├── Accounts
│   ├── GET   /sobjects/Account/{id}
│   ├── POST  /sobjects/Account
│   └── PATCH /sobjects/Account/{id}
├── Queries
│   └── GET   /query/?q={soql}
└── Limits
    └── GET   /limits
```

Organizing requests this way — one folder per resource, with the actual HTTP verb and path visible in each request's name — makes a collection easy to hand off to a teammate or come back to months later, which matters as much as getting any single request right.

## Key terms

| Term | Meaning |
|---|---|
| Postman | A general-purpose API client application used to build, test, and share HTTP request collections |
| Environment | A named set of variables (like instance_url, access_token) reusable across requests |
| Collection | A saved, organized group of related API requests |
| Bearer token auth | An authorization setting that adds a correctly formatted `Authorization: Bearer ...` header automatically |

## Lab

Design (on paper, as a list — no tool needed) a Postman-style collection structure for testing the REST CRUD operations and queries you'll learn in Lessons 10 and 11: list the folder names you'd use, the requests inside each folder, and which two environment variables every request in the collection should depend on instead of being hardcoded.

## Check yourself

Can you explain what problem Postman's environment variables solve, specifically in the context of an access token that expires? Can you explain why organizing a collection by resource, with the HTTP verb visible in each request's name, matters for someone picking up the collection later?