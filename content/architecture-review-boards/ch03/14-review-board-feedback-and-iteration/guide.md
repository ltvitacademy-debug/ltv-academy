# Lesson 14 — Review Board Feedback and Iteration

**Chapter 3 · Practice · Lesson 14 of 14**

## What you'll learn

- How real review boards typically deliver feedback, and why it's rarely a single pass/fail verdict with no detail
- How Salesforce's own CTA program reports results by domain rather than a single overall score, and what that structure implies for how to improve
- A structured debrief method to run after any mock or real review, so feedback actually changes the next attempt
- The difference between feedback about your design and feedback about your performance, and why both matter separately
- How this lesson closes the loop back to Chapter 1's first lesson on what a board actually evaluates

## Feedback is rarely a single verdict

A well-run review board, including Salesforce's CTA program by multiple accounts (see this lesson's sourcing), doesn't just hand back a pass or fail with no further detail — it evaluates and reports against the same specific domains the board used to run the session in the first place (recall Lesson 1's evaluation domains: system architecture, security, data, integration, solution architecture, communication, and others depending on the specific program). This matters practically: a result broken down by domain tells you exactly where to focus next, in a way a single overall score never could. Treating a review's outcome as just "pass" or "fail" throws away the most useful part of the result.

## How the CTA program structures this

Training sources describe the CTA review board scoring each of several domains independently, with a minimum bar for each one that must be met to pass that domain, and the program allowing a candidate who fails only one domain to retake a smaller, more targeted scenario focused on that specific gap rather than redoing the entire multi-hour board from scratch. Whatever the exact current mechanics (and, consistent with this course's earlier hedging, those specifics should be checked against Salesforce's own current candidate guide), the underlying principle is worth internalizing regardless of which specific review process you're ever actually subject to: a partial result that names the specific gap is far more useful than an undifferentiated failure, because it tells you precisely what to practice next instead of leaving you to guess.

## A structured debrief for any review, mock or real

After any review — a real board, a mock simulation from Lessons 11 through 13, or informal feedback from a colleague — run a short, structured debrief rather than just absorbing the feedback passively:

1. **Sort feedback by domain**, using the same categories the board itself evaluates against, so patterns across multiple pieces of feedback become visible instead of staying scattered.
2. **Separate design feedback from performance feedback.** "Your data model didn't account for X" is a design gap; "you ran out of time before covering your tradeoffs" is a performance gap. They need different fixes — one means revisiting the actual architecture, the other means revisiting your time budget and rehearsal (Lesson 8).
3. **Identify the single highest-leverage gap**, not every gap at once. Trying to fix everything before the next attempt usually means fixing nothing well; one clearly identified priority, addressed thoroughly, beats five vague intentions.
4. **Write down what you'd do differently**, specifically and concretely enough that future-you, reading it cold before the next attempt, would actually know what to change.

## Design feedback versus performance feedback

It's tempting to treat all critical feedback as one undifferentiated category, but the two kinds point to genuinely different fixes. A design gap means your solution itself needs to change — a missing control, an unconsidered failure mode, a requirement you didn't actually satisfy. A performance gap means the solution might have been fine, but how you presented, defended, or paced it fell short — this course's Chapters 1 and 2 exist specifically to address this second category. Conflating the two means you might rebuild a design that was actually sound, or keep presenting a flawed design more smoothly, neither of which is the actual fix needed.

## Closing the loop back to Lesson 1

This course opened by establishing what an ARB evaluates and why it exists. Having worked through presenting, structuring, defending, performing under live pressure, and now practicing and debriefing full simulations, the loop closes here: every piece of feedback you'll ever get from a real board maps back to one of those original evaluation domains. A structured debrief habit, run consistently after every practice attempt and, eventually, every real review, is what turns this course's material into an improving skill rather than a one-time read.

## Key terms

| Term | Meaning |
|---|---|
| Domain-structured feedback | Review results reported against the specific evaluation categories the board used, rather than a single undifferentiated pass/fail |
| Design gap | A feedback point requiring an actual change to the solution itself |
| Performance gap | A feedback point about presentation, defense, or pacing, where the underlying design may have been sound |
| Highest-leverage gap | The single most impactful issue to address before the next attempt, prioritized over trying to fix everything at once |

## Lab

Take the debrief notes you wrote in Lesson 11's lab (and, if completed, Lessons 12 and 13's labs). Run the four-step structured debrief from this lesson on that combined material: sort every piece of feedback you gave yourself by domain, separate each into a design gap or a performance gap, identify the single highest-leverage gap across everything, and write two or three concrete sentences describing exactly what you'd do differently in your next simulation.

## Check yourself

Can you explain why a domain-structured result is more useful than a single pass/fail verdict, using the CTA program's section-retake approach as an example? Can you distinguish a design gap from a performance gap with an example of each from your own practice? Can you explain why identifying one highest-leverage gap, rather than listing every gap at once, is the better way to prepare for your next attempt?
