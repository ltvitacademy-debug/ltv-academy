# The SageMaker Environment

Chapter 1 gave you data and permissions. Now we meet the place where you will actually build models: Amazon SageMaker. This lesson maps the environment: what the product is called today, what a **domain** is, where your notebooks and files live, and which entry point to choose. If you know the Azure Machine Learning workspace from the Azure Data Science course, the domain plays a similar organizing role, though the pieces are arranged differently.

Product names on AWS change often, so this lesson follows the current AWS documentation as of this writing. Check the docs when a screen or label differs. No AWS account is used in this course text, so the code below was checked against SDK source and the boto3 service model but **not run** against AWS.

## What you'll learn

- What "SageMaker", "SageMaker AI" and "Unified Studio" refer to
- What a domain, user profile, space and app are
- Where your files live
- Which environment to choose
- The default S3 bucket, and how it ties back to IAM

## A note on names

On December 3, 2024, Amazon SageMaker was renamed **Amazon SageMaker AI**, according to the AWS docs. The rename does not change existing features, and API namespaces, CLI commands, managed policy prefixes such as `AmazonSageMaker`, and console and documentation URLs kept the `sagemaker` name. On the same date, AWS released the next generation of **Amazon SageMaker**, described as a unified platform for data, analytics and AI. It bundles SageMaker AI with a lakehouse, governance, SQL analytics, data processing, and **SageMaker Unified Studio**, a single development environment for all of it. This course focuses on SageMaker AI, the part that builds, trains and deploys models.

## The domain

Almost everything starts with a **domain**. Per the docs, a domain consists of an associated Amazon EFS file-system volume, a list of authorized users, and security, application, policy and VPC configurations. An account can have more than one domain.

Inside a domain:

- A **user profile** represents one person and is the main way to refer to them for sharing and reporting.
- A **space** manages the storage and resource needs of an application. Each space has a one-to-one relationship with an app instance, and is either **private** (one user) or **shared** (everyone in the domain).
- An **app** is the running application that reads and executes your notebooks, terminals and consoles.

An AWS documentation diagram, shown in this lesson's slides, illustrates a domain with user profiles, personal apps and shared spaces.

## Where your files live

For a JupyterLab or Code Editor space, the docs say each application gets its own Amazon EBS volume and cannot see another application's volume. Studio Classic spaces are instead attached to the domain's shared EFS volume. Practical advice: keep code in Git and data in S3, so nothing important lives only on a notebook disk.

## Choosing an environment

- **Amazon SageMaker Studio** is marked *Recommended* in the docs. It offers JupyterLab, Code Editor (based on Code-OSS, the open-source core of Visual Studio Code), RStudio, Canvas and Studio Classic. Domains created after November 30, 2023 use it by default.
- **Studio Classic** is the earlier experience, still supported.
- **Notebook instances** run Jupyter on one compute instance and do not require a domain.
- **Studio Lab** is a free service that needs no AWS account.

## Setting up and staying cost-aware

The setup guide offers **quick setup** for individuals and **custom setup** for administrators configuring many users. Idle apps can cost money, so use idle shutdown: for JupyterLab and Code Editor it can be set at the domain or user-profile level, and it needs the SageMaker Distribution image version 2.0 or newer. Check current pricing before you leave anything running.

## Illustrative code

To list what exists in an account:

```python
import boto3
sm = boto3.client("sagemaker")
domains = sm.list_domains()
sm.list_spaces(DomainIdEquals="d-xxxxxxxx")
```

And the default bucket. With SageMaker Python SDK v2, `sagemaker.Session().default_bucket()` returns a name of the form `sagemaker-{region}-{AWS account ID}`, creating the bucket if needed, as its source documents. That name contains `sagemaker`, which is exactly the pattern the managed policy from Lesson 5 covers.

## Recap

- SageMaker AI is the ML service; Unified Studio belongs to the wider SageMaker platform.
- A domain holds user profiles, spaces and apps.
- Prefer Studio; keep code in Git and data in S3.
- Turn on idle shutdown and watch costs.

Next, Lesson 7 works inside notebooks and Studio.
