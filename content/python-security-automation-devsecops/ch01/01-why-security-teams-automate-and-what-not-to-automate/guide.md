# Lesson 1 — Why Security Teams Automate, and What Not to Automate

**Chapter 1 · Python for Security Automation Fundamentals · Lesson 1 of 4**

## What you'll learn

- The real reasons SOC and security-engineering teams reach for Python automation —
  and the specific kinds of toil it actually solves
- A concrete framework for deciding whether a task is safe to automate, versus one
  that still needs a human making a judgment call
- Why automating the *wrong* decision can be worse than doing nothing — real
  failure patterns from alert-to-action pipelines
- How this course is structured: scripting that sits alongside the SOAR platforms,
  SIEM queries, and cloud consoles you already know from earlier courses

## Why automate at all

By this point in the path you've worked inside Sentinel, Defender XDR, and cloud
security tooling that already has automation built in — playbooks, Logic Apps,
EventBridge rules. So why learn to write your own Python on top of that?

Because platform-native automation stops exactly at the edge of what the vendor
anticipated. The moment you need to join data from two tools that don't talk to
each other, reshape a CSV export into the JSON your ticketing system expects, or
run the same enrichment step against three hundred IOCs before 9 a.m., you're
writing a script — not clicking through a wizard. Security teams that automate
well are not trying to replace analysts; they're trying to get repetitive,
well-defined, high-volume work out of analysts' hands so the analysts have time
for the part of the job that actually requires a human: judgment under
uncertainty.

The tasks that make the best automation candidates share three traits:

1. **High volume, low variance.** The same basic steps, run hundreds or
   thousands of times a day — looking up a hash against a threat-intel feed,
   pulling the last 24 hours of sign-in logs for a flagged user, closing out a
   known-benign alert pattern that a tuning rule hasn't caught yet.
2. **A clear, deterministic decision rule.** "If this hash matches a known-bad
   indicator with high confidence, tag the alert and attach the intel" is a rule
   a script can apply consistently, at 3 a.m., without getting tired.
3. **Low blast radius if it's wrong.** Enriching an alert with extra context, or
   drafting a ticket for a human to review, fails safely — worst case, someone
   reads unnecessary context. Compare that to an action that changes system
   state.

## What not to automate

The failure mode that gets written up in post-incident reviews almost never
looks like "the script had a bug." It looks like "the script did exactly what
it was told, and what it was told to do was wrong for this specific case."

Avoid fully automating:

- **Irreversible or high-blast-radius actions** — disabling a production
  account, isolating a host that turns out to be a domain controller, blocking
  an IP range that includes a business partner. These need a human
  in the loop, even if a script prepares the action and a person clicks
  "approve."
- **Decisions with ambiguous or conflicting signals.** If an alert could
  plausibly be a false positive *or* a real incident depending on context the
  script doesn't have — a pen test in progress, a legitimate but unusual admin
  task — don't let a script resolve that ambiguity on its own.
- **Anything where the cost of a false positive is asymmetric with the cost of
  a false negative in a way the script can't weigh.** A script that
  auto-closes alerts to reduce queue volume is optimizing for the wrong thing
  if it's quietly closing the 1-in-500 that was real.
- **Novel or first-seen situations.** Automation encodes what you already
  understand. A brand-new attack pattern is, by definition, something your
  rules weren't written for yet.

A useful test before you automate a step: *if this automation is wrong, who
notices, how fast, and what does it cost?* If the honest answer is "nobody
notices until a customer calls," that step needs a human checkpoint, not a
fire-and-forget script.

## The pattern this course teaches: automate the pipeline, gate the action

Most of the scripts you'll write in this course follow the same shape: Python
does the unglamorous, high-volume work — parsing, enrichment, correlation,
formatting — and hands a human (or a well-tested SOAR workflow with its own
approval gate) a clean, decision-ready package. That's a different goal than
"remove the human." It's "make the human's decision faster and better
informed." Keep that distinction in mind through the rest of this chapter,
where you'll parse real log formats, work with threat-intel data standards,
and call REST APIs — all building blocks for that kind of pipeline, not for
autonomous response.

## Key terms

| Term | Meaning |
|---|---|
| Automation candidate | A task that is high-volume, governed by a clear deterministic rule, and low-risk if it's wrong |
| Human-in-the-loop | A workflow where automation prepares or recommends an action but a person approves it before it takes effect |
| Blast radius | How much damage an action causes if it turns out to be the wrong action |
| Fire-and-forget automation | A script that takes an action with no human checkpoint — appropriate only for low-blast-radius, well-understood cases |

## Check yourself

You're ready for Lesson 2 when you can name two real examples from your own
SOC experience: one task you'd happily hand to a script with no human review,
and one task that absolutely needs a person in the loop — and explain, in your
own words, why the blast radius is different between them.
