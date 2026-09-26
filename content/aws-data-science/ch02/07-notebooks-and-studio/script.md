You have a domain and a way in. Now the daily work surface: the notebook. In SageMaker Studio that is a JupyterLab space. You already know Jupyter, so this lesson is about what changes when the notebook runs on a rented machine.

A JupyterLab space runs on a single EC2 instance, with a single EBS volume for storage. Your code, Git profile and environment variables live on that volume. The default size is 5 gigabytes, and you can raise it. The volume persists when you switch instance types. And the default image, SageMaker Distribution, includes pandas, scikit-learn, PyTorch and more.

Most people create a space in the Studio interface: name it, choose an instance type and storage, run it, and open it. Menu labels change, so follow the current console. Behind the scenes it is API calls like these. They are illustrative and not run here.

Measure before you guess. On our fifty thousand row table, pandas reported eight point one megabytes. Converting two text columns to the category type cut that to two point one. Scaling the plain figure to twenty million rows gives roughly three point three gigabytes, and that is a floor, since pandas makes temporary copies.

To customize the environment, open a terminal and use conda or pip. The volume persists, so your environments survive instance switches. The docs prefer a package manager over lifecycle configurations, which are harder to debug. Pin your versions in Git.

A few habits. Develop on a sample with a small instance. Turn on idle shutdown and stop apps you are not using. And treat the notebook as a control room: if data will not fit, push the work to Athena, Glue or a training job instead of buying a giant notebook.

Next, Lesson 8 prepares data with Data Wrangler.
