# Lesson 20 — Choosing a Pattern

**Chapter 4 · Patterns and Practice · Lesson 20 of 23**

## What you'll learn

- Salesforce's own Pattern Selection Guide decision logic
- The two questions that drive the whole decision tree
- Why "process vs data" is the first fork, not "sync vs async"
- A worked example applying the framework end to end
- What to do when a requirement doesn't cleanly fit any one pattern

## The two questions behind the decision

Salesforce's Pattern Selection Guide boils the choice down to two questions, asked in order:

1. **Is this integration about a PROCESS (an action or transaction happening) or about DATA (records existing/syncing in two places)?**
2. **Does it need to happen synchronously (the caller is waiting) or asynchronously (it can happen in the background)?**

## The decision tree

- **Process + synchronous** → **Request-Reply**. The caller needs an answer now to proceed (Lesson 19's tax-calculation example).
- **Process + asynchronous** → **Fire and Forget**. The caller wants to trigger an action but doesn't need to wait for it (Lesson 19's warehouse-notification example).
- **Data + asynchronous, specifically about keeping a live screen current** → **UI Update Based on Data Changes**. Driven by Platform Events or Change Data Capture (Lessons 14-15).
- **Data + bulk/scheduled, not about a live screen** → **Batch Data Synchronization**. Driven by Batch Apex plus Scheduled Apex (Lesson 13).
- **An external system needs to read/write Salesforce data or trigger Salesforce logic directly** → **Remote Call-In**, regardless of the process/data split, since this one is defined by direction (inbound) rather than by the process/data question (Chapter 2).

Note that Batch Data Synchronization doesn't appear as a labeled branch in Salesforce's own Pattern Selection Guide table the way the other four do — it's treated as the natural fallback for a "data integration, asynchronous, not needed in real time, happening in bulk" case that the guide's named branches don't otherwise cover.

## Why "process vs data" comes first, not "sync vs async"

It's tempting to ask "does this need to be synchronous?" as the very first question, but that question alone doesn't distinguish Request-Reply from UI Update Based on Data Changes — both can involve asynchronous elements. Asking "is this about an action happening, or about data existing in sync across two systems?" first cuts the decision space more cleanly, because it separates "do something and tell me what happened" (process) from "keep these records consistent" (data) before sync-vs-async is even asked.

## A worked example

**Requirement:** "When a customer updates their shipping address in our e-commerce site, Salesforce's Contact record should reflect the change within a few minutes, without anyone in Salesforce manually re-entering it."

- Is this a process (an action) or data (records existing in sync)? It's about data — specifically, keeping a Contact's address field consistent with an external system's copy.
- Does it need to be synchronous? No — "within a few minutes" explicitly tolerates asynchronous handling.
- Is it specifically about a live screen updating, or about record data syncing generally? It's general record syncing, not a UI concern.
- **Conclusion:** this is Batch Data Synchronization (or, if the e-commerce platform can push changes rather than requiring Salesforce to poll, inbound Platform Event publishing from Lesson 9/14 would also fit, since "within a few minutes" is loose enough to tolerate either).

## When nothing fits cleanly

Real requirements sometimes genuinely straddle two patterns, as the worked example above shows. When that happens, the right move isn't to force a single label — it's to go back to the stakeholder and ask the clarifying question that resolves the ambiguity (here: "is 'within a few minutes' a hard requirement, or would end-of-day be acceptable?"). The framework's value is in generating exactly that kind of sharp clarifying question, not in guaranteeing a single unambiguous answer every time.

## Key terms

| Term | Meaning |
|---|---|
| Process vs data | The first fork in the Pattern Selection Guide: an action happening vs. records syncing |
| Pattern Selection Guide | Salesforce's own decision framework for choosing among the named integration patterns |
| Clarifying question | The right response when a requirement straddles two patterns ambiguously |

## Lab

Take three real or invented integration requirements of your own design (not reused from earlier lessons) and run each one through the two-question decision tree in this lesson, writing out your answer to each question and your resulting pattern choice. For at least one of your three, deliberately choose a requirement ambiguous enough to straddle two patterns, and write the specific clarifying question you'd ask a stakeholder to resolve it.

## Check yourself

State the two questions behind Salesforce's Pattern Selection Guide, in order, from memory. Then explain why "process vs data" is asked before "sync vs async," using your own words.
