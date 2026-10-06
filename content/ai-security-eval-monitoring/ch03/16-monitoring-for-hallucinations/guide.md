# Lesson 16 — Monitoring for Hallucinations

**Chapter 3 · Monitoring AI in Production · Lesson 16 of 25**

## What you'll learn

- Why hallucination can't be checked once in Chapter 2's evals and considered solved
- What a "scorer" is, and how it turns hallucination detection into something that runs on every production call
- How scored calls actually show up in a real observability tool — per call, and in aggregate
- Why filtering a trace table by scorer output is what turns a score into something actionable

## A hallucination eval doesn't end at launch

Chapter 2's eval datasets and automated metrics (Lesson 8's faithfulness and relevance checks) tell you how the model performed against a fixed test set before you shipped. But production traffic isn't the test set — real users ask things the eval set never covered, and a model that scored well on faithfulness in testing can still generate an unsupported claim on a question nobody thought to test. Hallucination monitoring is Lesson 8's same idea, running continuously, against real traffic, instead of once against a fixed set.

## The mechanism: a scorer attached to every call

A **scorer** is a function — often an LLM-as-judge, sometimes a smaller specialized model — that runs against a call's input and output and attaches a score or label to it automatically, the same way Lesson 13's logging attaches metadata to every call. A real observability platform lets you define one and have it run as traffic flows through, including a predefined hallucination scorer that checks whether a response's claims are actually supported by the context it had access to:

![A programmatic scorer's detail page in Weave — the same kind of UI a built-in hallucination scorer's results appear in, showing the scorer's code, version, and where to view the calls it's scored.](/courses/ai-security-eval-monitoring/ch03/16-monitoring-for-hallucinations/scorer-detail-page.png)

## What a scored call looks like

Once a scorer runs, its result attaches to that specific call, viewable right alongside the input and output — exactly where Lesson 13 said a logged request's full detail should live:

![A single call's Scores tab, showing the scorers that ran against it and the score each one returned — attached directly to the call, not buried in a separate report.](/courses/ai-security-eval-monitoring/ch03/16-monitoring-for-hallucinations/call-scores-tab.png)

## Seeing it across traffic, not just one call

One scored call tells you about one response. The real value is the aggregate view — scores as columns across every call, so a pattern (a specific prompt template, a specific model version) that's generating more flagged responses than others becomes visible:

![A traces table with scorer results shown as columns across many calls at once — the view that turns "this one response hallucinated" into "this prompt template hallucinates more than the others."](/courses/ai-security-eval-monitoring/ch03/16-monitoring-for-hallucinations/traces-table-scores.png)

## Filtering down to just the flagged calls

A scorer is only useful operationally if you can isolate what it flagged. Filtering the trace table by a scorer's output turns a monitoring signal into a worklist — the specific calls worth a human looking at:

![Traces filtered to only the calls where a specific scorer's output is non-empty — turning a column of scores into an actual reviewable list of flagged responses.](/courses/ai-security-eval-monitoring/ch03/16-monitoring-for-hallucinations/filtered-calls-scorer-name.png)

## Key terms

| Term | Meaning |
|---|---|
| Scorer | A function (often LLM-as-judge) that runs against a call and attaches a score or label automatically |
| Hallucination scorer | A scorer specifically checking whether a response's claims are supported by its available context |
| Flagged call | A call whose scorer result crossed a threshold worth a human reviewing |

## Lab

Pick one response from any AI tool you've used where you suspected (or confirmed) a made-up fact. Write the one-sentence rule a hallucination scorer would need to check to catch it — what would it have needed to compare the response against?

## Check yourself

Can you explain why a hallucination scorer that only ran once, in Chapter 2's eval suite, wouldn't be enough to catch hallucinations happening in production — and what running continuously actually catches that a one-time eval can't?
