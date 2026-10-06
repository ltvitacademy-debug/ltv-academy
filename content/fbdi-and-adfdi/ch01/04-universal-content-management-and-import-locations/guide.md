# Universal Content Management and Import Locations

Before an FBDI file can be loaded into an interface table, it has to live somewhere. That somewhere is Oracle WebCenter Content, more commonly called Universal Content Management, or UCM for short — the document repository built into every Oracle Fusion environment. This lesson explains what UCM is, how an FBDI ZIP file gets there, and why the specific "account" you upload into actually matters.

## What you'll learn

- What Universal Content Management (UCM) is and why Oracle Fusion needs it
- How a ZIP file gets uploaded to UCM before any import process runs
- What a UCM "account" is, and why the one you choose affects what happens next
- How this content-repository step connects back to the FBDI pipeline from lesson 3

## What UCM actually is

Universal Content Management is Oracle's enterprise content repository — essentially a secure, structured file storage system that sits behind the scenes of every Oracle Fusion Cloud environment. It isn't unique to FBDI; Oracle Fusion uses it to store all sorts of documents, including attachments on transactions. For FBDI purposes, UCM's job is narrow and specific: it's the drop-off point where your zipped CSV files land before the "Load Interface File for Import" process can read them.

## How the upload happens

From the Fusion navigator, under Tools, there is a "File Import and Export" page. This is where you, as the person running an FBDI load, upload your ZIP file. The upload screen asks you to choose an **account** — a predefined category that tells UCM (and, by extension, the downstream import process) what kind of file this is and where it belongs. Common account examples include ones scoped to specific products, such as a payables import account or a general ledger import account. Choosing the correct account is not a formality: the "Load Interface File for Import" process looks for files in a specific account, scoped to the import process you're about to run, so an upload into the wrong account effectively means the file is invisible to the process that needs it.

## Why the account matters

Imagine uploading a ZIP of supplier records into an account meant for journal imports. The file would sit in UCM exactly where you put it — but "Load Interface File for Import," when pointed at the supplier import process, would have no reason to look there, and would find nothing to load. No error is raised at the upload step itself; the mismatch only becomes visible later, when the import process reports it processed zero rows. Getting the account right the first time avoids a confusing, silent dead end.

## Connecting back to the pipeline

Recall the pipeline from lesson 3: template, populate, generate CSV, zip, upload, load interface, import, review. UCM is the physical destination for the "upload" step, and the account you select there is the detail that makes the next step — "Load Interface File for Import" — able to find your file at all. Every FBDI load you'll build in this course passes through this same UCM upload step, using whichever account corresponds to the business object you're loading.

## Recap

UCM, or Universal Content Management, is Oracle Fusion's content repository and the place every FBDI ZIP file lands via the File Import and Export tool, before any interface table is touched. The account you upload into determines whether the downstream import process can find your file — pick the wrong one, and the import quietly processes nothing. Next up, Chapter 2: a close look at the FBDI templates themselves, starting with how to download and read one.
