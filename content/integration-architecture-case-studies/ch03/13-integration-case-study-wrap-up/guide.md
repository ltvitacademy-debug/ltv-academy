# Lesson 13 — Integration Case Study Wrap-Up

**Chapter 3 · Presenting · Lesson 13 of 14**

## What you'll learn

- How the five case studies in Chapter 1 map to a small set of recurring design questions
- How the four review tools from Chapter 2 and the two presentation lessons in Chapter 3 fit together as one workflow
- The handful of principles that transfer to a Salesforce integration this course never covered
- What to actually carry forward into Lesson 14's mock review board

## Five case studies, a handful of real questions

Thirteen lessons in, it's worth naming what the five case studies in Chapter 1 were actually teaching, underneath their different industries and systems. Each one turned on one or two of the same small set of questions:

- **Meridian Fixtures (ERP)** turned on **data volatility**: how often does this specific field actually change, and does that justify a live callout or a batch sync.
- **Harborline Capital (financial system)** turned on **delivery guarantees**: what does "at-least-once delivery" actually require of a handler, and how does idempotency make duplicates harmless.
- **Cascade Outfitters (data warehouse)** turned on **consistency requirements**: what does this specific consumer actually need, and is eventual consistency a compromise or the deliberately correct choice.
- **Vantage Utilities (external application)** turned on **trust boundaries**: who's calling, what are they allowed to do, and how is that enforced rather than assumed.
- **Bellwood Apparel (marketing platform)** turned on **bidirectional coordination**: how do two systems that can both originate changes avoid fighting with each other.

None of these questions are specific to ERPs, ledgers, warehouses, portals, or marketing platforms. They're the actual recurring shape of almost any integration design problem — the fictional company and system in each case study was just the vehicle for teaching the underlying question clearly.

## One workflow, assembled across thirteen lessons

Chapter 1 taught how to turn a vague request into a scoped design (Lesson 1) and introduced the specific concepts each case study needed. Chapter 2 built four tools for pressure-testing that design: comparison (Lesson 6), failure modes (Lesson 7), security (Lesson 8), and documentation (Lesson 9) — then combined them into the self-review pass (Lesson 10). Chapter 3 took that reviewed, documented design and taught how to present it (Lesson 11) and defend it under real questioning (Lesson 12). Read end to end, this isn't five unrelated case studies followed by some generic advice — it's one workflow, demonstrated five times on different problems so the pattern underneath it becomes visible.

## What transfers to a case this course never covered

The specific case studies — ERP, financial ledger, data warehouse, customer portal, marketing platform — won't cover every integration you ever design. What transfers regardless of the system on the other end is the workflow itself: name the system of record per field, not per system; match the pattern to the data's actual volatility and consistency needs; name the failure categories and give each one a stated answer; ask the four security questions explicitly rather than assuming "it uses OAuth" settles anything; write the decision down in a form a reviewer can evaluate without you in the room; and when questioned, give the most accurate answer available, including an honest "that's a gap" when it's true.

## Where this heads next

Lesson 14 is a mock review board: a complete scenario, built fresh, that doesn't map one-to-one onto any single case study from Chapter 1. The point of that final lesson isn't to recognize a pattern you've already memorized — it's to run the entire workflow from this lesson, on a new problem, under the same kind of real-time questioning Lesson 12 prepared you for.

## Key terms

| Term | Meaning |
|---|---|
| Recurring design question | A question (volatility, delivery guarantees, consistency, trust boundary, coordination) that shows up across many different integrations regardless of the specific systems involved |
| Workflow | The ordered sequence of scoping, designing, reviewing, documenting, and presenting that this course has taught across all three chapters |
| Transferable principle | A rule from this course that applies to an integration design this course never specifically covered |

## Lab

Pick any integration you've read about, heard about, or imagined that isn't one of this course's five case studies — it doesn't need to involve Salesforce. Identify which one or two of this lesson's five recurring design questions (volatility, delivery guarantees, consistency, trust boundaries, bidirectional coordination) it actually turns on, the same way this lesson did for each of Chapter 1's case studies. Write two or three sentences explaining your reasoning.

## Check yourself

Can you match each of Chapter 1's five case studies to the recurring design question it was mainly teaching, without looking back at this lesson? Can you list, in order, the complete workflow this course has taught across all thirteen lessons so far, from scoping a vague request through defending the finished design under questioning?
