# Lesson 2 — Platform as a Product: Treating Developers as Customers

**Chapter 1 · Platform Engineering Fundamentals · Lesson 2 of 4**

## What you'll learn

- Why "platform as a product" is a specific operating model, not a
  slogan — and what changes in practice when a platform team adopts it
- Who the platform's real customers are, and why that answer determines
  almost everything else about how the team should run
- The failure mode of mandate-driven platforms: technically mandatory,
  practically avoided
- Team Topologies' **X-as-a-Service** interaction mode, and what it
  requires of a platform team that a collaboration mode doesn't

## "Platform as a product" is an operating model, not a slogan

Lesson 1 established what an Internal Developer Platform is for:
absorbing cognitive load that would otherwise sit on every
stream-aligned team. This lesson is about *how* a platform team has to
run in order to actually deliver that, because building the right
capability once and then never touching it again doesn't work —
needs change, teams change, and a platform that doesn't keep adapting
to its users quietly turns into exactly the kind of brittle, unloved
infrastructure it was supposed to replace.

"Platform as a product" means applying real product-management
discipline *internally*: understanding who uses the platform and why,
maintaining an actual roadmap instead of a backlog of tickets, shipping
iteratively, and — critically — building in a feedback loop that
changes what gets built next. It is the same discipline a company
applies to a product it sells externally, pointed inward at the
engineers who have to use what the platform team ships.

## The platform's customers are internal, but they're still customers

In this model, the stream-aligned teams and individual developers who
use the platform are the platform team's customers — not administrators
they fall under, not a population they regulate. That reframing has
real consequences. A product team that ignores what its customers need
loses them to a competitor; a platform team that ignores what its
internal customers need doesn't lose them in the same way, because
there's rarely a competing internal platform to switch to. Instead, it
loses them to **shadow infrastructure** — developers quietly building
their own workarounds, provisioning their own resources outside the
platform, or just not adopting what was built. The mandate didn't stop
existing; it just stopped being followed where it's inconvenient.

That's the core failure mode this lesson names directly: a platform
that is technically mandatory but practically avoided. Usage numbers
can look fine on a dashboard while real adoption, measured by whether
teams actually route their day-to-day work through the platform instead
of around it, is quietly collapsing. Product thinking is the corrective,
because a product team can't assume adoption — it has to earn it, the
same way an external product does.

## What product thinking looks like for a platform team, concretely

- **User research, not guesswork.** Talk to the stream-aligned teams
  about what's actually slowing them down, instead of assuming the
  platform team already knows.
- **A roadmap driven by real pain points**, prioritized the way a
  product backlog is — not just whatever the platform team finds
  technically interesting to build next.
- **Feedback channels that actually change outcomes** — if every piece
  of developer feedback disappears into a backlog that never gets acted
  on, the feedback loop isn't real, it's theater.
- **Iteration after launch.** A golden path or a self-service template
  (this chapter's next topic) ships as a first version, not a finished
  artifact, and gets revised based on how teams actually use it.

## X-as-a-Service: the interaction mode this requires

Team Topologies names the specific way a platform team should relate
to the teams it serves: **X-as-a-Service**. The platform exposes a
well-defined, self-service interface — an API, a template, a portal —
that other teams consume directly, with minimal ongoing hand-holding.
This is deliberately different from *collaboration mode*, where two
teams work closely together on a shared problem, and from *facilitating
mode*, where one team actively helps unblock another's unrelated
technical debt. X-as-a-Service only works if the interface itself is
good enough that teams don't need to escalate to a human on the
platform team every time — which is precisely why product discipline,
and the feedback loop that keeps improving that interface, isn't
optional polish. It's the mechanism that makes the self-service promise
actually hold up under real use.

## Key terms

| Term | Meaning |
|---|---|
| Platform as a product | Applying product-management discipline — user research, roadmap, iteration, feedback — to an internally-consumed platform |
| Shadow infrastructure | Workarounds developers build when a platform doesn't meet their real needs, even if using the platform is nominally mandatory |
| X-as-a-Service | Team Topologies' interaction mode where a platform exposes a self-service interface that other teams consume with minimal hand-holding |
| Adoption vs. mandate | The gap between "teams are required to use it" and "teams actually route real work through it instead of around it" |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
can a platform's usage dashboard look healthy while real adoption is
quietly failing, and what does the X-as-a-Service interaction mode
require of a platform team that collaboration mode doesn't?
