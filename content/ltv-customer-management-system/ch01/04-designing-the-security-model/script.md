# Lesson 4 — Designing the Security Model · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Now let's design the security model that sits on top of the data model you just built — who at Cascade can do what, and which records they can actually see.

## S2 · STEPS — Two questions

Salesforce security always answers two independent questions. What can a user do — that's profiles, controlling object and field access. And which records can they see — that's Organization-Wide Defaults, role hierarchy, and sharing rules. Both have to pass, and they're independent systems.

## S3 · CODE — Role hierarchy

Cascade's role hierarchy mirrors its real org chart. Monica Reyes, VP of Sales, sits at the top. Derek Oyelaran manages Tom Baptiste and Jordan Kessler underneath him. But Priya Nair, on Key Accounts, reports directly to Reyes — not through Oyelaran. That's deliberate: Key Accounts deals are large and sensitive, and Cascade doesn't want the New Business manager seeing them by default.

## S4 · STEPS — Profiles

Profiles are separate from the hierarchy. System Administrator goes to IT. Sales Rep covers the reps themselves. Sales Manager adds reassignment rights on top of that. And Service and Customer Success each get full access to their own custom object, with read-only on Account and Opportunity.

## S5 · CODE — Organization-Wide Defaults

Every object in this model starts at Private for Organization-Wide Defaults — Accounts, Opportunities, Leads, Installation Projects, and Service Contracts. Deal values, renewal data, and unqualified leads all start locked down before the role hierarchy adds anything back.

## S6 · STEPS — Sharing rules

Private OWD plus the role hierarchy still leaves gaps, so three sharing rules close them. Service and Installation gets read access to Opportunity, since installers don't report into the sales hierarchy. Customer Success gets the same, for renewal context. And Key Accounts gets visibility into installations tied to their own accounts.

## S7 · OUTRO

Next lesson, you'll take both of these designs — the data model and this security model — and turn them into an actual build sequence for Chapters 2 through 4.
