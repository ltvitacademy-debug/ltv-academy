You present a model's accuracy on Monday. On Thursday your manager reruns your notebook and gets a slightly different number. Or a teammate clones your project and it crashes on their laptop. Nobody did anything wrong on purpose. The analysis just wasn't reproducible. Reproducibility means someone else, or you six months from now, can rerun your work and get the same result.

Start with randomness. Computers generate pseudo-random numbers from a starting value called a seed. Same seed, same sequence. Create a NumPy generator with the seed forty-two, draw three numbers, do it again, and you get the identical three numbers. Do it with no seed, and they almost never match. The number forty-two isn't magic. Pick any integer and keep it.

Randomness also hides in pandas and scikit-learn. Sampling rows, splitting into train and test sets, shuffling, and training many models all take a random state argument. Set it every time. With random state forty-two on our ten-row sample, the same three orders come back on every run.

Next, pin your environment. The same code can behave differently across library versions. Create a virtual environment for each project, run pip freeze to write every package and version into a requirements file, and commit that file. A teammate can recreate your exact setup with a single install command.

Then, stop hard-coding file paths. A path to your own desktop works on exactly one computer. Use pathlib and build paths relative to the project instead, so it works wherever it's cloned.

Finally, fingerprint your data. A SHA-256 hash of the raw file changes if even one character changes, so you can prove which data version produced a result. And treat raw data as read-only. Clean into a different folder, never over the original.

Seeds, pinned versions, relative paths, and fingerprints. With those, your Thursday number matches your Monday number. Next comes the Capstone.
