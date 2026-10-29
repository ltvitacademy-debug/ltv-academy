# Lesson 27 — Software Bill of Materials (SBOM) and Supply Chain Basics

**Chapter 7 · Securing the Pipeline Itself · Lesson 3 of 4**

## What you'll learn

- What an SBOM actually contains, down to the field level, and what it
  deliberately leaves out
- The two formats you'll encounter in real tooling — SPDX and CycloneDX —
  and why both exist instead of one
- How to generate a real SBOM from a project with `syft`, and scan it for
  known vulnerabilities with `grype`
- Why having this inventory *before* an incident is what makes "are we
  affected by this disclosure?" a five-minute query instead of a days-long
  manual audit across every repo you own

## What's actually in an SBOM

A **Software Bill of Materials** is a structured, machine-readable inventory
of every component that goes into a piece of software — direct dependencies,
their transitive dependencies, and often the build tooling itself. For each
component, a real SBOM records:

- **Name and version** — exact, not a loose range like `requests>=2.0`
- **Supplier/origin** — who publishes it (PyPI, npm, a vendored copy)
- **License** — MIT, Apache-2.0, GPL-3.0, whatever it actually ships under
- **A unique identifier** — a package URL (`pkg:pypi/requests@2.31.0`) so
  tooling can match it unambiguously against vulnerability databases
- **Relationships** — which component depends on which, so you can trace a
  vulnerable transitive dependency back to the direct dependency that
  pulled it in

What it does *not* contain is a verdict — an SBOM is an inventory, not a scan
result. It tells you what's there, not whether any of it is currently
dangerous. That judgment comes from feeding the SBOM into a vulnerability
scanner, covered below.

## Two formats, both real, both in use

**SPDX** (Software Package Data Exchange) started as a license-compliance
format and is now an ISO/IEC standard; it's common in Linux distributions and
anywhere license tracking is the primary concern. **CycloneDX**, from OWASP,
was designed security-first from the start, with first-class support for
vulnerability data and component relationships. Neither has fully displaced
the other — which format you produce often comes down to what your
downstream tooling or a customer's procurement requirements expect. Most
generators, including `syft`, can emit either.

```bash
# generate a CycloneDX-format SBOM for the current directory
syft packages dir:. -o cyclonedx-json > sbom.json

# or SPDX, if that's what a downstream consumer requires
syft packages dir:. -o spdx-json > sbom.spdx.json
```

A single component entry inside a CycloneDX SBOM looks like this:

```json
{
  "type": "library",
  "name": "requests",
  "version": "2.31.0",
  "purl": "pkg:pypi/requests@2.31.0",
  "licenses": [{ "license": { "id": "Apache-2.0" } }]
}
```

## Why this matters during a real incident

The scenario an SBOM is built for: a disclosure comes out about a
vulnerability in a widely used library, and leadership asks "are we
affected?" Without an SBOM, that question means grepping lockfiles across
every repository your organization owns, by hand, under time pressure — and
missing the transitive dependency three layers deep that nobody remembers is
there. With an SBOM already generated for every build and stored centrally,
it's a query: does any artifact's SBOM contain this package URL at this
version range. Minutes, not days, and it covers transitive dependencies you
never would have thought to check manually.

Pair the SBOM with a vulnerability scanner that consumes it directly:

```bash
grype sbom:sbom.json
```

`grype` matches every component's package URL against vulnerability
databases and reports which ones have known issues, with severity. Run it in
CI on every build so a newly disclosed vulnerability in an existing,
unchanged dependency gets caught the next time the pipeline runs a scheduled
scan — not only when someone remembers to re-check manually.

## Key terms

| Term | Meaning |
|---|---|
| SBOM | A structured inventory of every component, version, license, and relationship in a build — not a scan result |
| SPDX | An ISO/IEC-standard SBOM format that originated for license compliance |
| CycloneDX | An OWASP SBOM format designed security-first, with native vulnerability-data support |
| Package URL (purl) | A standardized identifier, e.g. `pkg:pypi/requests@2.31.0`, used to match a component unambiguously against vulnerability data |
| `syft` / `grype` | Common open-source tools to generate an SBOM from a project and scan an SBOM for known vulnerabilities, respectively |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: what does
an SBOM record about a dependency that a plain `requirements.txt` or
`package-lock.json` does not, and why does having one generated ahead of
time turn a vulnerability disclosure into a query instead of a manual audit?
