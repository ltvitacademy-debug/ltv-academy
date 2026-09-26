A model that is retrained every month needs more than notebook cells. SageMaker Pipelines runs your workflow as a repeatable, parameterized graph.

A typical pipeline has four stages. A processing step cleans and splits the data. A training step fits the model. An evaluation step, itself a processing job, writes a metrics file. And a condition step decides: if the metric is good enough, register the model, otherwise stop or fail.

This is the AWS documentation's example, shown in Studio. Notice that nobody drew the arrows by hand. The graph comes from data dependencies: when one step's output is used as another step's input, the pipeline links them. The condition step branches to register the model on true, and to a fail step on false.

I built a small local sketch of this idea, not the real service. Processing scripts are plain file in, file out Python, so they run anywhere. With a minimum accuracy of point six, the model passes. Change that one parameter to point eight, and the same code and data now fail the gate.

In the SDK, illustrative and not run here, the gate is a ConditionStep. It compares a value read from the evaluation report with JsonGet against a pipeline parameter, and lists which steps run on true and which on false. Import paths differ between SDK versions, so check yours.

You then create the pipeline from its parameters and steps, upsert it with a role, and start it. Starting is where you override parameters, so one definition serves many runs. Steps inside the condition branches must not be repeated in the main step list.

What you gain: parameters, caching that reuses identical successful steps, scheduling through EventBridge, and a quality gate so that a weak model never gets registered.

Pipelines compute features again and again. Next, in lesson fourteen, the Feature Store shares them.
