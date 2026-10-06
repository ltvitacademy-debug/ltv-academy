# Lesson 15 — Architecture Whiteboarding

**Chapter 3 · Interviews · Lesson 15 of 19**

## What you'll learn

- Why whiteboard rounds test communication as much as technical knowledge
- The mechanics of running a whiteboard session well, in person or on a shared screen
- A repeatable structure for walking through a design live
- A worked example (explicitly fictional) applying that structure

## It's a communication test wearing a technical costume

Lesson 14 covered the content of an architecture answer. Whiteboarding adds a performance layer on top of it: you can have the right design in your head and still lose the room if you draw in silence, write illegibly, or turn your back on the panel to face the board. The whiteboard is being graded alongside the architecture.

## The mechanics

- **Start high-level, then zoom in.** A box-and-line overview before object-level detail orients the room before you lose them in specifics.
- **Label everything.** Every box and arrow should be readable without you having to explain which shape means what.
- **Show data flow with arrows, and call out integration points explicitly.** The direction of an arrow is doing real communication work — don't leave it ambiguous.
- **Call out security boundaries.** Where does data cross from internal to external? That line should be visible on the board, not just in your head.
- **Explain as you draw, not after.** Silence while drawing reads as uncertainty even when you're confident.
- **Face the room, not the board.** If you're in person, don't turn your back for long stretches. On a shared screen, narrate continuously since there's no body language to fill the silence.
- **Leave space.** A board that's full five minutes in has nowhere to go when the panel asks a follow-up that needs a new element added.

## A repeatable structure to talk through live

1. **Clarify the requirement out loud** — restate what you're being asked to solve, so everyone starts from the same understanding.
2. **Sketch objects and relationships** — the core data model, drawn before anything else.
3. **Add the security model** — who can see what, drawn as boundaries around the objects.
4. **Add integration touchpoints** — where does data enter or leave this picture, and in which direction.
5. **Add automation** — where does logic run, and is it synchronous or asynchronous.
6. **Talk through scale** — what happens to this design once an object holds millions of records, or once integration volume spikes.

## A worked example — fictional

> **This scenario is entirely fictional, created for practice only.**
>
> "Fairmont Logistics" needs a Salesforce design for tracking shipments: a Shipment object tied to a Customer, status updates arriving from an external tracking system via API, and a requirement that drivers (a mix of employees and contracted partners) only see shipments assigned to them.

Walking it in the structure above: clarify first — does "status updates" mean near-real-time or is a scheduled batch acceptable, since that decision changes the integration pattern entirely. Sketch Shipment and Customer as related objects. Add the security model — a sharing rule or criteria-based approach scoped to assignment, with Experience Cloud in the picture if contracted partners aren't full internal users. Add the integration touchpoint — likely an inbound API call or platform event, drawn with a clear arrow and direction. Add automation — a Flow or trigger that updates status and maybe notifies the assigned driver. Then talk through scale — what happens once Shipment holds tens of millions of records, and whether that changes the integration pattern from synchronous to an async/queueing approach.

## Key terms

| Term | Meaning |
|---|---|
| Integration touchpoint | A point where data enters or leaves the Salesforce org from/to an external system |
| Security boundary | The line on a design where access changes — e.g., internal users vs. external partner access |
| Synchronous vs. asynchronous integration | Whether the calling system waits for an immediate response or not |

## Check yourself

Why does the lesson say explaining your design silently and then presenting the finished whiteboard is weaker than narrating continuously while you draw?
