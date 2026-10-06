# Lesson 1 — What Is an API?

**Chapter 1 · Understanding APIs · Lesson 1 of 22**

## What you'll learn

- What "API" actually means, in plain terms
- The client/server relationship every API call relies on
- The three moving parts of every API call: request, processing, response
- Why this entire course — and most of what you'll build as an AI
  engineer — comes down to calling someone else's API

## The plain-English definition

An API (Application Programming Interface) is a defined way for one piece
of software to ask another piece of software for data or for an action,
without either side needing to know how the other one works inside. You
don't need to know how a weather service stores its forecasts to ask it
"what's the temperature in Boston right now?" — you just need to know the
*shape* of the question it accepts, and the shape of the answer it gives
back. That contract — the accepted questions and the shapes of the
answers — is the API.

## Client and server

Every API call has two sides:

- The **client** — the program asking the question (your code, a mobile
  app, a browser)
- The **server** — the program answering it (a weather service, a
  payment processor, an AI model provider)

The client sends a **request**. The server does some work and sends back
a **response**. Neither side needs the other's source code — only the
agreed-upon contract.

## The three parts of every API call

```
1. Request   — client asks: "give me the weather for Boston"
2. Process   — server looks it up, computes, or fetches the answer
3. Response  — server replies: "68°F, partly cloudy"
```

This pattern repeats no matter what the API does — checking a bank
balance, posting a tweet, or asking an AI model to write a paragraph.

## Why this matters for AI engineering

Every AI application you'll build in this course talks to an AI
provider's API — Anthropic's, OpenAI's, or someone else's — using this
exact request/response pattern. When your app "calls GPT" or "calls
Claude," it is sending an HTTP request to a server you don't control and
reading back a response. Learning APIs isn't a prerequisite you get
through before the real work starts — reading and shaping requests and
responses *is* the real work of an AI application.

## Key terms

| Term | Meaning |
|---|---|
| API | A defined contract for one program to request data/action from another |
| Client | The program making the request |
| Server | The program handling the request and sending a response |
| Request | What the client sends to ask for something |
| Response | What the server sends back |

## Check yourself

Without looking back, can you name the three parts of every API call, and
explain why an AI application calling Claude or GPT is just another
example of the exact same pattern?
