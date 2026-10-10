# Lesson 16 — Performance Practice Lab

**Chapter 3 · Fixing Performance · Lesson 16 of 16**

## What you'll learn

- How to apply this entire course's toolkit to a fresh scenario you haven't seen worked out before
- How to perform a full review-and-fix pass, start to finish, on realistic non-bulkified code
- How to self-assess your own fix against the Lesson 15 checklist
- What "course complete" actually means for this material going forward

## This lesson is the final exam, not a new topic

Every concept this course needed has already been taught: governor limits (Lesson 2), bulkification (Lesson 3), query optimization (Lesson 4), transaction boundaries (Lesson 5), scalability (Lesson 6), the diagnostic toolchain (Lessons 7-10), trigger/Flow hygiene (Lesson 11), caching (Lesson 12), data volume (Lesson 13), a worked case study (Lesson 14), and a consolidated checklist (Lesson 15). This lesson's job is to make you actually use all of it, unassisted, against code you haven't seen fixed already.

## The practice scenario

A `CaseTrigger` has been reported as slow and occasionally throws a limit exception when many Cases are closed at once via a list view bulk action. Here is the trigger exactly as currently deployed:

```apex
trigger CaseTrigger on Case (before update) {
    for (Case c : Trigger.new) {
        if (c.Status == 'Closed') {
            // Look up the Account to check a custom field before allowing closure
            Account acc = [SELECT Id, Name, Active_Support_Contract__c FROM Account WHERE Id = :c.AccountId];
            if (acc.Active_Support_Contract__c == true) {
                List<CaseComment> comments = [
                    SELECT Id, CommentBody FROM CaseComment WHERE ParentId = :c.Id
                ];
                if (comments.isEmpty()) {
                    CaseComment newComment = new CaseComment(
                        ParentId = c.Id,
                        CommentBody = 'Closed with active support contract on file.'
                    );
                    insert newComment;
                }
            }
        }
    }
}
```

## Your task

Working on your own, without looking back at earlier lessons' finished examples first:

1. **Identify every anti-pattern** in this trigger, by name, referencing the specific lesson each one came from. There is more than one.
2. **Run it against the full Lesson 15 checklist** and list every item it fails.
3. **Rewrite the trigger** to be fully bulk-safe: one query (or a small, flat, non-looping number of queries) regardless of how many Cases are in `Trigger.new`, with the `insert` for new CaseComments also batched outside any loop.
4. **Identify which two specific governor limits** (named exactly, from Lesson 2's table) this trigger risks when closing a large batch of Cases, and explain why each one is at risk.
5. **Write the `CUMULATIVE_LIMIT_USAGE` numbers you would expect to see** in a debug log for the original version, closing 50 Cases that all have active support contracts and no existing comments, versus your fixed version doing the same thing — you don't need exact figures, just the right shape (should queries scale with Case count, or stay flat?).

## Self-assessment

After completing your rewrite, check it against these specific criteria, each tracing back to a lesson in this course: Does your fixed version issue exactly one query against Account, regardless of batch size (Lesson 3)? Does it issue exactly one query against CaseComment, regardless of batch size (Lesson 3)? Does it collect all new CaseComments into a list and insert them once, outside any loop (Lesson 3)? Did you correctly identify that the Account query's filter (`WHERE Id = :c.AccountId` run once per Case) is also a selectivity-irrelevant problem — it's not about selectivity here, it's purely about running once per record instead of once per batch (Lesson 3, not Lesson 4)? Did you correctly name the SOQL query limit and the DML statement limit (not CPU time or heap) as the two most directly threatened limits (Lesson 2)?

## What "course complete" means

Finishing this lesson means you can recognize non-bulkified code on sight, know which specific governor limits a given anti-pattern threatens and why, know how to diagnose a live performance problem with real tools instead of guessing, and know how to fix the underlying cause rather than a symptom. These are exactly the skills a Technical Architect is expected to bring to a solution review, a code review, or a live production incident — this course's material doesn't end with memorized numbers, it ends with a repeatable way of thinking about performance on the platform.

## Key terms

| Term | Meaning |
|---|---|
| Self-assessment | Checking your own work against a known-correct standard without being told the answer first |
| Unassisted review | Diagnosing and fixing code without referring back to an already-solved, similar example |

## Lab

Complete the five-part task above in full: the anti-pattern identification, the checklist pass, the rewritten trigger, the two named governor limits at risk, and the expected CUMULATIVE_LIMIT_USAGE shape comparison. Treat this as a graded deliverable, not a thought exercise — write out the actual rewritten Apex trigger code, not just a description of what you would change.

## Check yourself

Did your rewritten trigger issue exactly one query against Account and exactly one against CaseComment, regardless of how many Cases are being closed at once? Can you name, specifically, which two governor limits from Lesson 2's table this trigger risks, and explain in one sentence each why? Can you explain why this anti-pattern is about bulkification (Lesson 3), not query selectivity (Lesson 4), even though it involves a WHERE clause?
