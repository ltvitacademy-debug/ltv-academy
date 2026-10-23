# Lesson 3 — Architecture Decision Records for ServiceNow

**Chapter 1 · What a Technical Architect Actually Does · Lesson 3 of 32**

## What you'll learn

- What an Architecture Decision Record (ADR) is, and why it's a standard practice across the whole
  software industry, not something specific to ServiceNow
- The three parts every real ADR captures: context, options considered, and the reasoning behind
  the choice made
- The real, practical problem ADRs solve — decisions getting second-guessed by people who never knew
  the original constraints
- How to apply this practice to ServiceNow architecture decisions, starting now, before Chapter 2

## A record of why, not just what

Every instance accumulates decisions: why this instance wasn't split into two, why a particular
integration pattern was chosen over an alternative, why a data model was shaped a certain way. Most
of those decisions get made in a meeting, maybe written up in a slide, and then the reasoning
evaporates. What survives is just the outcome — the instance is one instance, the integration uses
IntegrationHub, the data model looks like this — with no record of *why*.

An **Architecture Decision Record (ADR)** is a standard, structured, written record that captures a
significant architecture decision properly: it names the problem or situation that prompted the
decision (the **context**), lists the real alternatives that were actually considered (the
**options**), and explains the reasoning behind the option that was chosen (the **decision** and its
**consequences**). This is a widely used practice across the software industry generally — it isn't
a ServiceNow-specific idea, and that's worth knowing, because it means the discipline of writing ADRs
is a transferable skill you'll use on any platform you architect for.

## The three parts, concretely

```
Architecture Decision Record — minimal structure:

Context:      What situation or problem made this decision necessary?
              (e.g., two business units need separate SLAs and change windows)

Options:      What real alternatives were weighed?
              (e.g., Option A: single instance with domain separation
               Option B: two instances with a shared CMDB sync
               Option C: single instance, separate scoped apps per unit)

Decision:     Which option was chosen, and why — the actual reasoning,
              not just the conclusion.

Consequences: What this decision makes easier, harder, or impossible
              going forward — stated honestly, including the downsides.
```

Notice that "Options" is not optional padding — recording the alternatives that were *rejected*,
and why, is often the most valuable part of the record. It's what lets a future reader understand
that an apparently odd choice wasn't an oversight; it was a tradeoff against a specific alternative
that had its own real problems.

## The real problem ADRs solve

Here's the practical failure mode ADRs exist to prevent: three years after a decision is made, a
new architect — or the original one, having forgotten the details — looks at the current setup and
thinks, "this looks wrong, why did we do it this way?" Without a record, that question has no good
answer. The constraints that justified the original decision (a vendor limitation that existed at
the time, a budget constraint, a timeline pressure, a now-retired integration that used to depend on
this) are gone from memory. The result is a real, common problem: a sound decision gets reversed or
"fixed" by someone who never knew why it was made, often reintroducing the exact problem the original
decision solved.

An ADR prevents that by giving the context a durable home, separate from any one person's memory.
Anyone joining the team later can read not just *what* was decided, but *why* — and can judge for
themselves whether the original constraints still hold before touching the decision.

## Writing ADRs for ServiceNow architecture decisions

Nothing about the ADR format is ServiceNow-specific, but the decisions you'll write ADRs for on this
platform are: instance strategy, integration patterns, domain separation choices, data model
decisions, security architecture, and governance models — exactly the categories this course covers
starting in Chapter 2. As you work through those chapters, treat each significant decision as a
candidate for its own ADR: name the context honestly, record the real options you considered (even
the ones you rejected), and write the reasoning down while you still remember it — because the whole
value of the record depends on capturing that reasoning before it's gone.

## Key terms

| Term | Meaning |
|---|---|
| Architecture Decision Record (ADR) | A structured, written record of a significant architecture decision: its context, options, decision, and consequences |
| Context | The situation or problem that made the decision necessary |
| Options considered | The real alternatives weighed, including the ones rejected |
| Consequences | What a decision makes easier, harder, or impossible going forward, stated honestly |

## Check yourself

A colleague wants to "fix" a two-year-old decision to use domain separation instead of a second
instance, calling it overly complex. What would you want an ADR for that original decision to tell
you before agreeing the decision should be reversed?
