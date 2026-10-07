# Framing Data Quality as a Preference Problem

Project 2 starts from a different kind of question than Project 1: not "which action produces the best measurable outcome," but "which of two things would a person actually prefer." That shift — from scoring to comparing — is the whole reason reward models exist, and this lesson lays out why, using the Northwind `Customers` table as the concrete mess to clean up.

## What you'll learn

- The specific data-quality problems in Northwind's `Customers` table this project targets
- Why "which cleanup is better" is a preference question, not a scoring question
- The RLHF-literature justification for preference-based rating
- How this frames the rest of Chapter 3, lesson by lesson

## The mess: Northwind Customers

Northwind's `Customers` table is small and old enough to have accumulated exactly the kind of real-world messiness this project needs:

- **`Phone`** — inconsistent formatting: `(171) 555-2282`, `171-555-2282`, `555.2282`, extensions written inline or dropped entirely.
- **`Country`** — name variants for the same country: `"UK"` vs. `"United Kingdom"`, `"USA"` vs. `"United States"`.
- **`CompanyName`** — casing and whitespace noise: `"around the horn"`, `"B's Beverages  "` with trailing spaces, inconsistent capitalization of legal suffixes.
- **`PostalCode`** — malformed or missing values, mixing formats across countries without normalization.

None of this is synthetic in spirit — it's the ordinary mess any real customer table accumulates after years of manual entry from different sources. This project corrupts a sample of real Northwind rows with exactly these patterns (Lesson 11 covers how), so there's always a clean, known-good original to compare against.

## Scoring vs. comparing

The naive approach to "which cleanup is better" is to write a rubric and have a human assign each candidate a quality score from, say, 1 to 10. That sounds more informative than a simple preference — a score carries more bits than a binary choice. In practice it's the opposite: absolute scoring is inconsistent. A rater might call one cleanup a 7 on Tuesday and the same cleanup an 8 on Thursday, with no change in the underlying quality — there's no stable anchor for what a 7 *means* across different rows, different sessions, different fatigue levels.

Comparing two candidates side by side doesn't have that problem. A rater doesn't need an absolute anchor to say "this one preserved the suite number and that one didn't" — that's a direct, checkable comparison, not a calibration exercise. This project frames every judgment as a pairwise preference for exactly that reason: **chosen** vs. **rejected**, never a 1-to-10 score.

## The RLHF-literature justification

This isn't a quirk of this project — it's the same justification that motivates preference-based reward models across the RLHF literature generally, including, conceptually, this lab's own Project 3. InstructGPT and the RLHF papers that followed it train reward models on pairwise human preferences rather than absolute scores for exactly this reason: a human rater is measurably more consistent when asked "which of these two is better" than when asked "rate this on a scale," because comparison is a judgment humans are naturally calibrated to make, and absolute scoring is a judgment they aren't.

```text
Not this:
  "Rate this cleaned record's quality from 1 to 10."

This:
  "Here are two cleaned versions of the same messy record.
   Which one would you actually want to keep? A or B?"
```

Project 3's reward, by contrast, doesn't use human preferences at all — it's a programmatic execution-correctness check. Project 2 is this lab's one project where the reward comes from genuine human judgment, which is exactly why the preference framing matters here specifically.

## What this sets up

Every lesson in this chapter follows from this framing: Lesson 11 builds the actual preference dataset by generating two candidate cleanups per corrupted row and having a human rater choose between them; Lesson 12 trains a reward model on those pairwise choices; Lesson 13 evaluates it, including a deliberately adversarial check; Lesson 14 writes the project up.

## Key terms

- **Preference judgment** — a comparative choice between two candidates ("A or B"), as opposed to an absolute quality score
- **Rater consistency** — how reliably a human produces the same judgment for the same underlying quality; comparison is more consistent than scoring
- **Chosen / rejected** — the standard pairwise-preference labels: the candidate a rater picked, and the one they didn't
- **RLHF** — reinforcement learning from human feedback; the broader framework that motivates training reward models on pairwise preferences rather than absolute scores

## Recap

Project 2 treats "which cleanup is better" as a pairwise preference problem over Northwind's messy phone formatting, country-name variants, company-name casing noise, and malformed postal codes — because a human rater is more consistent comparing two candidates than scoring one in isolation, the same justification that motivates reward models across the RLHF literature generally. Next up, Lesson 11: building the actual preference dataset from corrupted Northwind rows and two rule-based cleaners.
