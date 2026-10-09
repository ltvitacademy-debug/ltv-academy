# SDLC: Dev, QA, UAT & Production

A finished card on a Kanban board isn't the same thing as a change that's safely live for real
users. Between "I wrote the code" and "customers are using it" sits a chain of environments, each
one answering a different question about whether the change is actually safe to ship.

## What you'll learn

- The four environments almost every IT change passes through
- What question each environment actually answers
- What happens inside Dev before a change ever reaches QA

![How a technical change becomes safe for real users: DEV (develop and debug) leads to QA (test functionality) leads to UAT (business approves) leads to PROD (live users) — summarized as Build, then Verify, then Accept, then Release.](/courses/how-it-teams-work/ch01/04-sdlc-dev-qa-uat-and-production/dev-qa-uat-prod.png)

## Four environments, four questions

**Dev (Development)** is where a change is written and debugged — this is the developer's own
workspace, often not even shared with the rest of the team yet. The question Dev answers is simply
"does this work at all?"

**QA (Quality Assurance)** is where the change is tested systematically — a QA engineer or an
automated test suite runs it against expected behavior, edge cases, and anything it might have
broken elsewhere. QA answers "does this work correctly, including cases the developer didn't
think of?"

**UAT (User Acceptance Testing)** is where the actual business — the person or team who requested
the change — tries it out and confirms it does what they asked for. This is a different question
from QA's: code can be technically correct and still not be what the business actually needed. UAT
answers "is this what we actually wanted?"

**Production (Prod)** is the real, live system real users and customers depend on. Nothing reaches
Production until it has cleared every environment before it — that's the whole point of the
chain. Production answers "is this safe and correct enough to bet the business on?"

## Inside the Dev stage: a ticket's journey

The DEV → QA → UAT → PROD diagram above compresses a lot of real steps into one box. Here's what
actually happens before a change ever leaves Dev and reaches QA:

![Inside the Dev stage, a ticket's journey: Ticket Assigned (picked up from the sprint backlog), Branch Created (work happens isolated from the main codebase), Code Review (a teammate reviews the pull request), Merged to QA (automated and manual testing begins), UAT Sign-Off (the business confirms it meets the request), Deployed (released to production for real users).](/courses/how-it-teams-work/ch01/04-sdlc-dev-qa-uat-and-production/tickets-journey.png)

Notice that **Code Review** sits inside the Dev stage, before QA ever sees the change — a
teammate reads the pull request and checks the approach, not just whether it runs. This is a
second set of eyes before the change moves anywhere, and it's normal for a reviewer to send work
back for changes before it's allowed to merge.

## Who's actually responsible at each stage

Each environment also has a different person — or kind of person — in the driver's seat:

![Who's actually involved, one environment, one owner: Dev is owned by the developer who wrote the change, QA by a QA engineer or an automated test suite, UAT by the business stakeholder who requested the change, and Production by everyone — real users, and whoever's on call if it breaks.](/courses/how-it-teams-work/ch01/04-sdlc-dev-qa-uat-and-production/environment-ownership.png)

This is a useful map for a new hire specifically: if a change is broken in Dev, that's the
developer's own problem to fix before it goes anywhere. If it's broken in QA, that's a QA
engineer's or a test suite's job to have caught. If the business rejects it in UAT, that's not a
bug — it's a sign the requirements, not the code, need another look. And once something is in
Production, it's everyone's problem, which is exactly why the chain exists in the first place.

## Why the chain matters, even when it feels slow

A junior engineer's first instinct is often "my change works on my machine, why can't it just go
live?" The answer is that "works on my machine" has only answered Dev's question — none of QA's,
UAT's, or Production's. Real organizations often add more stages on top of this baseline — a
separate staging environment, security scans, a change-advisory board — but DEV → QA → UAT → PROD
is the shape underneath almost all of them.

## Key terms

| Term | Meaning |
|---|---|
| Dev | The environment where a change is written and debugged — answers "does this work at all?" |
| QA | The environment where a change is tested systematically — answers "does this work correctly?" |
| UAT | User Acceptance Testing — the business confirms the change does what they actually asked for |
| Production | The live environment real users depend on — nothing reaches it until every prior stage has passed |
| Code review | A teammate reviewing a pull request's approach and correctness before it merges, inside the Dev stage |

## Check yourself

QA and UAT both involve testing a change before it ships. What different question does each one
actually answer, and why can't one replace the other?
