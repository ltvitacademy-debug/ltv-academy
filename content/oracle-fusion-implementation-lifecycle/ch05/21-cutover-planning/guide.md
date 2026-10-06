# Cutover Planning

UAT is signed off. Data migration is validated. Chapter 5 is where everything the project has built finally becomes the business's real, live system. This lesson covers the plan that makes that transition survivable: the cutover plan.

## What you'll learn

- What a cutover plan actually is, and why it's written as a minute-by-minute runbook
- The key building blocks: the freeze, the final load, validation checkpoints, and go/no-go decisions
- Why a cutover rehearsal (mock cutover) happens before the real one
- How Brightfield built its cutover plan

## What a cutover plan contains

A **cutover plan** is a detailed, minute-by-minute (sometimes hour-by-hour for a longer window) runbook covering every activity needed to move from the legacy system to Oracle Fusion for real, live use. It typically includes: a **freeze** of the legacy system (a defined point after which no new transactions are entered there), the **final data extract and load** (the real version of what mock loads from Chapter 3 rehearsed), a series of **validation checkpoints** at which the team confirms the loaded data ties to legacy totals, named **go/no-go decision points** where the team can still choose to delay, a **rollback plan** describing what happens if cutover has to be aborted partway through, and a **communication plan** telling the business exactly what's happening and when.

## The freeze

The **freeze** is the moment the legacy system stops accepting new transactions related to what's cutting over — for example, no new AP invoices entered in the legacy system after a specific time on a specific day. Without a clean freeze, final balances migrated into Oracle Fusion would already be stale the moment they load, since the legacy system kept moving after the extract was taken.

## Validation checkpoints and go/no-go decisions

A cutover runbook isn't one long task — it's broken into checkpoints, each with a **go/no-go decision**: does the team proceed to the next step, or pause and fix a problem first? These checkpoints map directly onto the validation discipline from Lesson 15 (does the loaded data tie to legacy totals?), run under real time pressure during the actual cutover window rather than during a relaxed mock cycle.

## Why rehearsal matters

A **cutover rehearsal** (or mock cutover) runs through the entire runbook, start to finish, using the same steps, the same team, and as close to the same timing as possible — before the real cutover weekend. Its purpose is to find out how long each step actually takes (so the runbook's timing estimates are grounded in reality, not guesswork) and to catch any step that doesn't work as planned, while there's still time to fix the plan itself rather than improvising live.

## Brightfield Industrial Group: the cutover runbook

Brightfield's cutover plan freezes legacy AP, AR, and Cash Management transaction entry at 5 PM Friday, extracts final open balances overnight, loads them into Production Saturday morning, and runs validation checkpoints against the legacy trial balance and open item counts before a Saturday-afternoon go/no-go decision to proceed to go-live Monday morning. A rehearsal run two weekends earlier revealed the final extract took nearly twice as long as originally estimated — time added back into the real runbook, avoiding a scramble during the actual cutover.

## Key terms

| Term | Meaning |
|---|---|
| Cutover plan | A minute-by-minute runbook for moving from legacy to live use |
| Freeze | The point after which the legacy system stops accepting new transactions |
| Go/no-go decision point | A checkpoint where the team decides to proceed or pause |
| Cutover rehearsal / mock cutover | A full practice run of the entire cutover runbook before the real one |

## Recap

A cutover plan turns go-live from a leap of faith into a rehearsed, checkpointed runbook — freeze, final load, validation, go/no-go decisions, and a rollback plan — proven out ahead of time through a full rehearsal. Brightfield's rehearsal caught a timing problem with weeks to spare instead of discovering it live. Next up, lesson 22: deployment and go-live itself.
