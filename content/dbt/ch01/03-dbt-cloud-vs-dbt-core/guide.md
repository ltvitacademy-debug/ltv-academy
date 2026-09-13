# Lesson 3 — dbt Cloud vs. dbt Core

**Chapter 1 · Analytics Engineering & dbt Fundamentals · Lesson 3 of 45**

## What you'll learn

- The two ways to actually run dbt: dbt Cloud (hosted) and dbt Core
  (open-source CLI)
- What each one gives you, and what it costs you, compared to the
  other
- What a real dbt Core terminal session looks like
- Which one this course uses going forward, and why that choice
  doesn't change anything you're about to learn

## Two ways to run the same thing

Every dbt model, test, and `ref()` call you write is identical no
matter how you run it. What differs is the tooling wrapped around it:

- **dbt Cloud** — the hosted platform, including the browser-based
  Studio IDE you saw in Lesson 1 (file explorer, editor, Lineage tab,
  built-in scheduler, no local setup).
- **dbt Core** — the free, open-source command-line tool. You install
  it with `pip install dbt-core dbt-snowflake`, write your project in
  any code editor, and run it from a terminal with commands like
  `dbt run` and `dbt debug`.

## dbt Core: a real terminal session

dbt Core is exactly what it sounds like — a CLI you invoke by hand
or from a CI pipeline. `dbt debug` is the first command anyone runs
after installing it, and it's deliberately verbose about what it
checked:

![A terminal running dbt debug: dbt and Python version info, profiles.yml and dbt_project.yml both reporting "OK found and valid," the git dependency check, and a final "Connection test: OK connection ok" line.](/courses/dbt/ch01/03-dbt-cloud-vs-dbt-core/successful-dbt-debug.png)
*Every check dbt runs before it will let you build anything — the profile file, the project file, git, and the actual warehouse connection.*
Source: [dbt Docs — Quickstart for manual install](https://docs.getdbt.com/guides/manual-install)

Nothing about that terminal is different in spirit from clicking
around dbt Cloud's IDE — it's checking the exact same
`dbt_project.yml` and profile concepts. It's just a CLI instead of a
web page.

## What each one actually gets you

| | dbt Cloud | dbt Core |
|---|---|---|
| Setup | Sign up, connect a warehouse — nothing to install | `pip install dbt-core dbt-<adapter>`, configure `profiles.yml` yourself |
| Editor | Hosted browser IDE (Lesson 1's screenshot) | Any code editor you already use (VS Code, etc.) |
| Scheduling / CI | Built-in Jobs UI (Chapter 7) | You wire up your own CI runner (GitHub Actions, etc.) |
| Cost | Has a free developer tier; paid tiers for teams | Always free and open-source |
| Where it runs | dbt Labs' infrastructure | Your laptop, a server, or your own CI runner |

Neither one is "more real" dbt — a `.sql` file with a `ref()` call in
it means the same thing either way, and everything from Chapter 2
onward (`ref()`, tests, `sources.yml`, materializations) applies
identically to both.

## Which one this course uses

This course shows both where it matters — the dbt Cloud IDE for
lessons about project navigation and the Lineage graph, and a real
terminal for lessons about the CLI workflow — because in practice,
analytics engineers move between both depending on the team. What you
type in a model's `.sql` file never changes.

## Key terms

| Term | Meaning |
|---|---|
| dbt Cloud | The hosted platform: browser IDE, built-in scheduler, no local install |
| dbt Core | The free, open-source CLI you install and run yourself |
| `dbt debug` | The command that checks your project file, profile, and warehouse connection |
| Adapter | The package (e.g. `dbt-snowflake`) that lets dbt Core talk to a specific warehouse |

## Lab

1. If you haven't already, install dbt Core locally:
   `pip install dbt-core dbt-snowflake`.
2. Run `dbt --version` and confirm it prints a version number.
3. Read through dbt's own [Quickstart for manual
   install](https://docs.getdbt.com/guides/manual-install) far enough
   to see what `dbt init` generates — you'll build a real project
   starting next lesson.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking it
up, what's genuinely different between dbt Cloud and dbt Core — and
what's identical either way.
