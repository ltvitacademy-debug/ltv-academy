# Lesson 3 — The AWS Console, Tour

**Chapter 1 · Cloud & AWS Concepts · Lesson 3 of 18**

## What you'll learn

- The main pieces of the AWS Management Console, and what each one is for
- Why the Region selector matters on every single page
- How the search bar and Services menu get you to any of AWS's 200+ services
- Where billing, support, and your account identity live in the console

## The console is one web app in front of every service

The **AWS Management Console** is the browser-based interface to
your AWS account — a single web app that fronts all 200+ services
rather than a separate site per service. You sign in at
`console.aws.amazon.com`, and from there every service (S3, EC2,
Lambda, Glue, Redshift) is one click away through the same
consistent layout: a top navigation bar, a Services menu, and a
per-service dashboard underneath.

```
Top nav bar (always visible):
  [AWS logo]  [Services ▾]  [Search]   [Region ▾]  [Account ▾]

Below it: whichever service's own console you're currently in —
its own dashboard, resource list, and "Create" buttons.
```

## The Region selector: the most important control on the page

In the top-right corner sits the **Region selector**. Almost
everything you do in the console is scoped to whichever Region is
currently selected — an S3 bucket, EC2 instance, or Lambda function
you created in `us-east-1` simply won't appear if you switch the
selector to `eu-west-1`, because it doesn't exist there. This trips
up new AWS users constantly: "my resource disappeared" is very often
"I'm looking at the wrong Region." (A handful of services, like IAM
and S3's bucket-naming layer, are global and show up regardless of
which Region is selected — Lesson 6 covers IAM's global scope.)

## Finding any service: the search bar and Services menu

With 200+ services, nobody memorizes where everything lives in a
menu tree. The **Services search bar** at the top of the console is
the fastest way in: type "S3" or "Lambda" and the matching service
jumps straight to the top. The **Services menu** (the dropdown next
to it) groups every service by category — Compute, Storage,
Database, Analytics, and so on — for browsing when you don't know
the exact name you're looking for yet.

```
Search bar:            Services menu (grouped):
type "lambda" →         Compute      EC2, Lambda, ECS
Lambda console opens     Storage      S3, EBS, EFS
                          Database     RDS, DynamoDB
                          Analytics    Glue, Redshift, Athena
```

## Account menu, billing, and support

The **Account menu** (top right, next to Region) is where your
account identity lives — which IAM user or role you're signed in as,
links to the **Billing and Cost Management** dashboard (current
spend, invoices, Free Tier usage), and **Support** (support cases,
documentation, the AWS Health dashboard for service status). This is
also where you'd switch roles if your account is set up to access
other AWS accounts through AWS Organizations — covered next lesson.

## Key terms

| Term | Meaning |
|---|---|
| AWS Management Console | The browser-based web app used to view and manage AWS resources across all services |
| Region selector | Top-right control that scopes almost everything you see in the console to one Region |
| Global service | A service (like IAM) whose resources appear regardless of which Region is selected |
| Billing and Cost Management | The console dashboard showing current spend, invoices, and Free Tier usage |

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: a
teammate says "my S3 bucket disappeared from the console" — what's
the first thing you'd check, and why?
