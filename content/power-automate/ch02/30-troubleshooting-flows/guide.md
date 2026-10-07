# Troubleshooting Flows: Run History and Error Diagnosis

A dispatcher at Castlebridge Logistics messages you Monday morning: the overnight flow that emails drivers their route updates never ran. Now what? Every cloud flow keeps a record of exactly what happened on every run, and this lesson is about reading that record — the **run history** — to find the failure, understand it, and fix it without guessing.

## What you'll learn

- Where to find a flow's run history, and what the 28-day retention window means
- How to open a failed run and read the specific step and error that caused it
- The two most common failure categories: authentication errors and action configuration errors
- How to resubmit a run after you've fixed the underlying problem

## Finding the run: the 28-day run history

Every cloud flow has a **run history** panel on its details page, listing every run with its start time, duration, and status. Castlebridge's admin opens the flow that was supposed to email drivers, and the run history shows last night's run marked **Failed** in red. By default, Power Automate keeps 28 days of run history — if the dispatcher had reported this three weeks later, the run would already be gone, which is why Castlebridge trains admins to check failures the same day they're reported.

![Screenshot of the flow details screen showing the 28-day run history panel with run status.](/courses/power-automate/ch02/30-troubleshooting-flows/run-history-details.png)
*The run history panel lists every run for this flow — this is always the first place to look.*

## Opening the failure: finding the exact step

Selecting the failed run's date expands its full run detail. Every step the flow executed is listed in order, and the one that actually failed is marked with a red exclamation icon — Castlebridge's admin doesn't have to guess which of the flow's dozen steps broke, the UI points straight at it. Opening that step reveals the specific error message on the right-hand pane, along with a **How to fix** section that often spells out the next move directly.

![Screenshot of a failed step's error details pane, showing the specific error message for the failed flow run.](/courses/power-automate/ch02/30-troubleshooting-flows/identify-error.png)
*Opening the failed step surfaces the exact error — this is where guessing stops and diagnosis starts.*

## The two most common failure categories

Most flow failures Castlebridge sees fall into one of two buckets:

- **Authentication failures** — the error contains **Unauthorized**, or a **401**/**403** code. This usually means a connection expired or was never properly authorized. The fix is to open **View Connections** from the error pane and reauthorize the broken connection.
- **Action configuration errors** — the error contains **Bad request** or **Not found**, or a **400**/**404** code. This means a setting inside an action is wrong — a SharePoint list that was renamed, a field reference that no longer exists. The fix is to edit the action inside the flow and correct it.

Transient errors — codes **500** or **502** — usually mean nothing was actually wrong with the flow; the service it called had a temporary hiccup.

## Resubmitting: trying again without starting over

Once the underlying problem is fixed — a connection reauthorized, a setting corrected — Castlebridge's admin doesn't need to wait for the flow's next scheduled trigger. Selecting **Resubmit** on the failed run re-runs it immediately with the same trigger data, which is exactly what the dispatcher needed: the route-update email goes out now, instead of tomorrow night.

## Key terms

- **Run history** — the per-flow log of every run, its start time, duration, and status, retained for 28 days by default
- **Failed step indicator** — the red exclamation icon marking exactly which step in a run's execution caused the failure
- **Authentication failure** — a run error (Unauthorized, 401/403) caused by an expired or unauthorized connection
- **Action configuration error** — a run error (Bad request/Not found, 400/404) caused by an incorrect setting inside an action
- **Resubmit** — re-running a specific failed run immediately, using its original trigger data, instead of waiting for the next scheduled run
