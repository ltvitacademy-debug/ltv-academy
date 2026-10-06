# Bulk Data Operations

**Chapter 2 · Getting Data Out and Keeping It Safe · Lesson 9 of 20**

Lesson 2 mentioned that the Import Wizard queues an asynchronous job and points you to the **Bulk Data Load Job** page. Lesson 3 mentioned that Data Loader uses "the same Bulk API machinery" under the hood. This lesson connects those threads: what Bulk API actually is, how Data Loader turns it on, and why it changes a handful of behaviors you'd otherwise find surprising.

## What you'll learn

- What Bulk API is, and why it exists alongside the regular (SOAP) API
- How to turn it on in Data Loader, and the trade-off involved
- What changes once it's on — including hard delete and batch size limits
- How to recognize when a job is big enough that Bulk API stops being optional

## Two ways Data Loader talks to Salesforce

By default, Data Loader uses the standard SOAP-based API — synchronous, one batch at a time, capped at 200 records per batch. That's fine for modest jobs. **Bulk API** is a different, asynchronous API designed specifically for loading or deleting large numbers of records efficiently: it processes in parallel, needs fewer network round-trips, and supports batches up to 10,000 records (150 million records total, with Bulk API 2.0). That's the same asynchronous queuing behavior you saw when the Import Wizard pointed you to a "Bulk Data Load Job" page — the wizard is already running on Bulk API behind the scenes; Data Loader makes it an explicit choice.

## Turning it on

![Data Loader's Settings dialog showing the "Use Bulk API," "Enable serial mode for Bulk API," and "Upload Bulk API Batch as Zip File" checkboxes, along with Time Zone and proxy settings.](/courses/salesforce-data-management/ch02/09-bulk-data-operations/data-loader-bulk-api-settings.png)

In **Settings → Settings**, check **Use Bulk API**. This applies to Insert, Update, Upsert, Delete, and Hard Delete — Lesson 3's six-button screen doesn't change, but every operation you run afterward uses Bulk API instead of SOAP until you turn the setting back off.

![Data Loader's main window, showing the six operation buttons — Insert, Update, Upsert, Delete, Hard Delete, Export, Export All.](/courses/salesforce-data-management/ch02/09-bulk-data-operations/data-loader-main-window.png)

Two related checkboxes matter here. **Enable serial mode for Bulk API** processes batches one at a time instead of in parallel — slower, but it avoids the database contention (locking) that parallel processing can cause when many batches hit related records simultaneously. **Upload Bulk API Batch as Zip File** is only relevant if you're loading binary attachments.

## What actually changes

- **Some SOAP-only options disappear.** Insert null values and Allow field truncation aren't available with Bulk API enabled — a field value too large for Bulk API simply fails that row, rather than truncating it.
- **Hard Delete becomes possible.** Lesson 3 noted Hard Delete is greyed out until a separate permission is granted; that permission is specifically **Bulk API Hard Delete**, which only matters once Bulk API is in play.
- **Null values need a different trick.** With Bulk API, an empty cell is simply ignored during update (not cleared) — to explicitly set a field to null, use the literal value `#N/A` in that cell instead.
- **Processing becomes asynchronous.** The job gets queued and processed in the background, the same way the Import Wizard's "your import has started" confirmation worked back in Lesson 2.

## When it stops being optional

There's no hard rule that forces Bulk API on, but the planning checklist from Lesson 1 should flag it once a job crosses a few thousand records, touches an object with heavy automation (triggers, flows) that makes parallel writes risky, or needs the full 150-million-record ceiling that only Bulk API 2.0 offers. For anything comfortably under a few hundred records, the default SOAP API is simpler and the asynchronous overhead isn't worth it.

## Try it yourself

In a sandbox, open Data Loader's Settings and check Use Bulk API. Run a small Update job (a handful of records is enough to see the behavior, even though Bulk API's real benefit shows up at scale) and notice the job still completes — then open the same Settings dialog again and uncheck it, confirming Insert null values reappears as an option.

## Recap

- Bulk API is an asynchronous, parallel-processing alternative to Data Loader's default SOAP API, built for scale.
- Turn it on with the Use Bulk API checkbox in Settings — it affects every operation until turned off again.
- Enabling it changes specific behaviors: no field truncation option, Hard Delete becomes available, and nulling a field needs `#N/A` instead of a blank cell.
- Reach for it once a job's size, object complexity, or required scale makes the SOAP API's limits a real constraint, not a theoretical one.

## Check yourself

A nightly job updates 40,000 Opportunity records and needs to explicitly clear a now-unused custom field on rows where it's no longer relevant. In one sentence, what CSV value accomplishes that under Bulk API, and why doesn't a blank cell work?
