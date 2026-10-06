# Diagnosing Problems Step by Step

**Chapter 1 · How to Work a Support Ticket · Lesson 2 of 3**

## What you'll learn

- A repeatable method for Stage 4 (Investigate) that works across every module
- Why "is it everyone, or just this one?" is the single most useful question in troubleshooting
- Where to actually look in Oracle Fusion: holds, logs, diagnostics, interface tables
- Why you confirm before you fix

## The method: isolate, then narrow

Every ticket in this course gets worked the same underlying way, no matter which module it's in. You isolate the variable that's different about the broken case, then narrow from there.

1. **Is it one record, or many?** One invoice won't validate, or every invoice from that supplier? One journal won't post, or every journal in the batch?
2. **Is it one user, or everyone?** If one person can't see a journal and everyone else can, that's almost always security or a role assignment — not a data problem. If nobody can see it, look at the data and the setup instead.
3. **Did it ever work, or is this new?** A field that's always been blank points at missing setup. A process that worked last month and fails this month points at something that changed — a setup change, a period close, a patch, a new value entered somewhere upstream.
4. **What actually changed recently?** New supplier, new business unit, new category, a new segment value, a setup change someone made last week. Production support tickets are disproportionately caused by *something new*, not by Oracle suddenly behaving differently.

Answering those four questions before you touch anything will point you at the right area of the system almost every time, long before you open a single setup page.

## Where the evidence actually lives

Oracle Fusion gives you several places to look, and which one matters depends on what kind of ticket you have:

| Where to look | What it tells you |
|---|---|
| **The actual error message** | Oracle rarely fails silently — read the exact text, not a paraphrase of it |
| **Holds / Review tabs** (Payables, Receivables) | Why a specific transaction is blocked, and by which rule |
| **Scheduled Processes / ESS job logs** | Why a background program (Journal Import, Create Accounting, AutoInvoice, depreciation) succeeded, failed, or completed with warnings |
| **Interface and error tables** (`GL_INTERFACE`, `RA_INTERFACE_ERRORS_ALL`, `AP_INTERFACE_REJECTIONS`) | The specific rows that didn't make it through a bulk load, and why |
| **Diagnostic reports** (Accounting Event Diagnostic, Reconciliation reports) | Whether the subledger, accounting, and ledger agree with each other |
| **Setup pages** | Whether the configuration matches what the user expected — don't guess, go read it |

You'll use every row of that table across this course. A ticket about a stuck invoice lives in the Holds tab. A ticket about a failed bulk load lives in an interface error table. A ticket about a period that won't close usually touches several of these at once.

## Confirm before you fix

Resist the urge to apply a fix the moment you have a theory. Confirm the theory first — query the data, read the full log, check one more record that should behave the same way. The cost of confirming is a few extra minutes. The cost of fixing the wrong thing in a financial system is a correction you may have to document, explain, and sometimes unwind.

A useful habit: before you change anything, write one sentence stating exactly what you believe is wrong and why. If you can't write that sentence yet, you're not ready to fix it yet.

## Key terms

| Term | Meaning |
|---|---|
| Isolate the variable | Identify exactly what's different about the broken case versus a working one |
| Interface table | A staging table (e.g. `GL_INTERFACE`) that holds rows before a load/import process validates and moves them |
| ESS job | Enterprise Scheduler Service — the engine behind every Oracle Fusion scheduled process, including its log |
| Diagnostic report | A purpose-built report (e.g. Accounting Event Diagnostic) for comparing what a process did against what it should have done |

## Recap

Diagnosis is a narrowing process, not a guess: isolate whether it's one record or many, one user or everyone, new or longstanding, and what actually changed recently — then go look at the specific evidence that question points you toward, whether that's a Holds tab, a job log, an interface table, or a diagnostic report. Confirm your theory against the data before you touch anything. Next up, Lesson 3: documenting a resolution once you've actually found and fixed the cause.
