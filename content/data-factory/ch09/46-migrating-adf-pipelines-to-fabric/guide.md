# Lesson 46 — Migrating ADF Pipelines to Fabric

**Chapter 9 · Fabric Data Factory · Lesson 5 of 6**

## What you'll learn

- Three real migration paths, and when each fits
- What genuinely changes at the dataset/connection level
- Which ADF activities have no direct Fabric equivalent
- A real, workable migration sequence

## Three real paths, not one

Microsoft's own guidance is explicit: migration doesn't have to mean
"rebuild everything by hand." There are three genuinely distinct
paths:

| Path | What it does | Best for |
|---|---|---|
| **ADF item in a Fabric workspace** | Mounts your existing ADF as a native Fabric item — pipelines still run in Azure, but you manage them from Fabric | Discovery, side-by-side testing, gradual transition |
| **Built-in upgrade experience** | Assessment-first tool that scores each pipeline/activity as Ready, Needs review, Coming soon, or Not compatible | Pipelines with straightforward, high-parity logic |
| **Manual migration** | Rebuilding by hand in the Fabric UI | Complex pipelines, custom logic, low parity with Fabric |

Mounting an existing ADF into a Fabric workspace first — even before
deciding on a longer-term path — is genuinely a reasonable first
step for almost any migration: it gives you visibility and a
side-by-side view with zero pipeline rework.

## What changes at the dataset level

Here's the concrete difference Lesson 44 already introduced, seen
side by side. In ADF, a dataset is its own object with file path and
format settings:

![Azure Data Factory dataset configuration screen showing file path and compression settings as a standalone object.](/courses/data-factory/ch09/46-migrating-adf-pipelines-to-fabric/azure-data-factory-dataset-configuration.png)
*A separate, reusable dataset object — configured once, referenced by many activities.*

In Fabric, that same information moves inline, directly into the
Copy activity itself:

![Fabric Copy activity's Source tab showing connection, file path, and format settings defined directly within the activity.](/courses/data-factory/ch09/46-migrating-adf-pipelines-to-fabric/fabric-data-compression-configuration.png)
*The same file path and format settings, now living inside the activity's own Source tab — no separate object to migrate.*

When you migrate manually, this is genuinely the single most common,
repetitive task: every ADF dataset your pipelines reference becomes
inline configuration on whichever activity used it.

## What has no direct Fabric equivalent (yet)

A real, honest list worth knowing before you promise a stakeholder a
timeline:

- **Data Lake Analytics (U-SQL)** — a deprecated Azure service; there's
  no path forward, only removal.
- **Validation activity** — rebuild it using Get Metadata, pipeline
  loops, and If Condition activities together.
- **Notebook / Jar / Python activities (Databricks)** — replaced by a
  single, unified Databricks activity in Fabric.
- **Hive, Pig, MapReduce, Spark, Streaming (HDInsight)** — collapse
  into one HDInsight activity type in Fabric.
- **Azure-SSIS integration runtime** — genuinely still "to be
  determined" as of this course; if your pipelines run real SSIS
  packages, plan to keep them on classic ADF for now.

## A workable sequence

1. **Inventory** every pipeline, dataset, linked service, and
   integration runtime you actually have.
2. **Run the assessment tool** to see readiness categories per
   pipeline.
3. **Recreate connections** to replace linked services.
4. **Rebuild unsupported activities** using the Fabric alternatives
   above, or the Invoke Pipeline activity as a fallback.
5. **Rebuild triggers** — Fabric currently manages schedules
   per-pipeline, without ADF's centralized, reusable trigger model.
6. **Test thoroughly** against real expected outputs before cutting
   production traffic over.

## Key terms

| Term | Meaning |
|---|---|
| Upgrade experience | Fabric's built-in, assessment-first tool for evaluating and migrating ADF pipelines |
| Invoke Pipeline activity | Fabric's equivalent of ADF's Execute Pipeline activity |
| Parity | How closely a Fabric feature matches its ADF counterpart's capabilities |

## Lab

1. Pick one pipeline you built earlier in this course and list every
   dataset it references.
2. For each dataset, write what its inline equivalent would look like
   in a Fabric Copy activity.
3. Identify whether that pipeline uses any activity from the "no
   direct equivalent" list above.

## Check yourself

You're ready for Lesson 47 when you can explain, in one sentence, why
mounting an existing ADF into a Fabric workspace is often a
reasonable first step, even before you've decided on a full
migration plan.
