# Lesson 69 — Automated Deployment, Alerts & Troubleshooting

**Chapter 11 · Azure Automation & Infrastructure as Code · Lesson 69 of 95**

## What you'll learn

- What turns a deployment script into a real pipeline: alerting on failure
- A real troubleshooting angle for when the automation itself breaks, not the database
- Why Chapter 11 ends here, and what Chapter 12 does next

## The deployment step is the easy part

By this point in the chapter, deploying a database change with Bicep
(Lesson 67) or the CLI (Lesson 66) is one command. `az deployment group
create` either succeeds or it doesn't. The part that actually makes this
operational — the part that turns "a script exists" into "a pipeline you
can trust unattended" — is what happens the moment it fails and nobody
is watching the terminal.

```
az deployment group create `
  --resource-group myrg `
  --template-file database.bicep `
  --parameters @params.json

if ($LASTEXITCODE -ne 0) {
  Send-MailMessage -To "dba-team@contoso.com" -Subject "Deployment FAILED" `
    -Body "Deployment of database.bicep to myrg failed. Check the pipeline log." `
  exit 1
}
```

That `if` block is the actual point of this lesson. The deployment
command itself is one line, reusing exactly what Lessons 66 and 67
already covered. The alert is what makes it real automation instead of
a script someone has to remember to run and watch.

## When the automation itself breaks

The failure that trips up DBAs new to automation isn't a bad T-SQL
script — it's the pipeline's own plumbing:

- **Check the pipeline log first, not the database.** A failed deployment
  often means the pipeline's identity couldn't authenticate, or a
  parameter file had a typo — the database itself may be untouched and
  fine.
- **Confirm the identity the pipeline is running as.** Automation runs
  under a service principal or managed identity, not your own login.
  Permission errors that never happen when you run a command manually
  show up constantly in pipelines because that identity has narrower
  rights than you do.
- **Re-run the exact same command manually, with the same parameters.**
  This isolates whether the problem is the pipeline (environment,
  identity, secrets) or the deployment itself (a bad template, a
  conflicting resource). If it succeeds manually with identical
  parameters, the pipeline's environment is the suspect, not your Bicep
  file.

If you want the deeper, dedicated version of building this kind of
pipeline — triggering on a merge to main, running tests first, managing
secrets properly — **Git/GitHub & CI/CD for Data**, Lesson 22
("Deploying on Merge to Main") and Lesson 23 ("Environment Variables &
Secrets in CI/CD") cover that ground in full. This lesson keeps the
DBA-specific slice: the deployment command you already know, plus the
alert and the troubleshooting instinct that makes it trustworthy
unattended.

## Chapter 11, closed

Chapter 11 is done: CLI and PowerShell (Lesson 66) for the commands, ARM
and Bicep (Lesson 67) for the infrastructure itself, Elastic Jobs
(Lesson 68) for running T-SQL across many databases, and this lesson
tying deployment, alerting, and troubleshooting together. Chapter 12,
**Database Migration to Azure**, is next — getting an on-prem SQL Server
database into Azure in the first place, which is exactly what Chapter
11's automation skills get pointed at once a database actually exists
there.

## Key terms

| Term | Meaning |
|---|---|
| Pipeline | A script (deployment, job, etc.) wired to run automatically, with alerting on failure |
| Service principal / managed identity | The non-human identity a pipeline authenticates as, distinct from a DBA's own login |
| CI/CD | Continuous Integration/Continuous Deployment — covered in full in the Git/GitHub & CI/CD for Data course |

## Check yourself

Explain the three-step troubleshooting order this lesson gives for a
failed automated deployment, and why checking the pipeline log comes
before assuming the database itself is broken.
