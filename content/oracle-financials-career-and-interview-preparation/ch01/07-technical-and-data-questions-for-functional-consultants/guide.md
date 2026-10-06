# Technical and Data Questions for Functional Consultants

**Chapter 1 · Interview Preparation · Lesson 7 of 15**

You are not interviewing to be a developer. But Oracle Fusion Financials roles increasingly expect a functional consultant to be comfortable around data — reading a SQL query someone else wrote, understanding what FBDI and REST APIs actually do, and knowing enough to have a real conversation with the technical team instead of just handing them a problem and walking away. This lesson closes Chapter 1 with exactly that kind of question.

## What you'll learn

- How to answer "how technical are you?" honestly and usefully
- The data and integration concepts most likely to come up for a functional role
- A SQL example you should be able to read and explain, even if you'd never write it cold in an interview

## Q&A: Technical and data

**"How technical are you, really?"**
Answer this precisely rather than inflating or underselling it. A strong, honest answer: "I'm not a developer, but I've built FBDI loads, written SQL to reconcile subledgers to the GL, and worked with OTBI and BI Publisher for reporting. When something needs real development — a custom integration, a complex extension — I know enough to scope the problem and work with the technical team, not try to build it myself." That's a credible, specific answer a generic "I'm pretty technical" never is.

**"What's the difference between FBDI and a REST API for getting data into Oracle Fusion?"**
FBDI is batch — you prepare a file, load it, and it lands all at once through interface tables, which suits bulk data migration or periodic uploads. A REST API call is typically real-time, transactional, and suited to integrating with another live system (an e-commerce platform pushing orders into AR, for example) rather than a one-time bulk load.

**"Can you read and explain a reconciliation SQL query, even if someone else wrote it?"**
Yes — and you should expect to be shown one. The example below is the kind of query used to reconcile AP subledger activity to a GL control account balance, similar to what Chapter 3 of the capstone required to confirm the GRNI fix actually resolved the mismatch.

**"When would you escalate a data question to the technical team instead of answering it yourself?"**
When the question is about the underlying table structure, writing new integration code, or performance-tuning a query at scale — that's development work. When it's about what the data *means* functionally — why a transaction should or shouldn't appear in a given account, what a specific status represents — that's exactly the kind of question you're expected to own.

## A reconciliation query you should be able to read

This is illustrative — the actual table and column names in a real Oracle Fusion instance are more complex, but the logic (compare a subledger total to a GL balance for the same account and period) is exactly what you'd be asked to explain.

```
SELECT gl.period_name,
       gl.account_code,
       gl.gl_balance,
       ap.subledger_total,
       (gl.gl_balance - ap.subledger_total) AS variance
FROM   gl_balances gl
JOIN   ap_subledger_summary ap
  ON   gl.account_code = ap.account_code
 AND   gl.period_name  = ap.period_name
WHERE  gl.period_name = 'JAN-26'
 AND   (gl.gl_balance - ap.subledger_total) <> 0;
```

Reading it aloud: "This joins the GL balance for a period and account to the AP subledger's total for the same period and account, and returns only the rows where they don't match — exactly the kind of check that would have flagged the capstone's GRNI mismatch before Elena Marsh's call."

## Key terms

| Term | Meaning |
|---|---|
| FBDI | Batch, file-based bulk load through interface tables |
| REST API | Real-time, transactional integration with another live system |
| Variance query | A query that returns only the rows where two totals that should match don't |

## Lab

Read the SQL example above out loud, in plain English, as if explaining it to a non-technical client stakeholder in under thirty seconds.

## Check yourself

- Why is "I'm not a developer, but..." often a stronger answer than claiming deep technical skill you don't have?
- What's the practical difference between FBDI and a REST API integration?
- What kind of data question should you own versus escalate to the technical team?
