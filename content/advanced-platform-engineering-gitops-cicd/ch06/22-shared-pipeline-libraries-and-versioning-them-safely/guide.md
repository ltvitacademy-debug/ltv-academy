# Lesson 22 — Shared Pipeline Libraries, and Versioning Them Safely

**Chapter 6 · Pipeline-as-Code at Scale · Lesson 22 of 4**

## What you'll learn

- Why a shared pipeline template repo needs to be treated as a real
  software dependency, not a folder of YAML that happens to be shared
- How semantic versioning (`MAJOR.MINOR.PATCH`) applies to pipeline
  templates, and what counts as a breaking change in one
- Why a `CHANGELOG.md` is not optional once more than a couple of
  teams depend on your templates
- How to structure tags and branches so hundreds of consumers can
  upgrade on their own schedule instead of all at once

## A pipeline template repo is a dependency, full stop

Once Lesson 21's reusable workflow or Azure DevOps template is being
called from fifty, or three hundred, repositories, that template repo
has become a dependency exactly as real as any npm package or NuGet
package those repos consume. The moment you think of it that way, a
lot of discipline that already exists for application dependencies
becomes obviously necessary here too: version numbers that mean
something, a record of what changed, and a way for a breaking change
to roll out without breaking every consumer on the same day.

Skip that discipline and here's what actually happens: someone edits
the template to rename an input, pushes to `main`, and every repo
still pointed at `@main` breaks on its very next run — simultaneously,
across the whole organization, with no warning.

## Semantic versioning for a pipeline template

Semantic versioning — `MAJOR.MINOR.PATCH` — maps onto a pipeline
template the same way it maps onto a library's public API:

- **PATCH** (`v1.2.3` → `v1.2.4`): internal fix that changes no
  input, no output, no required secret. Updating a pinned action
  version inside the template, fixing a typo in a log message.
- **MINOR** (`v1.2.0` → `v1.3.0`): backward-compatible addition. A
  new optional input with a default value, a new optional job that
  existing consumers don't have to opt into.
- **MAJOR** (`v1.x` → `v2.0.0`): a breaking change. Renaming or
  removing an input, making a previously optional secret required,
  changing what a job name reports to branch protection rules (which
  breaks any repo whose required status checks reference the old
  name).

```
git tag v1.4.0
git push origin v1.4.0

# a consumer upgrading deliberately:
#   uses: my-org/pipeline-templates/.github/workflows/build-test-scan.yml@v1.4.0
```

## Why `@v1` as a moving major tag is still useful

Tagging every release precisely (`v1.4.0`) and *also* keeping a
moving `v1` tag that always points at the latest `1.x.x` release gives
consumers a real choice. A repo that calls `@v1` picks up every
non-breaking improvement automatically — new optional inputs, patched
bugs — without anyone touching that repo's workflow file. A repo that
needs to freeze behavior entirely pins the exact `@v1.4.0` tag
instead. Nobody is forced onto `@v2` until they deliberately change
that one line.

```yaml
# this repo wants to track v1's improvements automatically:
uses: my-org/pipeline-templates/.github/workflows/build-test-scan.yml@v1

# this repo has frozen on a known-good exact version:
uses: my-org/pipeline-templates/.github/workflows/build-test-scan.yml@v1.4.0
```

## The changelog is not optional

A `CHANGELOG.md` at the root of the template repo, updated with every
tagged release, is the single artifact that lets a team self-serve the
answer to "is it safe for us to move from `v1` to `v2`?" without
filing a support ticket. Keep it in the standard Keep-a-Changelog
shape:

```markdown
## [2.0.0] - 2026-10-28
### Breaking
- Renamed input `node-version` to `runtime-version` to support
  non-Node stacks. Consumers must update their `with:` block.

### Added
- Optional `deploy-environment` input for the new progressive-delivery job.
```

## Key terms

| Term | Meaning |
|---|---|
| Semantic versioning | `MAJOR.MINOR.PATCH` tagging where MAJOR signals a breaking change, MINOR an additive change, PATCH an internal fix |
| Breaking change (in a template) | Renaming/removing an input or required secret, or changing a job name that a consumer's branch protection rule depends on |
| Moving major tag (`@v1`) | A tag re-pointed at the latest `1.x.x` release so consumers get non-breaking updates automatically |
| `CHANGELOG.md` | The record of what changed in each tagged release, letting consumers self-assess upgrade risk |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking:
what makes a change to a pipeline template a MAJOR change rather than
a MINOR one, and why keeping both an exact tag (`v1.4.0`) and a moving
major tag (`v1`) available matters for consumers.
