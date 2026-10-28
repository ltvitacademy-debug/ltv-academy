# Lesson 14 — Writing a Real-World Correlation Rule

**Chapter 4 · Correlation Rules & Alert Logic · Lesson 14 of 32**

## What you'll learn

- How to turn the five-piece shape from Lesson 13 into one real, logical correlation rule
- How to read correlation-rule pseudocode that isn't tied to any single vendor's query language
- What a "grouping key" is, and why "same user" or "same source IP" matters as much as the event count
- How to walk through a real rule clause by clause and explain exactly what it watches for

## From shape to a real rule

Lesson 13 laid out the five pieces every correlation rule needs: event source, condition, time window, threshold/sequence, and action. Vendor-specific SIEM query languages differ (one platform might call this a "correlation search," another a "detection rule," another a "scheduled analytics rule"), but the underlying logic is the same everywhere. Written in plain, vendor-neutral logical form, the classic brute-force-then-success rule looks like this:

```
RULE: Brute-force logon followed by success
SOURCE: Windows Security Event Log (Logon events)
GROUP BY: user account

IF   count(event = "logon failure", group) >= 5
     WITHIN time_window = 10 minutes
AND  event = "logon success" occurs for the same group
     WITHIN the same 10-minute window, after the failures
THEN alert(severity = high,
           title = "Possible brute-force login success")
```

This isn't any one vendor's exact syntax — it's the logical shape a real rule takes in Splunk SPL, Microsoft Sentinel KQL, Elastic detection rules, or any other SIEM's rule-building UI. Learn the logic once and you can read any of them.

## Breaking the rule down clause by clause

- **`SOURCE`** — which log feed the rule watches. Here, the Windows Security log, specifically logon events (Event ID 4625 for failures, 4624 for successes, in Windows terms).
- **`GROUP BY`** — the **grouping key**: the field that ties individual events together into one pattern. "Same user account" is what makes five failures and one success one coherent story instead of five unrelated people typing wrong passwords. Get the grouping key wrong — say, group by source IP instead of by account on a shared VPN gateway — and the rule either misses real attacks or fires constantly on nothing.
- **`count(...) >= 5 WITHIN 10 minutes`** — the threshold and time window together: at least 5 matching failure events, and they all have to land inside the same 10-minute span.
- **The success condition** — a logon success for that same grouping key, inside that same window, after the failures. This is what separates "someone kept mistyping their password" from "someone kept guessing until one worked."
- **`THEN alert(...)`** — the action: what fires, and how it's labeled when an analyst sees it land in the queue.

## Why "after the failures" matters

Notice the rule specifies the success has to come *after* the string of failures, not just sometime in the same window. A user who fails once at 9:00, succeeds at 9:01, then fails four more times fat-fingering something else entirely is a very different (and far more common) story than five failures in a row immediately followed by a success. A correlation rule that ignores sequence and only counts events in a window will fire on both — and the second case is almost always benign. Sequence-aware logic is what keeps a rule aimed at the actual threat behavior instead of just at raw event volume.

## Key terms

| Term | Meaning |
|---|---|
| Grouping key | The field (e.g., user account) that ties individual events together as one pattern |
| Sequence-aware rule | A rule that checks the *order* events occur in, not just how many occurred |
| Event ID | A numeric code (Windows: 4625 = logon failure, 4624 = logon success) identifying a specific event type in a log |
| Detection logic | The underlying IF/THEN reasoning a rule expresses, independent of any one vendor's query syntax |

## Check yourself

Without looking back: why would grouping this rule by source IP instead of by user account be a mistake on a network where hundreds of people share the same VPN gateway's exit IP?
