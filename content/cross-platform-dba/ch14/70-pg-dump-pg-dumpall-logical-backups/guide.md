# pg_dump, pg_dumpall & Logical Backups

The previous lesson drew the line between logical and physical backups. This lesson puts
real `pg_dump` and `pg_dumpall` syntax in your hands — the formats, the flags that matter,
and how to restore each one.

## What you'll learn

- pg_dump's output formats, and when to use which
- Restoring a plain-SQL dump vs. a custom-format dump
- What pg_dumpall covers that pg_dump doesn't

## pg_dump: one database, several formats

`pg_dump` backs up a single database. The format flag (`-F`) decides what you get:

- `-Fp` (plain, the default): a plain-text SQL script. Restore it with `psql -f
  backup.sql -d targetdb`. Fully human-readable, easy to edit, but restores serially and
  can't be filtered at restore time.
- `-Fc` (custom): a compressed, non-text archive built for `pg_restore`. This is the format
  most production dumps use — it supports parallel restore (`pg_restore -j`), selective
  restore of individual tables or schemas, and restoring the schema without the data (or
  the reverse).
- `-Ft` (tar): a tar archive, restorable with `pg_restore`, less flexible than custom format
  but usable with standard tar tooling.
- `-Fd` (directory): each table dumped as a separate file inside a directory, the only
  format that supports parallel *dump* (`pg_dump -j`) as well as parallel restore.

A typical production dump:

```
pg_dump -Fc -d salesdb -f salesdb.dump
```

Restoring it:

```
pg_restore -d salesdb_new -j 4 salesdb.dump
```

## pg_dumpall: the cluster-wide objects pg_dump skips

`pg_dump` only ever backs up one database's objects and data. Roles (users and groups),
tablespaces, and other cluster-wide objects live outside any single database, so `pg_dump`
never touches them. `pg_dumpall` fills that gap. Run with no options, it dumps every
database in the cluster as plain SQL — but its more targeted, more common use is:

```
pg_dumpall --globals-only -f globals.sql
```

`--globals-only` dumps just the roles, role memberships, and tablespaces — the cluster-wide
setup a full restore needs *before* you restore individual databases with `pg_dump`/
`pg_restore`. A complete disaster-recovery restore sequence is: recreate the cluster,
restore globals with `pg_dumpall --globals-only`, then restore each database from its own
`pg_dump` backup.

## Key terms

| Term | Meaning |
|---|---|
| Custom format (`-Fc`) | pg_dump's compressed archive format, restored with pg_restore, supports parallel and selective restore |
| pg_restore | The utility that restores custom, tar, and directory format dumps (not plain SQL, which uses psql) |
| pg_dumpall | Dumps cluster-wide objects (roles, tablespaces) that pg_dump doesn't cover, plus optionally all databases |
| Globals | Roles, role memberships, and tablespaces — objects that exist at the cluster level, not inside one database |

## Check yourself

You're rebuilding a PostgreSQL cluster from scratch after a total server loss. You have a
`pg_dumpall --globals-only` file and separate `pg_dump -Fc` files for each database. What
order do you restore them in, and why does the order matter?
