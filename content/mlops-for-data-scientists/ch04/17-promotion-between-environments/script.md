Welcome to lesson seventeen. A validated model is not yet a live model. Software teams move builds through environments, and each step is a deliberate act with rules. Models need the same discipline, and because a model is just a file, promotion can be as small as moving a pointer.

The most important rule is to build once and promote the same file. Register a model with its version, its author, and a SHA-256 hash. Validate it against production before it enters staging. Promote it to production only if it was staged, its hash is unchanged, and someone approved it. Staging and production differ only in configuration, never in the model.

In code, each rule is a check that raises a named error. The model must be in staging first. Its hash must match the one recorded at registration. The approver must not be the author. Then the current production version is saved as the previous production, and the alias moves.

We ran this on a small file-based registry. Sending version two straight to production is refused. Moving it to staging works, because validation passes. Production is refused without an approver, and refused when the author approves their own model. With an approval from someone else, it goes live. Version three, the model that dropped a column, is refused at staging.

Swapping the model file after staging is caught by the hash check. And because the previous version was saved, rollback is just a pointer move. No retraining, no rebuild. Every change is written to an audit log.

GitHub has a matching feature called environments. As of this writing, an environment can require reviewers, add a wait timer, limit which branches can deploy, and hold its own secrets. We checked the YAML parses, but did not run it on GitHub.

Next, Chapter five: keeping a live model healthy, starting with data drift and concept drift.
