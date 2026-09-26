A model in a notebook helps nobody. The retention team needs a list every cycle, and someone has to be able to rerun this in six months without you. So we package it. To be clear up front: everything here runs locally and is illustrative. No cloud, no production traffic.

First, decide what ships. Retention contacts about ten percent of customers per cycle, so the main product is a batch job run once per cycle: score everyone, apply the capacity limit, write a contact list. The model gives a probability. The capacity limit only makes sense on a whole list, so it belongs to the batch job, not to an API that sees one customer at a time.

Save the whole pipeline with joblib, not just the classifier, so imputing, scaling, and encoding travel with it. Add a model card in JSON: version, feature lists, break-even probability of point two oh eight, test metrics, and library versions. Load a joblib file only if you trust its source, because it is a pickle.

Then the scoring function. It rejects missing columns, forces numeric types, and stamps every row with the model version.

Next, the API contract. It states exactly what a caller must send, fifteen features, and what comes back: a probability, a flag for above break-even, and the version. With FastAPI, a Pydantic model enforces it. An unknown plan or a negative order count returns a four twenty-two error instead of a silent guess.

We tested it. A fresh process reproduces five golden predictions exactly. A live server answered, and the batch job scored thirty-six hundred ninety customers and wrote a contact list of three hundred sixty-nine.

The Dockerfile pins the same library versions as training and starts the server. We did not run it, because this machine has no Docker. Say that plainly.

What is missing for production: authentication, monitoring, automated tests, hosting, and retraining. Next, we plan the monitoring.
