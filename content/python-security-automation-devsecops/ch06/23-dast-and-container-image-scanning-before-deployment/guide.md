# Lesson 23 — DAST and Container Image Scanning Before Deployment

**Chapter 6 · DevSecOps Fundamentals · Lesson 3 of 4**

## What you'll learn

- What Dynamic Application Security Testing (DAST) is, and why it needs a
  running application to do its job — the opposite of SAST
- What container image scanning checks, and why a clean codebase can still
  ship inside a vulnerable image
- Where both checks sit in the pipeline relative to the static checks from
  Lesson 22, and why that ordering matters
- How to read real pipeline steps for both, including a DAST scan against
  a staging URL and an image scan before a push to a registry

## DAST: testing from the outside, with the app actually running

Lesson 22 covered SAST and dependency scanning — both static, both run
without starting the application. **DAST** is the opposite approach: it
sends real HTTP requests at an actual running instance of the
application, the way an attacker would, and watches how it responds. A
DAST scanner probes live endpoints with inputs designed to reveal
injection flaws, cross-site scripting, authentication bypasses, and
server misconfigurations — things like missing security headers or a
verbose error page that leaks internal details. None of that is visible
by reading source code, because it depends on how the pieces behave
together once they're actually running: routing, middleware, session
handling, the web server's own configuration.

**OWASP ZAP** (Zed Attack Proxy) is a widely used open-source DAST tool
that can run a "baseline" scan against a URL — spidering the app's pages
and firing a battery of passive and active checks at what it finds.
Because DAST needs something real to attack, it can't run against a
pull-request diff the way SAST can. It needs a deployed instance — almost
always a staging environment that mirrors production closely enough for
the results to mean something, running after the build has already
passed Lesson 22's static checks.

## Container image scanning: checking what you're about to ship

Most modern applications deploy as container images, built from a
Dockerfile that usually starts from a base image someone else maintains —
a particular Python or Linux distribution image, for example. That base
image bundles an entire operating system's worth of packages, and any of
those packages can have a disclosed vulnerability, completely independent
of whether your own application code or your own Python dependencies have
any problems at all. **Container image scanning** inspects every layer of
a *built* image — the base OS packages, any packages installed during the
build, and the final set of files that would actually ship — against
vulnerability databases, the same way dependency scanning does for your
application's own package manifest. **Trivy** is a widely used open-source
scanner that does exactly this against a built image before it's pushed
anywhere.

## Both checks, later in the same pipeline

```yaml
name: deploy-checks
on:
  workflow_run:
    workflows: ["build-and-scan"]
    types: [completed]
jobs:
  image-and-dast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build container image
        run: docker build -t myapp:${{ github.sha }} .

      - name: Scan the built image
        run: |
          curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin
          trivy image --severity CRITICAL,HIGH myapp:${{ github.sha }}

      - name: Deploy to staging
        run: ./scripts/deploy-staging.sh myapp:${{ github.sha }}

      - name: DAST baseline scan against staging
        run: |
          docker run -t owasp/zap2docker-stable zap-baseline.py \
            -t https://staging.example-internal.com -r zap-report.html
```

Notice the order: the image is scanned *before* it's deployed anywhere,
and the DAST scan only runs *after* staging is live, because it genuinely
needs a running target to attack. That's a different position in the
pipeline from Lesson 22's checks, which ran on every pull request before
any image even existed.

## Why you need both, on top of the static checks

SAST and dependency scanning catch problems you can see in source code and
manifests. DAST catches problems that only exist once everything is wired
together and actually running — a security header that's missing in the
real HTTP response, an authentication check that works in isolation but
can be bypassed through a different route. Container image scanning
catches a third category entirely: vulnerabilities inherited from the base
image and OS packages, which neither your SAST scan nor your DAST scan
ever looks at. None of the three substitutes for the others — a pipeline
that only runs one of them has a real blind spot.

## Key terms

| Term | Meaning |
|---|---|
| DAST | Dynamic Application Security Testing — sends real requests at a running application to find flaws visible only at runtime |
| OWASP ZAP | An open-source DAST tool that can run an automated baseline scan against a live URL |
| Container image scanning | Inspecting a built image's base OS packages and installed files against vulnerability databases before it's deployed |
| Trivy | An open-source scanner commonly used to check a built container image for known vulnerabilities |

## Check yourself

You're ready for Lesson 24 when you can explain why a DAST scan has to run
against a deployed staging environment instead of a pull-request diff, and
name one real vulnerability category that container image scanning would
catch but SAST, dependency scanning, and DAST would all miss.
