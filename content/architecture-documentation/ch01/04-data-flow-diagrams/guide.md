# Lesson 4 — Data-Flow Diagrams

**Chapter 1 · Documenting Architecture · Lesson 4 of 17**

## What you'll learn

- The four notation elements of a data-flow diagram (DFD): process, data store, external entity, data flow
- How "leveling" lets a DFD zoom from a whole system down to one sub-process
- How to draw a DFD for a realistic Salesforce scenario, like lead routing or order fulfillment
- How a DFD differs from the system context diagram (Lesson 3) and the sequence diagram (Lesson 5)

## Four shapes, one question: where does the data go?

A **data-flow diagram** answers a narrower question than a system context diagram: not "what does this system touch" but "as data moves through this process, what transforms it, where does it get stored, and where does it go next." DFD notation (in the common Gane-Sarson style) uses four elements:

- **External entity** (a square or rectangle): something outside the process being described that sends data in or receives data out — a person, a role, or another system. Drawn the same way a context diagram draws an external actor, but now in service of tracing one specific flow rather than the whole system's boundary.
- **Process** (a rounded box or circle): something that transforms data — a Flow, a trigger, a batch job, or a human task like "sales manager reviews discount request."
- **Data store** (an open-ended rectangle): somewhere data is held at rest — a Salesforce object, a staging table, a file.
- **Data flow** (a labeled arrow): the actual movement of a named piece of data from one of the other three elements to another.

A DFD never connects two data stores directly, and never connects two external entities directly — data always moves through a process. If a diagram seems to need a direct store-to-store arrow, that's a sign a process step is missing from the picture, not a case for breaking the rule.

## Leveling: zooming from the whole picture to one step

A single DFD at full detail for an entire business process is usually unreadable. The standard fix is **leveling**: start with a **context-level DFD** — the entire process as one process bubble, with only the external entities and overall flows in and out, essentially the data-flow equivalent of Lesson 3's system context diagram. Then draw a **Level 0 DFD** that explodes that one bubble into its major sub-processes. If any sub-process is still complex enough to need it, a **Level 1 DFD** explodes that sub-process further. Each level shows more detail than the one above it, but a reader can stop at whatever level answers their question — an executive reads Level 0, an implementer reads Level 1.

## A worked example: lead routing

**Context level:** one process bubble, "Lead Routing," with "Marketing Platform" as an external entity flowing "New Lead" in, and "Sales Rep" as an external entity receiving "Assigned Lead" out.

**Level 0** explodes "Lead Routing" into its real steps: Marketing Platform → (New Lead data) → *Create Lead record* (a process) → writes to *Lead object* (a data store) → *Apply assignment rule* (a process, reading from the Lead data store and a *Territory data store*) → *Update Lead Owner* (a process, writing back to the Lead data store) → (Assigned Lead notification) → Sales Rep.

This Level 0 diagram tells a reader far more than the context diagram did — there's a real assignment-rule step reading territory data, a real update-back-to-the-record step — without yet descending into exactly how the assignment rule logic works internally, which would be a Level 1 diagram if the business needed that much detail documented.

## DFD vs. context diagram vs. sequence diagram

These three diagram types are easy to blur together, and each answers a genuinely different question:

| Diagram | Question it answers | Shows timing/order? |
|---|---|---|
| System context diagram (Lesson 3) | What does this whole system touch? | No |
| Data-flow diagram (this lesson) | As data moves through a process, what transforms and stores it? | No — shows flow, not sequence |
| Sequence diagram (Lesson 5) | In what exact order do calls happen during one transaction? | Yes — this is its entire purpose |

A DFD is deliberately silent on timing and order — two flows drawn on the same DFD might happen seconds apart or might happen in a batch overnight; the diagram doesn't say. When the exact order and timing of calls matters — for instance, documenting an integration's request/response sequence — that's what Lesson 5's sequence diagram is for.

## Key terms

| Term | Meaning |
|---|---|
| Data-flow diagram (DFD) | A diagram showing how data moves between processes, data stores, and external entities |
| External entity | A person, role, or outside system that sends data into or receives data out of the process |
| Process | An element of a DFD that transforms data (automation, batch job, or human task) |
| Data store | Somewhere data is held at rest, such as a Salesforce object |
| Leveling | Drawing the same process at increasing levels of detail — context, Level 0, Level 1 — so each audience can stop at the depth they need |

## Lab

Draw a Level 0 DFD for this order-fulfillment scenario: a Customer (external entity) submits an order through a self-service portal; an *Order Validation* process checks inventory against an *Inventory data store*; a valid order is written to an *Order data store*; a *Fulfillment Trigger* process reads the new Order record and sends a "Pick Ticket" data flow to a Warehouse System (external entity). Identify all four DFD element types in your diagram and make sure no data store connects directly to another data store or external entity.

## Check yourself

Can you name the four DFD notation elements and the rule about what can and can't connect directly? Can you explain what "leveling" buys a documentation set that a single fixed-detail diagram can't? Can you explain, without rereading, why a DFD and a sequence diagram answer different questions even though both describe data moving through a system?
