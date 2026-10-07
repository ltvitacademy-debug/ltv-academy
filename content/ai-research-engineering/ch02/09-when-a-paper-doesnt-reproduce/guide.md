# When a Paper Doesn't Reproduce

Sooner or later you'll do everything right — official code, matched hyperparameters, multiple seeds, correct dataset version — and still not get the reported number. This lesson covers what to do next, in order, so you don't waste weeks assuming the bug is always yours, and don't jump to "the paper is wrong" before you've actually earned that conclusion.

## What you'll learn

- Why you should assume your own setup is the problem first, and how to rule it out efficiently
- Where to look for other people who hit the same wall (issues, forks, forums)
- When and how to contact the original authors, and what to ask for
- How to document a failed reproduction attempt rigorously enough that it's useful to someone else
- When a documented reproducibility failure is itself worth writing up

## Rule out your own setup before anything else

The base rate for "my reproduction doesn't match" being a problem in your own setup, rather than a flaw in the paper, is high. Before escalating anywhere, re-check the basics from the previous two lessons: are you running the official code unmodified, with the seeds and hyperparameters it ships with, on the dataset version it expects? Diff your environment against anything the authors specified (library versions, CUDA version, Python version) — dependency drift between when a paper was released and when you're running it is one of the most common silent causes of a mismatch, especially for code that's a few years old.

## Check if anyone else has already hit this

Before contacting anyone, check the paper's GitHub repository for open and closed issues — a mismatch you're seeing is very often already reported, sometimes with a fix, a known caveat, or a maintainer's explanation. Check for forks that might have patched something, and check whether the paper has a Papers With Code page with linked implementations you can cross-reference. If the paper is on OpenReview (common for ICLR and some other venues), the review discussion itself sometimes contains exactly this kind of back-and-forth about reproducibility, including reviewers who raised the same concern before publication.

## Contacting the authors

If the usual channels turn up nothing, emailing the authors directly is a normal and expected part of research practice, not an imposition — most authors want their work to be reproducible and will respond, especially to a specific, well-documented question. A good email states exactly what you ran, what you expected, what you got, and what you've already ruled out; it asks a specific question ("can you confirm the learning rate in Table 3 is pre- or post-warmup?") rather than "it doesn't work, help." Vague reports get vague or no replies; specific ones get specific answers.

## Document the attempt rigorously

Whether or not you get a response, write down your attempt as if someone else will need to pick it up without you: exact commit hash or code version, exact environment (ideally captured in a lockfile or container), exact command used, exact data version, all seeds run and their individual results, and the precise gap between what you got and what was reported. This is the same discipline as the reproducibility checklist from the previous lesson, kept as a living record rather than a one-time note. This record is what turns "it didn't work for me" into evidence someone else can actually evaluate.

## When a failure is worth writing up

If you've gone through official code, matched settings, multiple seeds, correct data, checked issues, and contacted the authors, and the result still doesn't hold, you may have found a genuine reproducibility failure — and documenting it publicly (a blog post, a GitHub issue with full details, or a submission to a reproducibility-focused venue) is a legitimate research contribution in its own right, not just a personal failure to replicate. The ML research community has an entire tradition of structured reproducibility reports and reproducibility challenges built around exactly this kind of work. Be precise about scope: "I could not reproduce result X under conditions Y" is a defensible, useful claim; "this paper is wrong" usually isn't, unless your investigation was thorough enough to rule out every alternative explanation above.

## Key terms

- **Dependency drift** — changes in library, CUDA, or language versions between a paper's release and your own run that silently change behavior
- **Issue triage** — checking a repository's existing issues and forks before assuming a problem is unreported
- **Specific ask** — a reproducibility question to authors that names the exact discrepancy, as opposed to a general "it doesn't work"
- **Reproducibility report** — a rigorous, scoped write-up of a failed (or successful) reproduction attempt, useful to others independent of your own conclusion
