# Resource Governor for Performance

Lesson 31 covered giving the buffer pool enough memory instance-wide. Resource Governor
goes a level more specific: instead of tuning a resource for the whole instance, it lets
you carve the instance's CPU and memory into named pools and steer specific workloads into
them — so one workload's excess can't quietly starve another's.

## What you'll learn

- The three pieces Resource Governor is built from: classifier function, workload groups,
  resource pools
- How to cap CPU and memory for one named pool without touching anything else
- The concrete case this solves: keeping a reporting workload from starving OLTP traffic

## Three pieces: classifier, workload groups, resource pools

**Resource pools** define the actual resource limits — a slice of CPU and memory the
instance will allow. **Workload groups** are the buckets individual sessions get sorted
into on connection; each workload group is bound to exactly one resource pool. The
**classifier function** is a scalar user-defined function you write, run once per new
session, that inspects things like `SUSER_NAME()`, `APP_NAME()`, or `HOST_NAME()` and
returns the name of the workload group that session belongs in. Any session the function
doesn't explicitly classify lands in the built-in `default` group and `default` pool.

```sql
CREATE FUNCTION dbo.RGClassifier()
RETURNS SYSNAME
WITH SCHEMABINDING
AS
BEGIN
    DECLARE @GroupName SYSNAME;
    IF APP_NAME() LIKE 'PowerBI%' OR APP_NAME() LIKE 'SSRS%'
        SET @GroupName = 'ReportingGroup';
    ELSE
        SET @GroupName = 'OltpGroup';
    RETURN @GroupName;
END;
GO
ALTER RESOURCE GOVERNOR WITH (CLASSIFIER_FUNCTION = dbo.RGClassifier);
ALTER RESOURCE GOVERNOR RECONFIGURE;
```

## Defining the pools and groups

```sql
CREATE RESOURCE POOL ReportingPool
WITH (MAX_CPU_PERCENT = 30, MAX_MEMORY_PERCENT = 20);
GO
CREATE WORKLOAD GROUP ReportingGroup
USING ReportingPool;
GO
CREATE RESOURCE POOL OltpPool
WITH (MIN_CPU_PERCENT = 50, MAX_CPU_PERCENT = 100);
GO
CREATE WORKLOAD GROUP OltpGroup
USING OltpPool;
GO
ALTER RESOURCE GOVERNOR RECONFIGURE;
```

`MAX_CPU_PERCENT` and `MAX_MEMORY_PERCENT` cap what a pool can consume even under
contention; `MIN_CPU_PERCENT` guarantees a floor for a pool when the instance is under CPU
pressure and multiple pools are competing. Every change to pools, groups, or the classifier
function requires `ALTER RESOURCE GOVERNOR RECONFIGURE` before it takes effect.

## The concrete case: reporting shouldn't starve OLTP

A common real scenario: a heavy Power BI or SSRS reporting workload runs ad hoc queries
against the same instance as an OLTP application, and during a big report run, OLTP
transactions start timing out because the reporting queries are consuming most of the CPU.
Resource Governor addresses this directly — cap the reporting pool's `MAX_CPU_PERCENT`
(and `MAX_MEMORY_PERCENT`, so a large report can't grab an outsized memory grant either)
low enough that even a runaway report query can only ever take its capped share, while the
OLTP pool's `MIN_CPU_PERCENT` guarantees the transactional workload a floor it can always
fall back on. Note what this doesn't do: it doesn't make the reporting queries themselves
faster — Chapter 3's index tuning and Chapter 4's query rewrites still matter for that — it
isolates their resource *footprint* so the rest of the instance stays predictable
regardless of how heavy that one workload gets.

## Key terms

| Term | Meaning |
|---|---|
| Classifier function | A scalar UDF run per session that returns which workload group it belongs to |
| Workload group | A named bucket sessions are classified into; bound to exactly one resource pool |
| Resource pool | Defines the actual CPU/memory limits (and floors) enforced for its workload group(s) |
| MAX_CPU_PERCENT / MAX_MEMORY_PERCENT | Caps on what a pool can consume, even under contention |
| MIN_CPU_PERCENT | A guaranteed floor for a pool when multiple pools are competing for CPU |

## Check yourself

An SSRS reporting workload and an OLTP application share one SQL Server instance, and
heavy report runs are causing OLTP transaction timeouts. Per this lesson, which three
Resource Governor pieces would you need to set up, and what does capping the reporting
pool's CPU actually fix — and not fix — about the underlying report queries?
