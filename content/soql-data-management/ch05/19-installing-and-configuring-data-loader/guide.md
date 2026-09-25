# Installing & Configuring Data Loader

Everything so far in this course has queried data through the Query Editor or a SOQL-aware
tool one record set at a time. Real Salesforce data work is often bulk work — thousands or
millions of records at once — and that's what the rest of this chapter is about. First up:
**Data Loader**, Salesforce's own free desktop application for exactly that job.

## What you'll learn

- What Data Loader is, and how it's different from the tools you've used so far
- How to install it and log in for the first time
- The one setting worth understanding before you run your first job: batch size

## What Data Loader actually is

Data Loader is a free, official Salesforce client application — a real desktop program, not
a browser tab — built for bulk **insert**, **update**, **upsert**, **export**, and **delete**
operations against your org's data. It ships from Salesforce itself (download it from Setup,
under Data Loader, or from Salesforce's own download page) and runs on Windows or macOS.

The reason it exists: the point-and-click UI you've been working in is great for one record
at a time, but nobody hand-edits 50,000 Account records through a form. Data Loader reads
from and writes to plain CSV files, and it's built to move that kind of volume — Salesforce
documents it as comfortable up to about 5 million records per job.

## Installing it and logging in

Installation is a standard desktop installer: download the package for your OS, run it, and
launch the app. The first real step is logging in, and this is where new users often get
stuck — Data Loader authenticates with your **username** plus your **password immediately
followed by your security token** typed together as one string (unless your org has
whitelisted the IP address you're connecting from, or you authenticate via OAuth login in
newer versions). If you've never generated a security token, it's done from your personal
Setup settings inside Salesforce itself, and a new one invalidates the old one.

You also need **API access** enabled for your account — a permission controlled by your
profile — and your org's edition has to support the API at all. Enterprise, Unlimited,
Performance, and Developer Edition orgs get API access by default; Professional Edition
needs it added on. If login fails with an authentication error and your password and token
are both definitely correct, API access is the first thing worth checking.

## The setting worth knowing on day one: batch size

Once you're logged in, open **Settings → Settings** inside Data Loader. The field that
matters most early on is **batch size** — how many records Data Loader groups together per
request to Salesforce. The default is 200 records per batch. If you check the **Use Bulk
API** option in that same settings screen, batch size can go much higher, up to 10,000
records per batch, because the Bulk API is built for exactly this kind of high-volume,
asynchronous loading rather than the standard synchronous API Data Loader uses by default.

You don't need to tune this for a first job — the default works fine for typical operations
— but knowing where it lives, and that Bulk API is the switch to flip for genuinely large
jobs, matters the moment you're loading more than a few thousand records at once.

## Key terms

| Term | Meaning |
|---|---|
| Data Loader | Salesforce's free, official desktop application for bulk data operations |
| Security token | A generated code appended to your password to authenticate from an untrusted IP |
| API access | A profile-level permission (and edition requirement) needed to use Data Loader at all |
| Batch size | How many records Data Loader sends per request; default 200, up to 10,000 with Bulk API |
| Bulk API | Salesforce's API built for large, asynchronous data jobs; an option inside Data Loader's settings |

## Check yourself

A new Data Loader user enters their correct Salesforce password and clicks login, but
authentication fails every time. What are the two most likely real causes, and how would
they fix each one?
