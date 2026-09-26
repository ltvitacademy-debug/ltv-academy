k-means makes you commit to k before it starts, and the data does not announce the answer. Too few clusters lump different customers together. Too many slice natural groups into pieces nobody can act on. Here are two standard diagnostics, and one more important check.

First, why inertia alone cannot choose k. Add more centroids and every row can only get closer to one, so inertia always falls as k rises. You cannot pick the lowest. Instead, you look for the point of diminishing returns, then get a second opinion from the silhouette score.

Sweep k from two to eight on our illustrative customers, and record inertia and silhouette each time. Fit k-means for each k with n init ten, append the inertia, and compute the silhouette score from the labels.

Read the results. Inertia drops from three hundred four to fifty two going from two clusters to three, then only about ten more at four, and less after that. The bend at k of three is the elbow. The silhouette peaks at zero point seven seven at k of three, then falls to zero point six four.

Plotted, the story is easy to see. On the left, the elbow at three. On the right, the silhouette peak at three. Both agree with the three groups built into this data. Output of the code above.

Real data is rarely this clean. When the elbow is vague, trust silhouette. When scores are close, prefer the smaller k. Check that each cluster is big enough and different enough to act on, and rerun with other seeds to see whether the groups are stable. Business usefulness has the final say.

Next, hierarchical clustering, which builds a whole tree of merges so you can decide how many groups you want after the fact.
