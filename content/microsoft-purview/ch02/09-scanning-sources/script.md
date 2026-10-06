# Lesson 9 — Scanning Sources · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

---

## S1 · TITLE CARD

Registering gives Purview an address. Scanning is the step that actually connects, reads metadata, and applies classifications.

## S2 · STEPS CARD (before you scan)

Three things first: the source has to already be registered, you need the right integration runtime for your network, and you need to know which authentication method that source supports — usually Managed Identity, which skips storing secrets entirely.

## S3 · SCREENSHOT (scope your scan)

When you create the scan, you can scope it — folders and subfolders instead of the whole account. Every item has three states: fully selected, partially selected, not selected. A toggle controls whether new assets under a partial parent get swept in automatically next time.

## S4 · STEPS CARD (three scan levels)

Supported sources also let you pick a scan level. L1 is basic metadata only — name, size, path. L2 adds schema extraction, no sampling. L3 adds data sampling and classification on top. Auto detect, the default, resolves to the highest level the source supports.

## S5 · SCREENSHOT (customize scan level)

Here's that dropdown — Auto detect, Level-1, Level-2, Level-3. Drop a scheduled scan to a lower level, and the next run does one full scan before settling into incremental again.

## S6 · SCREENSHOT (scan in progress)

Once you save and run, the source's Overview tab shows Last run status live — In progress while the scanner is actively working.

## S7 · SCREENSHOT (scan completed)

Then Completed, with final scanned and classified asset counts. Give ingestion a few extra minutes after that to finish loading everything into the Data Map.

## S8 · OUTRO CARD

Next lesson: scan rule sets — exactly what a scan compares your data against to decide what gets classified.
