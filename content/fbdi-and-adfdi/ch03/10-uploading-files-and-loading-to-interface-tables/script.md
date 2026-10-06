# Script — Uploading Files and Loading to Interface Tables

## Segment 1 (title)

Chapter two finished with a completed ZIP file on your computer. Chapter three picks up exactly there and walks through actually running an import: uploading that file, loading it into an interface table, and getting ready for the final step.

## Segment 2 (steps)

From the navigator, under Tools, File Import and Export is where the ZIP file actually goes. You select the account matching your business object, attach the file, and submit. This step only talks to UCM — nothing in Fusion's application data changes yet. Success here just means the file exists, intact, in the content repository.

## Segment 3 (steps)

With the file in UCM, you go to Scheduled Processes and submit Load Interface File for Import. The same process name is reused for every FBDI load — what changes is its parameters: the import process you intend to run afterward, and a reference to the file you just uploaded. That import-process parameter is how the system knows which interface table your rows belong in.

## Segment 4 (steps)

When it runs, it unzips your file, reads each CSV inside, and inserts rows into the matching interface table. If there's no file-level problem — no malformed CSV, no column mismatch — it reports success. But that success is only about staging: rows now sit in an interface table, visible to direct queries, invisible to every other Fusion screen.

## Segment 5 (outro)

A successful Load Interface File for Import run does not mean your suppliers exist or your journal posted. It means the data cleared the file-format hurdle and is waiting for the next process to actually create real records. Up next, lesson eleven: running that product-specific import process.
