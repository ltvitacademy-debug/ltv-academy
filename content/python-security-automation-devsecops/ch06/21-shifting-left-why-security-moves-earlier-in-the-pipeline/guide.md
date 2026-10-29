# Lesson 21 — Shifting Left: Why Security Moves Earlier in the Pipeline

**Chapter 6 · DevSecOps Fundamentals · Lesson 1 of 4**

## What you'll learn

- What "shifting left" actually means on a software delivery timeline, and
  which stages it moves security checks into
- Why the same vulnerability costs dramatically more to fix the later it's
  found — in concrete terms of who has to get involved and what has to
  happen
- How the old model (one security review, right before release) breaks down
  under modern release cadence
- Where this chapter is headed: SAST, dependency scanning, DAST, container
  scanning, and gates that fail builds without burying developers in noise

## The old model, and why it stopped working

For a long time, "security" in a software project meant one thing: a
security team reviewed the application shortly before it shipped, usually
through a manual assessment or a scheduled penetration test. That model
made a certain kind of sense when releases happened a few times a year. It
makes much less sense when a team ships to production multiple times a
day — there's no longer a single, convenient "before release" moment to
gate everything on, and a security team sitting at the very end of the
pipeline becomes the thing that makes every release late.

**Shifting left** means moving security checks earlier on the timeline —
left, if you draw the software development lifecycle (SDLC) as a line from
design on the left to production on the right. Instead of one review at the
end, checks run continuously: in the editor as code is written, in a
pre-commit hook before it's even pushed, in the CI pipeline on every pull
request, against a running test deployment before promotion, and against
the built artifact before it ever reaches a registry. Security stops being
a gate one team owns at the end and becomes a set of automated checks woven
through the same pipeline developers already use.

## Why timing changes the cost so much

The dollar cost of fixing a given vulnerability is debated and varies by
organization, but the *shape* of the cost curve is not controversial, and
it's worth tracing through concretely:

- **Found in the editor or code review.** The developer who wrote the code
  is right there, the context is fresh, and the fix is a small diff before
  anything is even committed. Cost: minutes.
- **Found in CI, on a pull request.** The build fails, the developer gets a
  clear annotation pointing at the line, and they fix it before merging.
  Cost: a short delay, still within the same work session.
- **Found in a staging environment, after merge.** Now someone has to
  reproduce the issue, trace it back through the commits that landed since
  the last clean scan, write a fix, and re-run the whole deployment
  pipeline. Cost: hours, and it may involve more than one person.
- **Found in production.** This is no longer a code-review conversation.
  It's an incident: someone has to assess whether the vulnerability was
  exploited, prepare and test a hotfix, get emergency approval to deploy
  outside the normal release cadence, possibly roll back a release that
  shipped other, unrelated work along with the bad code, and — depending on
  what the vulnerability exposed — notify customers or regulators. The
  original developer may not even remember writing the line in question.

Every stage adds people, process, and risk that the previous stage didn't
have. That's the real argument for shifting left: it's not that production
bugs are impossible to fix, it's that fixing them pulls in far more of the
organization, far later, when there's far less room to be wrong.

## What this chapter builds toward

This chapter stays practical. Lesson 22 covers **SAST** (static analysis
that reads source code without running it) and **dependency scanning**
(checking the open-source packages your code imports against known
vulnerabilities) — both run on every commit, before anything deploys.
Lesson 23 covers **DAST** (testing a real, running application from the
outside) and **container image scanning** (checking a built image for
vulnerable OS packages) — both run later, closer to deployment, catching a
different category of problem than static checks can. Lesson 24 ties it
together with the hardest part in practice: setting gates so a pipeline
fails builds on real, serious findings — without drowning every single
build in low-value noise that developers learn to ignore.

```yaml
# A minimal illustration of "shifting left" in a GitHub Actions workflow:
# a security step runs on every pull request, before merge is even possible.
name: pr-checks
on:
  pull_request:
    branches: [main]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run static analysis
        run: echo "SAST and dependency scans run here — Lesson 22"
```

## Key terms

| Term | Meaning |
|---|---|
| Shift left | Moving security checks earlier in the SDLC — into the editor, commit, and build stages — instead of only at a pre-release review |
| SDLC | Software Development Lifecycle: the stages code moves through from design to production |
| DevSecOps | Folding security checks into the same CI/CD pipeline and tooling developers already use, rather than a separate end-of-cycle gate |
| Pre-commit hook | A check that runs locally before a commit is created, catching issues before they even reach source control |

## Check yourself

You're ready for Lesson 22 when you can explain, in your own words, why a
vulnerability found in production costs more than the same vulnerability
found in code review — not just "it costs more," but specifically *who*
gets pulled in and *what additional steps* have to happen that wouldn't
have been needed earlier.
