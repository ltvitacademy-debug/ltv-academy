# Lesson 3 — Structuring a Presentation

**Chapter 1 · The Review Board · Lesson 3 of 14**

## What you'll learn

- A repeatable five-part structure for an architecture review presentation
- How to budget time across that structure before you ever stand up
- Why the "deep dive" section should cover only your most load-bearing decisions, not everything
- How to end a presentation in a way that sets up Q&A instead of just stopping
- The specific trap of a structure that looks organized but doesn't actually serve the board's evaluation

## A five-part structure that holds up under pressure

Lesson 2 established that presenting is a distinct skill from designing. This lesson gives you a concrete structure to hang that skill on, so you're never deciding what to say next in the moment — a question that's especially expensive to answer live, under time pressure, in front of a panel. A structure that works for most architecture review formats:

1. **Context and requirements** — the business problem, the real constraints, and the explicit list of requirements your design has to satisfy.
2. **High-level architecture** — one diagram showing the whole system at a level anyone in the room can follow, before you zoom into any one part.
3. **Deep dives on load-bearing decisions** — two or three decisions that the whole design actually depends on, each explained with its alternatives and why you didn't pick them.
4. **Tradeoffs and risks** — what you explicitly chose not to optimize for, and what risk that leaves on the table, stated by you before a reviewer has to surface it.
5. **Close and roadmap** — a short summary of the recommendation and, if relevant, what comes next (phasing, open questions, dependencies outside your control).

## Budget your time before you build your slides

A presentation with no time budget drifts: the opening runs long because it's comfortable, and the close gets rushed or cut entirely because the clock ran out — which is exactly backwards, since the close is where you plant the recommendation the board walks away remembering. Before building content, allocate a rough percentage of your available time to each of the five sections (context typically needs less time than people give it; deep dives need more), and treat that budget as a planning tool you adjust in rehearsal, not a rule you're reciting live. The goal isn't clock-watching during the real presentation — it's having rehearsed enough that the real timing already feels natural.

## Deep dives: pick your battles, not your whole design

The single most common structural mistake is trying to walk through every component with equal depth. A review board has limited time and will remember three things, maybe four. If you spend equal time on a load-bearing data model decision and an unremarkable choice of naming convention, you've spent your limited attention budget on the wrong things, and worse, you've signaled to the board that you can't tell the difference between the two — which invites exactly the kind of "why did you spend so long on that" question you don't want. Identify your two or three decisions that the rest of the design actually depends on (if you changed this one thing, would large parts of the rest of the design have to change too?) and give those the real depth: the alternatives you considered, the specific requirement or constraint that drove your choice, and the tradeoff you accepted.

## Surface your own tradeoffs before the board does

A presentation that implies the design has no weaknesses is not credible to an experienced panel — every real design has tradeoffs, and a board that has reviewed dozens of designs knows this. Naming your own tradeoffs and risks explicitly, before anyone asks, does two things: it demonstrates that you actually understand your own design's limits (a credibility signal boards weight heavily), and it takes the air out of a line of questioning a reviewer might otherwise use to test whether you'd admit a weakness under pressure. This doesn't mean manufacturing fake weaknesses to seem humble — it means being honest about the real ones you already know about.

## Closing in a way that sets up Q&A

Ending with "that's my design" leaves the board to figure out on their own what you actually want them to take away. A stronger close restates the recommendation in one sentence, names the one or two things you'd want to validate further if given more time (which often preempts exactly the questions coming next), and stops — rather than trailing off into new content that should have been in the deep dive. This isn't about rushing the end; it's about ending on your own terms instead of just running out of material.

## Key terms

| Term | Meaning |
|---|---|
| Context and requirements | The opening section establishing the business problem and the constraints the design has to satisfy |
| Load-bearing decision | A design choice significant enough that much of the rest of the architecture depends on it |
| Time budget | A pre-planned rough allocation of presentation time across sections, refined through rehearsal |
| Surfaced tradeoff | A design limitation or risk the presenter names proactively, rather than waiting for a reviewer to find it |

## Lab

Using the retailer order-management scenario from Lesson 1's lab (or your own known project), draft a five-part time budget for a 20-minute presentation slot: write down the minutes you'd allocate to each of the five sections and one sentence justifying why. Then identify the two load-bearing decisions you'd deep-dive on for that scenario, and one tradeoff for each that you'd state proactively before the board asks.

## Check yourself

Can you name the five-part structure from memory and explain what each section is for? Can you explain why giving every component equal depth is actually a worse strategy than deliberately deep-diving only two or three decisions? Can you describe what makes a close "set up Q&A" rather than just end the presentation?
