k-means is the most widely used clustering algorithm because the idea fits in one sentence. You choose k, and it finds k center points so every row sits close to the center of its own group. Let's open it up and see exactly how it works.

Four steps. Pick k starting centroids. Assign every row to its nearest centroid. Move each centroid to the mean of its rows. Then repeat the assign and move steps until nothing changes. Each pass can only lower the total squared distance, which is called inertia, so the loop always settles.

On our scaled customers, inertia comes out to fifty two point three seven, and the best run settled in just two iterations. Inertia alone means little, but it lets you compare runs on the same data. The centers come back in scaled units, so inverse transform them to read business numbers.

Predict assigns new customers to the nearest center. Someone spending six fifty with eight visits lands in cluster one; someone spending two fifty with one visit lands in cluster two. Always reuse the same fitted scaler on new data, never a fresh one.

Starting points matter. With purely random starts and one attempt each, three seeds reach fifty two point three seven, but seed one gets stuck at three hundred thirty four, six times worse. That is why scikit-learn defaults to k-means plus plus starts and reruns the whole algorithm n init times, keeping the best.

k-means draws straight boundaries around round, similar-sized blobs. On the left, it nails our customers, with stars marking the centroids. On the right, two interlocking crescents get sliced down the middle. Output of the code you just saw.

So k-means needs scaled features, a chosen k, and round groups. But how do you choose k? That is the next lesson.
