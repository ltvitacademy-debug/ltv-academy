# Loading and Importing Bank Statements

A bank statement file doesn't become usable the instant it lands on a server — Oracle Fusion Cash Management moves it through a two-step process, Load and then Import, before any of its transactions are available for reconciliation. This lesson walks through that process end to end.

## What you'll learn

- How a statement file actually gets to Oracle (delivery methods)
- The two-step Load, then Import process, and what each step does
- What supported file extensions tell you about expected formats
- What "available for reconciliation" actually means once this is done

## How the file gets to Oracle

A bank statement file can arrive in a few ways:

- **Automated delivery** — the bank (or a banking gateway/aggregator) places the file on an SFTP location or similar on a schedule, and a scheduled process picks it up.
- **Manual upload** — a user downloads the file from the bank's portal and uploads it directly into Oracle through the Cash Management and Banking work area.

Either way, the file arrives as one of the formats from Lesson 5, and Oracle expects specific file extensions depending on format — generally `.txt`, `.dat`, `.csv`, `.xml`, or `.ack` depending on how the bank packages it.

## Step 1: Load

The **Load** step reads the raw file and creates a **bank statement header** and **bank statement lines** in a staging structure, essentially a literal transcription of what the file said — balances, transaction lines, reference numbers — without yet validating it against Oracle's own setup data (like confirming the account number in the file matches a real Bank Account record).

## Step 2: Import

The **Import** step is where validation happens. It checks that the account number on the statement maps to an actual Bank Account record in Oracle, confirms the statement doesn't duplicate one already loaded, and converts the raw loaded data into the real bank statement records Cash Management and Reconciliation will work with. A statement line that can't be matched to a known account, or that fails another validation, surfaces as an error here rather than silently disappearing — you'll cover the common failure patterns in Lesson 8.

Only after Import succeeds are a statement's lines actually **available for reconciliation** — this is the point where Chapter 3's matching rules can see them.

## Automatic versus manual runs

Both Load and Import can run as scheduled processes (so a nightly statement arrives and is ready before anyone checks in the morning) or be triggered manually by a Cash Manager — useful when troubleshooting a specific file or re-running after fixing a mapping issue.

## A worked example

Harborview Metals Inc. receives a BAI2 file nightly from First Continental Bank via SFTP. A scheduled Load process picks up the file at 2 a.m. and creates the staging records. A scheduled Import process runs at 2:15 a.m., validates the account mappings, and makes yesterday's transactions available for reconciliation before the Treasury team logs in. If First Continental Bank ever renumbers an account without telling Harborview's IT team, the Import step is where that mismatch would surface as an error, not Load.

## Key terms

| Term | Meaning |
|---|---|
| Load | Reads the raw file into staging bank statement header/line records |
| Import | Validates and converts staged data into usable Cash Management records |
| Available for reconciliation | The state a statement line reaches only after successful Import |

## Recap

A statement file moves through Load (raw transcription) and then Import (validation and conversion) before its lines are available for reconciliation. Both steps can run on a schedule or be triggered manually, and most real-world statement problems surface at Import, where account mapping is checked. Next up, lesson 7: the transaction codes that ride along on each statement line.
