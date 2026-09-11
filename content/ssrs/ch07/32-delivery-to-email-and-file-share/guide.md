# Lesson 32 — Delivery to Email & File Share

**Chapter 7 · Subscriptions & Delivery · Lesson 32 of 40**

## What you'll learn

- The two delivery extensions every subscription — standard or
  data-driven — ultimately hands off to: **E-Mail** and **Windows File
  Share**
- What has to be configured server-side before each one is even usable
- The exact fields each destination asks for, and why they're different
- Why some report output formats are a poor fit for either delivery
  extension

## Every subscription ends the same way: a delivery extension

Whichever subscription type you built in Lesson 30 or 31, it eventually
hands its rendered report to a **delivery extension** — the piece that
actually gets the report to a human being or a folder. Reporting Services
ships with two: **E-Mail** and **Windows File Share**. Which ones you can
even select depends on what your report server administrator has
installed and configured — Report Server e-mail is the default extension,
but it has to be configured before it will show up as an option; file
share delivery needs no server-side configuration, only a target folder
that already exists.

## E-Mail: familiar fields, one real decision

Choosing **E-Mail** as the destination surfaces fields anyone who's used
e-mail will recognize — **To**, **Cc**, **Bcc**, **Subject**, **Priority**,
a **Comment** box. The real decision is **Include Report** versus
**Include Link**: embed or attach an actual copy of the report, or just
send a link to it on the report server. Clear both, and the subscriber
gets nothing but the notification text in the subject line.

![New Subscription page's E-Mail delivery options: To, Subject, Include Report with a Render Format dropdown, Priority, and Comment.](/courses/ssrs/ch07/32-delivery-to-email-and-file-share/email-delivery-option.png)
*E-Mail delivery: To, Subject, Include Report/Link, Render Format, Priority.*

If you do embed or attach the report, **Render Format** decides its shape.
Pick **MHTML (web archive)** to embed the report directly in the message
body; pick anything else to send it as an attachment instead.

## Windows File Share: a UNC path and an overwrite policy

Choosing **Windows File Share** trades those e-mail fields for a target
location: a **File Name**, a **Path** in UNC format (`\\servername\share`,
no trailing backslash), and a **Render Format** that determines the
file's extension.

![New Subscription page's Windows File Share delivery options: File Name, Path, Render Format, credentials, and overwrite options.](/courses/ssrs/ch07/32-delivery-to-email-and-file-share/file-share-delivery-option.png)
*File share delivery: UNC path, render format, credentials, overwrite policy.*

Two settings are unique to this destination and worth knowing cold:

- **Credentials** — use a pre-configured **file share account** (one set
  of credentials an administrator maintains centrally for every
  subscription that needs it), or supply a specific Windows user's
  credentials yourself.
- **Overwrite options** — overwrite an existing file with the new one,
  skip delivery entirely if a file's already there, or increment the file
  name so every run leaves its own copy.

## Pick a render format the destination can actually use

Whichever destination you choose, the report is delivered as a **static
file** — any interactive features (drill-down rows and columns, for
instance) simply aren't available once the report's been rendered and
shipped. That's a reason to avoid formats that only make sense
interactively, like HTML 4.0, for either delivery extension.

## Key terms

| Term | Meaning |
|---|---|
| Delivery extension | The component that actually gets a rendered report to its destination — E-Mail or Windows File Share |
| Include Report / Include Link | Embed or attach the report itself, versus just linking to it, in an e-mail subscription |
| Render Format | The output format (Excel, PDF, MHTML, etc.) the report is delivered as |
| File share account | A single, centrally-maintained set of credentials multiple file-share subscriptions can reuse |
| Overwrite options | Whether a new delivery replaces, skips, or is renamed alongside an existing file |

## Lab

1. Configure or confirm a standard e-mail subscription (from Lesson 30)
   with **Include Report** checked and **Render Format** set to Excel;
   note it's delivered as an attachment, not embedded.
2. Change the same report's destination to **Windows File Share**, point
   it at a UNC path you have access to, and set the overwrite option to
   **Increment file names as newer versions are added**.
3. Run both subscriptions with **Run Now** and compare what actually
   lands in your inbox versus the file share folder.

## Check yourself

You're ready for Lesson 33 when you can explain, without looking: what
determines whether E-Mail and Windows File Share even appear as
destination options, and what's the real difference between Include
Report and Include Link?
