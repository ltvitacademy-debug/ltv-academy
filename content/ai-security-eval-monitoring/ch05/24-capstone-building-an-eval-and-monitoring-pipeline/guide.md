# Lesson 24 — Capstone: Building an Eval + Monitoring Pipeline

**Chapter 5 · Capstone · Lesson 24 of 25**

## What you'll learn

- The actual build order for the four capstone deliverables, and why the order matters
- How to write eval cases that are specific enough to grade, fast
- What "a monitoring setup" means at capstone scale, without needing a production observability stack
- How to write the incident response plan and model card so they describe the system you actually built, not an idealized one

## Build order: why eval comes first

Build in this order: eval dataset, then monitoring, then incident response plan, then model card. The eval dataset has to come first because everything after it depends on knowing what "working correctly" means for your feature — you can't meaningfully monitor for a problem you haven't defined, and you can't write an incident response plan for a failure mode you haven't already thought through while building the eval set.

## Step 1: the eval dataset (Lessons 7-8)

Write 15-20 cases, each with a realistic input and what a correct (or acceptable) output looks like:

```text
case_01:
  input: "Customer says their order never
          arrived after 2 weeks."
  expected: Acknowledges the issue, asks for
            order number, does NOT promise a
            specific resolution timeline.
  category: standard
```

Include at least 2-3 deliberately hard cases — an ambiguous input, an edge case, something close to (but not actually) your Lesson 22 failure mode. A dataset of fifteen easy cases that all pass tells you nothing you didn't already believe.

## Step 2: monitoring setup (Lessons 13-14)

You don't need a production observability platform for this. The minimum real version: log every call's input, output, timestamp, and (if you're calling a real API) token count — even a simple spreadsheet or JSON file of logged calls counts, as long as it's the real output of real calls, not a mockup. Add one dashboard view: a single chart or table showing cost or latency over your 15-20 test runs. The point isn't scale, it's proving you can see your own system's behavior, not just trust it.

## Step 3: incident response plan (Lesson 22)

Take the failure mode you identified in Lesson 23's lab and write a real plan for it — not generic language, specific to what you actually built:

```text
Failure: model recommends a refund amount
         not supported by policy

Detect:    which of your eval cases would catch this?
Contain:   what's the immediate fix — a stricter
           prompt? a hard-coded policy check?
Communicate: who would need to know, and what
           would you tell them?
Review:    what in your eval set should change
           so this specific case is covered going forward?
```

## Step 4: the model card (Lesson 21)

Fill in the real six sections from Lesson 21 for your actual feature — Model Details, Intended Use, Training Data (or, for a prompted system, what context it has access to), Evaluation Results (your actual Step 1 numbers), Ethical Considerations, and Caveats & Limitations. If a section feels hard to fill in honestly, that's useful information about your system, not a sign you're doing the lab wrong.

## Key terms

| Term | Meaning |
|---|---|
| Hard case | A deliberately difficult eval input chosen to actually test the system, not confirm it |
| Minimum viable monitoring | Logged inputs/outputs/metadata plus one real chart — not a production platform |

## Lab

Complete Step 1: write your 15-20 eval cases, run them against your chosen feature, and record the actual output for each one. Don't move to Step 2 until every case has a real recorded result.

## Check yourself

Can you explain why building the eval dataset before the monitoring setup isn't arbitrary ordering — what would go wrong if you built monitoring first without first defining what "correct" looks like?
