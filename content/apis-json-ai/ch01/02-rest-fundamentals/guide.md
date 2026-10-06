# Lesson 2 — REST Fundamentals

**Chapter 1 · Understanding APIs · Lesson 2 of 22**

## What you'll learn

- What "REST" stands for and what kind of thing it actually is
- The three ideas that make an API RESTful: resources, statelessness,
  standard HTTP verbs
- How a resource (a "thing," like a user or an order) maps to a URL
- Why nearly every AI provider API — and most APIs you'll ever touch —
  describes itself as "RESTful"

## REST is a style, not a product

REST stands for **Re**presentational **S**tate **T**ransfer. It is not a
protocol, a file format, or a piece of software you install — it's an
**architectural style**: a set of conventions for designing APIs that
Roy Fielding described in his 2000 doctoral dissertation. An API that
follows these conventions is called "RESTful." Most APIs you'll work
with in this course — including AI provider APIs — call themselves REST
APIs.

## Idea 1 — everything is a resource, addressed by a URL

REST organizes an API around **resources** — nouns, not actions. A user,
an order, a chat message are all resources, and each one gets its own
URL:

```
GET /users/42          → the user with id 42
GET /orders/1001        → order number 1001
POST /messages           → create a new message
```

Compare that to an older, action-based style: `POST /getUserById?id=42`.
REST prefers the resource itself to live in the URL, and the *action* on
that resource to come from the HTTP method — which Lesson 3 covers in
full.

## Idea 2 — statelessness

Each request to a RESTful API must carry **everything** the server needs
to handle it — authentication, parameters, all of it. The server does
not remember anything about your previous request. This is
**statelessness**, and it's why every request you send includes an auth
token or API key, even if you just sent one five seconds ago. It also
means any server in a pool can handle any request — nothing is "sticky"
to one particular machine.

## Idea 3 — standard HTTP verbs, not custom action names

Instead of inventing endpoint names like `/createUser` or
`/deleteOrder`, REST reuses the HTTP methods that already exist for this
purpose — `GET`, `POST`, `PUT`, `PATCH`, `DELETE`. The resource's URL
stays the same; the verb changes what happens to it. Lesson 3 goes deep
on exactly what each verb means.

## Key terms

| Term | Meaning |
|---|---|
| REST | An architectural style for designing APIs around resources |
| Resource | A "thing" (user, order, message) addressed by its own URL |
| Statelessness | Every request is self-contained; the server remembers nothing between calls |
| RESTful | An API that follows REST's conventions |

## Check yourself

Can you explain, in your own words, why a RESTful API sends an auth
token on every single request instead of logging in once and staying
"logged in" the way a website session does?
