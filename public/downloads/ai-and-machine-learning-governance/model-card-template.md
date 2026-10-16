# Model Card Template

Use this template for every model above your organization's lowest risk tier (Lesson 24). Fill in every section — leaving one blank is itself a finding in an audit (Lesson 27). A completed example of this exact template, filled out for a fictional credit-decisioning model, is in the Worked Example Library ("Model Governance Package").

---

## Model name

`<system or model identifier, matching its registry entry — Lesson 13>`

## Version

`<version number, matching the registry's version history — Lesson 15>`

## Owner

`<team or named individual accountable for this model — Lesson 4>`

## Last reviewed

`<date>`

## Intended use

What decision or task this model is meant to support, and who the intended users are. Be specific — "helps with customer service" is not specific; "scores inbound support tickets 0-100 for routing priority to a human agent" is.

```
<intended use>
```

## Out-of-scope use

Uses this model was explicitly **not** validated for. This is the section that most often prevents a governance incident, because it stops a model built for one purpose from quietly getting reused for another.

```
<out-of-scope use>
```

## Training data

What the model learned from, at a summary level: sources, time range, size, and any known provenance or consent issues (Lesson 7).

```
<training data summary>
```

## Evaluation

The metrics used to judge this model "good enough," the results, and — if this model affects people — results broken out by relevant subgroup (Lesson 9, Lesson 24).

| Metric | Overall result | Subgroup result (if applicable) |
|---|---|---|
| | | |
| | | |

## Known limitations

Where this model underperforms, what it wasn't tested against, and any limitation discovered after launch (Lesson 22's incident-response process should feed this section going forward).

```
<known limitations>
```

## Risk tier

`<high / medium / low — per Lesson 24's likelihood x impact method, with a one-sentence justification>`

## Approval record

`<link to the approval-workflow sign-off record — Lesson 16>`

## Review schedule

`<how often this card and the model's risk tier get re-reviewed, tied to risk tier per Lesson 27>`
