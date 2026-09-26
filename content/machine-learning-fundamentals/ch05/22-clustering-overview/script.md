Until now, every model you built had labels to learn from. Now the labels disappear. Clustering asks which rows naturally belong together when nobody has told you the answer. Retailers use it for customer segments, and analysts use it to explore data before modeling.

There are three main families. Centroid methods like k-means summarize each group by a center point. Hierarchical methods merge the closest points step by step into a tree. Density methods like DBSCAN treat crowded regions as clusters and label sparse points as noise.

Our illustrative dataset has three hundred customers with annual spend and visits per month. Notice the scales: spend runs into the thousands while visits stay in single digits. Clustering judges similarity by distance, so we standardize first, then fit k-means with three clusters.

Each cluster holds a hundred customers, and the silhouette score is zero point seven seven. That score runs from minus one to one and measures how much closer a point sits to its own cluster than to the next nearest. Values near zero point seven mean well separated groups.

On the left is what you start with, an unlabeled cloud. On the right is what clustering returns: three groups you can now describe.

A cluster label is just a number, so profile it. Group the original data by label and compare averages. One group spends about twelve hundred with few visits, another visits nearly nine times a month, and a third spends about three hundred. Name clusters by profile, never by number, because the numbers can change between runs.

With no answer key, you judge clusters by separation and by usefulness to the business. Next, we open up the most popular algorithm and see exactly how k-means works.
