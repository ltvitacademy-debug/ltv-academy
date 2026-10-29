# Lesson 32 — Chapter Capstone: Platform Engineering and GitOps Review

**Chapter 8 · Capstone: Building an Internal Developer Platform · Lesson 32 of 32**

## What you'll learn

- How this capstone's golden-path template, progressive-delivery lab, and platform-adoption
  case study pulled on every one of this course's seven earlier chapters, not just the two
  labs' own topics
- What each chapter actually contributed, as a decision you watched play out, not a list of
  chapter titles
- Why this course closes without naming a single "next course" — and which three Expert
  Specialization courses it stands beside instead
- What the whole arc of this course adds up to, as a job skill rather than a tool list

## The whole course, not just this chapter

This capstone used every chapter that came before it. **Chapter 1** is why "platform as a
product," golden paths, and measuring whether a platform helps weren't new vocabulary when
Lesson 31's case study needed them — Northfield Retail's three failures are Chapter 1's
warnings, played out concretely. **Chapter 2** is the entire foundation of Lesson 29: the
software catalog and the scaffolder template weren't invented for this capstone, they're
Chapter 2's `catalog-info.yaml` and `template.yaml` concepts, extended into a real, runnable
golden path with CI/CD and monitoring already wired in.

## GitOps and its practice, carrying both labs

**Chapter 3** is why Git-as-source-of-truth, pull-based reconciliation, and drift detection
needed no re-introduction when Lesson 30 wired a `Rollout` and an `AnalysisTemplate` into the
same GitOps repo — that vocabulary was already settled. **Chapter 4** is more directly present
than any other chapter: the directory-per-environment overlay structure from Lesson 15 is
exactly what Lesson 29's `fs:rename` step seeded for the new service, and the `Application`
reconciliation model from Lesson 13 is exactly what let Lesson 30's canary stay "still GitOps,
start to finish" even while traffic shifted and rolled back automatically.

## Advanced CI/CD, pipelines at scale, and what gets measured

**Chapter 5**'s canary and progressive-delivery concepts are the entire mechanism Lesson 30
made real with Argo Rollouts and an automated error-rate check — a `pause` with nothing behind
it is just a timer; Chapter 5 is why there was an `AnalysisTemplate` behind it instead.
**Chapter 6** is why Lesson 29's golden-path template extends a shared pipeline template rather
than inventing its own CI/CD from scratch — a reusable pipeline, versioned and rolled out
safely, is what lets one fix reach every service built from that template. **Chapter 7** is the
chapter Lesson 31's case study runs on directly: Northfield's first failure was never
instrumenting the platform or its users' experience, which is precisely what Chapter 7 teaches
a real platform team to do from day one, not six months after a quiet launch.

## What this capstone proved

Across four lessons, this capstone built one real golden-path template that scaffolds a new
service with its pipeline, its monitoring, and its catalog entry already correct; wired a
GitOps-driven canary rollout for that service with automated rollback on a real metric,
entirely inside the reconciliation model from Chapter 4; and examined, through an illustrative
scenario, what happens when all of that technical work is done correctly and adoption still
doesn't follow — because the feedback loop, the earned adoption, and the golden path's actual
fit to real teams were missing. That's the real job of platform engineering: not just building
a correct platform, but building one that earns the adoption it needs to matter.

## What's next

This course — Advanced Platform Engineering, GitOps & CI/CD — is complete, and it closes
differently than most courses in this path. It's the first of four **Expert Specialization**
courses that all build on the earlier Advanced Specialization stage but not on each other, so
there is no single "next course" — a student can take any of the remaining three next, in
whatever order fits their goals: **Hybrid & Multi-Cloud Enterprise Architecture**, **AI Cloud
Infrastructure, GPU Computing & MLOps**, or **Advanced SRE, Disaster Recovery & Resilience**.

## Key terms

| Term | Meaning |
|---|---|
| Golden path | A paved, self-service path to a new service that already has CI/CD, monitoring, and a deploy path wired in — built in Chapter 2, proven real in Lesson 29 |
| GitOps reconciliation | The pull-based model from Chapters 3 and 4 that let Lesson 30's canary and rollback stay entirely visible in Git and ArgoCD |
| Earned adoption | A platform chosen because it's measurably better for its users, not mandated — the gap Lesson 31's case study illustrates |
| Expert Specialization | This path's current stage; four courses that build on Advanced Specialization but not on each other, so order doesn't matter |

## Check yourself

Name one decision from this capstone that only worked because of something taught in an
**earlier chapter** of this course, not Chapter 8 itself. What was the decision, and which
chapter made it possible?

## Course complete

Advanced Platform Engineering, GitOps & CI/CD is done: eight chapters covering platform
fundamentals, developer self-service, GitOps principles and practice, advanced CI/CD,
pipeline-as-code at scale, platform observability, and this capstone — proven on one real
golden path and one real progressive-delivery rollout, and tested against a scenario where the
technical work alone wasn't enough. This course can be followed next by any of the other three
Expert Specialization courses, in any order: **Hybrid & Multi-Cloud Enterprise Architecture**,
**AI Cloud Infrastructure, GPU Computing & MLOps**, or **Advanced SRE, Disaster Recovery &
Resilience**.
