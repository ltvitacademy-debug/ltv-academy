# Patching Strategy

## What you'll learn

- Why Cumulative Updates (CUs) are the only patching mechanism for modern SQL Server
- How to check exactly what build an instance is running
- What a defensible, real-world patching cadence looks like

## Cumulative Updates are the whole story now

For SQL Server 2017 and later, Microsoft delivers all fixes — security patches, bug fixes,
performance fixes — through a single mechanism: the **Cumulative Update (CU)**. Service Packs,
the old quarterly-or-so rollup model, were phased out after SQL Server 2016; there hasn't been a
Service Pack for 2017 or any later version. Each CU is itself cumulative — CU12 contains
everything CU1 through CU11 contained, plus more — so you never need to install a chain of
updates to catch up. You install the latest CU for your version and you're current.

CUs ship roughly monthly early in a version's life and then taper off as the version matures,
though the cadence varies release to release. There's no separate "Service Pack 1" milestone to
wait for anymore — the CU stream itself is the patching lifecycle. GDR (General Distribution
Release) builds also exist, used for narrowly scoped, security-only fixes for older versions no
longer receiving full CUs — but for a currently supported version, you're patching with CUs.

## Checking what you're actually running

Before you can decide whether to patch, you need to know your current build. Two ways to check,
both real and commonly used:

```sql
SELECT @@VERSION;

SELECT SERVERPROPERTY('ProductVersion') AS ProductVersion,
       SERVERPROPERTY('ProductLevel')   AS ProductLevel,   -- RTM, CU, etc.
       SERVERPROPERTY('ProductUpdateLevel') AS CULevel,
       SERVERPROPERTY('Edition')        AS Edition;
```

`@@VERSION` is quick and human-readable but returns everything as one string. The
`SERVERPROPERTY()` calls return structured values you can actually script against — check them
before and after a patch to confirm the update took, and compare the `ProductVersion` against
Microsoft's published build list for your major version to see exactly how far behind you are
and what's in the gap.

## A defensible patching cadence

"Patch immediately" and "never patch" are both wrong answers. A real cadence looks like this:

1. **Watch for the release.** New CUs get announced; security-relevant ones are flagged as such.
2. **Apply to test/staging first, always.** Never let production be the first place a new CU
   runs. This is non-negotiable — see the next lesson for how to actually test an upgrade.
3. **Give it a soak period on a non-critical environment** — days, not months, for CUs; longer
   scrutiny is reserved for major version jumps. CUs are typically lower-risk than major upgrades
   since they don't change the compatibility level or optimizer version, but "lower-risk" isn't
   "zero-risk."
4. **Patch production in a scheduled maintenance window**, with a fresh full backup taken
   immediately beforehand (the next-next lesson covers why this matters even for a "just a CU"
   patch).
5. **Don't let a production instance drift more than one or two CUs behind current** for a
   supported version — falling far behind turns every future patch into a bigger, riskier jump,
   and leaves known, published vulnerabilities unpatched for longer than necessary.

## Key terms

| Term | Meaning |
|---|---|
| Cumulative Update (CU) | The sole patching mechanism for SQL Server 2017+; each CU is fully cumulative |
| Service Pack | The old patching model, phased out after SQL Server 2016 |
| GDR (General Distribution Release) | Narrow, security-only patch stream, mainly for older out-of-mainstream-CU versions |
| `SERVERPROPERTY()` | Function returning structured build/edition info, scriptable unlike `@@VERSION` |

## Check yourself

Your instance is three CUs behind current. Is that, by itself, a reason to panic and patch
production tonight — why or why not?
