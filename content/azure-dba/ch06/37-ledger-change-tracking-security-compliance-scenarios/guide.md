# Lesson 37 — Ledger, Change Tracking & Security/Compliance Scenarios

**Chapter 6 · Data Security & Compliance · Lesson 37 of 95**

## What you'll learn

- Ledger: cryptographically verifiable tamper-evidence, not just tamper-resistance
- Change Tracking: a lightweight "what rows changed" mechanism for sync scenarios — genuinely different from both Ledger and Lesson 36's auditing
- Why these three tools (Ledger, Change Tracking, Auditing) answer three different questions, not the same question three ways
- A real compliance scenario tying together everything Chapter 6 covered

## Ledger: proving nothing was altered, not just logging that it wasn't

Lesson 36's SQL Auditing writes a log of who did what — but that log
itself, sitting in Storage or Log Analytics, could theoretically be
edited by someone with enough access, and nothing in the audit system
itself would detect it. **Ledger** solves a stricter problem:
cryptographically proving a table's history hasn't been tampered
with, not just recording that history.

```sql
CREATE TABLE dbo.PaymentRecords (
    PaymentId INT PRIMARY KEY,
    Amount DECIMAL(10,2),
    ProcessedDate DATETIME2
)
WITH (LEDGER = ON);
```

Every insert, update, and delete against a ledger table is appended
to a tamper-evident history table, and periodically the database
computes a cryptographic digest of that history — a hash you can
store *outside* the database entirely (in Azure Confidential Ledger,
or just printed and filed) and later use to verify nothing was
altered, even by someone with `sysadmin` rights. That's the real
distinction from auditing: auditing tells you what happened; Ledger
lets you *prove* the record of what happened is genuine.

```sql
-- Verify the ledger hasn't been tampered with
EXEC sys.sp_verify_database_ledger;
```

## Change Tracking: a genuinely different tool for a genuinely different job

Don't conflate this with Ledger or auditing — **Change Tracking**
answers "which rows changed since I last checked," for
synchronization scenarios (an offline app syncing back up, an ETL
job picking up only what's new). It's lightweight by design: it
doesn't keep a full history of every value, doesn't prove anything
cryptographically, and isn't a security or compliance feature at
all.

```sql
ALTER DATABASE OpsDB SET CHANGE_TRACKING = ON;
ALTER TABLE dbo.Shipments ENABLE CHANGE_TRACKING;

-- Which rows changed since a known sync point?
SELECT * FROM CHANGETABLE(CHANGES dbo.Shipments, @last_sync_version) AS CT;
```

## Three tools, three different questions

| Tool | Answers | Lesson |
|---|---|---|
| SQL Auditing | Who did what, and when (a historical log) | 36 |
| Ledger | Can I *prove* this history wasn't altered? | 37 |
| Change Tracking | Which rows changed, for sync — no security angle | 37 |

Reaching for the wrong one is a real, common mistake — Change
Tracking will never satisfy an auditor asking for proof of integrity,
and Ledger is real overkill for a sync job that just needs to know
what's new.

## A real compliance scenario, tying Chapter 6 together

A healthcare company must prove to an auditor that patient records
were never altered outside an approved process, that only authorized
staff could ever see full SSNs, and that every access to a specific
patient's record is retrievable on demand. No single lesson from this
chapter answers all of that alone:

```
TDE (31)              -> data unreadable if the storage itself is stolen
Data Classification (35) -> SSN column formally identified as sensitive
Dynamic Data Masking (33) -> unauthorized staff see a masked SSN, not the real one
SQL Auditing (36)      -> every access to the patient table is logged, off-database
Ledger (37)            -> the patient record's history is cryptographically provable
```

None of these substitute for each other — the scenario needs all
five, each answering the specific piece of the compliance question it
was built for.

## Key terms

| Term | Meaning |
|---|---|
| Ledger | Cryptographically verifiable, tamper-evident table history |
| `sp_verify_database_ledger` | Confirms a ledger table's history hasn't been altered |
| Change Tracking | Lightweight "which rows changed" tracking for sync — not a security feature |

## Check yourself

You're ready for Chapter 7 when you can explain, without looking: why
would Change Tracking fail to satisfy an auditor asking for proof
that a table's history wasn't tampered with, even though it does
track which rows changed?
