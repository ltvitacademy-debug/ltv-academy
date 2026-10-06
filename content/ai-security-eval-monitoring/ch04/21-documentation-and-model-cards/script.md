# Script — Documentation & Model Cards

## Segment 1 (title)

Everything this course has built — eval datasets, drift baselines, bias tests — lives in someone's head unless it's written down. "The model works" is a claim about behavior. A model card is what lets someone else verify that claim without re-running every eval themselves.

## Segment 2 (steps: where the format comes from)

This isn't invented for this course. It comes from a 2019 Google research paper, and it's become close to a de facto standard — Hugging Face requires one for every model on its hub, and the structure maps closely onto the EU AI Act's documentation requirements.

## Segment 3 (code: model card sections)

Model details — architecture, version, license. Intended use — what it's for, and explicitly what it's not. Training data — sources and known gaps. Evaluation results — real numbers. Ethical considerations and caveats — where it's known to fail.

## Segment 4 (steps: intended use matters)

The Intended Use section is where real-world harm gets prevented cheaply. A model tested for internal summarization, deployed without documentation into a customer-facing role it was never evaluated for — that's a known pattern behind real incidents. One sentence closes off a category of foreseeable misuse.

## Segment 5 (outro)

A model card written at launch and never touched again goes stale the moment the model is retrained or drift is detected. Treating it as a living document is what keeps it worth trusting. Next up: incident response — what happens when something still goes wrong anyway.
