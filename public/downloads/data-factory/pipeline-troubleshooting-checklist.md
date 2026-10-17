# Pipeline Troubleshooting Checklist

From Chapter 8 (Monitoring & Error Handling).

## "A pipeline reports Failed"

1. Open **Monitor → Pipeline runs**, find the run, click into it.
2. In the activity runs view, find which specific activity failed.
3. Click the error icon — read **failure type** first (e.g. "User
   configuration issue" vs. a transient/network type), then the raw
   exception text.
4. Decide: **Rerun** (restarts from the first activity) or **Rerun
   from failed activity** (skips everything that already succeeded)?
   Use the latter if upstream activities are expensive.

## "A pipeline reports Succeeded, but something's clearly wrong"

**Do not trust the pipeline-level status alone.** Data Factory only
evaluates leaf activities (ones with nothing downstream) to decide
overall success — a real failure earlier in the pipeline can be fully
absorbed by a Try-Catch pattern and never surface at the top level.

1. Drill into activity runs for a suspect run, even though the
   pipeline shows green.
2. Look for any activity showing Failed, even if a later activity
   shows Succeeded.
3. If found, you're looking at a Try-Catch pattern. Ask: **should
   this failure actually make the pipeline show red?** If yes,
   restructure to Do-If-Else (see the Trigger/Error-Handling decision
   table).

## Try-Catch vs. Do-If-Else — what the pipeline status shows

| Pattern | You define | Activity fails → pipeline shows |
|---|---|---|
| Try-Catch | Only Upon Failure | Success (if the handler succeeds) |
| Do-If-Else | Upon Failure *and* Upon Success | Failure |
| Do-If-Skip-Else | Upon Failure, Upon Success, plus a dummy Upon Skip | Success |

Use Do-If-Else when a failure should visibly fail the pipeline (so an
alert fires). Use Try-Catch when one activity's failure shouldn't
block independent downstream work.

## Alerts

A pipeline correctly showing "Failed" is only useful if someone finds
out. Confirm an Azure Monitor alert is actually wired to this
pipeline's failure status — don't rely on someone noticing a stale
table.
