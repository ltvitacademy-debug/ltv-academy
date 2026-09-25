# Capstone: Secure It Properly

The app now shows every deal and every at-risk renewal. Before anyone else opens it, decide who is allowed to see what. Security added after launch is security that gets skipped. In this lesson you'll apply Chapter 8: app sharing, row-level security predicates, sharing inheritance, Data Cloud permissions, and auditing, to Cobalt Ridge's app, and then prove it works with a test plan. All figures and field names are illustrative, and the exact setup steps depend on your org and release, so check current Salesforce documentation.

## What you'll learn

- How to turn org roles into access personas
- Which security layer answers which question
- How to write two simple, correct security predicates
- How to build a test matrix that catches mistakes before your users do

## Step 1: list the personas

Start with people, not settings. Cobalt Ridge has four groups:

| Persona | Should see |
|---|---|
| Sales reps (about 85) | Only their own opportunities |
| Regional VPs (3) | Every opportunity in their region |
| Customer Success managers (about 14) | Usage and renewal risk for their own accounts |
| CRO, Finance, Revenue Operations | Company-wide totals, no deal-level detail needed |

The last row is a design decision: executives get an aggregated rollup, not a way around the rules. That keeps the row-level rules simple.

## Step 2: know which layer does what

Security here has layers, and each answers a different question.

- **App sharing** decides who can open the app at all, and whether they can view, edit, or manage it. It doesn't filter rows.
- **Row-level security** on each dataset decides which rows a viewer's queries return.
- **Data Cloud permissions** control who and what can read the source data. Connect CRM Analytics with a least-privileged connection user, not an administrator.
- **Auditing** shows who used what, after the fact.

A missing layer is a gap, not a redundancy. Sharing an app with the right people does nothing if the dataset behind it returns every row.

## Step 3: choose predicates or sharing inheritance

CRM Analytics can inherit Salesforce's own record sharing for supported objects, which is attractive when native sharing already matches your rules. Cobalt Ridge's regional rule is a custom business rule, and the usage data comes from outside Salesforce, so a security predicate fits better. Predicates are a filter condition on a dataset; rows the user isn't allowed to see are never returned. Two illustrative predicates:

Opportunity detail dataset (one predicate, wrapped for display):

```
'OwnerId' == "$User.Id"
|| 'Region' == "$User.Region_Scope__c"
```

Usage and renewal dataset:

```
'CSMId' == "$User.Id"
```

`Region_Scope__c` is a custom user field in our example, set only for the three regional VPs and left blank for reps, so reps match only on the first clause. The executive rollup dataset is region-level aggregates only, shared to the executive group and nobody else. Every dataset in the app needs its own decision, including the small Targets dataset.

## Step 4: build the test matrix

Log in as, or otherwise test with, a real user from each persona in a sandbox. Confirm the Closed Won tile matches what you expect:

| Test user | Expected Closed Won tile |
|---|---|
| Example rep | Only their own deals, e.g. $410K |
| Americas VP | $2.9M |
| EMEA VP | $1.5M |
| APAC VP | $0.8M |
| Executive rollup | $5.2M |
| User with no rule match | Empty, not everything |

Then run the consistency check: $2.9M + $1.5M + $0.8M must equal the executive $5.2M. If it doesn't, a predicate is leaking or over-filtering. Also confirm no dataset row has a blank Region, and test what your org does when a user's scope field is blank. A predicate that accidentally matches blank to blank is a classic leak.

## Step 5: audit and maintain

Security decays. Review who has access each quarter, review changes to predicates and app sharing, and use your org's usage and audit data (such as Event Monitoring, if licensed) to see who is viewing the app. Keep personal data out: the usage stream is account-level, and there is no reason to ingest individual user emails.

## Recap

Personas first, then the right layer for each question, simple predicates, a test matrix with a consistency check, and a review habit. Next lesson: package everything into an executive presentation and portfolio piece.

## Check yourself

Why does sharing the app with the right people not protect the data, and what does the region-totals check catch?
