# Dynamic Dashboards

Every dashboard has a **running user**, and the running user decides what data the
dashboard shows. This is one of the least obvious ideas in Salesforce analytics, and it
trips up new analysts constantly: two people can open the same dashboard and see the
same numbers, even though one of them has no access to some of those records. This
lesson explains why, and how a **dynamic dashboard** changes it.

You already know Salesforce's sharing model from the Fundamentals course: roles,
profiles, sharing rules, and record access decide who can see which records. What is new
is how that shows up in a dashboard.

## What you'll learn

- What a running user is and why it matters
- The difference between a fixed-user and a dynamic dashboard
- When each is the right choice
- The limits that come with dynamic dashboards

## The running user

When you save a dashboard, its properties include a setting for whose access the data
is drawn under. The exact wording in the Lightning Dashboard Builder can vary, but the
choices boil down to three:

- **Yourself** as the running user
- **A specified user**, often an executive or a role-based integration user
- **The person viewing the dashboard**, which is the dynamic option

With a **fixed running user**, everyone who opens the dashboard sees the data the
running user is allowed to see, regardless of their own access. That is powerful and
risky. A manager can share a company-wide pipeline with the whole sales team, but if the
running user can see salaries or private opportunities, so can everyone else who has
access to the dashboard.

## What makes a dashboard dynamic

In a **dynamic dashboard**, the running user is always the logged-in user. Each viewer
sees only the records they already have permission to see, according to their own
role, sharing rules, and profile. In the Lightning view you will see text such as
"Viewing as" followed by a name. For a dynamic dashboard that name is the viewer.

That means one dashboard can serve a whole org. A sales rep sees her own pipeline. Her
manager sees the team's. A VP sees the region. You build and maintain a single
dashboard, and the sharing model does the rest.

## Choosing between them

- Use a **dynamic dashboard** when the audience is broad and different people should
  see different slices of the data, such as "My Pipeline".
- Use a **fixed user** when everyone must see identical numbers, such as a company-wide
  scoreboard on a wall display, and you have confirmed nothing sensitive is exposed.

## Limits to know

Dynamic dashboards come with tradeoffs, and the specifics depend on your edition:

- Editions cap the **number of dynamic dashboards** you can create. Check your own
  org's limit before you plan on building many.
- Dynamic dashboards generally cannot be refreshed on a schedule the way fixed-user
  dashboards can, because there is no single user whose data to refresh. Viewers refresh
  them when they open them.
- Admins or users with the right permission can often preview "viewing as" another
  user, which is useful for testing.

## Recap

The running user decides which records a dashboard reflects. A fixed running user gives
everyone the same view, and a dynamic dashboard gives each person their own, governed by
the sharing model you already know. Use dynamic dashboards for broad audiences, watch
your edition's limit, and remember they do not schedule refreshes. Next: scheduling and
subscriptions.
