# Lesson 22 — SAST and Dependency Scanning in a Build Pipeline

**Chapter 6 · DevSecOps Fundamentals · Lesson 2 of 4**

## What you'll learn

- What Static Application Security Testing (SAST) actually checks, and why
  it doesn't need to run your application to do it
- What dependency scanning (software composition analysis) checks instead,
  and why your own code isn't the only thing that needs scanning
- How both checks slot into a real CI pipeline, running on every commit
  before merge — the earliest automated gate in the chapter
- How to read a real GitHub Actions workflow step that wires both of them
  in for a Python project

## Static analysis: reading code without running it

**SAST** tools read your source code — not your running application — and
look for patterns known to be dangerous: string-built SQL queries that
could allow injection, use of a weak or outdated cryptographic function,
a hardcoded secret sitting in a config file, unsanitized input flowing
into a command executed on the shell, and dozens of other patterns
specific to the language being scanned. Because SAST never executes the
application, it can run in seconds against a single pull request's diff,
with no test environment, no database, and no running server required.
That's exactly why it's the first automated check in a shift-left
pipeline: it's cheap enough to run on every single commit.

For Python projects, **Bandit** is a widely used SAST tool purpose-built
for exactly this kind of pattern matching against Python source. More
general-purpose SAST tools, like **Semgrep**, apply the same idea across
many languages using a rules engine you can extend with your own custom
checks. Either way, the output is the same shape: a file, a line number, a
severity, and a description of what pattern was matched — something a
developer can act on without any additional investigation.

## Dependency scanning: checking what you didn't write

SAST only looks at code your team wrote. Most real applications pull in
far more code than that through dependencies — packages listed in a
`requirements.txt` or `package-lock.json` that your project imports but
never wrote a line of. **Software composition analysis (SCA)**, usually
just called dependency scanning, checks the exact versions of those
packages against public vulnerability databases, and flags anything where
your pinned version matches a version known to have a disclosed issue.

This matters because a project can have flawless code of its own and still
ship a serious vulnerability, simply by depending on a library version
with a known problem. For Python, **pip-audit** checks installed packages
against the Python Packaging Advisory Database; **npm audit** does the
same for Node projects against the npm registry's advisory data. Both run
in CI the same way SAST does — fast, automatic, on every build — because
checking a dependency list against a known-vulnerable list doesn't require
running the application either.

## Both checks, in one real pipeline

```yaml
name: build-and-scan
on:
  pull_request:
    branches: [main]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run SAST (Bandit)
        run: pip install bandit && bandit -r src/ -f json -o bandit-report.json

      - name: Run dependency scan (pip-audit)
        run: pip install pip-audit && pip-audit -r requirements.txt
```

Notice both steps run before the application is ever built into a
deployable artifact, let alone deployed anywhere. That's the point: these
are the cheapest, fastest checks in the whole pipeline, so they run first
and most often — on every pull request, against every commit, long before
Lesson 23's dynamic and container checks come into play later on.

## Living with the output

Neither tool is perfect. SAST tools flag patterns, not confirmed exploits,
so some findings will be false positives — a hardcoded string that looks
like a secret but is actually a test fixture, for example. Dependency
scanners will sometimes flag a vulnerable function in a package your code
never actually calls. Teams that adopt SAST and dependency scanning
successfully build a habit of triaging findings quickly rather than either
ignoring the tool entirely or treating every finding as a hard blocker —
a tension Lesson 24 addresses directly when it covers how to set gates
that fail builds on real risk without drowning developers in noise.

## Key terms

| Term | Meaning |
|---|---|
| SAST | Static Application Security Testing — analyzes source code for known-dangerous patterns without executing the application |
| SCA / dependency scanning | Checks the exact versions of third-party packages a project depends on against public vulnerability databases |
| Bandit | A SAST tool purpose-built for scanning Python source code |
| pip-audit | A dependency-scanning tool that checks installed Python packages against the Python Packaging Advisory Database |

## Check yourself

You're ready for Lesson 23 when you can explain why SAST and dependency
scanning can both run without ever starting the application, and name one
category of real-world vulnerability that neither check could ever catch
on its own — because catching it requires the application to actually be
running.
