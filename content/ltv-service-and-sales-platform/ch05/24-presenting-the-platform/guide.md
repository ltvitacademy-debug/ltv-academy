# Lesson 24 — Presenting the Platform

**Chapter 5 · Wrap-Up · Lesson 24 of 25**

## What you'll learn

- How to structure a presentation for a mixed technical/business audience like Renata, Priya, and Dmitri together
- The specific architecture-defense questions a Technical Architect ladder presentation should expect
- How to use the ADRs from Lesson 21 to answer "why" questions with evidence, not improvisation
- The difference between presenting to this capstone's audience and the Architecture Review Board defense in the next course

## One presentation, three different audiences in the room

Renata, Priya, and Dmitri are in the same room for this presentation, but they're not listening for the same thing. Renata wants to know the platform solves the business problem and was built responsibly. Priya wants to see the architecture decisions were deliberate and defensible. Dmitri wants to confirm his team's actual daily workflow — the job board, the warranty claim process — works the way they need it to. A presentation structured as "here's the data model, here's the Apex, here's the LWC" talks to Priya for the whole time and loses the other two. The better structure follows Lesson 23's demo narrative first — the one warranty-repair story, which every audience can follow — and only afterward opens a dedicated "how it's built" section for Priya's architecture-level questions.

## Structuring the presentation

| Section | Audience it serves | Content |
|---|---|---|
| The business problem | Renata | Why Solstice needed a combined service-and-sales platform, in one or two sentences, referencing Lesson 1's scenario |
| The live demo | Everyone | Lesson 23's six-step narrative, run live |
| Architecture highlights | Priya | Two or three of the ADRs from Lesson 21, chosen for their genuine trade-offs, not a tour of every file |
| What's next | Everyone | The known technical debt from Lesson 22's retrospective, framed as a deliberate roadmap, not an apology |

## Defending architecture decisions

Priya's questions during this presentation are rehearsal for the kind of defense a real Technical Architect role requires. Expect direct challenges to specific decisions, not just "walk me through what you built":

- *"Why Queueable and not Platform Events for the warranty submission?"* — answerable directly from ADR-004 (Lesson 21): Platform Events were considered and rejected as unnecessary complexity for a same-org need.
- *"What happens if the manufacturer's API is down for an hour?"* — answerable from Lesson 15's retry-with-a-cap design: a transient failure retries a fixed number of times, then the claim is flagged for manual follow-up rather than retried forever.
- *"Why didn't you just make everything public and simplify the security model?"* — answerable from Lesson 4: four distinct user types with genuinely different visibility needs, where "everything public" would expose Opportunity pipeline value and warranty claim amounts to people who shouldn't see them.

Each of these has a real, specific, already-written answer because the ADRs and earlier lessons' reasoning already exist — the presentation doesn't require improvising a justification on the spot, it requires having actually done the design work the earlier lessons asked for.

## How this differs from the Architecture Review Board defense ahead

This capstone's presentation is a project review among people who already know the business context. The next course in this path, the enterprise transformation capstone, ends in a formal **Architecture Review Board** defense — a panel presentation where the design has to be justified to architects who weren't involved in building it and will actively look for weaknesses, at the scale of a full enterprise transformation rather than one platform. The skills are the same — defend a decision with evidence, not assertion — but the audience, the stakes, and the scale both go up considerably in that next course.

## Key terms

| Term | Meaning |
|---|---|
| Mixed audience | A presentation audience with genuinely different interests (business, architecture, operational) in the same room |
| Architecture defense | Answering direct challenges to a specific design decision with evidence |
| Architecture Review Board | A formal panel review of an architecture, covered in the next course in this path |

## Lab

Build the four-section presentation outline above for your own version of this platform. Write out full answers to the three example architecture-defense questions above, each one citing the specific ADR or lesson it's drawn from, and rehearse delivering them without reading from notes.

## Check yourself

- Why does this presentation lead with the demo narrative before the architecture section, rather than the reverse?
- Where does the answer to "why Queueable and not Platform Events" actually come from?
- How does this presentation's audience and stakes differ from the Architecture Review Board defense in the next course?
