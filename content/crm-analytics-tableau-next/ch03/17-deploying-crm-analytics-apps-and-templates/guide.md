# Deploying CRM Analytics Apps & Templates

Building a good dashboard in a sandbox is half the job. The other half is getting it, with its datasets, dataflows, and lenses, into the org where people will use it, and doing it repeatably. You have seen deployment in general Salesforce administration, and the idea is the same here: develop somewhere safe, test, then promote. CRM Analytics adds a few asset types and some quirks of its own. Product screens and packaging options evolve between releases, so confirm the details in the current documentation before you rely on them.

## What you'll learn

- Why you build in a sandbox and promote to production
- What a CRM Analytics app template is and where you find one
- How change sets move Analytics assets between orgs
- The common gotchas: dependencies, private apps, and data

## Develop in a sandbox, promote to production

Editing a live dashboard in production means your experiments are visible to executives. A better lifecycle is to create and test the app in a sandbox, then deploy it to production once it works. The unit you deploy is usually the **app**, the container holding dashboards, lenses, datasets, and the recipes or dataflows behind them, which you first met in the architecture lesson.

## Templates: apps you can stamp out

An **analytics template** is a reusable blueprint of an app: it describes the dashboards, datasets, and data preparation an app needs, so that a new app can be created from it. In Analytics Studio, the Browse page in the first screenshot has a **Templates** filter alongside Apps, Dashboards, Lenses, and Datasets, plus a **Create** button for starting new assets. Salesforce ships prebuilt templates for common use cases, and the second screenshot shows the home dashboard of the Sales Analytics app, one of the well-known prebuilt apps, with its KPIs and links to Leaderboard, Stage Analysis, Forecast, and more. Organizations can also create their own templates so that many teams, or many customer orgs, get the same solution.

Salesforce's documentation notes that templates make it easier to manage the asset references and org-specific identifiers, names, and schemas that make up a dataset. That matters because dashboards reference dataset IDs, and those differ from org to org.

## Moving assets with change sets

A common, admin-friendly route is **change sets**, the same mechanism you may know from other Salesforce metadata. As documented by Salesforce, the flow is:

1. In the source org (for example a sandbox), go to Setup and create an **outbound change set**.
2. Add components using the CRM Analytics component types. Salesforce lists analytics applications, dashboards, dataflows, datasets, lenses, recipes, and user XMD among the important ones.
3. **Upload** the change set to the target org, such as production.
4. In the target org, find it under **inbound change sets**, validate it, and deploy.

Other options exist, including packaging and metadata-based tooling. Which is right depends on your team's release process, and the documentation on packaging considerations is the place to check first.

## Gotchas to know

- **Dependencies are not always automatic.** Salesforce warns that if you add a dataset to a change set, the dataflows that populate it are not picked up for you. Add them manually.
- **Private apps cannot be moved.** Assets in a user's private app are not available for change sets. Move work into a shared app first.
- **Definitions are not the same as fresh data.** Deploying assets carries the definitions across. Plan to run your dataflows or recipes in the target org so the datasets are actually populated, and verify what your deployment method does or does not carry.
- **Test after deployment.** Open the dashboards in the target org, check the numbers against the source, and confirm the right people can see the app. Sharing is set per app.

## Recap

- Develop in a sandbox, then promote
- Templates let you create the same app repeatedly with correct dataset references
- Change sets move analytics assets: outbound, upload, inbound, validate, deploy
- Watch for missing dependent dataflows, private apps, and unpopulated datasets

## Check yourself

You added a dataset to a change set, but after deployment the target org has no data in it. List two things you would check.
