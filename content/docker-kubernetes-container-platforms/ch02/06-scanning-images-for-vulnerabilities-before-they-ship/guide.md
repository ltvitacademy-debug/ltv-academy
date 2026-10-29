# Lesson 6 — Scanning Images for Vulnerabilities Before They Ship

**Chapter 2 · Production-Grade Container Images · Lesson 2 of 4**

## What you'll learn

- Where the vulnerabilities inside a container image actually come
  from, and why a scanner looks at more than just your own code
- How CVE databases and severity scores turn "there might be a bug"
  into something a pipeline can act on automatically
- How to run a real scan with Trivy and read its output
- How to fail a CI build on serious findings instead of discovering
  them in production

## An image is a stack of other people's code

When you `docker build`, the image you produce is mostly not your
code. It's your base OS packages, your language runtime, every
third-party library your `requirements.txt` or `package.json` pulled
in, and only then your application on top. A vulnerability can enter
through any layer in that stack — an outdated OpenSSL in the base
image, a vulnerable transitive npm dependency three levels deep, a
Python package with a known deserialization bug. Image scanning exists
because you cannot manually track the CVE status of every package in
every layer you didn't write.

## CVE databases and severity scores

Known vulnerabilities are catalogued as **CVEs** (Common
Vulnerabilities and Exposures) in public databases — the National
Vulnerability Database (NVD) being the central one, alongside
vendor-specific advisories (Debian Security Tracker, GitHub Security
Advisories, language-ecosystem advisories for npm and PyPI). Each CVE
carries a **CVSS score** and a severity bucket — Critical, High,
Medium, Low — that a scanner uses to rank findings. A scanner's job is
to fingerprint every package and version in your image, cross-reference
that list against these databases, and report matches. It isn't
guessing; it's exact version matching against known, published
disclosures.

## Running a scan with Trivy

Trivy, from Aqua Security, is a widely used open-source scanner that
checks both OS packages and language dependencies in one pass:

```
trivy image myapp:1.4.2
```

That walks every layer of `myapp:1.4.2`, lists every OS package and
every dependency it recognizes, and prints each matching CVE with its
ID, severity, installed version, and the fixed version if one exists.
Docker Desktop and Docker Hub ship a comparable built-in tool, **Docker
Scout**:

```
docker scout cves myapp:1.4.2
```

Both tools answer the same question — "what known vulnerabilities does
this exact image contain right now?" — using different scan engines
and databases, which is why many teams run more than one.

## Gating a CI pipeline on severity

A scan that only produces a report nobody reads doesn't prevent
anything. The real value comes from running the scan in CI and failing
the build when it finds something serious enough to matter:

```
trivy image \
  --severity CRITICAL,HIGH \
  --exit-code 1 \
  --ignore-unfixed \
  myapp:1.4.2
```

`--severity CRITICAL,HIGH` limits the gate to the findings worth
blocking a release over; `--exit-code 1` makes Trivy return a non-zero
exit code (which fails the CI job) when it finds any match at that
severity; `--ignore-unfixed` avoids blocking a release over a CVE that
has no available fix yet, since failing the build wouldn't change
anything. Where exactly you draw that severity line is a team decision
— some pipelines gate on Critical only at first and tighten it once the
backlog of existing findings is under control.

## SBOMs: knowing what's inside, not just what's wrong

A **Software Bill of Materials (SBOM)** is the inventory itself — every
package and version in the image — independent of whether anything is
currently flagged. Tools like `syft` (and `trivy sbom`) generate one in
a standard format (SPDX or CycloneDX):

```
syft myapp:1.4.2 -o cyclonedx-json > sbom.json
```

An SBOM matters because today's clean scan can become tomorrow's
finding the moment a new CVE is published against a package you
already shipped — having the exact inventory on hand means you can
answer "are we affected?" immediately, without re-pulling and
re-inspecting the image.

## Key terms

| Term | Meaning |
|---|---|
| CVE | Common Vulnerabilities and Exposures — a catalogued, published identifier for a specific known security flaw in a specific package/version |
| CVSS score / severity | A numeric score and bucket (Critical/High/Medium/Low) a scanner uses to rank how serious a matched CVE is |
| Trivy / Docker Scout | Scanner tools that fingerprint every OS package and language dependency in an image and cross-reference them against CVE databases |
| SBOM | Software Bill of Materials — a complete inventory of every package and version inside an image, independent of current findings |

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: why
does scanning an image require checking more than the application code
you wrote, and what does `--ignore-unfixed` change about which
findings actually block a CI build?
