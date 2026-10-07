# Third-Party & External Evaluations

A lab grading its own model's safety is not a neutral act, even when everyone involved is acting in good faith. Financial incentive, competitive pressure, and simple closeness to the product all push in the same direction: toward results that look reassuring. This lesson covers why independent, external evaluation has become a standard part of frontier model releases, and what it can and can't actually guarantee.

## What you'll learn

- Why self-evaluation by the lab that built the model has structural limits, regardless of intent
- What organizations like METR, the UK AI Safety Institute, and Apollo Research actually do
- How pre-deployment testing agreements between labs and government institutes work
- What access and time constraints limit even well-resourced external evaluators

## The structural problem with grading your own work

A lab evaluating its own model has every reasonable technical skill needed to do it well, and still faces a conflict that technical skill can't resolve. Commercial pressure to ship favors interpretations of ambiguous eval results that lean toward "safe to release." Closeness to the product can create blind spots that an outsider would catch immediately. None of this requires bad faith — it's a structural property of being both the builder and the grader of the same thing, and it's the reason every mature safety-critical industry eventually develops independent inspection separate from the manufacturer.

## What independent evaluators actually do

METR (Model Evaluation and Threat Research) builds and runs autonomy and agentic-capability evaluations, often under time-limited pre-release access to frontier models, and publishes its own assessment rather than one filtered through the lab's communications team. The UK AI Safety Institute and similar government bodies run their own dangerous-capability testing on models before and after release, with legal and institutional independence from the companies being evaluated. Apollo Research focuses specifically on deceptive and strategic behavior, including the kind of situational-awareness and sandbagging questions covered in the previous lesson. Each organization brings a different lens, and none of them is simply re-running the lab's own test suite.

## How pre-deployment access agreements work

Several frontier labs have voluntarily granted external evaluators limited pre-release access to unreleased models, specifically so dangerous-capability testing can happen before, not just after, a model reaches the public. This is a meaningful step beyond pure self-regulation, but it is still voluntary and lab-controlled: the lab decides which evaluators get access, what access level they get (API-only versus something closer to raw model access), and how much time the evaluators have before a release date that the lab, not the evaluator, sets.

## The real limits even well-resourced evaluators face

External evaluators typically do not get model weights, meaning they can't run their own fine-tuning-based sandbagging checks or deep interpretability analysis. Time is usually compressed into days or weeks ahead of a launch, not the months a thorough evaluation might actually need. And evaluators generally see one model snapshot, not the full history of training decisions that produced it. External evaluation substantially improves on pure self-assessment, but it is not the same thing as full, unconstrained, adversarial access — and treating an external eval's clean result as a complete guarantee would be its own kind of overconfidence.

## Key terms

- **Self-evaluation** — a lab assessing the safety of its own model, which carries a structural conflict of interest regardless of the evaluators' individual good faith
- **Third-party evaluator** — an organization independent of the lab that built the model, such as METR, the UK AI Safety Institute, or Apollo Research, conducting its own assessment
- **Pre-deployment access agreement** — a voluntary arrangement granting an external evaluator limited access to an unreleased model specifically for safety testing before public release
- **API-only access** — a constrained form of model access, available over an interface, that doesn't include model weights or internal activations
- **Evaluator independence** — the degree to which an evaluating organization's findings, funding, and conclusions are free from control by the lab being evaluated
