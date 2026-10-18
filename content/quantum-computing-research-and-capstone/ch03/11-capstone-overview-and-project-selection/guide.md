# Capstone Overview & Project Selection

This chapter kicks off the capstone that runs through the rest of the course: your own small, real, honestly-scoped research project, built using every skill from Chapters 1 and 2, ending in a written report and a presentation. This lesson covers the overall shape of the project and how to pick a topic.

## What you'll learn

- The overall capstone structure and what gets delivered at the end (Chapters 4 and 5, previewed)
- Three realistic capstone project types, with concrete examples of each
- How to evaluate a candidate topic against your actual available resources and timeline
- Why "reproduce + extend" is often the strongest capstone shape for a learner at this stage
- What a capstone is NOT expected to be — setting an honest bar before you start

## The capstone's overall shape

Across Chapters 3–5, you will: pick and scope a project (this chapter), build the experimental setup and run it, handling whatever actually happens including unexpected results (Chapter 4), and write up and present your findings professionally (Chapter 5). The deliverables at the end are a written report (methods, results, limitations, conclusions — Lesson 20) and a presentation suitable for both a technical and non-specialist audience (Lessons 21–22). This mirrors, at a learner-appropriate scale, the actual lifecycle of a piece of applied quantum computing research.

## Three realistic capstone project types

1. **Reproduction + extension.** Reproduce a specific, modest published result (using Chapter 2's full toolkit), then extend it in one well-defined direction: a different circuit size, an additional comparison condition, a different device. This is often the strongest option at this stage, because the reproduction half gives you a known target to validate your own competence against, and the extension half is where your own original contribution lives.
2. **Comparative benchmark.** Design and run your own comparison that doesn't closely follow one existing paper — e.g., benchmarking two or three error-mitigation techniques against each other on a fixed circuit and device, something that may not have been directly compared in exactly your configuration before.
3. **Applied algorithm implementation and characterization.** Implement a known algorithm (e.g., a variational algorithm for a small optimization instance) and characterize its behavior rigorously — convergence rate, sensitivity to a hyperparameter, performance gap between simulator and real hardware — rather than simply demonstrating that it runs.

All three are legitimate. None require inventing a genuinely new algorithm or proving a new theorem — that bar is appropriately set at the graduate-research level, not a course capstone (a theme Chapter 6 returns to directly).

## Evaluating a candidate topic against your real constraints

Before committing, check your candidate topic against:

- **Hardware/simulator access** — can you actually run this on IBM Quantum's open tier, Azure Quantum, Amazon Braket, or a local simulator, within realistic queue-time expectations?
- **Time budget** — Chapter 4 alone covers six lessons of build-run-analyze-iterate; a topic that needs weeks of data collection per condition doesn't fit a course capstone's timeline.
- **Your current skill level** — this capstone should extend skills you've built across this 14-course path, not require learning an entirely new subfield (e.g., don't pick a topological-qubit hardware characterization project if this path's hardware coverage was mostly superconducting/trapped-ion conceptual, not lab-based).
- **A genuinely answerable question** — avoid topics where the "answer" is already certain from pure theory (echoing Lesson 3's hypothesis-quality criteria).

## Why "reproduce + extend" is often the strongest choice

It gives you a concrete, externally-defined target (did your reproduction roughly match?) before you add anything of your own, which makes the project self-correcting: if your reproduction doesn't track the paper reasonably well, you've caught a problem with your own methodology before building an extension on top of a shaky foundation. It also produces a naturally structured report — Chapter 2's reproduction framework, plus one new result — rather than requiring you to invent a reporting structure from scratch.

## What a capstone is NOT expected to be

Set this expectation now, honestly: this capstone is not expected to be publishable, novel at the level of a PhD dissertation, or large enough to run for months. It is expected to be a small, complete, honestly-reported piece of work that demonstrates you can carry a real research question from hypothesis through to a defensible written conclusion — exactly the skill this path's earlier courses built the foundation for, and exactly what Chapter 6 will tell you employers and graduate programs actually look for in a portfolio piece.

## Key terms

| Term | Meaning |
|---|---|
| Reproduction + extension | A capstone shape combining a reproduced result with one well-defined original addition |
| Comparative benchmark | A capstone shape comparing multiple techniques against each other in a fixed configuration |
| Scope | The size and boundaries of a project relative to available time and resources |

## Check yourself

You're choosing between reproducing a paper's error-mitigation result and extending it with one new comparison condition, versus designing an entirely new comparative benchmark from scratch with no existing paper to validate against. Which would you recommend for a first capstone at this stage, and why, using this lesson's reasoning about self-correcting project structure?
