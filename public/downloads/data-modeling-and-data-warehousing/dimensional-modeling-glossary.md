# Dimensional Modeling Glossary

Every term below is pulled directly from this course's own "Key terms"
tables, chapter by chapter — not a generic outside glossary. Use it as a
single reference instead of hunting back through 39 lesson guides, and as
interview-prep flash material: cover the right column and see if you can
state the definition first.

## Chapter 1 — Dimensional Modeling Fundamentals

| Term | Meaning |
|---|---|
| OLTP | Online Transaction Processing — normalized schemas optimized for fast, individual writes |
| OLAP | Online Analytical Processing — dimensional schemas optimized for large, aggregated historical reads |
| Dimensional model | A warehouse schema (star or snowflake) designed specifically for analytical queries |
| Conformed | A shared, governed definition (of a dimension or a metric) used consistently across the whole warehouse |
| Dimensional modeling | A data modeling technique that structures data as fact and dimension tables for fast, intuitive analytical queries |
| Dimension table | Describes a business entity (product, customer, date); has a key plus descriptive attributes |
| Fact table | Stores measurements/events; has dimension keys plus numeric measures |
| Denormalization | Deliberately storing redundant descriptive data to reduce joins and speed up reads |
| Star schema | A fact table joined directly, one hop, to each of its fully denormalized dimension tables |
| Snowflake schema | A star schema where one or more dimensions are normalized into multiple related tables |
| Higher-grain fact | A fact table whose grain sits at a coarser level (e.g. subcategory) than another fact table's grain (e.g. product) |
| Grain | A one-sentence statement of what a single fact table row represents |
| Atomic grain | The lowest level of detail the source system captures |
| Mixed grain | A design error where a single fact table silently holds rows at two different grains |
| Business process | An organizational activity to measure, tied to an identifiable operational event — not a department or report |
| Four-step design process | Choose the business process, declare the grain, identify the dimensions, identify the facts — always in that order |
| Dimension identification | Determining which business entities describe a row, once the grain is fixed |
| Fact identification | Determining which numeric measures belong on a row, once the grain is fixed |

## Chapter 2 — Fact Tables

| Term | Meaning |
|---|---|
| Transaction fact table | One row per business event, inserted once and left alone |
| Periodic snapshot fact table | One row per entity per fixed interval, loaded on a schedule |
| Accumulating snapshot fact table | One row per process instance, updated as it reaches each milestone |
| Additive measure | A measure that can be validly summed across every dimension |
| Semi-additive measure | Valid to sum across some dimensions (e.g. products) but not others (e.g. time) |
| Attribute (on a fact table) | A fact table column that sets grain but isn't a dimension key or measure (e.g. an order number) |
| Snapshot date | The dimension key that identifies which interval a snapshot row belongs to |
| Milestone | A defined stage in a business process, each with its own date dimension key |
| Role-playing dimension | The same physical dimension referenced multiple times, once per role |
| Factless fact table | A fact table with no measure columns; measured by counting rows |
| Event factless table | Records that something happened; a row is an occurrence |
| Coverage factless table | Records that a condition existed, useful for finding what *didn't* happen when compared to a transaction table |

## Chapter 3 — Dimension Tables

| Term | Meaning |
|---|---|
| Denormalization (dimension) | Deliberately storing redundant, precomputed data (like flattened hierarchy levels) to avoid joins |
| Dimension attribute | A descriptive column used to filter or group facts — not aggregated itself |
| Wide but short | The typical dimension table shape: many columns, relatively few rows |
| Surrogate key | A system-generated, meaningless identifier used as a dimension's primary key |
| IDENTITY | The T-SQL column property that auto-generates sequential surrogate key values |
| Reserved key value | A small negative or zero surrogate key representing missing, unknown, N/A, or error rows |
| Natural key | The source system's own identifier — kept for traceability and change detection |
| ISO 8601 | The international date format standard (`YYYYMMDD`) the date dimension's surrogate key follows |
| Degenerate dimension | An identifier kept on the fact table itself instead of a separate dimension table |
| Conformed dimension | A single, shared dimension table referenced by multiple fact tables |
| Drill-across | A query comparing measures from two different fact tables via a dimension they both share |

## Chapter 4 — Slowly Changing Dimensions

| Term | Meaning |
|---|---|
| SCD Type 0 | An attribute whose value is fixed at insert and is never updated, regardless of later source changes |
| Write-once column | A column deliberately excluded from every load's `UPDATE` logic |
| SCD Type 1 | Overwrite the existing dimension row in place when an attribute changes; no history is kept |
| Retroactive rollup | The side effect where historical facts, joined to an overwritten dimension row, now reflect the new value as if it had always been true |
| SCD Type 2 | Insert a new, time-versioned row when an attribute changes, preserving the old row as permanent history |
| EffectiveDate / ExpirationDate | The validity window during which a given version was the current one |
| IsCurrentFlag | Marks exactly one version per natural key as the one current fact loads should use |
| Rapidly changing dimension | An attribute that changes so often that Type 2 versioning produces too many rows — a signal to reconsider |
| SCD Type 3 | Track only the immediately previous value of an attribute, in an extra column on the same row |
| Previous-value column | The extra column(s) added specifically to hold the prior value and, often, when it changed |
| Limited history | The defining constraint of Type 3 — only one prior value is retained, not a full timeline |
| Hybrid SCD dimension | A single dimension table applying different SCD types to different columns |
| Per-attribute classification | The design step of assigning an SCD type to each attribute individually, based on its own history requirement |

## Chapter 5 — Staging & ETL Design

| Term | Meaning |
|---|---|
| Staging layer | An intermediate set of tables holding source data temporarily before transformation and load into the warehouse |
| ETL | Extract, Transform, Load — the pipeline pattern where staging typically sits inside the Transform stage |
| Extract | Pulling data out of a source system, largely unchanged |
| Load | Inserting or merging already-transformed, warehouse-shaped data into fact and dimension tables |
| Loosely typed | Using wide, forgiving column types (often strings) so bad source data doesn't fail the load |
| Truncate-and-reload | Emptying a staging table and reloading it fresh on every run, rather than accumulating history |
| Un-constrained | Without primary keys, foreign keys, or check constraints — validation happens downstream instead |
| Full load | Extracting the entire source table on every run |
| Watermark | A column value (timestamp or increasing key) used to mark how far a previous load already got |
| Referential integrity check | Confirming a fact row's dimension key actually exists in that dimension before loading |
| Duplicate check | Detecting the same source row landing more than once in a single extract |
| Quarantine table | A table that holds rows a validation check rejected, along with the reason, instead of silently dropping them |
| Lineage | The traceable path a row of data took from its original source to its current location |
| BatchID | An identifier shared by every row loaded together in a single run |
| SourceSystem | A column recording which upstream system a row actually originated from |

## Chapter 6 — Advanced Warehouse Patterns

| Term | Meaning |
|---|---|
| Junk dimension | A single dimension table consolidating several small, unrelated, low-cardinality attributes |
| Cartesian product | Every possible combination of the input attributes' values — the technique used to build a junk dimension's rows |
| Cardinality | The number of distinct values an attribute can take — junk dimensions only work when this stays low |
| Active relationship | In a semantic model, the one relationship between two tables that filters by default when several exist between the same pair |
| USERELATIONSHIP | The DAX function that activates a normally-inactive relationship for the duration of one calculation |
| Many-to-many relationship | A relationship where either side can legitimately relate to multiple rows on the other side |
| Bridge table | A table storing one row per valid combination, resolving a many-to-many relationship into two one-to-many relationships |
| Late-arriving dimension | A dimension whose full details arrive after a fact referencing it has already been loaded |
| Inferred member | A dimension row inserted by the fact load process itself, using Unknown placeholder values, when a dimension-key lookup fails but the natural key is trusted |
| IsInferredMember | An audit attribute set to TRUE on an inferred row, and flipped to FALSE once its real attribute values are sourced and updated |
| Aggregate fact table | A rollup of a base fact table to lower dimensionality and/or higher granularity, built to speed up common queries |
| CTAS | CREATE TABLE AS SELECT — the T-SQL technique used to build an aggregate table from a query against the detailed fact |

## Chapter 7 — Building the Warehouse

| Term | Meaning |
|---|---|
| Physical design | Translating a logical dimensional model into real `CREATE TABLE` DDL, data types, and keys |
| Natural/business key | The source system's original key, retained on a dimension for ETL lookups, never used for joins |
| Date key | An `INT` (`YYYYMMDD`) surrogate key joining a fact table to `Dim_Date`, instead of a `DATETIME` column |
| Rowstore index | A traditional B-tree index storing data row-by-row — good for lookups, poor for large aggregate scans |
| Columnstore index | An index/storage format storing data column-by-column with heavy compression and batch-mode execution |
| Clustered columnstore index | Converts a table's entire physical storage to columnstore format — the default for fact tables |
| Nonclustered columnstore index | A columnstore index added alongside a table that remains rowstore, covering just the analytical columns |
| Partition function | Maps column values to partition numbers, defining the boundaries |
| Partition scheme | Maps partition numbers to physical filegroups |
| Partitioning column | The fact table column the partitioning is based on — almost always the date key |
| Partition elimination | The query optimizer skipping partitions that can't contain matching rows, based on a filter on the partitioning column |
| Surrogate key suffix | The `Key` suffix (e.g. `ProductKey`) marking a column as a warehouse-generated join key |
| Audit/lineage columns | A fixed, identically-named set of columns (e.g. `LoadDateTime`) repeated across every loaded table |
| ER diagram | A visual entity-relationship diagram of tables and their relationships — SSMS's Database Diagram tool draws these live |
| Extended property | Arbitrary name/value metadata attached to a SQL Server object, e.g. via `sp_addextendedproperty` |
| Data dictionary | The documented record of every table's grain, column meanings, SCD types, and load frequency |

## Chapter 8 — Capstone

| Term | Meaning |
|---|---|
| Scope | A written statement of what a design project will and won't cover, fixed before design work starts |
| Purchasing schema | The `AdventureWorks2012` schema holding purchase order and vendor tables — a real OLTP source |
| Accumulating snapshot | A fact table type tracking a process with a defined lifecycle, where milestone dates and measures update in place as the row progresses |
