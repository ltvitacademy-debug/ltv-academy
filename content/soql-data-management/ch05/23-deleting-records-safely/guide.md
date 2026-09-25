# Deleting Records Safely

Chapter finale, and the operation that needs the most care. Insert and update can usually be corrected with another load. A delete can take away data your users rely on, so it comes with its own routine.

## What you'll learn

- The difference between **Delete** and **Hard Delete**
- The habits that make bulk deletes safe: export first, sandbox first
- Where the Recycle Bin helps, and where it doesn't

## Delete versus Hard Delete

Both operations take a CSV with an **Id** column that identifies the records to remove:

```text
Id
003xx000004TmiQAAS
003xx000004TmiRAAS
```

| Operation | What happens to the records |
|---|---|
| **Delete** | Moved to the **Recycle Bin**, restorable for about 15 days |
| **Hard Delete** | Bypasses the Recycle Bin: **permanent**, no undo |

Hard Delete uses the Bulk API and requires the **Bulk API Hard Delete** user permission, which is not granted by default. That is deliberate.

## The safe routine

1. **Export first.** Use the export from earlier in this chapter to save the records you are about to delete, with all their field values. That CSV is your record of what existed.
2. **Sandbox first.** Run the same file in a sandbox, where a mistake affects only test data.
3. **Small batch, then the full file.** Delete a handful of records, read the **success** and **error** files, and only then run the rest.
4. **Double-check the Ids.** A delete file is only as good as its list of Ids. Compare it against the query that produced it.

## Know the limits of the safety net

- Only a regular **Delete** can be restored from the Recycle Bin, and only for a limited time.
- Deleting a **parent** record, such as an Account, can also delete or affect its **child** records. Restoring the parent from the Recycle Bin is not the same as having never deleted it. Think through the relationships before you start.
- Some records can't be deleted at all, for example when other records still depend on them, and those rows will appear in the error file.

## Where you are now

You can now export with SOQL, insert, update, upsert and delete with Data Loader. Chapter 6 introduces two more tools, **Workbench** and the **Import Wizard**, and ends with how to choose among all three.

## Key terms

| Term | Meaning |
|---|---|
| Delete | Removes records to the Recycle Bin, where they can be restored |
| Hard Delete | Permanently removes records, bypassing the Recycle Bin |
| Recycle Bin | Holds deleted records for about 15 days |
| Sandbox | A separate copy of the org for safe practice |
| Cascade | A parent deletion that also affects its child records |

## Check yourself

Your manager asks you to remove 8,000 obsolete Leads. List the steps you would take, in order, before and during the delete, and say whether you would use Delete or Hard Delete and why.
