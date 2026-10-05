# Lesson 9 — Discovering Sensitive Data

**Chapter 2 · Classification · Lesson 9 of 30**

## What you'll learn

- Why you can't classify data you don't know exists
- Where sensitive data actually ends up hiding in most organizations
- The three general approaches real discovery tools use: pattern-based, keyword/metadata-based, and sampling-based scanning
- Real, named examples of platforms that ship this kind of discovery tooling

## You can't classify what you haven't found

Lessons 7 and 8 assumed you already know which dataset you're labeling. In practice, that assumption breaks down fast. Most organizations have far more sensitive data scattered across their systems than anyone has fully inventoried: an old CSV export from a system that was retired three years ago, a spreadsheet someone built for a one-off analysis and never deleted, a backup copy sitting in a forgotten storage bucket, or a log file that was only ever meant to record error messages but accidentally captured a customer's Social Security number because it got swept up in a raw request payload.

None of that data was ever classified, because nobody classified it — nobody knew it was there to classify. **Data discovery** is the practice of actively finding that data before someone else does, rather than waiting for it to surface during an audit or, worse, a breach.

## Three general approaches to discovery

Real-world data discovery tooling generally works through some combination of three techniques:

- **Pattern and regex-based scanning.** The tool looks at the actual content of a field or file and checks whether it matches the *shape* of sensitive data — a 9-digit number formatted like a Social Security number, a 16-digit number that passes a credit-card checksum, a string shaped like an email address. This catches sensitive data regardless of what the column or file happens to be named.
- **Keyword and metadata-based discovery.** The tool looks at the *names* of things — column names like `ssn`, `dob`, `credit_card`, `email`, or `salary` — and flags likely sensitive fields based on naming conventions, without necessarily inspecting every row of content. This is fast and cheap, but it misses sensitive data sitting in a column with an unhelpful or generic name.
- **Sampling-based statistical scanning.** Instead of checking every single row (which can be slow and expensive at scale), the tool pulls a representative sample of rows from a table or file and statistically estimates how much of the content looks like sensitive data, extrapolating a confidence level for the whole dataset from that sample.

In practice, mature discovery tooling combines all three: metadata scanning for a fast first pass, pattern matching to verify or catch what metadata alone would miss, and sampling to keep the process fast enough to run across an entire organization's data estate on a recurring basis.

## Real tools that do this — named, not claimed in detail

This category of capability isn't hypothetical — major cloud and data platforms ship native features built specifically to do this kind of scanning. **Microsoft Purview** includes sensitive information type detection as part of its data governance capabilities. **AWS Macie** is Amazon's purpose-built service for discovering sensitive data in S3. **Google Cloud DLP** (Data Loss Prevention) offers similar inspection and classification capabilities within Google Cloud.

This lesson names those three products because they're real and worth knowing exist — not because this lesson is a walkthrough of any of them. No specific feature list, pricing, or exact UI behavior for any of the three is claimed here; if you need to evaluate one for actual use, go to that vendor's current documentation rather than relying on a conceptual overview like this one.

## Why this matters before you apply classification

Discovery isn't a nice-to-have add-on to classification — it's a precondition for it. A classification scheme (Lesson 8) is only as good as its coverage. A perfectly designed four-tier scheme that's only ever applied to the datasets someone happened to remember still leaves every undiscovered spreadsheet, export, and log file completely unclassified, and therefore completely unprotected by whatever rules the organization thinks it has in place. Lesson 10 picks up from here: once you've found the sensitive data, how do you actually apply a classification label to it in a real system.

## Key terms

| Term | Meaning |
|---|---|
| Data discovery | Actively finding sensitive data scattered across systems, rather than waiting for it to surface on its own |
| Pattern/regex-based scanning | Detecting sensitive data by matching the shape of its content (e.g., SSN-formatted or credit-card-formatted strings) |
| Keyword/metadata-based discovery | Flagging likely sensitive fields based on column or file names, without necessarily inspecting content |
| Sampling-based scanning | Estimating how much of a dataset is sensitive by statistically analyzing a representative sample of rows rather than every row |

## Lab

Pick a spreadsheet or table you have access to that you didn't personally create. Without being told what's in it ahead of time, scan its column names for anything that looks like it might hold sensitive data (names, dates of birth, identifiers, financial figures), then open a few rows to check whether the actual content matches what the column name implied. Note any mismatch you find — a generically named column holding something sensitive, or a sensitive-sounding column that turns out to be harmless. That mismatch is exactly why keyword-based discovery alone isn't enough.

## Check yourself

Can you explain why an organization might have sensitive data it has never classified? Can you describe, in your own words, the difference between pattern-based, keyword-based, and sampling-based discovery, and name one real platform that ships this kind of tooling?
