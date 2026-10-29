# Lesson 28 — Scaling an SRE Team as the Organization Grows

**Chapter 7 · Building an SRE Practice and Culture · Lesson 4 of 4**

## What you'll learn

- Why the SRE structure that worked for a single pilot team breaks
  down as the number of services and teams grows
- What the embedded SRE model actually looks like, and its real
  tradeoffs
- What a centralized SRE org actually looks like, and its real
  tradeoffs
- Why most organizations that scale successfully end up with some
  hybrid of the two, not a pure version of either
- What has to change about SRE practice itself — not just team
  structure — as headcount and service count both climb

## The pilot's structure doesn't scale on its own

A single pilot team with one SRE embedded directly in it works well
precisely because it's small: one service, one set of SLOs, one
group of engineers who all know each other. The moment an
organization has ten services wanting the same kind of support, that
structure has to change deliberately, or it fails quietly — either
every product team hires its own SRE and ends up duplicating tooling
and practice with no consistency between teams, or the practice stays
confined to the original pilot team and never actually scales past
it. Google's SRE book and the follow-up Site Reliability Workbook
both describe this as a real organizational design problem, not just
a headcount question.

## The embedded model

In the embedded model, SRE engineers are assigned directly to a
specific product team or service, working alongside its developers
day to day. The advantage is deep context: the embedded SRE
understands this service's specific failure modes, its traffic
patterns, its particular operational history, because they live
inside it. The real tradeoff is that this depth comes at the cost of
breadth and leverage — practices and tooling tend to diverge between
embedded SREs on different teams unless something actively prevents
that, and an embedded SRE can slowly drift into being "the ops person
for this team" rather than someone driving SRE practice, especially
under pressure from a team that just wants an extra pair of hands.

## The centralized model

In the centralized model, SRE sits as its own organization —
sometimes structured like a platform team — providing shared
tooling, standards, and often an on-call or escalation layer across
many services at once, rather than being assigned permanently inside
any one product team. The advantage is leverage: one well-built
internal SLO dashboard, one incident-response tooling investment, one
consistent definition of what a postmortem requires, applied across
every team that adopts it, instead of being rebuilt N times. The real
tradeoff is distance — a centralized SRE org can lose the close,
specific context that makes an embedded SRE effective on any one
service, and product teams can start to see "SRE" as an outside
auditor rather than a partner, especially if the centralized team is
stretched thin across too many services to engage deeply with any of
them.

## Why most real organizations end up hybrid

In practice, the organizations that scale SRE well tend to land on a
hybrid: a central team builds and maintains the shared platform —
SLO tooling, incident tooling, postmortem standards, training — while
embedded or product-aligned SRE presence (sometimes a rotating
assignment rather than a permanent headcount) applies that platform
to each specific service's real operational reality. This isn't a
compromise born of indecision; it's matching each part of the
practice to the structure that actually serves it; shared
infrastructure benefits from central leverage, while service-specific
judgment benefits from proximity.

## What has to change about the practice itself

Scaling isn't only an org-chart question. As the number of services
grows, self-service tooling becomes essential — a team defining its
own SLO through a standard, well-documented platform rather than
needing a dedicated SRE to hand-build one from scratch, because
linear headcount growth with service count simply doesn't work past a
certain scale. The organizations that scale well invest deliberately
in that self-service layer precisely so the central or embedded SRE
capacity they do have can focus on genuinely hard problems instead of
being consumed rebuilding the same dashboard for the fiftieth team.

## Key terms

| Term | Meaning |
|---|---|
| Embedded SRE model | SRE engineers assigned directly to one product team, trading breadth/consistency for deep service-specific context |
| Centralized SRE org | A shared SRE organization providing platform, tooling, and standards across many teams, trading closeness for leverage |
| Hybrid model | A central platform team plus product-aligned or rotating SRE presence, matching each part of the practice to its best-fit structure |
| Self-service SRE tooling | Platform tooling that lets a product team define and operate its own SLOs without needing a dedicated SRE for every service, required once headcount can't scale linearly with service count |

## Check yourself

You're ready for the chapter capstone when you can explain, without
looking: what specific capability does an embedded SRE model trade
away for its deep service context, what does a centralized model
trade away for its leverage, and why does self-service tooling become
necessary rather than optional once service count outpaces SRE
headcount growth?
