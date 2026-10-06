# Lesson 9 — Custom Objects

**Chapter 2 · Build: Data and Objects · Lesson 9 of 20**

## What you'll learn

- How to create a custom object from scratch, start to finish, in Setup
- The full field set for Installation Project and Service Contract,
  exactly as designed in Lesson 3
- How to set the Lookup relationships that tie both objects back into
  Account and Opportunity
- How to decide tab visibility and sharing settings for a brand-new
  object

## Step 1 — Creating a custom object

Both of Cascade's custom objects follow the same creation path: **Setup →
Object Manager → Create → Custom Object**. For each one, you set:

- **Label / Plural Label** (e.g., "Installation Project" / "Installation
  Projects")
- **Object Name** (auto-fills the API name, `Installation_Project__c`)
- **Record Name** format (Auto Number works well here —
  `INST-{0000}` — since these records don't need a human-chosen name)
- **Launch New Custom Tab Wizard** — checked, so both objects get a
  visible tab for the profiles that need one

## Step 2 — Building Installation Project

Add these fields under **Object Manager → Installation Project → Fields
& Relationships → New**:

| Field label (API name) | Type | Notes |
|---|---|---|
| Opportunity (`Opportunity__c`) | Lookup (Opportunity) | The won deal this installation fulfills |
| Account (`Account__c`) | Lookup (Account) | Denormalized for filtering — set automatically by the Chapter 3 Flow |
| Site Address (`Site_Address__c`) | Text Area | Where the install happens |
| Target Install Date (`Target_Install_Date__c`) | Date | Scheduled date |
| Install Status (`Install_Status__c`) | Picklist (Scheduled / In Progress / Complete / On Hold) | Default value: Scheduled |
| Lead Installer (`Lead_Installer__c`) | Lookup (User) | Who on Marcus Webb's team owns it |
| Equipment Summary (`Equipment_Summary__c`) | Long Text Area | Human-readable summary of what's being installed |

## Step 3 — Building Service Contract

Add these fields under **Object Manager → Service Contract → Fields &
Relationships → New**:

| Field label (API name) | Type | Notes |
|---|---|---|
| Account (`Account__c`) | Lookup (Account) | Which customer this contract covers |
| Installation Project (`Installation_Project__c`) | Lookup (Installation Project) | Which installation it follows, when applicable |
| Contract Start Date (`Contract_Start_Date__c`) | Date | When coverage begins |
| Contract End Date (`Contract_End_Date__c`) | Date | When coverage ends |
| Service Tier (`Service_Tier__c`) | Picklist (Basic / Standard / Premium) | What level of coverage |
| Annual Value (`Annual_Value__c`) | Currency | Yearly contract value |
| Renewal Status (`Renewal_Status__c`) | Picklist (On Track / At Risk / Renewed / Lapsed) | Default value: On Track |

## Step 4 — Why Lookup, confirmed in the field type itself

Notice every relationship field above is created as a **Lookup**
relationship, not Master-Detail — this is the same decision from Lesson 3,
now actually selected in the field-creation wizard. When you create
`Opportunity__c` on Installation Project, Salesforce's "Create a
Relationship" step offers both types; pick **Lookup Relationship**
explicitly, since Master-Detail would force Installation Project's
sharing to follow Opportunity's exactly, which conflicts with the
separate sharing rule for the Service & Installation team designed in
Lesson 4.

## Step 5 — Tab visibility by profile

Once both tabs exist, set their visibility per profile (**Setup →
Profiles → [profile] → Tab Settings**):

| Profile | Installation Project tab | Service Contract tab |
|---|---|---|
| System Administrator | Default On | Default On |
| Sales Rep / Sales Manager | Default On | Default On |
| Service Profile | Default On | Default Off |
| Customer Success Profile | Default Off | Default On |

This keeps each team's navigation focused on what they actually work —
Marcus Webb's installers don't need a Service Contract tab cluttering
their app, and Angela Wu's Customer Success team doesn't need
Installation Project as a primary tab even though they can still see
individual records they're shared into.

## Key terms

| Term | Meaning |
|---|---|
| Auto Number | A record-naming format (like `INST-0001`) that generates automatically instead of requiring a human-entered name |
| Custom Tab | The navigation entry that makes a custom object browsable in the Salesforce app |
| Lookup Relationship field | The specific field type chosen when relating two objects without Master-Detail's tighter sharing/ownership coupling |

## Lab

Create both custom objects in your org with every field listed above,
set both relationship fields to Lookup explicitly, and create one test
Installation Project record and one test Service Contract record, each
linked to a real Account from Lesson 6.

## Check yourself

- Why does Installation Project use an Auto Number record name instead
  of a text name?
- Why is `Opportunity__c` on Installation Project created as a Lookup
  relationship instead of Master-Detail?
- Which profile should NOT see the Service Contract tab by default, and
  why?
