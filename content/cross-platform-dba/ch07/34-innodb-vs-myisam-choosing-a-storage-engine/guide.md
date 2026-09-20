# InnoDB vs. MyISAM: Choosing a Storage Engine

The last lesson established that MySQL's storage engine is a pluggable, per-table choice.
Now it's time to actually make that choice. In practice there are only two engines a working
DBA needs a real opinion on: InnoDB and MyISAM. One of them should be your default almost
without exception, and understanding exactly why is what separates "I picked InnoDB because
it's the default" from actually knowing what you'd lose by picking MyISAM instead.

## What you'll learn

- What InnoDB actually provides: transactions, row-level locking, foreign keys, crash recovery
- What MyISAM actually is: a simpler, older engine with real limitations, not just "the old one"
- Why InnoDB became the default in MySQL 5.5 and stayed the default ever since
- How to check and change a table's engine, and when MyISAM is still defensible

## InnoDB: the modern default, and why it earns that spot

InnoDB is a full ACID-compliant transactional storage engine. Every table it manages supports
`COMMIT` and `ROLLBACK`, survives a crash without silent data loss because it maintains its own
redo log and doubles-as-undo via MVCC, and enforces referential integrity through real foreign
key constraints — `REFERENCES` clauses that MySQL actually checks, not just documents. Locking
happens at the row level: two transactions can update different rows in the same table at the
same time without blocking each other, which is the behavior a SQL Server or Oracle DBA already
takes for granted and would find alarming to lose. InnoDB also clusters each table's data
physically around its primary key, so primary-key lookups and range scans on the primary key are
fast by construction — a detail with real design consequences that gets its own lesson later.

```sql
CREATE TABLE orders (
  order_id   INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  total      DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
) ENGINE = InnoDB;
```

## MyISAM: the legacy engine, and what it genuinely lacks

MyISAM was MySQL's original default engine and is still shipped with every MySQL install, but it
is missing capabilities a modern relational workload usually needs. It has no transactions at
all — no `COMMIT`, no `ROLLBACK`, no atomicity across multiple statements. It has no foreign key
support — `REFERENCES` clauses in a MyISAM `CREATE TABLE` are silently ignored, not enforced.
Locking is table-level: a single write to a MyISAM table locks the entire table against other
writes, which under real concurrent write load becomes a serious bottleneck. It also has weaker
crash recovery — a MyISAM table can require a manual repair (`REPAIR TABLE`) after an unclean
shutdown, where InnoDB's redo log replays automatically. What MyISAM does offer is a smaller
on-disk footprint and, historically, an edge in full-text search and pure read-heavy workloads,
though InnoDB gained `FULLTEXT` index support in MySQL 5.6 and closed most of that gap.

```sql
CREATE TABLE search_archive (
  doc_id INT PRIMARY KEY,
  body   TEXT
) ENGINE = MyISAM;
```

## The honest recommendation

MySQL itself made the call: InnoDB has been the default storage engine since MySQL 5.5,
released in 2010, specifically because table-level locking and no crash recovery were becoming
unacceptable for real production workloads. For essentially any table that gets concurrent
writes, needs referential integrity, or simply needs to survive a crash without manual repair,
InnoDB is the correct choice — not "usually," but almost always. MyISAM survives today mostly in
old schemas nobody has migrated yet, and in narrow cases like a static, read-only, single-writer
archive table where table-level locking never actually contends with anything. When in doubt,
default to InnoDB and require a specific reason to choose otherwise.

```sql
-- Check a table's current engine
SELECT table_name, engine FROM information_schema.tables
WHERE table_schema = 'shop' AND table_name = 'orders';

-- Convert an existing MyISAM table to InnoDB
ALTER TABLE orders ENGINE = InnoDB;
```

## Key terms

| Term | Meaning |
|---|---|
| ACID | Atomicity, Consistency, Isolation, Durability — the transactional guarantees InnoDB provides and MyISAM does not |
| Row-level locking | InnoDB locks only the rows a transaction touches, allowing concurrent writes to different rows |
| Table-level locking | MyISAM locks the entire table on write, blocking all other writers until it releases |
| Crash recovery | InnoDB replays its redo log automatically on restart; MyISAM may need `REPAIR TABLE` |
| `information_schema.tables` | System view that reports each table's storage engine, among other metadata |

## Check yourself

An `orders` table gets dozens of concurrent inserts per second from checkout traffic. Walk
through what happens differently under MyISAM's table-level locking versus InnoDB's row-level
locking during that traffic, and explain why one of these engines would visibly degrade under
load while the other wouldn't.
