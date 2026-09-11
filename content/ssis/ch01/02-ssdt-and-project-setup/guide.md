# Lesson 2 — SSDT & Project Setup

**Chapter 1 · SSIS Fundamentals · Lesson 2 of 49**

## What you'll learn

- What SQL Server Data Tools (SSDT) actually is today: a Visual Studio
  workload, not a separate program you download on its own
- The extra step SSIS specifically needs — the Integration Services
  extension — that other SSDT project types don't
- How to create a new Integration Services project from the New Project
  dialog, and what you get the moment it's created
- What lands on disk the instant your project exists

## SSDT is a Visual Studio workload, not a separate installer

If you've searched for "SSDT download" and landed on an old blog post
that talks about a standalone SSDT installer, ignore it — that era is
over. **SQL Server Data Tools (SSDT)** is now installed *as a component
of Visual Studio itself* (2022 or later). You add it through the same
Visual Studio Installer you'd use to add any other workload.

1. Open the **Visual Studio Installer** (search "installer" from the
   Windows Start menu).
2. Choose **Modify** on the Visual Studio version you want to add SSDT
   to — or install Visual Studio fresh if you don't have it yet.
3. Under **Workloads**, check **SQL Server Data Tools**, which lives
   under the **Data storage and processing** toolset.

![Visual Studio Installer with the Data storage and processing toolset expanded and the SQL Server Data Tools checkbox selected.](/courses/ssis/ch01/02-ssdt-and-project-setup/data-workload-2022.png)
*The SQL Server Data Tools option under Data storage and processing.*

That workload gives you the relational database project tooling. It
does **not**, by itself, give you Integration Services projects.

## The extra step: the Integration Services extension

Analysis Services, Integration Services, and Reporting Services each
ship as their own separate **Visual Studio extension** — installed
through **Extensions → Manage Extensions** inside Visual Studio, or
downloaded from the Visual Studio Marketplace. For this course, install
the **Integration Services** extension for your Visual Studio version.
Without it, the **Integration Services Project** template simply won't
appear in the New Project dialog, no matter how carefully you installed
SSDT itself.

This two-step install — SSDT workload, then the SSIS extension — trips
up almost everyone the first time, so it's worth doing deliberately
rather than assuming one installer covers both.

## Create a new Integration Services project

Once both pieces are installed, creating your first project is quick:

1. In Visual Studio, select **File → New → Project**.
2. In the **New Project** dialog, search for or expand to **Business
   Intelligence**, and select the **Integration Services Project**
   template.
3. Give the project a name and a location, and select **OK**.

![New Project dialog with the Integration Services Project template selected under Business Intelligence.](/courses/ssis/ch01/02-ssdt-and-project-setup/ssis-ssdt-new-project.png)
*The Integration Services Project template in the New Project dialog.*

The **Integration Services Project** template creates a project that
contains exactly one, empty package — by default named
**Package.dtsx**. Everything you build for the rest of this course
starts from a project created this exact way.

## What you get immediately

The moment that project is created, Visual Studio also creates a
**solution** to contain it (unless you already had one open), and adds
a **Package.dtsx** file under an **SSIS Packages** folder in Solution
Explorer. Lesson 4 digs into exactly what a solution, a project, and a
package each are and how they nest — for now, just know that creating
the project is what puts that first empty package in front of you.

## Key terms

| Term | Meaning |
|---|---|
| SSDT | SQL Server Data Tools — a Visual Studio workload, not a standalone app |
| Integration Services extension | The separate Visual Studio extension that adds SSIS project templates |
| Integration Services Project | The New Project template that creates a project with one empty package |
| Package.dtsx | The default name Visual Studio gives the empty package a new project creates |

## Lab

1. Open the Visual Studio Installer and confirm (or add) the **SQL
   Server Data Tools** workload under **Data storage and processing**.
2. Install the **Integration Services** extension for your Visual
   Studio version from **Extensions → Manage Extensions**.
3. Create a new **Integration Services Project**, name it
   `SSIS Course`, and confirm you land on an empty `Package.dtsx` with
   the five tabs from Lesson 1 across the top.

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why
installing the SQL Server Data Tools workload alone isn't enough to see
the Integration Services Project template, and what the extra step is.
