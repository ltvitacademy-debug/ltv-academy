# Script — Auditing Analytics Access

## Segment 1 (title)

Setting up security is half the job. The other half is proving it worked, and investigating when something looks wrong. Who opened that dashboard? Which ones does nobody use? Who changed a security setting?

## Segment 2 (steps: three groups of questions)

Start with the questions, because audit tools only help when you know what you're asking. Usage: what's opened, by whom, and what's never touched. Performance: what loads slowly. Change and access: who altered a dataset or a security setting, and who signed in. Write the question first, then find the source that records it.

## Segment 3 (code: query event logs)

Salesforce's Event Monitoring records activity as event log files. For CRM Analytics, the documented types include Wave Interaction, Wave Change, and Wave Performance. The Wave name is a leftover from the product's original brand. Event Monitoring is typically licensed separately, so check your org. Query the EventLogFile object with SOQL, then load the files into your warehouse and model them with dbt.

## Segment 4 (steps: which source answers what)

Event logs cover usage and performance. For configuration changes, use Setup Audit Trail, and for sign-ins, use login history. Retention is limited, so verify how far back each goes and export what you need to keep. And remember what auditing can't do. Logs record events, not the exact rows someone saw. Row-level proof comes from your predicate design and testing.

## Segment 5 (outro)

Build a monthly review habit: top and unused assets, roles versus the org chart, and unexpected security changes. Next up: Data Governance for CRM Data.
