# Lesson 81 — RLS in Power BI Service · Voiceover script

Segments map 1:1 to slides. Target: ~3 minutes total.

---

## S1 · TITLE CARD

Every role you defined in Desktop is inert until someone gets
assigned to it — and that only happens here, in the service.

## S2 · IMAGE: dataset-canvas-more-options.png

Hover over the semantic model to reveal More options — easy to miss
the first time, since it only shows up on hover.

## S3 · IMAGE: dataset-more-options-menu.png

Select Security. If your semantic model has no roles defined yet in
Desktop, this option won't even appear.

## S4 · IMAGE: row-level-security-add-member.png

Add anyone by email, including external guests — but never a group
created inside Power BI itself. Distribution groups, mail-enabled
groups, and Entra security groups all work; Microsoft 365 groups
don't.

## S5 · IMAGE: row-level-security-member-count.png

Each role shows its member count right in the label — a fast sanity
check before you ever open the role itself.

## S6 · OUTRO CARD

Roles are assigned. Lesson 82 covers validating that they actually
work, and the dynamic pattern that adapts per signed-in user.
