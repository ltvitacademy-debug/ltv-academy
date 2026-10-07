# Building a Small Preference Dataset

Lesson 10 made the case for pairwise preference over absolute scoring. This lesson builds the actual dataset: corrupt real Northwind rows, generate two candidate cleanups per row from two different rule-based cleaners, and have a human rater pick the one they'd keep. The result is the labeled `{chosen, rejected}` pairs Lesson 12 trains a reward model on.

## What you'll learn

- How ~300 real Northwind customer rows get synthetically corrupted
- The two rule-based cleaners, and how they disagree on purpose
- The rubric a human rater uses, and why ties get discarded
- What a labeled preference pair actually looks like

## Step 1: corrupt real rows

Starting from Northwind's actual `Customers` table, each of roughly 300 sampled rows gets corrupted with one or more of the messy patterns from Lesson 10 — inconsistent phone formatting, a country-name variant, casing/whitespace noise in the company name, or a malformed postal code:

```python
def corrupt_row(row, rng):
    r = dict(row)
    if rng.random() < 0.6:
        r["Phone"] = reformat_messily(r["Phone"], rng)
    if rng.random() < 0.3:
        r["Country"] = to_variant(r["Country"])  # "UK", "USA", etc.
    if rng.random() < 0.5:
        r["CompanyName"] = add_casing_whitespace_noise(r["CompanyName"], rng)
    if rng.random() < 0.4:
        r["PostalCode"] = corrupt_postal(r["PostalCode"], rng)
    return r
```

Because the original row is still on hand, every corrupted row has a known-good reference to measure cleanups against — this project never has to guess what "clean" should have looked like.

## Step 2: two cleaners that disagree on purpose

Each corrupted row gets run through two different rule-based cleaners, producing two candidate "cleaned" versions:

- **Cleaner A — light normalization.** Fixes casing and whitespace, does a light phone reformat (strips stray punctuation, standardizes separators), leaves country names mostly as given.
- **Cleaner B — aggressive normalization.** Uses a canonical country-name lookup table (`"UK"` → `"United Kingdom"`, `"USA"` → `"United States"`) and a strict phone reformat to a single fixed pattern. Aggressive normalization sometimes overcorrects: a strict phone format can truncate a real extension digit that didn't fit the fixed pattern, and an aggressive whitespace/casing pass can collapse a legitimately unusual but valid company name into something that looks "fixed" but lost real information.

```python
# Cleaner A: light touch
def clean_a(row):
    return {
        **row,
        "Phone": light_phone_format(row["Phone"]),
        "CompanyName": row["CompanyName"].strip().title(),
    }

# Cleaner B: aggressive, sometimes overcorrects
COUNTRY_LOOKUP = {"UK": "United Kingdom", "USA": "United States"}
def clean_b(row):
    return {
        **row,
        "Phone": strict_phone_format(row["Phone"]),       # can truncate an extension digit
        "Country": COUNTRY_LOOKUP.get(row["Country"], row["Country"]),
        "CompanyName": aggressive_normalize(row["CompanyName"]),  # can over-collapse
    }
```

The two cleaners are designed to disagree — that disagreement is exactly what gives the human rater something real to judge, rather than two near-identical outputs with no signal between them.

## Step 3: the rubric and the human rater

The lab researcher reads the original messy record alongside both candidates and picks the one they'd actually keep, using a short, ordered rubric:

1. **No information loss** — did either candidate drop or corrupt real data (an extension digit, a suite number, a genuinely unusual company name)?
2. **Correct normalization** — did the candidate actually fix the problem (phone readable, country name consistent) without introducing a new one?
3. **Consistent formatting** — all else equal, prefer the more consistently formatted candidate.

Ties — genuinely indistinguishable candidates — are discarded rather than forced into an arbitrary label; a forced tie-break would inject noise into the dataset that isn't a real preference.

## A concrete example pair

```json
{
  "original": {
    "CompanyName": "b's beverages   ",
    "Phone": "(171) 555-2282 x12",
    "Country": "UK",
    "PostalCode": "EC2 5NT"
  },
  "chosen": {
    "CompanyName": "B's Beverages",
    "Phone": "171-555-2282 x12",
    "Country": "UK",
    "PostalCode": "EC2 5NT"
  },
  "rejected": {
    "CompanyName": "Bs Beverages",
    "Phone": "171-555-2282",
    "Country": "United Kingdom",
    "PostalCode": "EC2 5NT"
  },
  "reason": "rejected dropped extension x12 during strict phone reformatting"
}
```

The rejected candidate here is Cleaner B's output: it correctly expanded "UK" to "United Kingdom" and tidied the formatting, but its strict phone reformat silently dropped the extension — a real information loss that outweighs its more consistent formatting, per the rubric's own ordering.

## The resulting dataset

Running this process over roughly 300 corrupted rows, through both cleaners, rated by the human researcher, and with ties discarded, produces roughly 260 labeled `{chosen, rejected}` preference pairs — the training data Lesson 12 feeds into the reward model.

## Key terms

- **Synthetic corruption** — deliberately introducing realistic messiness into a known-good row, so a ground-truth reference always exists
- **Cleaner A / Cleaner B** — the two rule-based cleanup strategies (light vs. aggressive normalization) whose disagreement generates comparable candidates
- **Rubric** — the ordered judging criteria (no information loss > correct normalization > consistent formatting) the human rater applies
- **Tie discard** — dropping genuinely indistinguishable preference pairs rather than forcing an arbitrary label

## Recap

This project corrupts roughly 300 real Northwind customer rows, runs each through two deliberately disagreeing rule-based cleaners — light-touch Cleaner A and aggressive, sometimes-overcorrecting Cleaner B — and has a human rater choose between them using a no-information-loss-first rubric, discarding ties, to produce roughly 260 labeled preference pairs. Next up, Lesson 12: training a reward model on these pairs.
