# Lesson 15 — Fixing and Validating

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 15 of 16**

## What you'll learn

- Why `sp_recompile` alone isn't the fix, just a diagnostic tool
- The real fix for this specific parameter sniffing case: `OPTION (RECOMPILE)`
- The trade-off that fix makes, and why it's worth it here
- Validating across every provider, not just the two already tested

## Why `sp_recompile` isn't the actual fix

`sp_recompile` only forces the *next* call to compile a fresh plan —
whichever `@ProviderID` happens to run next becomes the new sniffed
value, and the exact same problem returns for everyone else the
moment a differently-sized provider calls it first. That's not a
fix; it's the same bug on a delay.

## The real fix: recompile this one statement every time

```sql
ALTER PROCEDURE dbo.usp_GetProviderSchedule @ProviderID int AS
SELECT a.AppointmentID, a.AppointmentDate, p.FirstName, p.LastName
FROM dbo.Appointments a
JOIN dbo.Patients p ON p.PatientID = a.PatientID
WHERE a.ProviderID = @ProviderID
OPTION (RECOMPILE);
```

`OPTION (RECOMPILE)` tells SQL Server to compile a fresh plan for
*this specific statement*, every single execution, using the actual
`@ProviderID` value passed in that time — never reusing a plan
sniffed from a different call. No single cached plan is ever reused
across different-shaped calls, which eliminates parameter sniffing
for this statement specifically.

## The trade-off, and why it's worth it here

Compiling a fresh plan on every call costs real CPU — more than
reusing a cached plan would, if that cached plan happened to fit.
That cost is worth paying specifically because this procedure is
called with wildly different appointment counts per provider (a
handful vs. hundreds), making a one-size-fits-all cached plan
genuinely unreliable rather than just occasionally suboptimal. A
procedure called with much more uniform parameter shapes wouldn't
need this fix at all — `OPTION (RECOMPILE)` is the right tool for
*this* specific symptom, not a default to reach for everywhere.

## Validating across every provider, not just two

```sql
EXEC dbo.usp_GetProviderSchedule @ProviderID = 4;    -- small provider
EXEC dbo.usp_GetProviderSchedule @ProviderID = 55;   -- mid-size provider
EXEC dbo.usp_GetProviderSchedule @ProviderID = 112;  -- large provider
```

Time all three, in any order, repeated a few times. Before the fix,
order mattered — whichever ran first set the pattern for everyone.
After the fix, order no longer matters at all: each call gets a plan
shaped for its own `@ProviderID`, every time. That independence from
call order is the actual proof the fix worked — not just that one
provider got faster.

## Key terms

| Term | Meaning |
|---|---|
| `sp_recompile` | Forces the next call to recompile — a diagnostic tool, not a lasting fix |
| `OPTION (RECOMPILE)` | Forces a fresh plan every execution for one statement, trading CPU for reliability |
| Order-independence | The real proof of a parameter-sniffing fix: no call's timing depends on which ran first |

## Lab

Apply `OPTION (RECOMPILE)` to your own practice
`usp_GetProviderSchedule`. Run the three timed calls above in two
different orders and confirm the timings stay consistent regardless
of order.

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
is `sp_recompile` alone not a lasting fix, and what specific test
proves `OPTION (RECOMPILE)` actually solved the parameter sniffing
problem rather than just moving it?
