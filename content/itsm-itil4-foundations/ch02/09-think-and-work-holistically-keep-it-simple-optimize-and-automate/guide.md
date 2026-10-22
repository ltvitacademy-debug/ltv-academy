# Lesson 9 — Think Holistically, Keep It Simple, Optimize & Automate

**Chapter 2 · The ITIL 4 Guiding Principles · Lesson 9 of 28**

## What you'll learn

- "Think and Work Holistically" — why no service, practice, or team stands alone
- "Keep It Simple and Practical" — when to eliminate or simplify instead of adding
- "Optimize and Automate" — why optimizing has to come before automating, not after
- How all three of these final principles work together to close out the set of seven
- Why this chapter ends with three principles instead of covering each at full length

## Think and Work Holistically

No service, practice, or team operates in isolation. A change to one part of the Service
Value System — a new tool for the service desk, a revised approval step in change
enablement — ripples outward into other practices and value streams whether anyone planned
for that or not. Thinking holistically means recognizing this complexity deliberately,
rather than being surprised by it. In practice, that means asking who else is touched by a
given change before making it: a new field added to an incident form affects reporting,
affects the knowledge base article template, and affects whatever automation already reads
that form's data. None of those effects are exotic — they're just easy to miss if a team only
looks at its own corner of the system.

## Keep It Simple and Practical

If a process step, a metric, or a report doesn't add value, the right response is to
eliminate or simplify it, not defend it because it already exists. ITIL 4 explicitly favors
using the minimum number of steps needed to accomplish an objective. This is where Keep It
Simple connects directly back to Focus on Value from earlier in this chapter — complexity
that doesn't trace to a real benefit for the service consumer is a cost with no offsetting
return. A five-approval sign-off chain for a low-risk change isn't more careful than a
one-approval chain; it's usually just slower, with the extra approvers rubber-stamping
something they don't have the context to meaningfully evaluate.

## Optimize and Automate — in that order

Optimize and Automate is explicit about sequencing: optimize a process first, then automate
it — never the reverse. Automating a process that's fundamentally broken just makes the
broken process execute faster and fail more consistently. A manual approval step that exists
only because of a tool limitation that's since been fixed shouldn't be automated into
permanence; it should be removed. Automation is genuinely valuable for high-volume,
repeatable, well-defined work — routing routine service requests, auto-escalating overdue
tickets, running a standard health check — but only once that work has been assessed and
streamlined, which is exactly what Start Where You Are and Keep It Simple set up earlier in
the sequence of principles.

## How the final three principles reinforce the first four

These three principles close out the set because they depend on everything that came before
them. You can't think holistically about a service you haven't actually investigated, which
is Start Where You Are. You can't simplify confidently without visibility into what a process
actually does, which is Collaborate and Promote Visibility. And you can't automate safely
without the feedback loops that Progress Iteratively With Feedback establishes to catch a bad
assumption before it's locked into code. The seven guiding principles were designed to be used
together, applied in combination to any decision, rather than picked one at a time.

## Key terms

| Term | Meaning |
|---|---|
| Think and Work Holistically | Recognizing that no service, practice, or team stands alone, and accounting for ripple effects across the system |
| Keep It Simple and Practical | Using the minimum steps needed to achieve an objective, and eliminating anything that doesn't add value |
| Optimize and Automate | Streamlining a process before automating it, since automation only accelerates whatever it's applied to, good or bad |
| Value stream | The series of steps an organization uses to create and deliver value, which holistic thinking tracks across its full span |

## Check yourself

You're ready for Chapter 3 when you can explain, without looking: why does Optimize and
Automate insist on that specific order, and what happens when an organization automates a
process it never actually optimized first?
