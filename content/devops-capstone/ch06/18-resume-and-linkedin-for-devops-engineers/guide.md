# Resume & LinkedIn for DevOps Engineers

You just spent seventeen lessons building a real system end to end — infrastructure, a pipeline, monitoring, security, an incident drill, a postmortem. That is genuinely strong material, but a hiring manager will never see any of it unless your resume and LinkedIn profile translate it into language they scan in under thirty seconds. This lesson is about that translation: turning the Northbridge Retail capstone into resume bullets and a LinkedIn profile that read like a DevOps engineer, not a student.

## What you'll learn

- The three-part formula for a resume bullet that survives a recruiter's six-second scan
- How to turn specific pieces of the capstone — the pipeline, the Terraform infrastructure, the incident drill — into quantified bullets
- What belongs in a DevOps engineer's LinkedIn headline, About section, and Featured section
- Common resume mistakes that make real project work look like a tutorial

## The three-part bullet formula

Every strong resume bullet has the same shape: **action verb + what you built or did + a quantified or specific outcome**. "Worked on CI/CD" is a tutorial sentence. "Built a GitHub Actions pipeline that automatically promotes builds from dev to staging to production with a manual approval gate" is a sentence a hiring manager has to take seriously, because it names a real mechanism, not a topic.

Quantify wherever the capstone gives you a real number: pod counts, latency numbers, percentages, environment counts. You don't need to inflate anything — the capstone already has real numbers in it.

## Sample resume bullets from the capstone

- Built a GitHub Actions CI/CD pipeline with automated image build, Trivy and gitleaks scanning, and promotion across 3 environments (dev, staging, production) gated by a required manual approval.
- Provisioned Azure infrastructure — AKS, ACR, PostgreSQL Flexible Server, Key Vault — for a 2-service e-commerce platform using Terraform with remote state and blob-lease locking to prevent concurrent-apply conflicts.
- Configured Kubernetes Horizontal Pod Autoscalers for two services with different load profiles: a steady-traffic API (min 2 / max 8 pods) and a spiky flash-sale checkout service (min 3 / max 15 pods, target 70% CPU).
- Diagnosed a simulated production incident in which checkout p99 latency rose from ~400ms to 6.2s, using Prometheus, Grafana, and the USE method to trace a saturated database connection pool in an upstream service; authored a blameless postmortem with concrete action items.
- Implemented secrets management with Azure Key Vault and the External Secrets Operator, and replaced stored cloud credentials in CI with GitHub Actions OIDC federated identity.

Notice none of these say "learned" or "studied." Every one describes something that now exists and still runs.

## Your LinkedIn headline and profile

Your headline is the single most-read line on your profile — don't waste it on your current job title if you're changing careers. A strong pattern: **role + 3-4 core tools + one differentiator**. For example: "DevOps Engineer — Terraform, Kubernetes (AKS), GitHub Actions, Azure — built a production-style CI/CD platform from infrastructure to incident response."

Your About section gets three short paragraphs: what you do, the capstone project in two or three sentences (naming the real architecture, not "a project"), and what you're looking for. Then use the Featured section to pin the `northbridgeretail/storefront` repo (or your sanitized public fork of it — covered in the next lesson) directly under your headline, so it's the first thing anyone clicks.

## Practice checklist

- [ ] Rewrite three capstone tasks using the action + outcome + number formula
- [ ] Remove every instance of "learned," "familiar with," or "exposure to" from your resume's experience section
- [ ] Write a headline that names your target role and 3-4 real tools from the capstone
- [ ] Draft a 3-paragraph About section and read it out loud — does it sound like a person or a list of keywords?
- [ ] Pin your portfolio repo in LinkedIn's Featured section
