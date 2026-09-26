So far you have run single jobs. Real projects have several steps, like preparing data, training, and evaluating. Azure Machine Learning pipelines chain those steps together.

A pipeline is built from components. A component is one step with a clear contract: named inputs, named outputs, and the command and environment that run it. In a pipeline, one step's outputs feed the next step's inputs. You can register a component with a version so teammates reuse it. And by default, a component is treated as deterministic, so when its inputs have not changed, Azure ML can reuse the previous result instead of running it again.

Here is a component as illustrative YAML, not run here. Notice it is just a command: a code folder, an environment, and inputs passed on the command line with a double curly brace expression.

In the Python SDK, you load or define components, then call them like ordinary functions inside a function decorated with dsl dot pipeline. Passing one step's outputs into the next is what draws the graph.

You can feel that contract locally. I wrote a prep script and a training script that share nothing except folders and command line flags, and ran them one after another, logging metrics with MLflow. The trained model scored about seventy nine percent accuracy.

In the studio, a submitted pipeline appears as a graph. Each box is a component, and each line is data flowing from one step's output to the next step's input.

Registered components live under Assets, then Components, with versions and a history of jobs that used them. Combine this with last lesson: prepare data once in an early step, and sweep only the training step.

Next, in lesson eleven, we move to Databricks for machine learning.
