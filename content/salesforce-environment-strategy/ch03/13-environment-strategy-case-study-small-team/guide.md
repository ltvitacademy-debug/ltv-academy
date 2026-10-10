# Lesson 13 — Environment Strategy Case Study: Small Team

**Chapter 3 · Practice · Lesson 13 of 14**

## What you'll learn

- How to apply this course's full environment strategy to a realistic, small-scale org
- Why a small team's strategy should be simpler than the course's full promotion path, not identical to it
- How to size sandbox types, refresh cadence, and access to an actual team size and risk profile
- Where it's reasonable for a small team to consciously accept more risk than a large enterprise would
- How to defend a simplified design, not just describe it

## The scenario

Meridian Supply Co. runs Salesforce Sales Cloud and Service Cloud for a 15-person company: 8 sales reps, 4 support agents, 2 admins who split configuration work, and one outside consultant who helps a few hours a week with more complex Flow and integration work. They're on Enterprise Edition. Today, everyone — admins and the consultant — shares one Developer sandbox for everything: building, testing, and training new hires. They've had two incidents in the last quarter where one person's in-progress changes broke something another person was actively working on.

## Applying the chapter's concepts at the right scale

A small team doesn't need — and shouldn't build — a scaled-down copy of an enterprise's full environment sprawl. The right design question isn't "how do we get more environments," it's "which of this course's environments actually earns its cost at this size." For Meridian, a reasonable, deliberately simple design:

- **Development:** Two Developer sandboxes (Lesson 3) — not one shared — so the two admins stop colliding with each other's in-progress work (Lesson 2's isolation principle). The consultant uses one of these for their project work rather than getting separate standing access, since their work is occasional and metadata-only.
- **Testing:** A single Partial Copy sandbox (Lesson 5), refreshed before any release that touches a meaningful amount of configuration, serving as the one place both admins validate changes against realistic (not full) data before anything reaches production.
- **Staging:** Deliberately **skipped** as a separate tier. At this size, a full dedicated staging environment is a cost this team's release volume doesn't justify — instead, the Partial Copy testing sandbox also serves as the final check immediately before a release, accepting a small amount of the risk a true Full-sandbox staging tier would otherwise catch (this is the explicit trade-off, not an oversight).
- **Production:** Unchanged from Lesson 7's principles — no direct building in production, changes promoted in through change sets reviewed by the other admin before deploying.

## Sizing refresh cadence and access to the team

Given the minimum refresh intervals from Lesson 8, the Partial Copy testing sandbox (5-day minimum) can reasonably refresh roughly every two weeks, timed before planned releases rather than on a fixed daily or weekly clock this team doesn't generate enough change volume to need. Access (Lesson 11) should be scoped tightly given the team's size: the two admins and the consultant on the Development sandboxes, and the two admins only on the Testing sandbox, since the consultant's work is almost always metadata-level and doesn't need to touch even sampled real data.

## Where this design accepts risk, on purpose

A good case-study answer doesn't just describe a design — it names the risk the design knowingly accepts. Here, that's skipping a dedicated staging tier: Meridian is accepting that a bug which only shows up against full production data volume (Lesson 6's governor-limit example) could reach production undetected. For a 15-person org without batch jobs running against millions of records, that's a defensible bet; it would not be a defensible bet for the enterprise case study in the next lesson.

## Key terms

| Term | Meaning |
|---|---|
| Right-sized environment strategy | A design that matches environment count and type to actual team size and risk, not a scaled-down copy of a larger org's design |
| Consciously accepted risk | A gap in a strategy that's explicitly named and justified, rather than an unexamined oversight |

## Lab

Meridian's team grows to 40 people over the next year, adding a second support queue and its first dedicated QA hire. Using this lesson's design as your starting point, identify the single most likely first change you'd make to this environment strategy as the team crosses that growth threshold, and explain specifically what risk that change addresses that the original 15-person design could still afford to accept.

## Check yourself

Can you explain why this lesson's design for Meridian deliberately skips a dedicated staging tier, and what risk that choice knowingly accepts? Can you justify, using this course's earlier lessons, why giving the consultant Development-tier access but not Testing-tier access is the right scoping decision here?
