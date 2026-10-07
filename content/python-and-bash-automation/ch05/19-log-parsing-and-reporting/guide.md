# Log Parsing & Reporting

Northbridge Retail's checkout service writes thousands of lines to its log file every night, and almost nobody reads them — until something breaks and someone has to scroll through all of it looking for what went wrong. This lesson turns that raw text into something useful: a script that parses every line with a regular expression, counts what matters, and writes a short daily report instead of a wall of text nobody has time for.

## What you'll learn

- How to parse structured log lines with `re` and named capture groups
- How to tally results with `collections.Counter`
- How to build a short, human-readable summary report from the tallies
- How to write that same report out as CSV for spreadsheets or further analysis

## A log line, and the regex that parses it

Each line in the checkout log looks like this:

```
2026-10-07 02:14:33 INFO checkout order=NB-10492 status=success duration_ms=184
2026-10-07 02:14:35 ERROR checkout order=NB-10493 status=failed reason=payment_declined
```

A single regex with named groups pulls out everything that matters from either line:

```python
import re

LOG_PATTERN = re.compile(
    r"(?P<timestamp>\S+ \S+) (?P<level>\w+) checkout "
    r"order=(?P<order>\S+) status=(?P<status>\w+)"
    r"(?: reason=(?P<reason>\w+))?"
)

line = '2026-10-07 02:14:35 ERROR checkout order=NB-10493 status=failed reason=payment_declined'
match = LOG_PATTERN.match(line)
print(match.group("order"), match.group("status"), match.group("reason"))
```

`(?P<name>...)` names a capture group so you can pull it out by `match.group("name")` instead of counting parentheses. The trailing `(?: reason=(?P<reason>\w+))?` is a non-capturing group marked optional with `?`, since successful lines don't have a `reason=` field at all.

## Parsing the whole file and tallying results

Reading the file line by line and running every line through the pattern turns thousands of lines into a handful of counts:

```python
from collections import Counter

status_counts = Counter()
failure_reasons = Counter()

with open("/var/log/northbridge/checkout.log") as f:
    for line in f:
        match = LOG_PATTERN.match(line)
        if not match:
            continue
        status_counts[match.group("status")] += 1
        if match.group("reason"):
            failure_reasons[match.group("reason")] += 1

print(status_counts.most_common())
print(failure_reasons.most_common())
```

`Counter` is a dictionary built for exactly this — `counter[key] += 1` works even the first time a key appears, defaulting to zero instead of raising a `KeyError`, and `.most_common()` hands back the results already sorted from highest to lowest.

## Building a report someone will actually read

Raw counts are useful, but a short written summary gets read; a dump of numbers often doesn't:

```python
total = sum(status_counts.values())
failed = status_counts.get("failed", 0)
failure_rate = (failed / total * 100) if total else 0

print(f"Checkout report: {total} orders processed, {failed} failed ({failure_rate:.1f}%)")
for reason, count in failure_reasons.most_common(3):
    print(f"  - {reason}: {count}")
```

```
Checkout report: 1,204 orders processed, 37 failed (3.1%)
  - payment_declined: 22
  - timeout: 9
  - inventory_mismatch: 6
```

That's three lines someone can read in an on-call handoff, instead of making them re-derive the same numbers from raw logs every morning.

## Writing the report to CSV

For anyone who wants to track the failure rate over time, the same tallies go into a CSV row that's easy to append to, chart, or load into a spreadsheet:

```python
import csv
from datetime import date

with open("/var/log/northbridge/checkout-report.csv", "a", newline="") as f:
    writer = csv.writer(f)
    writer.writerow([date.today().isoformat(), total, failed, f"{failure_rate:.1f}"])
```

Opening the file in `"a"` (append) mode, rather than `"w"` (write, which would overwrite), means each day's run adds a new row to a growing history instead of erasing yesterday's number.

## Key terms

| Term | Meaning |
|---|---|
| Named capture group | `(?P<name>...)` — a regex group retrievable by name via `match.group("name")` |
| `collections.Counter` | A dict subclass for tallying occurrences, with `.most_common()` for sorted results |
| Append mode (`"a"`) | Opens a file for writing that adds to the end instead of overwriting it |

## Recap

Parse each log line once with a named-group regex, tally the fields that matter with `Counter`, and turn those tallies into both a short readable summary and a CSV row for tracking trends over time. The pattern — parse, tally, summarize — works for any structured log, not just checkout. Next, lesson 20 turns to another recurring admin task: backups and cleanup jobs.
