# Lesson 11 — Security Model Implementation · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter 3 opens with the most important lesson in it: building, for real, the exact security model you designed on paper in Lesson 4 — role hierarchy, profiles, org-wide defaults, and three sharing rules.

## S2 · STEPS — Building the role hierarchy

Start with the role hierarchy under Setup, Users, Roles. Add the VP of Sales role at the top, then add each role beneath it, and assign Monica Reyes, Derek Oyelaran, Priya Nair, Tom Baptiste, Jordan Kessler, Angela Wu, and Marcus Webb to their roles.

## S3 · CODE — Seven roles

Seven roles in total. Priya Nair, Angela Wu, and Marcus Webb's roles each sit as separate branches directly under the VP of Sales, not under the New Business manager — exactly as designed in Lesson 4.

## S4 · STEPS — Four cloned profiles

Next, profiles. Clone the Standard User profile four times — Sales Rep, Sales Manager, Service Profile, Customer Success Profile — then edit each clone's object permissions. System Administrator stays the unmodified standard profile, assigned only to IT.

## S5 · CODE — Object permissions by profile

Sales Rep gets create and edit on Leads, Contacts, and Opportunities, with no delete on Closed Won deals. Service Profile gets full access to Installation Project but read-only on Account and Opportunity. Customer Success Profile mirrors that for Service Contract, with no Lead access at all.

## S6 · CODE — Organization-Wide Defaults

Then set Organization-Wide Defaults under Setup, Security, Sharing Settings. Account, Contact, Opportunity, Lead, Installation Project, and Service Contract all go to Private — the tight baseline Lesson 4 called for.

## S7 · STEPS — Three sharing rules

Finally, three sharing rules close the real gaps: Service gets read access to Opportunity, Customer Success gets read access to Opportunity, and Key Accounts gets read access to Installation Project — each one closing exactly the gap Lesson 4 identified, nothing broader.

## S8 · OUTRO

Next lesson, you'll put this security model to work with your first Flow — automatically assigning new Leads to Jordan Kessler's queue.
