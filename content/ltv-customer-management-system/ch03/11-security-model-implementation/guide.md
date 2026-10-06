# Lesson 11 — Security Model Implementation

**Chapter 3 · Build: Automation and Security · Lesson 11 of 20**

## What you'll learn

- How to build the seven-role hierarchy Lesson 4 designed, for real, in
  Setup
- How to clone and configure the four custom profiles Cascade needs,
  alongside the unmodified System Administrator profile
- How to set Organization-Wide Defaults to Private on all five core
  objects
- How to build the three sharing rules that close the specific gaps OWD
  and role hierarchy leave open
- How to verify the finished model actually matches the Lesson 4 design

This lesson is pure translation: everything here was already decided on
paper in Lesson 4. Nothing new gets designed — it gets built.

## Step 1 — The role hierarchy

Under **Setup → Users → Roles**, add the root role first, then each role
beneath it:

```
VP of Sales (Reyes)
  Sales Mgr, New Business (Oyelaran)
    AE, New Business (Baptiste)
    SDR (Kessler)
  Sr. AE, Key Accounts (Nair)
  Customer Success Mgr (Wu)
  Service & Install Lead (Webb)
```

Seven roles in total. The important detail, carried straight from Lesson
4: Priya Nair's, Angela Wu's, and Marcus Webb's roles each sit as
**separate branches directly under VP of Sales**, not underneath Derek
Oyelaran's Sales Manager role. Assign each named person to their role
under **Setup → Users**, then confirm in the role hierarchy view that
Monica Reyes's role shows all six roles beneath her, while Derek
Oyelaran's shows only Baptiste and Kessler.

## Step 2 — The profiles

Under **Setup → Users → Profiles**, clone the **Standard User** profile
four times and rename each clone:

| Cloned profile | Object permissions |
|---|---|
| **Sales Rep** | Create/Edit on Lead, Contact, Opportunity; Read on Account; no Delete on Closed Won Opportunities |
| **Sales Manager** | Everything Sales Rep has, plus Edit/Delete across the team and Opportunity reassignment |
| **Service Profile** | Full (Create/Edit/Delete) on Installation Project; Read Only on Account and Opportunity |
| **Customer Success Profile** | Full on Service Contract; Read Only on Account and Opportunity; no access to Lead |

**System Administrator** stays the unmodified standard Salesforce
profile, assigned only to IT. Set each custom profile's object
permissions under **Object Settings** on the profile detail page, then
assign users: Reyes and Oyelaran get Sales Manager, Baptiste/Kessler/Nair
get Sales Rep, Webb's team gets Service Profile, Wu gets Customer
Success Profile.

## Step 3 — Organization-Wide Defaults

Under **Setup → Security → Sharing Settings**, set every core object to
**Private**:

| Object | OWD |
|---|---|
| Account / Contact | Private |
| Opportunity | Private |
| Lead | Private |
| Installation Project | Private |
| Service Contract | Private |

This is the tight baseline Lesson 4 called for — a rep's own records stay
visible only to them and to whoever sits above them in the role
hierarchy, until a sharing rule adds anything back.

## Step 4 — The three sharing rules

Still under **Sharing Settings**, add one rule per object that needs a
rule:

| Sharing rule | Shares | To | Access |
|---|---|---|---|
| **Service → Opportunity** | Opportunities owned by role "Service & Install Lead" and subordinates | Role: Service & Install Lead | Read Only |
| **Customer Success → Opportunity** | Opportunities owned by role "VP of Sales" and subordinates | Role: Customer Success Mgr | Read Only |
| **Key Accounts → Installation Project** | Installation Projects owned by role "Service & Install Lead" and subordinates | Role: Sr. AE, Key Accounts | Read Only |

Each rule is owner-based, grants **Read Only**, and grants exactly the
access the role hierarchy alone doesn't already provide — nothing
broader, matching the Lesson 4 principle of least privilege.

## Step 5 — Verifying the model

Log in (or use **Login As**) as a test user on each custom profile and
confirm: a Sales Rep user sees only their own Accounts/Opportunities (plus
anything rolled up if they're a manager); a Service Profile user sees
Installation Projects they own and the Opportunities behind them, but not
unrelated deals; a Customer Success Profile user sees Service Contracts
and the Opportunity context behind them, but no Leads at all.

## Key terms

| Term | Meaning |
|---|---|
| Role hierarchy | A tree controlling which records roll up to which managers — Lesson 4's design, now built |
| Cloned profile | A copy of a standard profile, customized for a specific job function |
| Owner-based sharing rule | A rule that shares records owned by one role/group to another role/group, at a fixed access level |

## Lab

Build all seven roles, all five profiles (four cloned plus the standard
System Administrator), the five Private OWD settings, and the three
sharing rules in your own Developer Edition org. Then create one test
user per custom profile and verify the Step 5 checks above actually hold.

## Check yourself

- Why do Priya Nair, Angela Wu, and Marcus Webb's roles report directly
  to the VP of Sales instead of through the Sales Manager role?
- Which profile is left completely unmodified, and who gets it?
- Name one of the three sharing rules and the specific visibility gap it
  closes.
