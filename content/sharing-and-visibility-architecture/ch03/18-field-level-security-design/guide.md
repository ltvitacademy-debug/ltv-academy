# Lesson 18 — Field-Level Security Design

**Chapter 3 · Sharing Architecture · Lesson 18 of 24**

## What you'll learn

- Where field-level security sits relative to object permissions and record-level sharing in the overall access model
- Why FLS is flat and absolute, unlike every sharing mechanism covered so far
- Why permission sets, not profile-level FLS edits, are the modern default for maintaining field access
- How to check and set field accessibility, and how to read the result
- The classic debugging trap: a field that's on the page layout but still invisible

## Where FLS fits in the layered model

Everything in this course up to now has controlled **which records** a user can see. **Field-level security (FLS)** controls something orthogonal: for a record the user can already see, **which fields** on it are visible or editable. The two are independent and both have to pass for a user to see a given piece of data — a user with full record access through OWD, role hierarchy, and every sharing rule in the org still can't see a field that FLS hides from their profile or permission sets. The standard way to frame the full stack, from broadest to narrowest: **object access** (can the user open this object at all — profiles/permission sets), **record access** (which rows — OWD, role hierarchy, sharing), **field-level security** (which columns on those rows), and **page layout** (how those columns are arranged and whether they look read-only on that particular layout). Page layout is the one layer that is *not* security — it's presentation — which is the source of a common mistake described below.

## Why FLS doesn't follow the sharing model

Every mechanism in Chapters 1–2 of this course is about layering and inheritance: role hierarchy grants cascade upward, sharing rules add exceptions, teams add collaborators. FLS doesn't work that way. It's **flat**: a field is visible or hidden, editable or read-only, for a given profile or permission set, full stop — there's no hierarchy to inherit through and no record-level exception mechanism layered on top of it. If a field is hidden by FLS, it is hidden for every record of that object that user can open, regardless of how much record-level access they otherwise have. This is also why FLS is the right tool for protecting specific sensitive fields (compensation, tax IDs, internal risk scores) across an entire object, and the wrong tool for anything that needs to vary record by record — that's what a restriction rule or a more granular data model (splitting sensitive fields onto a separate, more tightly OWD'd object) is for.

## Permission sets as the primary lever

Field access can be set on a profile or on a permission set / permission set group. The architectural guidance is to treat **permission sets as the primary, day-to-day lever** and keep profile-level FLS edits minimal: permission sets are additive, composable, and auditable per-grant ("why does this user have Read access to Tax ID?" has a specific, nameable permission set as the answer), while profile-level FLS edits get buried in a monolithic profile that's hard to diff and easy to lose track of as it grows. A design that leans on permission sets for field access mirrors the same principle this course has applied to record access throughout: prefer the mechanism that keeps each grant small, nameable, and traceable to a reason.

## Checking and setting field accessibility

From **Setup > Object Manager**, select an object, open **Fields & Relationships**, and click into a specific field. Two buttons matter here: **Set Field-Level Security**, which lets you toggle Visible/Read-Only per profile directly, and **View Field Accessibility**, which shows a single summary of what every profile's effective access to that field actually is — the fastest way to answer "why can't this profile see this field" without checking each profile one at a time.

![Salesforce Setup custom field detail page for a custom field, with Set Field-Level Security and View Field Accessibility buttons highlighted.](/courses/sharing-and-visibility-architecture/ch03/18-field-level-security-design/field-detail-buttons.png)
*A custom field's detail page in Setup — Set Field-Level Security and View Field Accessibility are the two entry points for managing and auditing FLS.*

![The Field-Level Security access settings screen for a field, showing a Profile / Field / Visible / Read-Only grid, plus the related page layout visibility settings.](/courses/sharing-and-visibility-architecture/ch03/18-field-level-security-design/field-level-security-grid.png)
*The access-settings screen: the Field-Level Security grid (top) is the actual security control; the Page Layout section (bottom) is presentation only and does not override it.*

In the second screenshot, note the layout: the **Field-Level Security** block (Profile / Field / Visible / Read-Only) is the real access control, while the **Page Layout** block below it only affects how the field is arranged on that specific layout. This separation is exactly what causes the classic debugging trap below.

## The classic trap: hidden by FLS, present on the layout

A support ticket that says "I can open the record but I can't see this one field" is almost always a layout-versus-FLS mismatch: the field was added to the page layout (so it *looks* like it should be there), but FLS hides it for that user's profile or permission sets, so it never renders — no error, it just silently isn't shown. The inverse can also happen: a field is FLS-visible but was never added to the layout, so it's technically accessible (via list views, reports, or another layout) but absent from the one page the user is looking at. The first thing to check in either case is **View Field Accessibility**, not the page layout editor — it answers the security question directly instead of requiring you to infer it from presentation.

## Key terms

| Term | Meaning |
|---|---|
| Field-level security (FLS) | Controls which fields on an accessible record are visible or editable, independent of record-level access |
| Flat access model | FLS has no hierarchy or record-level exception layer — a field's visibility is the same across every record of that object for a given profile/permission set |
| Set Field-Level Security | The Setup action for directly toggling a field's Visible/Read-Only status per profile |
| View Field Accessibility | The Setup screen summarizing a field's effective access across every profile at once |
| Page layout | Presentation-only arrangement of fields; does not grant or restrict access |

## Lab

In a sandbox or Developer Edition org, create a custom field on any object (e.g., a currency field named `Internal_Margin__c`). Using **Set Field-Level Security**, make it visible and editable only for the System Administrator profile, hidden for every other profile. Confirm with **View Field Accessibility** that the field reads Hidden for a non-admin profile. Then, as a design exercise, decide and justify in writing: would you implement this using profile-level FLS directly, or create a dedicated permission set (e.g., "View Internal Margin") and assign it only to the specific users who need it? Explain which approach is more maintainable as the company grows from 50 to 500 users.

## Check yourself

Explain why FLS is described as "flat" compared to the record-level sharing mechanisms covered earlier in this course. Walk through the classic support scenario where a field is on the page layout but a user still can't see it — which layer is actually responsible, and which Setup screen would you check first to confirm it?
