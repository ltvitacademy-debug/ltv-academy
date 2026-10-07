# Script — Image Scanning & Hardening

## Segment 1 (title)

Chapter 4 scanned source code, dependencies, secrets, and infrastructure. This chapter moves to what actually runs: containers, which bundle an OS layer and your application together — and both carry their own vulnerabilities.

## Segment 2 (steps)

Dependency scanning checks your application's declared packages, but not the base OS image your Dockerfile starts from. A container built from Ubuntu inherits every OS package in that base — and any one can have a CVE your manifest never mentions. Trivy scans the fully built image, OS packages and app dependencies together.

## Segment 3 (code)

A real Trivy finding breaks vulnerabilities down by severity, so Northbridge Retail's pipeline can gate on just the CRITICAL findings with a fix available, instead of blocking every build over something nobody's going to act on today.

## Segment 4 (steps)

Hardening shrinks what there is to find in the first place: a distroless base image has far fewer packages to begin with, a non-root user limits what an attacker can do after getting in, and a multi-stage build keeps the compiler and source code out of the image that actually ships.

## Segment 5 (outro)

Hardening doesn't replace scanning — it just means the scan has less to find, and the next disclosed vulnerability has fewer unnecessary packages to land in. Next up, Lesson 21: Kubernetes security posture.
