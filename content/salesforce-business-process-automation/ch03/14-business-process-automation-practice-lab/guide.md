# Lesson 14 — Business Process Automation Practice Lab

**Chapter 3 · Applied Automation · Lesson 14 of 18**

## What you'll learn

- How to apply Lessons 11-13's design method to a brand-new scenario on your own
- A full lab brief with acceptance criteria you can check your own work against
- How to self-review a design before calling it finished

> **Fictional case study.** Mill Creek Design Studio is an invented company used for this lab exercise. Build your design in a sandbox or Developer Edition org, never against production data.

## The lab brief

Mill Creek Design Studio is a 40-person architecture firm. Employees submit Time-Off Requests as custom records. HR's complaint, in their own words: "Requests over five consecutive days just get approved by whoever happens to see the email first — sometimes that's a peer, not a manager. We've had two scheduling conflicts this quarter because of it."

Your task: design an approval process for the Time_Off_Request\_\_c object, the same way Lessons 11 and 12 designed theirs, and document it using Lesson 13's five-question template.

## Lab tasks

1. **Write the entry criteria.** Decide what field and value combination should route a request into approval. (Hint: HR's complaint is specifically about requests over five days — not all requests.)
2. **Design the approval step(s).** Decide who approves, and whether one tier is enough or this needs two, the way Harborline's quote approval needed two.
3. **Decide the locking approach.** Should the request be editable while pending? Walk through what goes wrong if it is, the same way Lesson 11 did for discounts.
4. **Write the final actions.** What happens to the record on approval, and on rejection?
5. **Document your design** using the five-question template from Lesson 13: purpose, trigger, who it affects, dependencies, owner.

## Acceptance criteria — check your own work

```
[ ] Entry criteria only catches requests > 5 days
    (a 2-day request should never enter approval)
[ ] Exactly one approver tier is defined, with a
    named approver role (not "someone")
[ ] Locking decision is stated AND justified
[ ] Final approval and rejection actions are both
    written out, not just "notify someone"
[ ] Documentation answers all five Lesson 13 questions
```

If your design satisfies every line above, it's done. If it doesn't, that's the design doing its job — better to catch a gap here than after it's built.

## A common mistake to check for

A frequent first-draft error: entry criteria that reads `Days_Requested__c > 0`, which routes every request — including a single sick day — into the same approval queue HR specifically wanted reserved for longer requests. Re-read your own entry criteria line against the actual complaint before moving on; this is exactly the kind of gap the acceptance checklist exists to catch.

## Key terms

| Term | Meaning |
|---|---|
| Lab brief | A scenario description written the way a real stakeholder complaint would read |
| Acceptance criteria | A checklist used to verify a design meets requirements before it's considered done |
| Self-review | Checking your own work against stated criteria before treating a design as finished |

## Check yourself

You're ready for Lesson 15 when your Mill Creek design passes every line of the acceptance criteria above, on your own, without peeking back at the Harborline example.
