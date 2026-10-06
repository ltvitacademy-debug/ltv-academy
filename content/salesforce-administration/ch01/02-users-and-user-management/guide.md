# Lesson 2 — Users and User Management

**Chapter 1 · Users and Access · Lesson 2 of 36**

## What you'll learn

- Where the Users list lives and what it shows
- The three buttons that run the entire user lifecycle
- The four building blocks of every user record: identity, license, profile, role
- How to check exactly what a specific user can do, using User Access Summary

## The Users list

From Setup, type **Users** into the Quick Find box and select **Users**. This single list holds every person who has ever had an account in the org — active, inactive, or frozen. Salesforce never truly deletes a user record; accounts are deactivated, not removed, which we'll cover in the next lesson.

![The Administration section of Setup, with Users highlighted in the left-hand navigation tree.](/courses/salesforce-administration/ch01/02-users-and-user-management/setup-admin-nav.png)
*Setup > Administration > Users — the list every lesson in this chapter eventually routes back to.*

## The three buttons that run the lifecycle

At the top of the Users list sit three buttons that cover almost everything an admin does with user accounts day to day:

![The New User, Reset Password(s), and Add Multiple Users buttons on the Salesforce Users list page.](/courses/salesforce-administration/ch01/02-users-and-user-management/new-user-buttons.png)
*New User, Reset Password(s), Add Multiple Users — three buttons, the entire day-to-day lifecycle.*

| Button | What it does |
|---|---|
| **New User** | Opens the full user-creation form for one person (Lesson 3) |
| **Add Multiple Users** | A streamlined form for creating up to 10 users at once |
| **Reset Password(s)** | Forces a password reset email for selected users — the single most common admin support ticket |

## What a user record is actually made of

Every user record, no matter how many fields Salesforce shows you, boils down to four building blocks:

| Block | What it controls | Covered in |
|---|---|---|
| **Identity** | Name, email, username — who this person is | This lesson |
| **License** | What type of access they're entitled to | Lesson 4 |
| **Profile** | Their baseline permissions | Lesson 5 |
| **Role** | Their place in the reporting hierarchy, affecting record visibility | Later chapters |

Every user needs exactly one license and exactly one profile. They can hold any number of additional permission sets and permission set groups on top — that's Lessons 6 and 7.

## Checking what a user can actually do

The question "what can this person do in Salesforce?" comes up constantly — a manager wants to know why someone can't see a report, or a security review needs a list of who has a certain permission. Rather than digging through a profile and every assigned permission set by hand, open the user's record and check **User Access Summary**:

![A user's detail page in Lightning Experience, with the User Access Summary section open to the User Permissions tab, listing permissions like Access Activities and Access Libraries.](/courses/salesforce-administration/ch01/02-users-and-user-management/user-access-summary.jpg)
*User Access Summary — every permission this user holds, searchable, with tabs for Object, Field, and Custom Permissions too.*

This single screen is one of the most useful tools an admin has for troubleshooting access questions, and it will come up again throughout this chapter.

## Key terms

| Term | Meaning |
|---|---|
| User record | The account representing one person (or integration) in the org |
| Deactivation | Disabling login without deleting the record (Lesson 3) |
| License | The type of access a user is entitled to (Lesson 4) |
| Profile | A user's baseline set of permissions (Lesson 5) |
| User Access Summary | A per-user screen listing every permission currently granted |

## Check yourself

Name the three buttons on the Users list page and what each one is for. Then name the four building blocks of a user record.
