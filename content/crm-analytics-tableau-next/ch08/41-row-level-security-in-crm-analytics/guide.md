# Row-Level Security in CRM Analytics

In Salesforce Fundamentals you learned how profiles, roles, sharing rules, and field-level security decide what a user can see in the CRM. CRM Analytics doesn't automatically mirror all of that. It has its own security layers, and the one that decides which rows of data a person sees is the **dataset security predicate**. This lesson explains what a predicate is, how simple ones look, and how to test them.

## What you'll learn

- The difference between access to an app and access to rows
- What a security predicate is and where you set it
- How to read and write simple ownership-based predicates
- The mistakes that leave data exposed or hidden

## Two layers: who can open it, and what they see

**App-level access** decides who can open a CRM Analytics app and its dashboards, and whether they can view, edit, or manage them. It answers "can this person see the dashboard at all?"

**Row-level security** decides, for a user who can open the dashboard, which rows of the underlying dataset are returned. Two sales reps can open the same dashboard and see different numbers, because each one's queries are filtered by the dataset's predicate.

Without a predicate, anyone who can query a dataset can see all of its rows. That's the default that surprises new builders.

## What a predicate is

A **security predicate** is a filter condition attached to a dataset. When a user runs a query against that dataset, CRM Analytics applies the predicate for that user, and rows that don't match are never returned. The user doesn't get an error. The rows simply aren't there.

You set it on the dataset. In Analytics Studio, browse to the dataset, open its edit page, and scroll to the security predicate section. Menu names change between releases, so verify the exact path in your org.

## Reading a simple predicate

Predicates compare a column in the dataset to something about the logged-in user. Here is the classic ownership pattern, shown as an illustrative example:

```
'OwnerId' == "$User.Id"
```

Read it left to right: keep a row only if its `OwnerId` column equals the current user's Id. The column name goes in single quotes, and the user value comes from the `$User` variable. Salesforce's own Trailhead uses a similar predicate that matches an account-owner name column to `$User.Name`. Two special values also exist: `'true'` lets everyone through and `'false'` blocks everyone. Because syntax rules are strict, always verify against the current Salesforce documentation and test before relying on any predicate.

Note that a predicate can only reference columns that exist in the dataset. If the dataset doesn't include `OwnerId`, you have to add it in the dataflow or recipe first.

## Where predicates go wrong

- **Forgetting derived datasets.** A recipe that writes a new dataset produces something that needs its own security decision. Don't assume protection carries over. Set the predicate explicitly on every dataset you publish, and verify.
- **External data.** Rows from a warehouse or a CSV have no Salesforce owner. As the last lesson noted, you need a column that maps rows to users or teams before a predicate can restrict them.
- **Typos.** A predicate that references a wrong column name can fail in ways that either hide everything or expose more than intended. Test it.
- **Field-level security.** Salesforce field-level security isn't configured inside CRM Analytics. Instead, the integration user that extracts Salesforce data must be able to read the fields, or the data flow can fail. Whatever it can read ends up in the dataset, so exclude sensitive fields you don't need.

## Test as real users

Never validate a predicate only as an administrator. Sign in as, or ask, a test user with an ordinary profile, open the dashboard, and confirm that the numbers match what that user should see. Test at least three cases: a user who owns records, a user who owns none, and a manager if your design gives managers wider access.

## Recap

App access controls who can open the dashboard, while a dataset predicate controls which rows they see. Start with a simple ownership predicate, set it on every dataset, and test as ordinary users.

## Check yourself

A rep opens a dashboard built on a dataset with no predicate. What do they see, and what one change fixes it?
