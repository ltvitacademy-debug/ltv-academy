# Script — Delivery to Email & File Share

## Segment 1 (title)

Whichever subscription type you build — standard or data-driven — it ends the same way: handed off to a delivery extension. Reporting Services ships with exactly two. Let's look at both.

## Segment 2 (screenshot: email-delivery-option)

Choosing E-Mail as the destination surfaces fields anyone who's used email will recognize — To, Cc, Bcc, Subject, Priority, a comment box. The real decision is Include Report versus Include Link: embed or attach an actual copy of the report, or just send a link to it on the report server. Clear both, and the subscriber gets nothing but the notification text in the subject line. If you do include the report itself, Render Format decides its shape — pick MHTML, web archive, to embed it right in the message body, or pick anything else to send it as an attachment. And remember, E-Mail only shows up as an option at all once your report server administrator has configured it — it's the default extension, but it's not usable out of the box.

## Segment 3 (screenshot: file-share-delivery-option)

Windows File Share trades those email fields for a target location — a file name, a path in UNC format, and a render format that decides the file's extension. Two settings here are worth knowing cold. Credentials — you can use a file share account, one set of credentials an administrator maintains centrally, or supply a specific Windows user's login yourself. And overwrite options — overwrite the existing file, skip delivery if one's already there, or increment the file name so every run keeps its own copy. Unlike email, file share delivery needs no server-side configuration at all — just a target folder that already exists.

## Segment 4 (outro)

Next lesson, we finish the subscription picture with scheduling — shared schedules versus subscription-specific ones, and what actually fires a subscription on time.
