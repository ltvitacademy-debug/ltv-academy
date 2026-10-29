# Lesson 26 — The Real Tension Between Reliability and Feature Velocity

**Chapter 7 · Building an SRE Practice and Culture · Lesson 2 of 4**

## What you'll learn

- Why reliability work and feature work are in genuine, structural
  competition for the same engineering time — not a philosophical
  disagreement that good intentions can resolve
- How an error budget turns that competition into a quantified,
  negotiated tradeoff instead of a political argument
- What it looks like, concretely, when a team is spending its error
  budget too fast, and what changes as a result
- What it looks like when a team has budget to spare, and why that's
  also a real decision, not just good luck
- Why treating "error budget" as a slogan instead of an operating
  mechanism is the single most common way this practice fails

## The competition is structural, not personal

Every hour an engineer spends hardening a retry path, adding a
circuit breaker, or chasing down a flaky dependency is an hour not
spent shipping the next feature. This isn't a result of one team
caring less about quality or another caring too much about shipping
— it's a fixed-capacity problem. A given team has a finite number of
engineering hours in a quarter, and reliability work and feature work
both draw from that same pool. Pretending this tension doesn't exist,
or resolving it by fiat every time ("just do both"), doesn't make the
capacity problem go away — it just means the tradeoff gets made
implicitly, inconsistently, and usually in favor of whichever
pressure is loudest that week.

## The error budget makes the tradeoff visible and negotiated

This is the actual contribution of the error budget concept from
Google's SRE book, and it's a mechanism, not a slogan. If a service's
SLO is 99.9% availability over 30 days, the error budget is the
0.1% of allowed unreliability — a concrete, spendable quantity. As
long as the team is operating within that budget, they have an
explicit, agreed-upon license to take risks: ship faster, run
experiments, defer some hardening work, because the data shows they
can afford it. The moment the budget is nearly exhausted, the same
data says the opposite: slow down, prioritize the reliability fix,
delay the risky launch. Nobody has to argue about whether the team
is "being too reckless" or "too conservative" — the budget already
answers that question with a number both sides agreed to in advance.

## What spending the budget too fast actually triggers

In a team that's actually using error budgets, burning through the
budget early in the measurement period isn't a crisis to be managed
quietly — it's a pre-agreed trigger. Feature launches that would add
risk get paused. The next sprint's priority shifts toward the
reliability work that's actually causing the burn. This isn't a
punishment for the team; it's the system working as designed,
because everyone agreed in advance that this is what "spent too
fast" means and what happens next. Teams that skip this step — that
track the error budget but never actually let it stop a launch —
have the dashboard without the practice, and they're the ones who
rediscover the tension the hard way during the next outage.

## What a healthy budget actually licenses

The flip side matters just as much and gets ignored more often: a
team sitting comfortably inside its error budget has real,
data-backed permission to take more risk, not just a passive "good
job." That's an active decision — greenlighting a riskier launch,
deprioritizing a reliability investment that the data says isn't
needed yet, reallocating that freed-up time toward features. Treating
a healthy budget as something to just bank quietly, rather than as a
signal to actually ship faster, wastes the other half of what the
mechanism is for.

## Key terms

| Term | Meaning |
|---|---|
| Error budget | The quantified amount of allowed unreliability (100% minus the SLO) that a team is explicitly permitted to spend |
| Budget burn | The rate at which a team is consuming its error budget within a measurement period |
| Budget-triggered pause | A pre-agreed consequence — pausing risky launches, reprioritizing toward reliability work — when burn crosses an agreed threshold |
| Budget surplus | Remaining error budget that licenses more risk-taking, not just a passive good outcome to note and move past |

## Check yourself

You're ready for the next lesson when you can explain, without
looking: why is the competition between reliability work and feature
velocity structural rather than a matter of attitude, and what
specifically has to happen — not just be tracked — for an error
budget to actually resolve that tension instead of just describing it?
