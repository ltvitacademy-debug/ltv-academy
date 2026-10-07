# Capstone: Wrap-Up & Portfolio Presentation

A working dashboard with no story around it is a screenshot. The same dashboard with a clear write-up, an architecture sketch, and a two-minute explanation of your design decisions is a portfolio piece an interviewer remembers. This final lesson is about packaging the work you built in Lesson 30 so it actually gets you credit for it.

## What you'll learn

- What belongs in a capstone write-up, and what to leave out
- How to sketch your service's observability architecture so it reads in ten seconds
- How to talk through this project in a technical interview, including the hard questions
- How this capstone connects back to everything from Chapter 1 onward

## The write-up: what to include

Keep it to roughly one page. It should cover:

- **What the service does** — one or two sentences, no more. The interviewer doesn't need the full product spec.
- **What you instrumented and why** — your golden signals, and the specific reasoning behind picking them for this service.
- **One real decision you made, and the trade-off** — for example, why you chose a particular alert threshold, or why you alerted on latency but not on a secondary signal you considered and decided wasn't worth the noise. This is the part that actually demonstrates judgment, not just following a checklist.
- **What you'd do next** — an honest note on what's missing (maybe you'd add tracing across a second dependency, or a synthetic check). Admitting scope limits is a sign of maturity, not a weakness to hide.

## A simple architecture sketch

You don't need a polished diagramming tool. A clear block diagram showing your service, its one dependency, where metrics/logs/traces flow, and where your dashboard and alerts sit is enough:

```
[Client] -> [Your Service] -> [Dependency: DB/API]
                |                     |
          metrics+logs+trace    (span continues)
                v
        [Prometheus/CloudWatch]
                v
        [Grafana Dashboard] -> [Alerts -> you]
```

This single picture does more work in an interview than three paragraphs of description — lead with it, then explain the boxes.

## Presenting it in an interview

When asked to walk through a project like this, structure your answer the same way a good postmortem is structured: what it does, what you measured and why, one real decision with its trade-off, and what you'd improve next. Expect and prepare for follow-up questions like: "How did you decide on that threshold?" "What happens if the alert fires and it's a false positive?" "What would you add if this had to handle 10x the traffic?" You don't need perfect answers — you need to show you understand the trade-offs, the same way you learned to analyze them throughout this course.

## Full circle

This capstone used everything from the course: golden signals and the three pillars (Chapter 1), a real monitoring stack (Chapters 2–4), structured logging and tracing (Chapter 5), and the troubleshooting and alerting discipline from Chapter 6 — applied to your own build instead of Northbridge's. That's the whole point of a capstone: not learning something new, but proving you can put everything together without a script to follow.

## Key terms

- **Portfolio write-up** — a short document explaining what you built, why, and what trade-offs you made
- **Architecture sketch** — a simple block diagram showing data flow from service to dashboard to alert
- **Design trade-off** — a specific decision you made and the reasoning behind choosing it over an alternative
