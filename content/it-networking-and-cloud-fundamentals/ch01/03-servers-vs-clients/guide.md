# Servers vs. Clients

Every computing task you'll touch on this path — a website, a database query, an API call — involves two roles: something asking for a thing, and something answering. This lesson names those roles precisely, because "server" and "client" get used loosely in everyday conversation but mean something specific and consistent in IT. Getting this distinction solid now makes networking, cloud infrastructure, and troubleshooting all click into place faster later.

## What you'll learn

- The precise definition of a client and a server, independent of physical hardware
- Why the same physical machine can be a server for one request and a client for another
- The request/response pattern that almost all client-server communication follows
- How Northbridge Retail's checkout systems map onto client and server roles

## Client and server are roles, not boxes

The most common beginner mistake is thinking "server" means a specific, big, special piece of hardware, and "client" means a laptop or phone. That's often true in practice, but it's not the definition. The real definition is about **roles in a conversation**:

- A **client** is whatever initiates a request for something.
- A **server** is whatever receives that request and sends back a response.

A laptop running a web browser is a client when it asks a website for a page. But that same laptop can act as a server if it's running software that other machines connect to — for example, a developer testing a local web app that a colleague's machine connects to over the network. The hardware didn't change; the role did.

## The request/response pattern

Nearly all client-server interaction follows the same shape: the client sends a request, the server does whatever work is needed to answer it, and the server sends back a response. A web browser requesting a page, a mobile app asking for your order history, and a point-of-sale terminal checking current inventory are all the same pattern at different scales.

This pattern is why servers are typically built to handle many clients at once. A single e-commerce server might be answering thousands of simultaneous requests from browsers and apps, each one a separate conversation the server has to track and respond to correctly.

## Servers are built for the job

Because a server might need to answer many requests reliably, server hardware and configuration usually differ from a typical client machine: more RAM, more CPU cores, redundant storage and power supplies, and an operating system (often a server edition of Linux or Windows) tuned to run unattended for long stretches, without someone sitting in front of a screen. A client machine, by contrast, is built around a person actively using it — a display, a keyboard, battery life.

## Northbridge Retail example

Every Northbridge Retail checkout terminal in a physical store is a **client**: when a cashier scans an item, the terminal sends a request to check the current price and stock level. That request travels to a **server** — in this case a server running in the company's data center — which looks up the answer in a database and sends it back. The same checkout terminal is also a client when it later syncs the day's sales totals up to a central reporting server. In both cases, the terminal initiates, and the server answers.

## Key terms

| Term | Meaning |
|---|---|
| Client | Whatever initiates a request for something (a role, not a specific device) |
| Server | Whatever receives a request and sends back a response (a role, not a specific device) |
| Request/response | The basic back-and-forth pattern of nearly all client-server communication |
| Server edition OS | An operating system build tuned to run unattended, answering many clients reliably |

## Recap

Client and server describe roles in a request/response conversation, not fixed categories of hardware — the same machine can be either, depending on who's asking and who's answering. Servers are typically built and configured to answer many such requests reliably at once. Next up, Lesson 4: virtual machines and hypervisors.
