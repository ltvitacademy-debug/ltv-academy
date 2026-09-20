# Users & Licenses

Chapter 5 was entirely about the shape of Salesforce data — objects and how they relate.
Chapter 6 shifts to a different, equally important question: who can actually see and do
things with that data. It starts with the most basic unit of "who" in Salesforce: the
**User**.

## What you'll learn

- What the User object represents, and why it's a real Salesforce object like any other
- Why not every "user" in an org can do the same things — the role of licenses
- The real license types an analyst will encounter, at an introductory level

## The User object is a real object

Every person who logs into a Salesforce org — a salesperson, a support agent, a system
administrator, an integration account — has a corresponding record on the standard **User**
object. It has fields the same way any other object does: Name, Email, Profile, Role, and
more you'll meet later in this chapter. This matters because Users aren't a separate,
invisible layer outside the data model — they're records, and other objects (like Opportunity,
which has an `OwnerId` pointing at a User) relate to them exactly the way they relate to any
other object.

## Not every user is equal: licenses

Here's the part that trips up people new to Salesforce: creating a User record doesn't
automatically give that person full access to everything. Every User is assigned a
**license**, and the license is what determines the ceiling on what that user could possibly
be granted — before profiles or permission sets even enter the picture (those come in Lesson
28). A license isn't a nice-to-have setting; it's a hard boundary, and it typically comes with
a real dollar cost per user, which is exactly why orgs don't just give everyone the most
powerful license by default.

## Real license types you'll encounter

- **Salesforce license** — the full license, giving access to standard CRM functionality
  (Accounts, Contacts, Opportunities, and more). Most full-time salespeople and admins have
  this one.
- **Salesforce Platform license** — a lower-cost license for users who need custom
  objects/apps built on the platform, but not the standard CRM Sales/Service Cloud
  functionality. Common for employees who use an internally-built custom app but don't touch
  the sales pipeline.
- **Chatter Free / Chatter External** — very limited licenses, mostly for collaboration
  (Chatter posts, groups) without real object-level CRM access. Useful for occasional external
  collaborators who need to comment but not analyze data.

## Why this matters for an analyst

If a report seems to be missing data that a colleague swears they can see, or a colleague
says they "can't find" an object you know exists, the license is one of the first things worth
checking — a Platform-licensed user genuinely cannot see standard CRM objects the way a full
Salesforce-licensed user can, no matter what their profile says. Understanding licenses is
step one of understanding why access varies user to user, before you even get to roles,
profiles, and sharing rules in the rest of this chapter.

## Key terms

| Term | Meaning |
|---|---|
| User | The standard Salesforce object representing anyone who logs into the org |
| License | The hard ceiling on what a user could possibly be granted access to |
| Salesforce license | Full license, standard CRM functionality (Accounts, Opportunities, etc.) |
| Salesforce Platform license | Lower-cost license for custom-app users without standard CRM access |

## Check yourself

Why is a user's license considered before their profile, when thinking about what that user
can actually access in an org?
