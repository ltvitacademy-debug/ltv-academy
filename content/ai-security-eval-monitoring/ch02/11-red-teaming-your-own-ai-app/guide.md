# Lesson 11 — Red-Teaming Your Own AI App

**Chapter 2 · Evaluating AI Systems · Lesson 11 of 25**

## What you'll learn

- How red-teaming connects back to every risk category from Chapter 1
- What describing your application for a red-team run actually involves
- What a real adversarial test run looks like at scale
- How to read a risk report and decide what's actually urgent

## From risk categories to a measured test suite

Chapter 1 covered prompt injection, jailbreaking, data exfiltration, and the rest as categories to understand and defend against. Red-teaming is where those categories stop being theoretical and become a repeatable test suite you run against your own application, on purpose, before an attacker finds the gaps for you. It's the same core idea as the eval dataset from Lesson 7 — a structured set of cases, run automatically, measured consistently — except every test case here is an adversarial probe instead of a normal user question.

## Step one: describe what you're protecting

A useful red-team run needs context about the application, not just the model behind it — what it's for, what data it can reach, and what a realistic attacker impersonating a user would actually try. Real red-teaming tools (this course uses [promptfoo](https://www.promptfoo.dev/), the same open-source eval framework from earlier lessons, which includes a red-teaming mode) start by collecting exactly that:

![Promptfoo's Application Details setup screen, with fields for the AI's purpose, the user being impersonated, and what external systems and data the LLM can access](/courses/ai-security-eval-monitoring/ch02/11-red-teaming-your-own-ai-app/application-details.png)
*Before any attack runs, the tool needs to know what the application actually does and what it can reach — the more specific this is, the more realistic the generated attacks.*

## Step two: generate and run adversarial probes at scale

From that description, the tool generates test cases across many attack categories at once — the same categories from Chapter 1, plus more — and runs all of them against the live application:

![A terminal showing 3,695 concurrent red-team evaluations running across 4 threads against an AI model, with live progress counters](/courses/ai-security-eval-monitoring/ch02/11-red-teaming-your-own-ai-app/redteam-run.png)
*A real run isn't a handful of manual tries — it's thousands of generated probes across every risk category, executed automatically.*

## Step three: read the risk report, prioritized

Raw pass/fail counts across thousands of probes aren't useful on their own — a risk report organizes the results by category and severity, so you know what to fix first:

![An LLM Risk Assessment dashboard showing issue counts by severity (Critical, High, Medium, Low) and a Security Risk breakdown listing specific checks like Prompt Extraction, SQL Injection, and Indirect Prompt Injection as passed or failed](/courses/ai-security-eval-monitoring/ch02/11-red-teaming-your-own-ai-app/riskreport.png)
*Severity-ranked findings turn a wall of pass/fail results into an actual punch list — critical issues first, not buried in a sea of passing checks.*

## Reading the report like a practitioner

- **Critical and High findings come first**, regardless of how good the overall pass rate looks — a 95% pass rate with one critical data-leak finding is still a launch blocker.
- **A failed check maps back to a Chapter 1 category** — "Indirect Prompt Injection: failed" is Lesson 1's risk, measured; "PII Leaks: passed" is Lesson 3's risk, checked.
- **This isn't a one-time pre-launch activity.** Every model swap, prompt change, or new tool connection can reopen a category that passed before — the same regression-testing logic from Lesson 10 applies here too.
- **A red-team finding becomes an eval dataset case.** Once a gap is found and fixed, add the probe that found it to your regular eval dataset so a future change can't silently reopen it unnoticed.

## Key terms

| Term | Meaning |
|---|---|
| Red-teaming | Systematically running adversarial probes against your own system to find gaps before an attacker does |
| Attack plugin | A category of adversarial test (e.g., prompt injection, PII leakage) a red-team tool can generate probes for |
| Risk report | A severity-ranked summary of red-team findings, organized for prioritization |

## Lab

Pick one risk category from Chapter 1 (prompt injection, jailbreaking, data exfiltration, insecure output handling). Without running any actual attack, write down what you'd want a red-team tool to check for specifically in an AI feature you use — what would a "pass" versus "fail" look like for that one category?

## Check yourself

Can you explain, in your own words, why a red-team finding should get added to your regular eval dataset instead of just being fixed and considered done?
