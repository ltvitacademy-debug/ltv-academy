# Lesson 57 — Resource Governor

**Chapter 9 · Database Performance & Maintenance · Lesson 57 of 95**

## What you'll learn

- What Resource Governor actually limits, and the problem it exists to solve
- The three pieces: resource pools, workload groups, and classifier function
- Where this is genuinely relevant (Managed Instance, VM) and where it isn't (Azure SQL Database)
- A realistic example: stopping one reporting job from starving OLTP traffic

## The problem: one noisy workload, everyone else pays

Without any limits, SQL Server hands out CPU, memory, and I/O to
whatever asks for it, in the order it asks. That's fine until one
workload — an ad-hoc analyst query, an overnight reporting job that
overran its window, a runaway process — decides it wants all of it.
Every other session sharing that instance slows down, with no
warning and no isolation, because nothing was actually reserving
capacity for them. **Resource Governor** exists to put a ceiling on
how much CPU and memory a given workload can consume, so one noisy
consumer can't take capacity away from everyone else on the same
instance.

## The three pieces

Resource Governor has exactly three moving parts, and they only work
together:

```sql
-- 1. A resource pool: the actual CPU/memory ceiling
CREATE RESOURCE POOL ReportingPool
    WITH (MAX_CPU_PERCENT = 30, MAX_MEMORY_PERCENT = 25);

-- 2. A workload group: sits inside a pool, can add finer limits
CREATE WORKLOAD GROUP ReportingGroup
    USING ReportingPool;

-- 3. A classifier function: decides which group a session lands in
CREATE FUNCTION dbo.fn_ClassifyResourceGroup()
RETURNS sysname
WITH SCHEMABINDING
AS
BEGIN
    IF SUSER_SNAME() = 'reporting_svc' RETURN 'ReportingGroup';
    RETURN 'default';
END;

ALTER RESOURCE GOVERNOR WITH (CLASSIFIER_FUNCTION = dbo.fn_ClassifyResourceGroup);
ALTER RESOURCE GOVERNOR RECONFIGURE;
```

A **pool** is the actual ceiling. A **workload group** is where a
session lives day to day, and inherits its pool's limits. The
**classifier function** runs at login and decides, based on whatever
logic you write — login name, application name, host name — which
group a given session belongs to. Miss the `RECONFIGURE` step and
none of it takes effect; Resource Governor changes are staged, not
live, until you apply them.

## A realistic example

A reporting service account runs large ad-hoc queries against the
same instance as the OLTP application. Cap that login's workload
group at 30% CPU and 25% memory, and even its worst query physically
cannot take more than that ceiling — the OLTP workload's share is
protected by the classifier function routing that login somewhere
that can't touch it. This is the practical version of what Lesson 56
covers at the database-scoped-configuration level: different
workloads on the same instance getting different treatment,
deliberately, instead of first-come-first-served.

## Where this is (and isn't) real on Azure

Resource Governor is a feature of the SQL Server *engine*, and it's
available on **SQL Server on an Azure VM** and **Azure SQL Managed
Instance** — anywhere you have instance-level control. It is
**not available on Azure SQL Database**. That's not an oversight;
Azure SQL Database handles the same underlying problem differently,
through its own service-tier resource limits (DTU/vCore ceilings,
already enforced per database by the platform) rather than exposing
an instance-level Resource Governor for you to configure yourself.
Knowing which platform actually gives you this lever, and which one
solves the same problem a different way, is exactly the kind of real
platform distinction DP-300 tests.

## Key terms

| Term | Meaning |
|---|---|
| Resource Governor | Instance-level feature limiting CPU/memory per workload |
| Resource pool | The actual CPU/memory ceiling |
| Workload group | Where a session lives; inherits its pool's limits |
| Classifier function | Runs at login; decides which workload group a session joins |

## Check yourself

You're ready for Lesson 58 when you can explain, without looking: what
are the three pieces of Resource Governor and how do they work
together, and why is Resource Governor available on Managed Instance
and a VM but not on Azure SQL Database?
