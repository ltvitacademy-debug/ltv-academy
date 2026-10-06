# Environments: DEV, TEST and PROD

**Chapter 3 · Working in Oracle Fusion · Lesson 16 of 20**

Lesson 9 mentioned that a customer's Production and non-production environments are logically separate. This lesson covers environments properly — what they're actually for, how customers typically name and use them, and how configuration moves between them.

## What you'll learn

- What Production and non-production environments actually are
- Common environment naming patterns you'll hear in the field
- Environment refresh, and why it matters
- How configuration moves between environments without "code deployment" in the on-premises sense

## Production: the real thing

**Production** is the environment where the company's actual business runs: real invoices, real payments, real financial statements. Mistakes here have real consequences — an incorrect configuration change pushed straight to Production could misstate the books, block real transactions, or expose data to the wrong people. This is why Production is never where new configuration or testing happens first.

## Non-production: everything else

Every Fusion Cloud customer has at least one **non-production** environment, commonly just called **Test**. Larger implementations sometimes split this into more than one — for example, a dedicated environment for ongoing configuration work (sometimes informally called "Dev" even though Oracle's own terminology is non-production) separate from one used specifically for structured testing before go-live. The exact naming varies by company and by how many non-production environments their subscription includes, but the underlying idea is consistent: a safe space to build and test changes before they ever reach Production.

## Environment refresh

Over time, a non-production environment's data can drift far from what Production actually looks like — new customers, new suppliers, and new transactions accumulate in Production that never get added to Test. To keep testing realistic, companies periodically perform an **environment refresh**: copying Production's data into the non-production environment, overwriting whatever was there. This is powerful but disruptive — any configuration work in progress in that non-production environment that hasn't been migrated elsewhere can be wiped out by a refresh, so implementation teams plan around refresh schedules deliberately.

## Moving configuration between environments

Unlike on-premises software, there's no "code deployment" to schedule between environments. Instead, configuration is typically **exported from one environment and imported into another** through the Setup and Maintenance work area (Lesson 18) — effectively packaging up setup choices and replaying them elsewhere, rather than deploying compiled code. This is also how an implementation team moves configuration that was built and validated in non-production into Production for go-live, and it's part of why reviewing a quarterly update in non-production first (Lesson 10) matters so much — it's the one place changes can be safely tested before that same migration path brings them to Production.

## Key terms

| Term | Meaning |
|---|---|
| Production | The environment where the real, live business runs |
| Non-production / Test | A safe environment for building and testing changes |
| Environment refresh | Copying Production's data into non-production to keep it realistic |
| Setup export/import | How configuration moves between environments, instead of code deployment |

## Check yourself

That closes Chapter 3. You're ready for Chapter 4 when you can explain why an environment refresh can disrupt ongoing configuration work, and why moving configuration between environments in Fusion Cloud looks different from deploying code in an on-premises system.
