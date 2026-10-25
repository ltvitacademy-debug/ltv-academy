# Model Card Template

The six-section structure from Chapter 4, Lesson 21, as a fill-in template with the guiding
question each section actually answers. This is the same format the capstone (Lesson 24) asks
you to complete for the real feature you build — fill in a draft early, and treat it as a living
document (update it whenever something in it would otherwise become a lie, per Lesson 21).

---

## Model Details

*Answers: what is this, exactly?*

- Architecture / base model: [ ]
- Version: [ ]
- Training or fine-tuning date: [ ]
- License: [ ]

## Intended Use

*Answers: is this safe to use for X? What is it explicitly NOT for?*

- Intended use case(s): [ ]
- Explicitly NOT evaluated or approved for: [ ]
- Intended users: [ ]

## Training Data

*Answers: why does it behave oddly on this kind of input?*

- Data source(s) or, for a prompted system, what context/tools it has access to: [ ]
- Known gaps, imbalances, or domain mismatches: [ ]

## Evaluation Results

*Answers: what was it actually tested against, and what were the real numbers?*

- Eval dataset size and source (Lesson 7): [ ]
- Metrics and scores (Lesson 8 — accuracy / relevance / faithfulness, as applicable): [ ]
- Regression test status, if applicable (Lesson 10): [ ]

## Ethical Considerations

*Answers: what bias or fairness findings exist, and what risks are known?*

- Bias testing performed (Lesson 18) and findings: [ ]
- Known risks specific to this use case: [ ]

## Caveats & Limitations

*Answers: where is this known to fail or underperform?*

- Specific documented failure case(s) — not a generic disclaimer: [ ]
- Conditions under which a human should review the output instead of trusting it: [ ]

---

## Why this section order matters

Each section is written to answer one specific question someone will actually ask before
relying on the system — not as a formality. A card where "Caveats & Limitations" is empty or
says only "none known" is a card that hasn't been tested hard enough yet (Lesson 11's
red-teaming and Lesson 18's bias testing both exist specifically to give this section something
real to say). Fill in every section before this system is used for anything beyond your own
testing.
