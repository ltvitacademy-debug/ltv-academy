# Lesson 1 — What CI/CD Means for Salesforce

**Chapter 1 · Automating Delivery · Lesson 1 of 19**

## What you'll learn

- What Continuous Integration and Continuous Delivery/Deployment mean in general, and why Salesforce needs its own version of both ideas
- Why a Salesforce release pipeline moves **metadata into an org**, not a compiled artifact onto a server
- The two project formats a pipeline has to deal with — metadata format and the DX source format — and why the DX format is what makes CI/CD practical
- Where this course sits relative to the Salesforce Administrator path you've already completed

## CI/CD, the general idea

**Continuous Integration (CI)** means every developer merges small changes into a shared branch frequently, and an automated process verifies each change the moment it lands — compiling it, running tests, checking it for obvious problems. **Continuous Delivery** extends that: after CI passes, the change is automatically packaged and made ready to release, with a human making the final call to push the button. **Continuous Deployment** goes one step further and removes that human gate — a change that passes every automated check ships to production with no manual approval at all. Most real Salesforce teams land on continuous delivery for production and continuous deployment for lower environments like sandboxes, because an uncaught mistake on a live CRM instance is expensive in a way an uncaught mistake in a sandbox isn't.

## Why Salesforce is a different kind of CI/CD target

In a typical web application, CI/CD compiles source code into a binary or container image and ships that artifact to a server. A Salesforce deployment doesn't work that way. There's no binary. What moves through a Salesforce pipeline is **metadata** — the XML (or XML-equivalent) definitions of Apex classes, Lightning web components, Flows, objects, fields, permission sets, and dozens of other component types that together define how an org behaves. A deployment takes that metadata and tells a *target org* — a running, live Salesforce instance, not a server you provision — to adopt it. The org is always there, always running, and a deployment is really a negotiated change to an already-live system, which is exactly why validation and testing (Lessons 2–3) matter more here than in most other platforms.

## Metadata format vs. source format

Salesforce metadata has existed in one format since long before CI/CD was practical for this platform: **metadata API format**, which groups components by type (`classes/`, `objects/`, `flows/`) and was designed around manual `package.xml` manifests and point-and-click Change Sets. Salesforce DX introduced a second way of arranging the exact same metadata on disk: **source format**, organized to mirror how a developer actually works — one folder per object with its fields and layouts nested inside, `.cls-meta.xml` sidecar files next to each Apex class, everything readable as a diff in a pull request. A project's `sfdx-project.json` declares its `packageDirectories`, and almost every modern Salesforce CI/CD pipeline — the kind this course builds — works against source format, because source format is what makes a Git diff, a pull request review, and an automated pipeline step all possible in the first place. You generally cannot run a meaningful CI/CD pipeline against raw Change Sets; the whole discipline this course teaches assumes your metadata already lives in source format, in a Git repository.

## Where you're starting from

You already know how to work inside the Salesforce Setup UI, how Flow automation and the object model work, and how a single admin makes a change by hand — that's the Salesforce Administrator path. This course doesn't re-teach any of that. It teaches what happens once a team has multiple people changing the same org and needs every change to go through source control, automated tests, and an automated deployment path instead of one person clicking Save in production. The chapters ahead build, piece by piece, toward a working GitHub Actions pipeline that deploys real metadata to a real org.

## Key terms

| Term | Meaning |
|---|---|
| Continuous Integration (CI) | Automatically building/testing every merged change immediately |
| Continuous Delivery | CI plus automatically preparing a release, with a human approving the final push |
| Continuous Deployment | CI/CD with no manual approval gate — a passing change ships automatically |
| Metadata API format | The original Salesforce metadata layout, grouped by component type |
| Source format (DX) | The Salesforce DX metadata layout designed for Git and CI/CD pipelines |
| `sfdx-project.json` | The DX project's manifest, declaring its package directories and settings |

## Lab

Without touching any tooling yet, write out — in your own words — what would have to be true about a Salesforce org's metadata for a GitHub Actions pipeline to deploy to it automatically on every merge to `main`. Specifically answer: where does the metadata have to live before a pipeline can see it, what format does it need to be in, and what two or three things should an automated process check *before* it actually changes the org? You'll be able to check this answer against Lessons 2–4.

## Check yourself

Can you explain, to someone who only knows Change Sets, why "deploying metadata to an org" is a genuinely different problem from "deploying a binary to a server" — and why that difference is exactly why Salesforce CI/CD leans so heavily on validation and automated testing?
