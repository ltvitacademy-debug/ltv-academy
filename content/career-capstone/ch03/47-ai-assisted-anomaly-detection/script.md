# Script — AI-Assisted Data Quality: Anomaly Detection Basics

## Segment 1 (title)

Anomaly detection isn't a new pipeline stage bolted onto real-time data quality checks — it's a statistical way to ask whether a value is unusual given everything else you've seen, sharper than a fixed hardcoded threshold.

## Segment 2 (code: z-score)

The z-score method assumes your metric is roughly normally distributed and flags anything more than about three standard deviations from the mean. Applied to a pipeline, track daily row counts over ninety days and flag any day whose count is a statistical outlier — a cheap, common first check.

## Segment 3 (steps: z-score vs isolation forest)

Z-score's catch is its normal-distribution assumption — a strong weekday and weekend pattern breaks that and causes false alarms. Isolation forest is a different idea: no distribution assumption, handles multiple metrics at once, and flags points that separate out in just a few random splits.

## Segment 4 (code: where AI fits)

An LLM doesn't replace either method — it helps draft the z-score check as a PySpark cell, or explain a flagged isolation forest result in plain language. The statistics decide what's anomalous; AI just speeds up writing and explaining the check.

## Segment 5 (outro)

Sharper than a hardcoded threshold, still grounded in real statistics — that's the honest scope of anomaly detection here. Next up: using an LLM to draft automated data documentation.
