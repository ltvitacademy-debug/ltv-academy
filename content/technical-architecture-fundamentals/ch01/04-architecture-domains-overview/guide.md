# Lesson 4 — Architecture Domains Overview

**Chapter 1 · Thinking Like a Technical Architect · Lesson 4 of 19**

## What you'll learn

- The set of distinct domains a Salesforce technical architect has to reason across, and why no single domain is "the whole job"
- A one-line definition of each domain this course names, so Chapter 3's deep dives have somewhere to attach
- Why domains interact instead of standing alone, with one concrete example of a cross-domain decision
- Why breadth, not depth in any one domain, is the architect's distinguishing skill

## No single domain is the whole job

A Salesforce developer can spend an entire career going deep in one area — Apex performance, Lightning Web Components, API design — and be excellent at the job without needing to be equally strong everywhere else. A technical architect cannot do that. The role is defined by breadth: being capable enough in every domain that affects a solution's integrity to recognize when a decision in one domain creates a problem in another, even if someone else ends up doing the deep technical work in that domain. An architect doesn't need to be the org's best integration engineer — they need to know enough about integration to recognize when a data-architecture decision is about to make integration painful.

## The domains this course names

This course and the rest of the Technical Architect path organize that breadth into five recurring domains, each covered in depth starting in Chapter 3:

- **Data architecture.** How information is modeled, stored, and kept consistent — object and field design, data volume and performance at scale, and how data stays accurate as it moves between systems.
- **Integration architecture.** How this org's data and processes connect to everything else the business runs — other systems, middleware, APIs, and the patterns (real-time vs. batch, synchronous vs. asynchronous) that connection uses.
- **Identity and access management.** Who a user is, how they authenticate, and how that identity is established and trusted across every system involved, not just inside one org.
- **Security and sharing.** Once identity is established, what that identity is actually allowed to see and do — record-level visibility, field-level protection, and the org's broader security posture.
- **Development lifecycle and deployment.** How changes move from an idea to a working feature in production safely — environments, version control, release management, and testing discipline.

A sixth area, **solution architecture**, sits slightly differently: it's less a standalone technical domain and more the practice of weighing trade-offs across all the others for one specific solution. Chapter 4 covers it as its own lesson for exactly that reason.

## Why domains interact

These domains are presented separately because each one has its own body of knowledge, but a real decision almost never stays inside one domain's boundary. Consider a request to let an external partner's system create records directly in Salesforce. That's not purely an integration decision — it immediately raises an identity question (how does the partner authenticate: a named integration user, a connected app, something else), a security question (what should that identity actually be allowed to create or see, following least privilege), and a data-architecture question (will the partner's data volume and shape fit the object model as designed, or does the model need a dedicated staging object). A developer approaching this as "just build the integration" would solve the integration piece and miss the other two. An architect approaching it has to hold all three domains in view before any of them gets built.

## Breadth over depth is the differentiator

This is the practical answer to "what makes someone an architect instead of a very senior developer or admin": not that they know more about any single domain than every specialist in that domain does (they usually don't — a dedicated integration engineer will out-know the architect on integration-specific detail), but that they're the person in the room who can see across all five domains at once and catch the places where an otherwise-good decision in one domain quietly breaks something in another. The rest of this course, and the courses after it in this path, exist to build exactly that breadth, one domain at a time.

## Key terms

| Term | Meaning |
|---|---|
| Data architecture | How information is modeled, stored, and kept consistent across an org |
| Integration architecture | How an org connects to other systems, and the patterns that connection uses |
| Identity and access management | Establishing and trusting who a user is, across every system involved |
| Security and sharing | What an authenticated identity is actually allowed to see and do |
| Development lifecycle and deployment | How changes move safely from idea to production |
| Solution architecture | Weighing trade-offs across all other domains for one specific solution |

## Lab

Take the partner-integration example from this lesson (an external partner's system creating records directly in Salesforce) and extend it one step further: name one additional domain-crossing question it raises involving development lifecycle and deployment — something about how this integration gets tested and released safely — that a purely "build the integration" mindset would likely miss.

## Check yourself

Can you name all five domains this course covers, plus the sixth cross-cutting practice of solution architecture, with a one-line description of each? Can you walk through the partner-integration example and explain which domains it touches and why? Can you explain, in your own words, why breadth rather than single-domain depth is what distinguishes the architect role?
