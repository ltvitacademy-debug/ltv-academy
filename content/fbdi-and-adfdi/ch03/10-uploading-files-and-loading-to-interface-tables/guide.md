# Uploading Files and Loading to Interface Tables

Chapter 2 finished with a completed ZIP file sitting on your computer. Chapter 3 picks up from exactly there and walks through actually running an import: uploading that file, loading it into an interface table, and getting ready for the final import step. This lesson covers the first half of that — the part that happens before any real application record exists.

## What you'll learn

- The exact screen and steps used to upload a ZIP file to UCM
- How to submit the "Load Interface File for Import" scheduled process correctly
- What parameters that process needs, and why they matter
- What "success" means at this stage — and what it doesn't mean yet

## Uploading through File Import and Export

From the Fusion navigator, under Tools, the File Import and Export page is where the uploaded ZIP file actually goes. You select the account that matches the business object you're loading — the same account concept from lesson 4 — attach your ZIP file, and submit. This step talks only to UCM; nothing about Oracle Fusion's application data changes yet. A successful upload simply means the file now exists, intact, in the content repository, filed under the account you chose.

## Submitting Load Interface File for Import

With the file sitting in UCM, the next step is the Scheduled Processes work area, where you submit **Load Interface File for Import**. This single process name is reused across every FBDI load, regardless of module — what differentiates one run from another is its parameters, typically including:

- The **import process** name you intend to run afterward (for example, Import Payables Invoices), which tells this process which interface table structure to expect.
- The **data file** reference — pointing back to the ZIP you just uploaded to UCM.

Getting the import process parameter right matters even if the file itself is perfectly formed: this parameter is effectively how the process knows which interface table(s) your CSV rows belong in.

## What happens when it runs

Load Interface File for Import unzips your file, reads each CSV inside it, and inserts rows into the interface table(s) that correspond to the import process you named. If the process completes without the file-level errors — like a malformed CSV, or a column count mismatch versus what's expected — it reports success. That success message refers only to this staging step: rows are now sitting in an interface table, visible to tools that can query it directly, but still invisible to the rest of Oracle Fusion's live application screens and reports.

## What success here does not mean

A completed "Load Interface File for Import" run does not mean your suppliers exist, your journal posted, or your invoices are payable. It means the data cleared the file-format hurdle and is now staged, waiting for the next, separate process — the one covered in the next lesson — to actually validate it against business rules and create real records. Confusing this stage's success with final success is the single easiest way to think a load "worked" when it only got halfway there.

## Recap

Uploading happens through File Import and Export into the correct account; loading into an interface table happens through the Load Interface File for Import scheduled process, parameterized with the target import process and the uploaded file. Success at this stage only means the data is staged, not imported. Next up, lesson 11: running the product-specific import process that actually creates real application records.
