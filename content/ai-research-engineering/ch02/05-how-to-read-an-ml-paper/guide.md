# How to Read an ML Paper

Reading a paper well is its own skill, separate from understanding machine learning in general. Experienced researchers don't read a paper top to bottom like a textbook chapter — they read it out of order, on purpose, and they decide how deeply to invest in a given paper before committing real time to it. This lesson covers the order that actually works and why it works, so the rest of this chapter — finding a paper's load-bearing claim and reproducing its results — has something solid to stand on.

## What you'll learn

- Why paper order (abstract, intro, method, results, discussion) is not the order you should read in
- The skimming pass: what it's for, how long it should take, and what you're trying to decide
- The deep pass: what changes once you've decided a paper is worth real time
- Why limitations sections, appendices, and released code carry disproportionate value
- How to read a figure, not just a sentence

## Why paper order isn't reading order

A paper's structure is optimized for a reviewer who already has context, not for a reader meeting the idea for the first time. The abstract is marketing copy written last. The method section is often written to justify a result the authors already have, which means it can read as more inevitable than the actual research process was. If you read start to finish at uniform speed, you spend equal time on the framing paragraph and the one sentence that actually matters.

The widely cited fix is the three-pass approach described by S. Keshav in "How to Read a Paper" (ACM SIGCOMM Computer Communication Review, 2007), written for networking research but adopted broadly across CS and ML. The core idea: decide if a paper is worth your time with a cheap first pass, understand its shape with a second pass, and only commit to a full deep pass — essentially reconstructing the paper's logic yourself — when the first two passes tell you it's worth it.

## The skimming pass: five to ten minutes

Read, in order: the title, the abstract, the section headings, and the conclusion. Then look at every figure and table before reading the body text around them — figures are usually the actual contribution compressed into one image, and a strong figure will tell you more in fifteen seconds than a paragraph will in two minutes. Finally skim the reference list; recognizing which papers are cited (and which aren't) tells you how the authors are positioning the work.

At the end of this pass you should be able to answer: what problem is this solving, what's the core idea in one sentence, and is this worth a deep read for what I'm trying to do right now? Most papers you encounter — through arXiv listings, Papers With Code, Twitter/X, or a lab's publication page — should stop here. That's not a failure to engage; it's the whole point of having a cheap first pass.

## The deep pass: method, then limitations, then code

If a paper clears the skimming pass, the deep pass starts with the method section, read closely enough that you could explain it to a colleague without the paper in front of you. Then go straight to the limitations section (or the honest parts of the discussion, if there's no dedicated section) before reading the full results. This ordering is deliberate: reading limitations before you've fully absorbed the results keeps you from anchoring on the headline number and only noticing the caveats on a second pass, if at all.

Only after that do the full related-work section, appendix, and any released code or checkpoints earn a close read. Code is often the most honest description of what was actually done — hyperparameters, data preprocessing, and exact architecture details that didn't make it into the paper's prose frequently show up only in the config files. If a repository exists (check the paper's footnotes, GitHub, and Papers With Code's "Code" tab for the paper), skim it during this pass even if you have no plan to run it yet.

## Reading claims against evidence

For every strong claim in the text, find the specific table, figure, or number that is supposed to support it, and check whether the evidence actually matches the strength of the claim. A sentence like "our method significantly outperforms prior work" backed by a 0.3-point improvement on one benchmark, with no error bars or multiple seeds reported, is a different kind of claim than the same sentence backed by consistent gains across five benchmarks with variance reported. This habit — claim, then evidence, then gap between the two — is the direct precursor to the next lesson's topic: finding the one claim the entire paper's narrative actually depends on.

## Key terms

- **Three-pass approach** — Keshav's method of a cheap skim, a structural read, and a deep reconstruction, done in that order and only as far as each pass justifies
- **Skimming pass** — reading title, abstract, headings, conclusion, and figures to decide whether a paper merits more time
- **Deep pass** — closely reading method and limitations before results, then related work, appendix, and code
- **Claim-evidence gap** — the distance between how strongly a sentence is worded and how strongly the actual data backs it up
