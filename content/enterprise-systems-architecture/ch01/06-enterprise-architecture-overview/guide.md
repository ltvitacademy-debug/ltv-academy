# Lesson 6 — Enterprise Architecture Overview

**Chapter 1 · Salesforce in the Enterprise · Lesson 6 of 22**

## What you'll learn

- The four architecture layers (business, data, application, technology) that enterprise architecture traditionally organizes around
- Where Salesforce System Architecture fits inside that larger discipline
- Why enterprise architecture starts with business strategy, not with systems
- How this lesson closes out Chapter 1 and sets up Chapter 2's enterprise concerns

## A discipline bigger than any one platform

**Enterprise Architecture (EA)** is the discipline of aligning an organization's technology landscape with its business strategy — making sure the systems, data, and applications a company runs actually serve what the business is trying to accomplish, rather than existing as a disconnected pile of tools that happened to get bought over the years. EA predates Salesforce, predates cloud computing, and applies just as much to a company with zero CRM as to one running a sophisticated Salesforce implementation. Understanding it matters because a System Architect isn't inventing a new discipline — they're applying an existing one, enterprise architecture, specifically to how Salesforce fits into that picture.

## Four layers, one throughline

Most enterprise architecture approaches organize their work into a small number of layers, commonly described as:

- **Business architecture.** The organization's strategy, goals, processes, and organizational structure — the "why" layer. What is the business actually trying to achieve, and how is it organized to do it?
- **Data architecture.** How information is structured, stored, and governed across the organization — the master data, systems of record, and data flows this chapter has already introduced.
- **Application architecture.** The individual applications (Salesforce among them) and how each one supports specific business capabilities.
- **Technology architecture.** The underlying infrastructure, platforms, and technical standards that applications run on.

The throughline that connects all four is that each layer exists to serve the one above it: technology serves applications, applications serve data needs, and all of it ultimately serves the business architecture's goals. An application architecture decision that's elegant in isolation but doesn't trace back to an actual business goal is a sign the layers have become disconnected from each other.

## Business strategy comes first

A common mistake is starting an architecture conversation at the technology or application layer — "what can Salesforce do" — instead of the business layer — "what is the business actually trying to achieve, and does this system genuinely serve that." Enterprise architecture insists on the opposite order: business strategy and goals come first, and every lower layer's decisions should be traceable back up to one of those goals. A System Architect proposing an integration, a data model change, or a new system boundary should always be able to answer "which business goal does this serve" — if the honest answer is "none, it just seemed like good practice," that's a sign the work has drifted from its purpose.

## Where this chapter leaves off

Chapter 1 has built the vocabulary a System Architect needs to talk about Salesforce's place in the enterprise: the external systems around it, the systems-of-record and systems-of-engagement distinction, integration boundaries, master data ownership, and now the broader enterprise architecture discipline all of that sits inside. Chapter 2, Enterprise Concerns, builds on this foundation to cover the cross-cutting concerns — security, governance, frameworks, vendor strategy, and multi-org decisions — that apply across everything this chapter introduced.

## Key terms

| Term | Meaning |
|---|---|
| Enterprise Architecture (EA) | The discipline of aligning an organization's technology landscape with its business strategy |
| Business architecture | The layer covering strategy, goals, processes, and organizational structure |
| Data architecture | The layer covering how information is structured, stored, and governed |
| Application architecture | The layer covering individual applications and the business capabilities they support |
| Technology architecture | The layer covering underlying infrastructure and technical standards |

## Lab

Pick one real or plausible Salesforce initiative (for example: "add a new approval process for discounted deals" or "build a customer self-service portal"). Write one sentence describing which business architecture goal it should trace back to. Then write one sentence each for how it touches the data, application, and technology layers. If you can't articulate a believable business-layer justification for the initiative, say so, and explain what that would suggest about the initiative.

## Check yourself

Can you name the four enterprise architecture layers in order, from business down to technology? Can you explain, with an example, why "what can Salesforce do" is the wrong starting question for an enterprise architecture conversation, and what the right starting question is instead?
