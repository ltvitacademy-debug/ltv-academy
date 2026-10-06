# Script — Job Roles, Abstract Roles and Data Roles

## Segment 1 (title)

Lesson one told you Oracle Fusion uses four kinds of roles. This lesson covers three of them — job roles, abstract roles, and data roles — the roles that typically get provisioned directly to a user.

## Segment 2 (steps)

A job role represents a specific job function, something tied to a real title, like Accounts Payable Manager or Cash Manager. It's built by combining duty roles that together cover what that job needs. Most of these come seeded from Oracle. At Castellan Robotics, a payables clerk gets the seeded Accounts Payable Specialist job role, and that alone gives her what she needs to enter and manage invoices.

## Segment 3 (steps)

An abstract role represents something true of a person regardless of their job — not a function, but a classification. The most common one is Employee: everyone gets it, and it covers things every employee needs, like entering their own expense report. Other common ones are Line Manager and Contingent Worker. A job role answers what your job is. An abstract role answers what kind of person you are, independent of your job.

## Segment 4 (steps)

A data role takes a job role and adds a specific slice of data to it. Instead of just "can manage payables," a data role says "can manage payables, for the US business unit only." It inherits the job role's function security and layers a data scope on top. Data roles show up more in HCM than in Financials, where data is usually scoped through data access sets and business unit assignment instead — that's chapter two.

## Segment 5 (outro)

Job roles, abstract roles, and data roles are what actually gets provisioned to a user. Up next, lesson four: duty roles and privileges, the building blocks underneath every one of them.
