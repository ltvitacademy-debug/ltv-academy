# Lesson 5 — Data Quality Metrics

**Chapter 1 · Governing Data · Lesson 5 of 14**

## What you'll learn

- Why data quality needs to be measured, not just assumed, once Validation and Duplicate Rules are in place
- How to turn each quality dimension from Lesson 4 into a concrete, reportable metric using native Salesforce Reports and Dashboards
- Why a duplicate rate and a completeness rate need different calculations and different targets
- How to use Duplicate Rule "Report" actions as a measurement tool, not just a prevention tool
- How to set a realistic target and a review cadence rather than chasing 100%

## You can't govern what you don't measure

Lesson 4 covered how to prevent bad data from entering a Salesforce org — Matching/Duplicate Rules and Validation Rules. None of that tells you whether it's actually working. A governance program needs an ongoing answer to "how good is our data right now, and is that number getting better or worse?" — and that answer has to come from an actual measurement, not a gut feeling from whoever last ran into a bad record.

## Turning each dimension into a metric

Each data-quality dimension from Lesson 4 maps to a metric that's realistic to build with standard Salesforce Reports:

- **Completeness rate** — for a defined set of "must-have" fields on an object (say, Industry, Annual Revenue, and Billing State on Account), the percentage of records where none of those fields is blank. A standard Salesforce Report with a filter for each field being blank, compared against total record count, gets you most of the way there; a Report filtering on "any of these is blank" needs a formula field or cross-filter logic depending on exact requirements.
- **Accuracy rate** — harder to measure automatically, since Salesforce can't verify a phone number is real just by looking at it. The practical proxy most orgs use is a sampled manual audit: pull a random sample of records each period and have a steward check them against a reliable external reference (a billing system, a signed contract), then report the error rate found in the sample.
- **Duplication rate** — the percentage of records flagged as likely duplicates against total records for that object. A Duplicate Rule configured with a Report action (rather than Alert or Block) is specifically useful here: it logs potential matches without stopping anyone's workflow, giving you an ongoing count to report on even on an object where Alert or Block would be too disruptive to turn on.
- **Timeliness** — the percentage of records where a date-tracking field (like Opportunity LastModifiedDate relative to its Stage) suggests the record is stale — e.g., an open Opportunity whose Close Date passed weeks ago and was never updated.

## Why duplication rate and completeness rate need different targets

It's tempting to set one blanket target ("95% data quality") across every metric, but the dimensions behave differently. Completeness can realistically approach 100% on fields that are enforced as Required at entry — if a field can't be blank going forward, the completeness rate should trend toward (though never instantly reach) 100% as old records get touched and updated. Duplication rate behaves differently: it will never hit 0%, because fuzzy matching has real false-negative limits, new integration sources keep introducing fresh risk, and driving it to zero would mean such aggressive Block rules that legitimate new records get rejected. A realistic governance program sets a declining-trend target for duplication ("below 3% and trending down") rather than a hard zero.

## Review cadence, not a one-time scorecard

A data-quality metric reported once and never revisited is nearly as useless as not measuring at all — the value of the number is in watching it move over time and reacting to the trend. The standard approach is a recurring report, reviewed on a fixed cadence (commonly monthly for fast-moving objects like Lead, quarterly for slower ones), owned by the business data steward and surfaced to the data owner when a metric moves in the wrong direction. This is the same periodic-review discipline used for classification drift in Chapter 2 — a number that isn't revisited on a schedule will quietly stop being watched at all.

## Key terms

| Term | Meaning |
|---|---|
| Completeness rate | The percentage of records with no blank value in a defined set of required fields |
| Duplication rate | The percentage of records flagged as likely duplicates against the total for that object |
| Report action (Duplicate Rule) | A Duplicate Rule setting that logs potential matches for later review without blocking or alerting the user in the moment |
| Sampled audit | A manual accuracy check performed on a random subset of records against a trusted external reference, used where automated checking isn't possible |
| Declining-trend target | A realistic goal (e.g., "below 3% and falling") used for metrics like duplication rate that can never realistically reach zero |

## Lab

Pick the Account object and design a one-page monthly data-quality scorecard: name the specific fields you'd use for a completeness-rate metric, describe exactly how you'd configure a Duplicate Rule to produce a duplication-rate number without disrupting daily Account creation, and propose a realistic target and review cadence for each of your two metrics, explaining why the targets differ.

## Check yourself

Can you explain why a duplication-rate target of "below 3% and trending down" makes more sense than a flat "0% duplicates" target? Can you describe how a Duplicate Rule's Report action can be used purely as a measurement tool rather than a prevention tool?
