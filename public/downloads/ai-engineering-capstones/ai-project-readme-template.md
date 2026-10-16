# AI Project README Template

Built from the five-part presentation structure this course uses across Lessons 7, 12, 18, and 20: problem, architecture, safety/key decisions, demo, and known limitations. A reviewer should be able to answer "what does this do, how well does it work, and what would I ask about in an interview" without running any code.

---

# <Project Name>

**One-sentence description:** `<what this system does and who it's for>`

**Live demo / recording:** `<link, near the top — per Lesson 20, don't bury this>`

## The problem

`<what question or task couldn't be handled without this tool — state one real scenario plainly, per Lesson 12>`

## Architecture

```
<ASCII or Mermaid diagram of the moving pieces — ingest -> chunk -> embed ->
retrieve -> generate, or tools -> approval checkpoint -> execution -> logging,
whichever applies to this project>
```

`<two or three sentences describing how data flows between the pieces above>`

## Key design decisions

List two or three decisions here — this is the section Lesson 20 says most influences a hiring decision, because a reviewer can run your code but can't read your reasoning anywhere else.

- `<decision>` — `<why, in one sentence>`
- `<decision>` — `<why, in one sentence>`
- `<decision>` — `<why, in one sentence>`

## Safety / correctness decisions

(Required for Project 2 and Project 3 — the part most portfolio projects skip and most interviewers actually probe, per Lesson 12.)

- `<e.g. why a dedicated read-only database role>`
- `<e.g. why pre-execution validation in addition to least-privilege access>`
- `<e.g. why the approval checkpoint sits before execution, not after>`

## Evaluation results

| Metric | Baseline | After tuning |
|---|---|---|
| | | |
| | | |

Test set size: `<n>`. State the number plainly — per Lesson 20, a number a reviewer can question is more credible than an adjective they can't.

## How to run it

```bash
docker build -t <project-name> .
docker run -e ANTHROPIC_API_KEY=... -p 8000:8000 <project-name>
curl -X POST localhost:8000/<endpoint> -d '{"question": "..."}'
```

## Known limitations

Write these honestly and specifically, per Lesson 12 and Lesson 18 — a vague "could be more robust" tells a reviewer nothing.

```
- <specific limitation 1>
- <specific limitation 2>
- <specific limitation 3>
```

## Out of scope (stated up front)

`<what this project deliberately does not attempt, and why — per Lesson 3>`
