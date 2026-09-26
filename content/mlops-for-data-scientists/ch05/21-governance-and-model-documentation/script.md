Welcome to lesson twenty-one. A model that predicts well but cannot be explained, traced, or approved is a liability. Governance is the unglamorous half of MLOps.

Governance answers four questions. Lineage: which code, data, and environment made this model? Behaviour: how does it perform overall and for different segments? Purpose: what is it approved for, and what is it not? And accountability: who approved it, and when? If you work in a regulated field, outside rules may add more, so ask your compliance team.

For lineage, fingerprint the training data. Hash the contents of the training frame and keep the first twelve characters. Change one value and the fingerprint changes, so two people can confirm they trained on the same data without emailing files.

For behaviour, run a subgroup check. Here, basic customers cancel most, at sixteen percent, and are flagged most, which is the model working as intended. A U C varies from point six six four to point seven three two. And look at the group sizes: premium has only about eleven cancellations, so its A U C is very uncertain. Always report the count next to the score.

A picture helps the review meeting. In each segment, the flagged share tracks the real cancel rate.

For purpose, write a model card. It records the name and version, the intended use, what is out of scope, the metrics, the training data fingerprint, the limitations, and the monitoring thresholds from lesson nineteen. Store it as JSON next to the model, so it is versioned with it.

For accountability, keep an append-only audit trail: one line per decision, never edited. In a real team the same approval usually lives in a pull request review or a protected deployment environment. This file shows the shape of the data.

Next, the capstone begins: automating a model's full lifecycle.
