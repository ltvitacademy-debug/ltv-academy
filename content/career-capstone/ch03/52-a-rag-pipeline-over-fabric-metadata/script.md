# Script — A RAG Pipeline Over Fabric Metadata

## Segment 1 (title)

"Which table has customer churn data?" is exactly the kind of question a data engineer gets asked constantly. This lesson traces that question through the full pipeline the last two lessons built up, end to end.

## Segment 2 (code: the full trace)

Every table's chunk was embedded once at index time. The question gets embedded with that same model at query time. Retrieval returns the closest match — DimCustomer, matched on "churn" appearing in both its description and its churn_risk_score column. Generation then answers using only that retrieved content.

## Segment 3 (code: the generated answer)

The answer names its source table and workspace explicitly — DimCustomer in Sales Analytics. That's the direct payoff of storing metadata alongside each vector: without it, the answer is an unverifiable claim; with it, someone can go open the table and confirm it themselves.

## Segment 4 (steps: grounding vs verification)

This closes the loop on the review habit running through the whole chapter. Grounding in retrieved content makes an answer far more reliable than an ungrounded guess, but it isn't the same as verified — if the catalog entry itself is stale, the pipeline will confidently repeat that staleness.

## Segment 5 (outro)

Lessons 44 through 52 traced one arc, from Copilot inside Fabric to a working RAG pipeline over the workspace's own metadata. Next up: using AI to generate test cases for pipelines, continuing the same generate-then-verify discipline in a new setting.
