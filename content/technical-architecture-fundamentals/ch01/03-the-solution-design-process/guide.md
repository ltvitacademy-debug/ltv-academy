# Lesson 3 — The Solution Design Process

**Chapter 1 · Thinking Like a Technical Architect · Lesson 3 of 19**

## What you'll learn

- The five-stage arc a solution design typically moves through, from a gathered requirement to a build-ready design
- Why skipping straight from requirement to configuration is the single most common architecture mistake
- What "options analysis" means and why an architect should usually arrive with more than one option
- How this process scales down for a small change and up for a multi-system initiative, without changing shape

## Why a process, and not just "figure it out"

An experienced admin can often look at a requirement and jump straight to the right field, the right automation tool, the right object relationship — and be correct most of the time. The solution design process exists for the cases where jumping straight to an answer is wrong, and for making sure even the "obviously right" answer was actually checked rather than assumed. It's a repeatable sequence precisely because architecture decisions are expensive to reverse once built, and a process that forces a few extra minutes of thinking up front is cheap insurance against months of rework later.

## The five stages

**1. Clarify the requirement.** Before any design work starts, confirm the requirement itself is the real one — this is where Lesson 2's why-ladder work has already happened, or happens now if it hasn't. A design built against a misunderstood requirement is wasted effort no matter how good the design itself is.

**2. Explore the solution space.** List the realistic ways the requirement could be met — not just the first idea, but the real alternatives. For a "flag unhappy customers" requirement, that might include a formula field, a validation-triggered process, a scheduled batch job, or a change to how a support metric already gets calculated upstream. This stage deliberately resists settling on an answer yet.

**3. Evaluate options against constraints.** Each option from stage two gets weighed against what actually matters for this solution: cost, maintainability, how it performs at this org's real data volume, how it interacts with existing automation, and how much new complexity it adds. This is where "options analysis" happens — explicitly writing down at least two viable options and their trade-offs, rather than silently picking one and presenting it as the only choice.

**4. Decide and document.** Pick the option that best fits the weighed trade-offs, and write down not just the decision but the reasoning — what was chosen, what the alternatives were, and why they lost. This record matters later: six months from now, when someone asks "why does this work this way," the documented reasoning is what prevents the answer from being "nobody remembers."

**5. Validate before building.** Walk the chosen design past the people who raised the original requirement, confirming it actually satisfies what they need, before a developer or admin spends real time implementing it. Catching a misunderstanding here costs a conversation; catching it after the build costs a rebuild.

## The mistake this process prevents

The most common failure in solution design is collapsing stages two and three into stage one — going straight from "here's the requirement" to "here's the field I'm adding," with no options ever considered and no trade-off ever written down. That shortcut isn't always wrong in its outcome, but it's always wrong as a process, because there is no way to tell, after the fact, whether the chosen approach was actually the best one or just the first one anyone thought of. An architect who always arrives at a design review with only one option, and no record of what else was considered, hasn't done architecture — they've done configuration with extra confidence.

## The process scales, it doesn't change shape

For a one-field change, these five stages might take ten minutes and live entirely in the architect's head, maybe with two lines in a ticket. For a multi-system data migration affecting three departments, the same five stages might take weeks, with a formal options-analysis document and a steering-committee sign-off at stage four. The stages themselves don't change — clarify, explore, evaluate, decide, validate is the same sequence either way — only the amount of ceremony and documentation scales with how much is at stake if the decision turns out wrong.

## Key terms

| Term | Meaning |
|---|---|
| Solution design process | The repeatable sequence from clarified requirement to a validated, build-ready design |
| Solution space | The full realistic set of ways a requirement could be met, before narrowing to one |
| Options analysis | Explicitly comparing at least two viable options against relevant constraints before deciding |
| Design validation | Confirming a chosen design with the original requesters before implementation begins |

## Lab

Take this requirement: "The support team needs to know, at a glance, which open cases have gone more than 48 hours without a customer reply." Run it through all five stages on paper: write one plausible alternative solution beyond the obvious one, list one real trade-off between your two options, pick one and state why, and describe what you'd check with the support team before handing it to a developer to build.

## Check yourself

Can you name the five stages of the solution design process in order? Can you explain, with an example, what "options analysis" means and why arriving with only one option is a warning sign? Can you explain why the same five-stage process applies to both a ten-minute change and a multi-week initiative?
