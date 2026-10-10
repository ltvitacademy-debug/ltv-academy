# Lesson 12 — Static Code Analysis for Salesforce

**Chapter 2 · Pipelines in Practice · Lesson 12 of 19**

## What you'll learn

- What Salesforce Code Analyzer is, and its relationship to PMD, the engine actually doing most of the rule-checking
- The real `sf code-analyzer run` command and how to point it at Apex specifically
- How `code-analyzer.yml` configures which languages and rules are active
- How a static analysis step becomes the "static analysis gate" from Lesson 11

## What Code Analyzer actually is

**Salesforce Code Analyzer** is Salesforce's own CLI plugin for running static analysis across several underlying engines, one of which is **PMD** — a long-standing, general-purpose static analysis tool that Code Analyzer bundles specifically configured with rules for Apex and Visualforce. PMD's bundled rules catch concrete, common problems: empty catch blocks that silently swallow exceptions, unused local variables, overly complex methods, and patterns that commonly precede a SOQL injection vulnerability. Code Analyzer's PMD engine defaults to the `apex` and `visualforce` languages; other languages (JavaScript, HTML — relevant for Lightning web components) have to be explicitly enabled.

## Running it

```bash
sf code-analyzer run \
  --target "force-app/**/*.cls" \
  --rule-selector pmd \
  --output-file results.html
```

- `--target` — a glob pattern selecting which files to scan; scoping this to `force-app/**/*.cls` focuses the run on Apex classes specifically, rather than the whole repository.
- `--rule-selector pmd` — restricts this run to PMD's rules specifically, as opposed to Code Analyzer's other engines.
- `--output-file` — writes a report to disk in whatever format the filename extension implies; CI pipelines commonly also request a machine-readable format (such as JSON or SARIF) for a later step to parse and turn into a pass/fail decision.

## Configuring languages and rules

Code Analyzer reads a `code-analyzer.yml` file at the project root for persistent configuration, rather than requiring every flag on every invocation. Enabling additional PMD languages (say, JavaScript for Lightning web components) is done by adding a `rule_languages` entry under the `pmd` engine section of that file, rather than passing it as a CLI flag every single run. Keeping this configuration in a committed YAML file means every pipeline run — and every developer's local run — uses the exact same rule set, which matters for the same reason pinning a Node version mattered in Lesson 7: consistent behavior over time, not whatever a tool happens to default to.

## From "a command that runs" to "a gate"

Lesson 11 defined a quality gate as a check wired to a real consequence. For static analysis specifically, that means a pipeline step has to actually inspect the result and fail the step — not just run the scanner and move on regardless of what it found:

```yaml
      - name: Static analysis
        run: |
          sf code-analyzer run \
            --target "force-app/**/*.cls" \
            --rule-selector pmd \
            --output-file results.json
```

The command's own `--help` output for your installed version lists exactly which flag sets a severity cutoff (this has moved between Code Analyzer releases, so check it rather than assume last year's flag name). Whatever the flag is called, the principle from Lesson 11 holds: configure it so the command itself exits non-zero once a finding at or above your chosen severity appears, rather than requiring a separate script to parse the JSON output and decide. That non-zero exit is exactly what turns this into a real gate: GitHub Actions marks the step failed, and if branch protection requires this check, the pull request can't merge until the flagged issues are addressed.

## Key terms

| Term | Meaning |
|---|---|
| Salesforce Code Analyzer | Salesforce's CLI plugin for running static analysis across multiple engines |
| PMD | The general-purpose static analysis engine Code Analyzer uses for Apex/Visualforce rules |
| `code-analyzer.yml` | The project-root config file controlling which languages/rules are active |
| `--rule-selector` | Flag restricting a run to a specific engine's rules (e.g. `pmd`) |
| Severity threshold | The finding severity at or above which the command itself fails |

## Lab

Write a `code-analyzer.yml` snippet that enables JavaScript as an additional PMD language (for scanning Lightning web component JS alongside Apex), and the `sf code-analyzer run` command a CI step would use to scan both `force-app/**/*.cls` and `force-app/**/*.js` in one run. Then check `sf code-analyzer run --help` on an installed CLI and note which flag actually controls failing the build on a severity cutoff for your installed version.

## Check yourself

Can you name the underlying engine Salesforce Code Analyzer uses for its Apex rules, and explain what kinds of problems its bundled rules actually catch? Can you explain what specifically turns a static analysis command from a report generator into a real quality gate?
