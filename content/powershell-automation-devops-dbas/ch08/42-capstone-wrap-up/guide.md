# Capstone: Wrap-Up & Portfolio Presentation

This is the last lesson of the course. Priya Nair's routine at Meridian Outfitters — and
everything you built across this capstone to fix it — is done. Before you go, it's worth
being precise about two things: what you actually built, and what finishing it means for
the larger path this course sits inside.

## What you'll learn

- A full recap of everything built across Lessons 37–41, as one connected system
- Exactly what completing this course closes out in the SQL Server Database
  Administrator career path
- What comes next, and how to turn this capstone into an actual portfolio piece

## What you built, end to end

Four pieces, working together, replacing three specific manual habits:

- **The automation suite** (`MeridianDBAOps`) — `Invoke-MeridianBackups`,
  `Invoke-MeridianHealthCheck`, and `Invoke-MeridianIndexMaintenance`, real dbatools
  scripts replacing the nightly SSMS click-through and the 40-minute morning routine
  (Lesson 38).
- **Source control and CI/CD** — `MeridianCommerce.sqlproj` in Git, a pull request
  instead of an emailed script, and an Azure DevOps pipeline that builds, deploys to
  test automatically, and only reaches production after a human approves it
  (Lesson 39).
- **Monitoring and alerting** — `Send-MeridianAlert`, tuned so a routine nightly batch
  job no longer pages a phone for a condition that resolves itself, while a genuinely
  sustained, critical issue still does (Lesson 40).
- **A story to tell** — the four-beat arc (before → suite → CI/CD → monitoring) framed
  differently for an interviewer versus a manager (Lesson 41).

## What this closes out

This course — **PowerShell, Automation & DevOps for DBAs** — is the fourth and final
course in the **Advanced SQL Server** stage of the **SQL Server Database Administrator**
career path. The other three courses in that stage are already complete:

- SQL Server Performance Tuning
- SQL Server HA, Backup & Disaster Recovery
- Azure Database Administrator

Finishing this course means the entire **Advanced SQL Server** stage is now done —
on-prem administration, deep performance tuning, high availability, the move to Azure,
and now automation and DevOps practice, the full skill set a working SQL Server DBA is
expected to bring to a senior role.

## What's still ahead

One stage remains in the path: **Multi-Platform Databases** — the last stage of the
entire SQL Server Database Administrator career path. It applies everything you've
built through this point to the platforms a senior DBA eventually runs into outside SQL
Server itself:

- **Cross-Platform Relational Database Administration** — Oracle, MySQL, and
  PostgreSQL, administered with the same instincts you just spent four courses building
- **NoSQL, Document & Graph Databases** — MongoDB, Cosmos DB, and Neo4j, a deliberately
  different data model from everything so far

That's not a redesign of what you've learned — it's the same DBA judgment, automation
mindset, and DevOps practice from this stage, applied to platforms you'll meet on the
job even if SQL Server stays your primary tool.

## Turning this into a portfolio piece

The Meridian Outfitters scenario is fictional, but the pattern is exactly what a real
portfolio project should look like: a specific, named problem (not "I automated some
stuff"), a real before-and-after, and artifacts someone else can actually look at. If you
build a version of this against your own SQL Server instance, keep:

- A README stating the specific manual problem, in plain terms, before any code
- Redacted versions of the actual scripts — real cmdlets, real logic, secrets and server
  names removed
- The before/after numbers, however rough — time saved, incidents avoided, noise
  reduced
- One real pull request or pipeline run as the visual artifact, exactly like Lesson 41
  recommended

## Key terms

| Term | Meaning |
|---|---|
| Advanced SQL Server stage | The 4-course stage this course completes: Performance Tuning, HA/Backup & DR, Azure DBA, and this course |
| Multi-Platform Databases stage | The path's final stage — Cross-Platform Relational DBA and NoSQL/Document & Graph Databases |
| Portfolio piece | A specific, named problem with a real before/after and reviewable artifacts, not a vague summary |

## Check yourself

Why does the path close the Advanced SQL Server stage with automation and DevOps
specifically, rather than ending it right after the Azure Database Administrator course?
What does automation add on top of already knowing performance tuning, HA/DR, and Azure
administration?
