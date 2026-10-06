# Lesson 23 — Capstone: Building a Prompt Library for a Real Use Case

**Chapter 5 · Capstone · Lesson 23 of 24**

## What you'll build

Lesson 22 was the brief. This lesson is where it actually gets built —
not as a single clever prompt saved somewhere, but as a real,
organized set of files: a prompt library.

## A real folder layout

```
prompt-library/
  prompts/  (system.md, templates/)
  context/  (budget.md, tools.json)
  evals/    (eval_set.json, results/)
  CHANGELOG.md
```

Four folders, plus a changelog at the root. Every deliverable from
Lesson 22's brief has a specific home here:

- **`prompts/`** — `system.md` holds your system prompt (Chapter 1),
  and `templates/` holds one file per task-specific template (at
  least two, per the brief), each applying at least one Chapter 2
  technique where it actually helps.
- **`context/`** — `budget.md` is your written token budget worksheet
  (Lesson 13's shape: output reserve, fixed costs, capped variable
  costs), and `tools.json` holds any real tool schemas your use case
  needs, written to Lesson 16's standard.
- **`evals/`** — `eval_set.json` is your real eval set of at least 10
  cases across common, edge, known-failure, and adversarial categories
  (Lesson 18). `results/` holds one file per test run — the actual
  output of running Lesson 19's automated testing loop, not a
  description of what it would show.
- **`CHANGELOG.md`** — a real version history, in the shape Lesson 21
  introduced: every version of your prompt, what changed in it, and
  its resulting pass rate. This is what turns a folder of files into
  an actual library — a record you (or anyone else) can look back
  through to see what changed and whether it helped.

## Build order

1. **`system.md` + templates.** Get the prompts themselves working
   first, for your real use case — there's nothing to budget or test
   yet without this.
2. **`budget.md` + `tools.json`.** Write down the actual token budget
   and tool descriptions for what you just built, following Chapter
   3's worksheet and rules — not left as something you "did in your
   head."
3. **`eval_set.json`.** Build a real eval set of at least 10 cases,
   covering all four categories from Lesson 18, based on how your
   prompts actually behave once you've tried them.
4. **Run tests, update `CHANGELOG.md`.** Run Lesson 19's automated
   testing loop against your eval set, and log a real, dated entry —
   version, what changed, pass rate — every time you make a deliberate
   change to the prompt.

Once you have at least two versions logged in the changelog, you have
what you need for Lesson 24's A/B comparison and regression baseline:
a real before, a real after, and a real record of both.

## What makes this a library, not a folder

Any collection of prompt files is a folder. What makes it a *library*
is the changelog: a dated history connecting each version of the
prompt to a real score, so a change can be justified by evidence
instead of a feeling that it "seems better." That discipline — the
same one Lessons 19 through 21 built, chapter by chapter — is the
actual deliverable here, not any particular prompt's wording.

## Key terms

| Term | Meaning |
|---|---|
| Prompt library | A versioned, organized set of prompts, context docs, eval results, and a changelog — not a single saved prompt |
| CHANGELOG.md | The real version history connecting each prompt version to its actual eval results |
| results/ | The folder holding the actual output of each automated test run, not a summary written from memory |

## Lab

1. Create the four-folder layout above for your chosen use case.
2. Write `system.md`, at least one template, `budget.md`, and
   `eval_set.json` with at least 10 real cases.
3. Run your eval set against your prompt and add the first real entry
   to `CHANGELOG.md`: version, date, and pass rate.

## Check yourself

You're ready for Lesson 24 when your prompt library has all four
folders populated with real content, and `CHANGELOG.md` has at least
one real, dated entry with an actual pass rate in it — not a
placeholder.
