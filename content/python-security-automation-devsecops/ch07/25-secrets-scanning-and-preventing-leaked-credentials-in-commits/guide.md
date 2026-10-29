# Lesson 25 — Secrets Scanning and Preventing Leaked Credentials in Commits

**Chapter 7 · Securing the Pipeline Itself · Lesson 1 of 4**

## What you'll learn

- Why "just don't commit secrets" is a hope, not a control, and what actually
  catches a leaked credential before it ships
- The two detection strategies real scanners combine — regex pattern matching
  and Shannon-entropy scoring — and what each one catches that the other misses
- How to block a secret at commit time with a pre-commit hook, and why a
  second gate at push time or in CI still matters
- How to scan a repository's **entire git history** for secrets that already
  leaked, since deleting a file in a new commit does not delete it from history
- What has to happen, in order, after a real leak — and why rotating the
  credential always comes before rewriting history, never after

## Two ways a scanner spots a secret

A secrets scanner has to answer one question for every line of every diff:
"does this look like a credential?" There are two independent ways it answers
that, and production-grade tools like **gitleaks**, **detect-secrets**, and
**trufflehog** run both.

**Pattern (regex) matching** looks for the shape of a known credential type.
AWS access key IDs start with `AKIA` followed by 16 alphanumeric characters.
GitHub personal access tokens start with `ghp_`. Slack tokens start with
`xox[bpoa]-`. A scanner ships a rule list of these shapes and flags any string
that matches one. This is fast and precise for the vendors it knows about, but
it is blind to anything it has no rule for — an internal API key your own
platform team invented has no recognizable prefix.

**Entropy-based detection** catches exactly that gap. It doesn't ask "does this
match a known format," it asks "is this string too random to be normal code."
Shannon entropy measures how unpredictable a sequence of characters is — a
32-character string drawn from `[A-Za-z0-9+/=]` with no repeating structure
scores high; an English variable name or a URL scores low. A scanner flags any
string whose entropy crosses a threshold, regardless of what it matches. The
tradeoff is false positives: a base64-encoded image, a minified bundle hash, or
a UUID can trip the same alarm. That's why real tools run entropy scoring as a
second pass alongside the regex rules, and let you tune the threshold and
allowlist known-noisy patterns rather than relying on either technique alone.

## Stopping it before it's committed

The cheapest place to catch a secret is on the developer's machine, before it
ever becomes a commit. The [pre-commit](https://pre-commit.com/) framework
runs a chain of hooks against staged files every time `git commit` runs, and
it will simply refuse the commit if a hook fails.

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.4
    hooks:
      - id: gitleaks
```

```bash
pip install pre-commit
pre-commit install          # wires the hook into .git/hooks/pre-commit
```

`detect-secrets`, from Yelp, takes a slightly different approach that's worth
knowing: instead of just pass/fail, it builds a **baseline** file of secrets
you've already reviewed and accepted (test fixtures, documentation examples),
so it only blocks *new* findings instead of re-flagging the same accepted
string on every commit forever.

```bash
pip install detect-secrets
detect-secrets scan > .secrets.baseline
git add .secrets.baseline

# wired as a pre-commit hook, it diffs new findings against the baseline
detect-secrets-hook --baseline .secrets.baseline
```

A pre-commit hook only runs if the developer has it installed locally, so
treat it as a courtesy, not a control. The real gate belongs in CI, as a
required check on every pull request — run the same scanner there (`gitleaks
detect --source . --no-git -v` against the diff, or as a dedicated CI step)
so a contributor who skipped `pre-commit install`, or force-pushed around it,
still gets caught before merge.

## It already happened: scanning git history

Here's the detail that catches people off guard: deleting a secret in a new
commit does **not** remove it from the repository. `git log` still has every
prior commit, and anyone who clones the repo gets the full history, secret
included, unless you specifically rewrite it. So the second job of a secrets
scanner is retroactive — walk every commit the repository has ever had and
flag anything that was ever exposed, even briefly.

```bash
# scan the full history of every branch and tag
gitleaks detect --source . --log-opts="--all" --report-path gitleaks-report.json

# trufflehog's git mode walks commit-by-commit, not just the working tree
trufflehog git file://. --only-verified
```

`--only-verified` on trufflehog is worth calling out specifically: trufflehog
can take a finding that *looks* like a credential and actually test it against
the real API it belongs to (does this AWS key authenticate?), which cuts
through a huge amount of entropy-driven noise and tells you which findings are
live, exploitable secrets versus dead strings from a rotated key.

Run a history scan once as a one-time audit on any repository that predates
your scanning setup, and again any time you inherit a repo you didn't build
the history of yourself.

## A secret leaked anyway: rotate first, clean history second

If a scan — or a careless `git push` — confirms a real credential made it into
a commit that was pushed to a remote, the order of operations matters, and
it's not the order most people reach for first.

1. **Rotate the credential at its source immediately.** Go to the cloud
   provider, API vendor, or secret store and revoke the exposed key, then
   issue a new one. This is the only step that actually stops the bleeding —
   the secret may already be cached in CI logs, scraped by a bot, mirrored in
   a fork, or sitting in another engineer's local clone, and none of those
   copies are in your control.
2. **Audit usage during the exposure window.** Check the provider's access
   logs for any activity on that credential between when it was committed and
   when you rotated it. That tells you whether this was a close call or an
   active compromise you now need to respond to.
3. **Rewrite history only after rotation**, using `git filter-repo` (the
   maintained successor to `git filter-branch`) or the BFG Repo-Cleaner, to
   strip the secret from every commit that still contains it and force-push
   the result. Do this for hygiene and to stop a future contributor from
   digging it out of history and reusing it — but understand it is cleanup,
   not containment. A secret that was ever pushed to a remote should be
   treated as burned, full stop, regardless of whether you later scrub it
   from history.

Rewriting history *before* rotating gives you a false sense that the problem
is solved, while the original, still-valid credential remains usable by
anyone who already has a copy of it.

## Key terms

| Term | Meaning |
|---|---|
| Regex-based detection | Matching a string against known credential formats, e.g. `AKIA[0-9A-Z]{16}` for an AWS access key |
| Entropy-based detection | Flagging strings whose character randomness (Shannon entropy) exceeds a threshold, catching secrets with no known format |
| Pre-commit hook | A script that runs locally before a commit is finalized and can block it — a courtesy gate, not an enforced control |
| History scan | Walking every past commit (`gitleaks detect --log-opts="--all"`) to find secrets that leaked before scanning was ever set up |
| Credential rotation | Revoking a leaked credential at its source and issuing a replacement — the only step that stops an already-leaked secret from being usable |

## Check yourself

You're ready for Lesson 26 when you can explain, without looking: why does a
regex-only scanner miss some real secrets, what does entropy scoring add, and
why must rotating a leaked credential always happen before rewriting git
history to remove it — not after?
