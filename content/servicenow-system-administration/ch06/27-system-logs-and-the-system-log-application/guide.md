# Lesson 27 — System Logs & the System Log Application

**Chapter 6 · System Properties, Scheduled Jobs & Logs · Lesson 27 of 36**

## What you'll learn

- What the `syslog` table is and what the System Log application exposes over it
- The real log categories: All, Errors, Transactions, and Script Log Statements
- How `gs.info()`, `gs.warn()`, and `gs.error()` get a message into the log in the first place
- Why the System Log is the primary tool for the troubleshooting workflow from Chapter 2
- The real admin workflow: reproduce, then check the log around that timestamp

## One table, several filtered views

The System Log application is built on top of a single table, `syslog`, which captures platform log entries as the instance runs — scripts logging messages, the platform itself recording errors, and requests being tracked. Just like System Properties pages are filtered views over `sys_properties`, the different modules under the System Log application are filtered views over `syslog` (plus one related table for request-level data), each one narrowing down to a specific kind of entry so you're not scrolling through everything at once.

## The real categories to know

System Log > All shows you everything in the log table, unfiltered — useful when you don't yet know what you're looking for. System Log > Errors filters down to just the error-level entries, which is usually where you start when something is visibly broken. System Log > Transactions shows web request-level logging — each transaction record representing an individual request the instance processed, useful when you're chasing a performance problem or trying to confirm a request actually reached the server. And Script Log Statements shows exactly what it says: messages that scripts explicitly logged, which is where your own `gs.info()`, `gs.warn()`, and `gs.error()` calls show up.

## How a message gets into the log

A script puts a message into the log with one of three real calls: `gs.info()` for routine, informational messages (useful for confirming a script reached a certain point); `gs.warn()` for something that isn't necessarily broken but deserves attention; and `gs.error()` for an actual failure the script detected. You won't write these calls yourself until the scripting course later in this path, but recognizing them matters now: when you're reading a log entry and trying to judge how seriously to treat it, the level the original developer chose — info, warn, or error — is your first signal.

## Why this is the primary troubleshooting tool

Back in Chapter 2's lesson on troubleshooting an access-denied issue, you learned to work through the ACL evaluation logic by hand. The System Log is the tool that makes a much wider range of problems visible in the first place — not just ACL denials, but script failures, integration errors, and anything else the platform or a developer chose to log. Any time something isn't working and the cause isn't obvious from the form itself, the System Log is where real evidence of *why* usually surfaces.

## The real workflow: reproduce, then check the timestamp

The admin workflow that actually works is simple and repeatable: first, reproduce the issue — perform the exact action that's failing, and note the time it happened. Then go to the relevant log view (often Errors or Script Log Statements) and look at entries around that timestamp. A log can contain thousands of entries from unrelated activity across the whole instance; without a timestamp to anchor your search, you're reading at random. With one, you can filter the log's `sys_created_on` field to a tight window and find the handful of entries that actually correspond to your reproduction.

## Key terms

| Term | Meaning |
|---|---|
| `syslog` | The table that stores platform log entries |
| System Log application | The UI over `syslog` (and related tables), split into filtered views |
| Transactions | The log view showing web request-level entries |
| `gs.info()` / `gs.warn()` / `gs.error()` | The three real script-level calls that write a message into the log, at increasing severity |
| Reproduce-then-check-timestamp | The real admin workflow for isolating relevant log entries out of a large table |

## Check yourself

A user reports that a form action silently failed around 2:15 PM. Which System Log view would you check first, and what's the one piece of information you need before you start scrolling?
