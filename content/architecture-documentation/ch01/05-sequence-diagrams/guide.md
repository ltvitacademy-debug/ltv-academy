# Lesson 5 — Sequence Diagrams

**Chapter 1 · Documenting Architecture · Lesson 5 of 17**

## What you'll learn

- The core UML sequence diagram elements: lifeline, message, activation bar
- How to show synchronous vs. asynchronous calls and how to show an error path
- How to draw a sequence diagram for a real Salesforce integration scenario
- When a sequence diagram is the right tool, versus when a DFD (Lesson 4) is enough

## The question a sequence diagram answers

Every other diagram in this chapter is silent about time. A system context diagram shows what's connected; a DFD shows how data moves between processes; neither says in what order, or how fast. A **sequence diagram** exists for exactly that gap: it shows the precise, ordered sequence of messages exchanged between participants during one specific transaction, read top to bottom as time passing. It comes from UML (Unified Modeling Language) and is the standard notation architects reach for whenever "what exactly happens, and in what order, when this one thing occurs" is the question that needs answering — most often for integration call sequences, multi-step automation chains, or anything involving a callout and a response.

## The core elements

- **Lifeline**: a vertical dashed line dropping down from a labeled box at the top, representing one participant (a user, a system, an Apex class, an external API) existing through the transaction's duration.
- **Message**: a horizontal arrow from one lifeline to another, labeled with what's being sent — a method call, an API request, a returned value. Time flows downward, so a message drawn lower on the diagram happens later.
- **Activation bar**: a narrow rectangle on a lifeline showing the span of time that participant is actively doing work in response to a message, from when it receives a call to when it responds or finishes.
- **Synchronous vs. asynchronous message**: a synchronous call (solid arrowhead, the caller waits for a response before continuing) is drawn differently from an asynchronous call (open or stick arrowhead, the caller continues without waiting) — this distinction matters enormously in Salesforce integration design, since it's the difference between, for example, a real-time outbound REST callout the user waits on and a Platform Event the publisher fires and moves past immediately.
- **Return message**: a dashed arrow back to the caller, showing the response value, typically drawn once the activation bar ends.

## A worked example: an Apex callout with a retry

A Lightning web component calls an Apex controller method synchronously, waiting for a result. The Apex method makes an HTTP callout to an external pricing API — also synchronous from Apex's point of view, since Apex blocks on the callout within its execution context. If the external API times out, the diagram should show that failure path explicitly: an error response (or no response within the callout timeout) returning to the Apex lifeline, the Apex method's own retry or fallback logic activating, and only then a final response returning to the Lightning web component — which might be the real pricing data, or might be a documented fallback value with an error flag. A sequence diagram that only shows the "happy path" and never shows what happens on timeout or error is incomplete; failure handling is exactly the kind of detail a sequence diagram is good at making explicit, and exactly the kind of detail that's easy to leave undocumented until an incident forces someone to ask "what was supposed to happen here?"

## When to reach for a sequence diagram vs. a DFD

Both diagrams can describe "data moving through a process," but they answer different questions and architects sometimes reach for the wrong one. Use a **DFD** when the question is structural — what gets transformed, where is data stored, what's the overall shape of a process — and exact timing doesn't matter. Use a **sequence diagram** when the question is behavioral and order-dependent — what exactly happens, in what order, during one specific run of a transaction, especially when synchronous/asynchronous timing, retries, or error handling are part of what needs to be understood. A platform integration document (Lesson 13) commonly includes both: a DFD-style or context-diagram view of the overall integration, and a sequence diagram zoomed into the one call sequence that the reader most needs to get right.

## Key terms

| Term | Meaning |
|---|---|
| Sequence diagram | A UML diagram showing the exact ordered sequence of messages between participants over the course of one transaction |
| Lifeline | The vertical dashed line representing one participant's existence through the diagram's timeframe |
| Activation bar | The rectangle on a lifeline showing when that participant is actively processing |
| Synchronous message | A call where the caller waits for a response before continuing (solid arrowhead) |
| Asynchronous message | A call where the caller continues without waiting for a response (open/stick arrowhead) |

## Lab

Draw a sequence diagram for this scenario: a Flow (triggered on Opportunity update) calls an invocable Apex method synchronously. That Apex method publishes a Platform Event asynchronously (fire-and-forget) and, separately, makes a synchronous HTTP callout to a tax-calculation API. The tax API returns successfully. A separate subscribing Apex trigger, listening for the Platform Event, picks it up moments later and updates a related Account field. Draw all five participants as lifelines (Flow, Apex method, Platform Event bus, tax API, subscribing trigger), use solid arrows for synchronous calls and open/stick arrows for the asynchronous event, and show activation bars for each participant's working time.

## Check yourself

Can you explain what makes a sequence diagram different from a DFD, given that both can describe the same transaction? Can you draw the visual difference between a synchronous and an asynchronous message and explain why that distinction matters for a real Salesforce integration? Can you explain why a sequence diagram that only shows the happy path is considered incomplete?
