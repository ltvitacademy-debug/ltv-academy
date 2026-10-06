# Lesson 25 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 5 · Capstone · Lesson 25 of 25**

## What you'll learn

- How to turn four capstone deliverables into one coherent portfolio piece
- What an interviewer or hiring manager actually wants to see when you present this work
- How to talk about the project's limitations without undercutting it
- Where this course's discipline goes next, now that you've applied all of it once yourself

## Four deliverables aren't a portfolio piece yet

Lesson 24 left you with an eval dataset, a monitoring setup, an incident response plan, and a model card — four separate files. A portfolio piece is the narrative that connects them: not "here are four documents," but "here's a problem, here's how I made sure it worked, here's how I'd know if it stopped working, and here's what I'd do about it." That narrative is what actually gets read.

## What to actually present

A five-minute walkthrough, in this order, covers everything that matters:

```text
1. The feature  — one sentence: what it does, for whom
2. The eval      — show 2-3 cases, including a hard one
                    that initially failed or was close
3. The monitoring — the one chart; what it would catch
4. The incident plan — the failure mode, and the real
                    trigger that would catch it
5. The model card — the one caveat you're most honest about
```

Notice what's not on that list: a claim that the system is perfect. The strongest signal in a capstone presentation is showing a case that failed and what you changed because of it — that's the actual skill this course has been building, not "I built something that never breaks."

## Talking about limitations without undercutting the work

There's a real difference between "this has a limitation" and "this doesn't really work." Framing matters: "the eval set caught that it mishandles refund amounts above $500, so the incident response plan treats that as the primary failure mode to watch for" is a stronger statement than either hiding the weakness or apologizing for it. It demonstrates exactly the discipline this course is about — not an AI system with no flaws, but a process that finds flaws before a user does.

## Where this goes from here

This course closes Chapters 1 through 5 of production AI discipline: the risks (Chapter 1), the evals (Chapter 2), the monitoring (Chapter 3), the governance (Chapter 4), and now one real pipeline you built yourself (Chapter 5). The next course in this path, **AI Engineering Capstones**, is where that same discipline gets applied at full scale — larger, more complete projects built across the whole AI Engineer path, not just this course's techniques in isolation.

## Key terms

| Term | Meaning |
|---|---|
| Portfolio narrative | The connective story across deliverables, not the deliverables alone |
| Honest limitation | A specific, named weakness paired with the control that catches it |

## Lab

Write the five-minute walkthrough script above for your actual capstone, filling in each of the five lines with one real sentence from your own project. Practice saying it out loud once before you consider the capstone finished.

## Check yourself

Can you explain why a capstone presentation that includes one honest, specific failure is a stronger portfolio piece than one that claims the system worked perfectly on every case?
