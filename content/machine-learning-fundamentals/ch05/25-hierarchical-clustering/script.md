k-means makes you choose k first. Hierarchical clustering flips that around. It builds a complete family tree of your data, then you decide afterward where to cut it. It is a great exploration tool, and some variants handle shapes that defeat k-means.

Agglomerative clustering works bottom up. Start with every row as its own cluster. Merge the two closest clusters. Repeat until one remains. With three hundred customers, that is two hundred ninety nine merges, recorded as a tree called a dendrogram.

But closest needs a rule, called linkage. Ward merges whichever pair adds the least variance, giving compact, even groups. Complete uses the farthest members, average uses the mean of all pairs, and single uses the closest pair, which can follow long, chained shapes.

In SciPy, linkage with method ward returns the merge table, two ninety nine rows. The last three merge distances are four point three one, twenty two point four six, and twenty four point three one. That huge jump after the first says there are three natural groups. Cut the tree with fcluster to get one hundred customers in each.

If you only want labels, scikit-learn's AgglomerativeClustering does the job with the same fit interface. Here it matches k-means exactly, with a silhouette of zero point seven seven, and all four linkages agree because these blobs are clean.

On the left, the dendrogram's last twelve merges, with a dashed cut line that leaves three branches. On the right is where linkage matters. Single linkage splits two interlocking crescents one fifty and one fifty, exactly right, while ward cuts across them, one eighty four and one sixteen. Output of the code above.

The cost: hierarchical clustering compares many pairs, so it suits thousands of rows, not millions. Next, a different kind of unsupervised learning: shrinking many columns into a few with PCA.
