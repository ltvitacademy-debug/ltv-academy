# Lesson 7 — Advanced ACL Lab

**Chapter 2 · Advanced ACL Design · Lesson 7 of 24**

## What you'll learn

- How to trace a real, worked ACL scenario from table-level down to field-level
- Writing a complete, working field-level ACL script for a sensitive field
- Confirming the table-level-plus-field-level evaluation order from Course 3 and Lesson 4
- Applying the performance guidance from Lesson 5 to a real group-membership check
- What the end user actually sees when every layer is wired up correctly

## The scenario

A company's HR scoped application has an `x_hr_core_employee` table, which holds one
record per employee — name, department, manager, and a `salary_band` field. Two groups
of people need to work with employee records: general HR staff, who need to see most
of the record for day-to-day casework, and a small compensation team, who are the only
people who should ever see `salary_band`. Your job is to wire up both the table-level
and field-level ACLs so that happens correctly, and to trace exactly how they combine.

## Step 1 — the table-level read ACL

Start with the record-wide check. General HR staff carry an `hr_user` role, and a
manager should also be able to see their own direct reports' records even without that
role:

```javascript
// ACL: table = x_hr_core_employee, operation = read
// requires role: hr_user
answer = gs.hasRole('hr_user') || current.manager == gs.getUserID();
```

This ACL decides one thing only: can this user open the employee record at all. It says
nothing yet about which individual fields they'll be able to see once they're in.

## Step 2 — the field-level ACL on `salary_band`

Compensation data needs a second, narrower gate on top of the table-level check. Only
members of an `hr_compensation` group, or anyone holding a dedicated
`hr_compensation_admin` role, should see this one field:

```javascript
// ACL: table = x_hr_core_employee, field = salary_band, operation = read
answer = gs.getUser().isMemberOf('c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8') ||
         gs.hasRole('hr_compensation_admin');
```

Notice what this script does *not* do: it never queries `sys_user_grmember` directly.
`isMemberOf()` reuses the group-membership data `GlideUser` already cached for this
transaction. Checking membership this way is fast; querying the group table manually
for the same answer, on every field reference, on every record, would be the exact
performance anti-pattern Lesson 5 warned about — and `salary_band` is exactly the kind
of field that gets read constantly across list views and reports, so the cost of
getting this wrong would be real, not theoretical.

## Step 3 — tracing the evaluation order

Now put a concrete user through both gates. Say this user holds `hr_user` but is not a
member of the compensation group and doesn't hold `hr_compensation_admin`.

1. **Table-level check**: `gs.hasRole('hr_user')` evaluates `true`. The table-level ACL
   passes — this user can open the employee record.
2. **Field-level check**, evaluated *in addition to* step 1, exactly as Course 3's
   evaluation-order lesson and Lesson 4's precedence rule both established: neither
   `isMemberOf('c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8')` nor `hasRole('hr_compensation_admin')`
   is true, so this field ACL evaluates `answer = false`.
3. **Result**: the user sees the employee record — name, department, manager — with
   `salary_band` simply absent or blank. Passing the table-level ACL never substitutes
   for passing the field-level one; they're independent checks that both have to pass
   for a field to actually be visible.

A compensation-team member going through the same record passes both checks and sees
`salary_band` populated normally. Same table-level ACL, same field-level ACL, different
outcome — driven entirely by group membership, not by anything special about the
record itself.

## Step 4 — why this holds up under load

Because the field-level script leans on `isMemberOf()` instead of a manual query, this
same two-gate check can run across a list view showing hundreds of employee records,
or a scheduled report pulling the whole table, without multiplying database queries
per row. That's the direct payoff of the Lesson 5 guidance applied to a real field: the
security behavior is correct *and* it doesn't become the reason the HR module gets
slow.

## Key terms

| Term | Meaning |
|---|---|
| Table-level ACL | Decides whether a user can access the record at all, for a given operation |
| Field-level ACL | A narrower, additional check on one specific field — evaluated alongside the table-level check, not instead of it |
| `x_hr_core_employee` | The scoped-application table used in this lab's worked scenario |
| Group-membership check | `gs.getUser().isMemberOf(sys_id)` — the fast, standard pattern for "only this group" logic |

## Check yourself

A user holds `hr_compensation_admin` but does not hold `hr_user` and is not that
employee's manager. Can they see `salary_band`? Walk through both ACLs in order and
explain the result.
