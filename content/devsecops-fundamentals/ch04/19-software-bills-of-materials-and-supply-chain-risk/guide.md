# Software Bills of Materials & Supply Chain Risk

Lesson 16 scanned Northbridge Retail's dependencies for known vulnerabilities right now. But what happens when a *new* critical vulnerability is announced tomorrow, in a library nobody's thought about in months? The team needs to answer one question fast: do we even use that library, and where? A Software Bill of Materials (SBOM) is what makes that question answerable in minutes instead of days, and it closes out this chapter's scanning toolkit by shifting from "scan now" to "know always."

## What you'll learn

- What an SBOM actually is, and why it's generated at build time rather than scanned for on demand
- The two dominant SBOM formats, SPDX and CycloneDX, and what a real CycloneDX document looks like
- Why SBOMs matter most in the hours after a new vulnerability is disclosed, not during routine operations
- What "supply chain risk" means beyond just "my dependencies might have a CVE"

## An SBOM is an inventory, generated once, consulted often

An SBOM lists every component in a build — every direct and transitive dependency, its exact version, and often a cryptographic identifier — generated automatically as part of the CI pipeline, the same place SCA scanning already runs. Tools like **Syft** or Trivy's SBOM mode produce one in a standard format without anyone hand-maintaining a spreadsheet.

Here's a trimmed real CycloneDX document, the kind Northbridge Retail's checkout-service build would produce:

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.5",
  "serialNumber": "urn:uuid:3e671687-395b-41f5-a30f-a58921a69b79",
  "version": 1,
  "components": [
    { "type": "library", "name": "commons-lang3",
      "version": "3.12.0",
      "purl": "pkg:maven/org.apache.commons/commons-lang3@3.12.0" }
  ]
}
```

`bomFormat` and `specVersion` identify the document type; `serialNumber` and `version` let the same build's SBOM be referenced and revised; each entry in `components` names a package with a `purl` — a package URL that uniquely identifies it across ecosystems. The other dominant format, **SPDX**, carries the same basic idea with a different schema, and both are widely accepted by scanning and compliance tooling.

## Where this earns its keep: the morning after a new CVE

When a critical vulnerability is disclosed in a widely used library, the question every security team asks is: "are we affected, and where?" Without SBOMs, that means grepping through every repository's manifest files by hand, hoping nobody misses a transitive dependency buried three layers deep. With SBOMs already generated for every service, it becomes a search: query every stored SBOM for that package name and version, get an answer in minutes, and go straight to patching instead of still hunting for exposure hours later.

## Supply chain risk is bigger than "a dependency has a CVE"

Supply chain risk also covers *how* a build gets assembled: was the package downloaded from the real registry, or a typo-squatted lookalike? Was the build pipeline itself compromised, producing an artifact that doesn't match its source? Frameworks like **SLSA** (Supply-chain Levels for Software Artifacts) and tools like **Sigstore/cosign** address this by attaching verifiable provenance and signatures to a build — proof of exactly what produced an artifact, not just a list of what's inside it. The SBOM says what's in the box; provenance and signing say the box wasn't tampered with on the way to the shelf.

## Key terms

- **SBOM (Software Bill of Materials)** — a generated inventory of every component in a software build
- **SPDX / CycloneDX** — the two standard, widely-adopted SBOM formats
- **purl (package URL)** — a standardized identifier for a software package across ecosystems
- **Provenance** — verifiable evidence of how and where a build artifact was produced, distinct from what's listed inside it
