# Sharing Findings With Stakeholders

You have built an exploratory report and found something worth telling someone. Now the question changes from "what is in the data?" to "how does the right person see it, and only the right person?" This lesson covers publishing from Power BI Desktop, the sharing options in the Power BI service, and the security details that catch people out. Licensing and menu names change often, so treat this as a map and confirm specifics in Microsoft's current documentation.

## What you'll learn

- How to publish a report from Power BI Desktop to the Power BI service
- The main ways to share: links, workspaces, apps, and Teams
- What sharing a report also shares, and why hiding is not security
- When a plain image or PDF is the better deliverable

## Publish first

Sharing happens in the Power BI service, so the report has to get there. In Power BI Desktop, use **File > Publish > Publish to Power BI**, or select **Publish** on the Home ribbon. Sign in if prompted, pick a destination workspace from the list, and select **Select**. Per Microsoft's documentation, publishing sends the semantic model (the data model) and any reports you built to that workspace, and when it finishes you get a link to open the report.

Two details worth knowing:

- Changes you make to the report in the service are not saved back to your original Desktop file.
- Republishing replaces the semantic model in the service with the updated one from your file.

## Choose a sharing method

Microsoft's sharing overview lists several approaches. In plain terms:

| You want to... | Use |
| --- | --- |
| Show one report to a few named people | A direct link, using the **Share** button |
| Give a whole team a polished, read-only experience | Publish an **app** from a workspace |
| Work on the report together with teammates | A **workspace** with roles such as Admin, Member, Contributor, Viewer |
| Discuss findings where people already talk | Teams integration |

In the **Send link** dialog you choose who the link works for: people in your organization, specific people, or people who already have access. You can also decide whether recipients may reshare it or build their own reports from the data.

## Licensing, with a hedge

As of this writing, Microsoft's documentation says you generally need a Power BI Pro or Premium Per User license to share, and recipients need one too, unless the content sits in a Premium or Fabric capacity. Python visuals have their own licensing note: they require Pro or PPU to render in reports, and free-license viewers can only consume them in Premium workspaces. Requirements differ by organization and change over time, so ask your Power BI admin before promising a stakeholder access.

## Sharing a report shares its data

This is the detail that surprises people. Microsoft's guidance states that when you share a report, you also share access to its underlying semantic model, and a consumer's read access is not automatically limited to what is visible on the page. Hiding a column, visual, or page is not a security measure. If some people should only see certain rows, define row-level security on the semantic model. Also be careful with **Publish to web**: it makes a report public on the internet without authentication, including the underlying data.

## When an image is the better deliverable

Not every stakeholder lives in Power BI. Sometimes the best deliverable is a chart in an email or a slide. From Python it is a few lines, which we ran on the course's illustrative churn dataset:

```python
import matplotlib.pyplot as plt

rate = df.groupby("support_tickets")["churned"].mean()
fig, ax = plt.subplots(figsize=(6, 4))
rate.plot(kind="bar", ax=ax)
ax.set_title("Churn rises with support tickets")
fig.savefig("churn_by_tickets.png", dpi=200,
            bbox_inches="tight")
```

The result is a file you can paste anywhere. Notice the title states the finding, not just the variables. That habit is the subject of Chapter 5.

## Recap

- Publish from Desktop to a workspace, then share from the service.
- Pick the method that matches the audience: link, workspace, app, or Teams.
- Sharing a report also exposes its data model; use row-level security, not hiding.
- Confirm licensing with your admin before you promise access.
- A static image or PDF is often the right answer for non-Power BI users.
