# Script — Dependency & Composition Scanning

## Segment 1 (title)

Almost no application is only the code your team wrote. Northbridge Retail's checkout service pulls in dozens of open-source packages, which pull in dozens more. Dependency and composition scanning is how you find out whether any of that imported code carries a known vulnerability.

## Segment 2 (steps)

SCA tools scan your manifest and lockfiles and compare every version against databases of known vulnerabilities, tracked as CVEs with a CVSS severity score. It's a different problem than SAST — SCA treats imported code as a black box and just asks whether this exact version is known to be vulnerable. Transitive dependencies, the ones pulled in indirectly, are what make this hard to do by hand.

## Segment 3 (screenshot)

GitHub's Dependabot compares a repository's dependencies against GitHub's Advisory Database, and where a fixed version exists, it can open the upgrade pull request automatically — no manual version-hunting required.

## Segment 4 (screenshot)

Each alert carries severity tags, which is what let Northbridge's team prioritize a critical vulnerability found two layers deep in a logging library nobody had chosen directly — caught by the scan, not by a manual audit that was never going to reach that far down the tree.

## Segment 5 (outro)

Not every CVE is equally urgent — severity is a starting point for triage, not a verdict. Next up, Lesson 17: secrets detection.
