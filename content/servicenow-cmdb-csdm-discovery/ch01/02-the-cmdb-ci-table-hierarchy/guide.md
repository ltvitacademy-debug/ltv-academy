# Lesson 2 — The cmdb_ci Table Hierarchy

**Chapter 1 · CMDB Fundamentals · Lesson 2 of 26**

## What you'll learn

- Why `cmdb_ci` exists as a single base table instead of one table per CI type
- The real subclasses: `cmdb_ci_server`, `cmdb_ci_appl`, `cmdb_ci_network_gear`, `cmdb_ci_database`, `cmdb_ci_service`
- What each subclass adds that the generic base table doesn't have
- How this is the exact same extension pattern you already learned on the `task` table

## Same pattern, different base table

Platform Fundamentals Lesson 11 taught table extension using the `task`
table: Incident, Problem, and Change all extend `task`, inheriting its
common fields while adding their own. Lesson 12 then walked the Task
Table Hierarchy itself. The CMDB uses the identical mechanism on a
different base table. `cmdb_ci` sits at the top, holding the fields
every CI needs regardless of type — `name`, `sys_class_name`,
`operational_status`, `install_status`, `support_group`, `location`, and
so on — and dozens of real subclasses extend it, each adding only the
fields relevant to that specific kind of thing.

## Why one base table instead of one table per CI type

If every CI type were its own unrelated table, two problems would
appear immediately. First, anything that needs to work across all CIs —
a list view showing every configuration item regardless of type, a
relationship that can point at "any CI," a report counting CIs by
operational status — would have to know about every single table
individually and union them together by hand. Second, every new CI type
would have to reinvent the same dozen common fields from scratch, with
no guarantee two developers spelled `operational_status` the same way.
A shared base table solves both: `cmdb_ci_rel_ci` (the relationship
table you'll meet in Chapter 2) can reference "a CI" generically, and
every subclass automatically inherits the same core fields with the
same names and the same behavior.

## The real subclasses, and what each one actually adds

- **`cmdb_ci_server`** — a physical or virtual server. Adds fields a
  generic CI has no use for: CPU count, RAM, disk capacity, operating
  system, and virtualization type. A network switch has none of these
  attributes, so putting them on the base table would mean every CI,
  switches included, carries empty CPU and RAM fields it will never
  use.
- **`cmdb_ci_appl`** — a software application. Adds fields like
  version, vendor, and the business criticality of that specific
  installation — attributes a server doesn't need.
- **`cmdb_ci_network_gear`** — a network device such as a switch or
  router. Adds fields like port count and firmware version, not CPU or
  RAM.
- **`cmdb_ci_database`** — a database instance. Adds fields like
  database type (the specific engine), schema, and instance name.
- **`cmdb_ci_service`** — a business or technical service. This is a
  preview; you'll cover it in real depth in Chapter 3 once CSDM gives
  you the full model for how services, applications, and
  infrastructure relate to each other.

Every one of these still inherits `name`, `operational_status`,
`support_group`, and the rest of the base `cmdb_ci` fields. A server
record and a database record both have an `operational_status`, and a
query against the base table can filter on it without caring which
subclass a given record actually belongs to.

## What this buys you in practice

When you build a relationship, a list, or a report in later chapters,
you'll frequently work against the base `cmdb_ci` table precisely
because it already has what's common to everything. You only drop down
to a specific subclass — `cmdb_ci_server`, say — when you need a field
that's genuinely specific to that type, like RAM. Knowing which fields
live where is what keeps you from adding a redundant custom field to one
subclass when the attribute you actually need already exists, inherited,
on the base table.

## Key terms

| Term | Meaning |
|---|---|
| `cmdb_ci` | The base table holding fields common to every CI type |
| `cmdb_ci_server` | Server subclass; adds CPU, RAM, disk, OS, virtualization fields |
| `cmdb_ci_appl` | Application subclass; adds version, vendor, criticality fields |
| `cmdb_ci_network_gear` | Network device subclass; adds port count, firmware fields |
| `cmdb_ci_service` | Business/technical service subclass; covered in depth in Chapter 3's CSDM content |

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
does putting CPU and RAM fields on the generic `cmdb_ci` base table
instead of on `cmdb_ci_server` cause a real problem, not just an
aesthetic one?
