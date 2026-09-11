# Script — Architecture Planning: Raw Data to Reporting

## Segment 1 (title)

Lesson 1 sketched this pipeline in the abstract — SQL Server, then SSIS, then a warehouse, then SSRS and Power BI. This lesson makes it concrete: every object gets a real name before a single piece of it gets built.

## Segment 2 (steps: the pipeline, named)

Raw work order data lands in stg.WorkOrder. The WorkOrderETL package moves and transforms it. It lands in dw.FactWorkOrder and its dimensions. Then WorkOrderProductionSummary and a Power BI report both read those same warehouse tables — two independent consumers of one shared warehouse.

## Segment 3 (steps: role-playing date keys)

dw.FactWorkOrder carries three date foreign keys — StartDateKey, EndDateKey, and DueDateKey — and all three point at the same DimDate table. That's a role-playing dimension: one physical table, three roles, instead of building and maintaining three separate date tables that never actually change shape.

## Segment 4 (steps: out of scope)

Production.Location is a real table, but it lives at the WorkOrderRouting grain — one level finer than the work-order grain this capstone chose. Modeling it would force the fact table past its intended grain. Leaving it out isn't a gap. It's a scope decision, made on purpose.

## Segment 5 (outro)

Next lesson, you'll build stg.WorkOrder for real — loading raw data from Production.WorkOrder into SQL Server as the first concrete step in this architecture.
