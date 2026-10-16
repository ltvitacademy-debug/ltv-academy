# Data Lake Zone & Partitioning Design Checklist

A compiled reference pulling together Chapter 1's storage, zone, and
access-control lessons (Lessons 1–12) into one checklist you can run
through before you write a single line of ingestion code — exactly the
order a real onboarding task for a new data source follows.

---

## 1. Storage account and container

- [ ] Storage account created with **hierarchical namespace enabled** (ADLS Gen2, not plain Blob Storage) — Lesson 2 / Lesson 4. Hierarchical namespace is set at account creation and cannot be turned on later, so confirm this first.
- [ ] One container per logical dataset or domain, not one giant container for everything — Lesson 3.

## 2. Zone layout — pick one naming convention and use it consistently

| Raw/Cleansed/Curated (Lesson 11) | Bronze/Silver/Gold (Lesson 12) | Holds |
|---|---|---|
| Raw | Bronze | Untouched, exact copy of the source |
| Cleansed | Silver | Validated, typed, deduplicated |
| Curated | Gold | Business-ready, aggregated for consumption |

- [ ] Raw/Bronze is write-once, **never modified in place** — if a cleansing rule turns out wrong, reprocess from here.
- [ ] Each zone gets its own directory/container prefix (e.g. `raw/`, `cleansed/`, `curated/`), never mixed together in one folder.

## 3. Partitioning — storage-level, not Spark-level

- [ ] Partition column chosen is one real queries **actually filter on often** — Lesson 9.
- [ ] Partition column has a **manageable number of distinct values** (date parts like year/month, not a raw timestamp or a high-cardinality ID) — over-partitioning creates thousands of tiny, unhelpful directories.
- [ ] Directory names follow **Hive-style `key=value`** naming (`year=2024/month=01/`) so Spark, Synapse, and other engines recognize them automatically.
- [ ] Confirm partition pruning actually works: a filtered query should visibly skip non-matching directories, not just filter rows after reading everything.

## 4. Access control — pick RBAC, ACLs, managed identity, or a SAS token deliberately

- [ ] **Recurring automated pipeline** (a Spark job, an ETL script running on a schedule) → **managed identity** with an RBAC role scoped to the container it needs, not the whole storage account — Lesson 6.
- [ ] **One-off or time-boxed external access** (a contractor, a partner, a single download link) → a **SAS token**, scoped to the narrowest path and permission set needed, with the **shortest expiry that's still practical** — Lesson 7. Never a long-lived or account-level SAS for a one-off need.
- [ ] **Folder-level exceptions within a container** (one team can read `curated/` but not `raw/`) → **ACLs** layered on top of a broader RBAC role — Lesson 5.
- [ ] No credentials (storage keys, SAS tokens) are ever committed to source control or hardcoded in a script — pull them from a secrets store at runtime.

## 5. File format

- [ ] Raw/Bronze keeps the source's original format (CSV, JSON — whatever it arrived in) — don't reformat on the way in.
- [ ] Cleansed/Silver and Curated/Gold convert to **Parquet** (or Delta, if the platform supports it) — columnar, compressed, and what every downstream query engine reads efficiently — Lesson 8.

---

*Reference: Chapter 1, "Azure Data Lake & Storage," Lessons 1–12 of Data Engineering Foundations.*
