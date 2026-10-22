# Lesson 15 — The Dictionary & What It Controls

**Chapter 4 · Dictionary Entries & Field Types · Lesson 15 of 34**

## What you'll learn

- What `sys_dictionary` actually is, and why it's the real control panel behind every field
- The specific attributes a dictionary entry carries: type, length, default value, mandatory, read-only
- Why "metadata-driven" means a dictionary edit changes behavior platform-wide, with no code
- The two real paths to a dictionary entry: System Definition > Dictionary, and Personalize Dictionary from a form

## You already met this table — now go deeper

Lesson 10 introduced `sys_dictionary` as the table that holds one record per field,
across every table in the instance. This lesson is about what's actually sitting
inside one of those records, and why editing it is the single highest-leverage
action a ServiceNow admin can take. A dictionary entry isn't documentation of a
field — it **is** the field. There is no separate schema file anywhere that the
platform consults instead.

## What one dictionary entry actually carries

Open any dictionary entry — say, the one for Incident's `short_description` field —
and you'll find a specific, bounded set of attributes, not a vague description.
The entry carries: the **table** it belongs to, the **column name** (the real
database name, like `short_description`), the **label** shown on forms ("Short
description"), the **type** (string, reference, choice, and so on — Lesson 16 goes
field-type by field-type), the **max length** the database will accept, an optional
**default value** applied to new records, and a set of behavior flags: **Mandatory**,
**Read-only**, **Active**, and **Unique**, among others. Every one of those is a
column on the `sys_dictionary` record itself — meaning you're editing data, not
configuration buried in a file you can't query.

## Metadata-driven: what changes when you flip one flag

Here's the part that separates ServiceNow from a hand-coded application: check the
**Mandatory** checkbox on a dictionary entry, save it, and every form built against
that table — Agent Workspace, the classic UI form, even forms built after today —
immediately requires that field before the record can be saved. No developer wrote
a validation rule. No code shipped. The platform reads `sys_dictionary` live, on
every render, and the mandatory asterisk, the red-border validation, and the save
block all come from that one flag. The same is true of **Read-only**: flip it, and
the field becomes uneditable everywhere it appears, instantly. This is what
"metadata-driven platform" means in practice — behavior lives in data you can
inspect and change, not in compiled logic.

## Two real paths to the same record

You can reach a dictionary entry two ways, and both land on the exact same
`sys_dictionary` record. The direct path is **System Definition > Dictionary**,
which opens a list view of every dictionary entry in the instance — filterable by
table, exactly like any other list from Chapter 3. The contextual path, faster when
you're already looking at the field you care about, is right-clicking a field's
label on an open form and choosing **Personalize Dictionary** (or, depending on the
instance, **Configure > Dictionary**) from the context menu — this jumps straight
to that field's own dictionary entry without you having to search for it. Both are
worth knowing: System Definition > Dictionary when you're auditing a whole table at
once, Personalize Dictionary when you've spotted one field's behavior and want to
fix it on the spot.

## Why this is the foundation for the rest of the chapter

Everything the next three lessons cover — field types, choice lists, the lab
scenario — is really "what you can configure inside a dictionary entry, and what
each configuration does." Field type (Lesson 16) is a dictionary attribute. A choice
list (Lesson 17) is extra data tied to a dictionary entry whose type is Choice. The
lab (Lesson 18) is nothing more than you, directly, filling in a new dictionary
entry's attributes by hand. Understanding that all of it is one record, with a
fixed, inspectable set of fields, is what makes the rest of this chapter click.

## Key terms

| Term | Meaning |
|---|---|
| `sys_dictionary` | The table where one record defines one field's name, type, and behavior |
| Mandatory flag | A dictionary attribute that forces a field to be filled before save, platform-wide |
| Metadata-driven | Behavior comes from data the platform reads live, not from compiled code |
| Personalize Dictionary | The right-click shortcut from an open form straight to that field's dictionary entry |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: if you check the
Read-only flag on a dictionary entry and save it, why does that field become
uneditable on every form built against that table, immediately, with no code
deployed?
