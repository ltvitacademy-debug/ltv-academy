# Loading Suppliers with FBDI

Time to put Chapter 2 together into one complete, worked example. Supplier Import is one of the most common first FBDI loads a new Oracle Fusion implementation runs, because almost nothing else in Payables or Procurement can happen until suppliers exist in the system. This lesson walks a small, illustrative batch of suppliers through the entire FBDI pipeline.

## What you'll learn

- Which template and interface table Supplier Import uses
- The key fields a supplier record needs, and which are coded lookups
- How the Chapter 1 pipeline and Chapter 2 template rules apply to one real scenario
- What "done" looks like for a supplier load, end to end

## The scenario

Imagine a project team converting 25 active suppliers from a legacy system into Oracle Fusion ahead of go-live. Twenty-five rows is small enough to use as a clean teaching example, but the exact same steps apply whether it's 25 rows or 25,000.

## Step 1–2: template and population

The team downloads the **Supplier Import** template, which maps to supplier-related interface tables. On the data tab, each row represents one supplier, with columns including the supplier name, a unique supplier number, supplier type, and address and site information. Supplier type and a handful of other fields are coded lookups — for example, a classification code already configured in the environment — so the team checks the valid values before typing anything, exactly as covered in lesson 6.

## Step 3–4: generating CSV and zipping

With all 25 rows entered and no sample rows left behind, the team uses the Instructions tab's macro to generate the CSV file (or files, if supplier sites or contacts live on a separate tab), then zips the output — the same mechanical step from lesson 7, regardless of which business object is being loaded.

```
suppliers_batch1.zip
 ├─ SupplierImportTemplate_SUPPLIER.csv
 └─ SupplierImportTemplate_SITE.csv
```

## Step 5–7: upload, stage, import

The ZIP is uploaded through File Import and Export into the account scoped to supplier/procurement imports — not a general ledger or payables invoice account, which, as lesson 4 explained, would leave the file invisible to the right process. "Load Interface File for Import" is submitted next, pointed at the Supplier Import process, which loads the 25 rows into the supplier interface tables. Finally, the supplier-specific import process runs, validating each row — checking the supplier number is unique, the supplier type code is valid, required address fields are present — and creating a real, active supplier record for every row that passes.

## Step 8: reviewing the result

The team reviews the process log: suppose 23 of 25 suppliers imported successfully, and 2 were rejected. One rejection traces back to a duplicate supplier number already used by an existing supplier; the other traces back to an invalid supplier type code — a label instead of the correct code, the exact mistake from lesson 6. Both are fixable: correct the two rows, and either resubmit just those two or include them in the next batch.

## Recap

Loading suppliers with FBDI follows the identical pipeline from Chapter 1, filled in with the Supplier Import template and its specific fields: supplier number, name, type, and site details, several of them coded lookups. A small worked batch shows exactly how rejections trace back to specific, nameable causes rather than being a mystery. Next up, Chapter 3: running imports — the mechanics of uploading files, loading interface tables, and monitoring the processes that do the real work.
