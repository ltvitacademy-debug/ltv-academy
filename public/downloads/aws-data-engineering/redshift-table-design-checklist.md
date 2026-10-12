# Redshift Table Design Checklist

Use this before creating any new Redshift table that will be loaded from the data lake.
Distribution and sort key decisions are hard to change after a table has real data and
real queries depending on it — this checklist is meant to force the decision up front
instead of discovering data skew in production (Chapter 5).

## Step 1 — Pick a distribution style

- [ ] **Is this a small, frequently-joined lookup/dimension table** (region, date,
      product category)? → Use `DISTSTYLE ALL`. The cost of a full copy on every node is
      trivial for a small table, and it guarantees every join against it is local.
- [ ] **Is this a large fact table with one dominant join column** (e.g., `customer_id`
      joining orders to customers)? → Use `DISTSTYLE KEY` with that column as `DISTKEY`.
- [ ] **Is there no dominant join pattern, or is even distribution more important than
      join locality** for this table? → Use `DISTSTYLE EVEN`.

## Step 2 — If using DISTKEY, sanity-check it against skew

- [ ] Does the candidate column have **high cardinality** (many distinct values)? A
      column like `status` with 3 possible values will pile most rows onto a handful of
      slices.
- [ ] Is it a **column other large tables actually join on**? A high-cardinality column
      nobody joins on gives you even distribution but no join-locality benefit — `DISTSTYLE
      EVEN` would do the same job more simply.
- [ ] After loading a representative sample, check `svv_table_info` or `svv_diskusage` for
      row-count skew across slices before calling the design done.

## Step 3 — Pick a sort key

- [ ] What column do queries **filter a range on most often**? Date columns are the most
      common choice (`order_date`, `event_timestamp`).
- [ ] Do queries filter on **one column most of the time**? → Compound sort key,
      leading with that column.
- [ ] Do queries filter unpredictably across **several different columns**? → Consider an
      interleaved sort key, accepting higher maintenance cost (more expensive VACUUM).

## Step 4 — Loading: COPY, not INSERT

- [ ] Loading more than a handful of rows? Always use `COPY`, never a loop of `INSERT`
      statements — `COPY` parallelizes across every compute node's slices; `INSERT` runs
      through the leader node one statement at a time.
- [ ] Does the load need an **exact, known set of files** (not "everything currently
      under this prefix")? → Use a manifest file with `mandatory: true` on each entry, so
      a missing file fails the whole load instead of silently loading a partial batch.
- [ ] Does the IAM role used by `COPY` have `s3:GetObject` and `s3:ListBucket` scoped to
      the source prefix — not `*`?

## Reference: the `orders` / `customers` design from this course

```sql
CREATE TABLE sales.customers (
  customer_id   varchar(20) PRIMARY KEY,
  region        varchar(50),
  signup_date   date
)
DISTSTYLE ALL;

CREATE TABLE sales.orders (
  order_id         varchar(20) PRIMARY KEY,
  customer_id      varchar(20) REFERENCES sales.customers(customer_id),
  order_date       date,
  product_category varchar(50),
  order_total      decimal(10,2)
)
DISTSTYLE KEY
DISTKEY (customer_id)
SORTKEY (order_date);
```

`customers` is small and joined constantly, so every node gets a full copy (`ALL`).
`orders` is large and joins to `customers` on `customer_id`, so that's the `DISTKEY` —
colocating matching rows means the join never shuffles data across the network. `order_date`
is the `SORTKEY` because nearly every reporting query filters to a date range, letting
Redshift's zone maps skip blocks outside it.

## Related lessons

Redshift Architecture, Loading Data With COPY, Distribution & Sort Keys, Workload
Management, Redshift Performance Tuning (Chapter 5).
