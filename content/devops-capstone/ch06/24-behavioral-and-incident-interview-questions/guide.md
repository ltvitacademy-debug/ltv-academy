# Behavioral & Incident Interview Questions

This is the stage where technical knowledge stops being enough. Behavioral interviews test how you actually work — under pressure, with teammates, when something breaks — and the strongest way to answer them is the STAR method: Situation, Task, Action, Result. You already lived through the two best stories for this stage during the capstone itself. This lesson turns them into real, rehearsed answers.

## What you'll learn

- The STAR method, and why it beats a rambling narrative every time
- How to turn the flash-sale checkout latency incident into your best "tell me about an incident" answer
- How to turn the near-miss secrets leak into a strong "shift security left" answer
- A few more common behavioral questions and how to approach them using material from the capstone

## The STAR method

**Situation** — one or two sentences of context, no more. **Task** — what you specifically were responsible for. **Action** — what you actually did, in enough technical detail to sound real, but without losing the listener. **Result** — the outcome, quantified if possible, plus what you or the team changed afterward. The failure mode to avoid is spending 80% of your answer on Situation and rushing Result — interviewers remember the Result and the Action, not the backstory.

## Q: "Tell me about a production incident you handled."

This is the single best story from the capstone — use the flash-sale drill, point-for-point.

- **Situation**: "During our capstone's incident drill, checkout's p99 latency spiked from a normal ~400ms to 6.2 seconds during a simulated flash sale."
- **Task**: "I needed to find the root cause fast, using our existing monitoring, without an alert that actually pointed at the real problem."
- **Action**: "I started with the golden signals in our Grafana dashboards — latency, traffic, errors, saturation — and used the USE method to work through utilization, saturation, and errors on each component in the request path. Latency and traffic both spiked together, which pointed downstream rather than at checkout's own code. That led to the external inventory service's database connection pool, which was saturated — every connection in use, new requests queuing behind it. We only had an exhaustion alert that fired after the pool was already maxed out, nothing earlier that would have caught it saturating."
- **Result**: "We wrote a blameless postmortem with two concrete action items: a new saturation alert that fires well before full exhaustion, and a circuit breaker in checkout so a slow downstream dependency degrades gracefully instead of taking checkout down with it. It's the clearest example I have of actually using golden-signal monitoring to find a real root cause under pressure, not just reading a dashboard."

## Q: "Describe a security issue you caught, or a time you 'shifted security left.'"

- **Situation**: "A teammate was about to commit a Helm values file with a real PaymentPro API key in it, destined for our checkout service's config."
- **Task**: "Our gitleaks pre-commit hook and CI scan exist specifically to catch exactly this kind of thing before it reaches git history."
- **Action**: "gitleaks flagged the key pattern at commit time, before it was ever pushed — so there was no need to rotate the key or scrub git history after the fact, which is a much bigger job than catching it at the source."
- **Result**: "It's a clean example of 'shift security left': catching a leak before it becomes an incident is cheaper and faster than cleaning one up afterward, and it's exactly why Northbridge runs gitleaks in both pre-commit and CI rather than relying on just one."

## A few more common behavioral questions

- **"Describe a time you disagreed with a teammate."** Use something concrete from a design decision in the capstone — for example, debating whether checkout's connection pool size or its HPA range should change first after the incident — and focus the Result on how the disagreement actually got resolved, not on who was right.
- **"Tell me about a time you had to learn something quickly."** The capstone itself is full of real examples — Terraform, Helm, Prometheus — pick one and describe the Action concretely (what you read, what you tried, what broke) rather than just "I read the docs."
- **"How do you prioritize when everything feels urgent?"** Reference the incident drill: triage by impact first (customer-facing latency) before chasing secondary issues, and document instead of context-switching.

## Practice checklist

- [ ] Write out the flash-sale incident as a full STAR answer and say it out loud, timed under 2 minutes
- [ ] Write out the secrets near-miss as a full STAR answer
- [ ] Prepare one more STAR story each for "disagreement" and "learning quickly"
- [ ] In every answer, make sure Result gets at least as much time as Situation
