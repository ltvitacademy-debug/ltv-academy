/*
 * Uploads a lesson video to Bunny.net Storage and serves it via the connected Pull Zone.
 * Usage: node upload-to-bunny.js <path to lesson.mp4> <public_id>
 * Requires BUNNY_STORAGE_ENDPOINT, BUNNY_STORAGE_API_KEY, BUNNY_PULL_ZONE_HOSTNAME.
 * Prints the same JSON shape as upload-to-cloudinary.js: { secure_url, duration, bytes }.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");

const storageEndpoint = process.env.BUNNY_STORAGE_ENDPOINT;
const apiKey = process.env.BUNNY_STORAGE_API_KEY;
const pullZoneHost = process.env.BUNNY_PULL_ZONE_HOSTNAME;
const filePath = process.argv[2];
const publicId = process.argv[3];

if (!storageEndpoint || !apiKey || !pullZoneHost) {
  console.error("Missing BUNNY_STORAGE_ENDPOINT / BUNNY_STORAGE_API_KEY / BUNNY_PULL_ZONE_HOSTNAME env vars");
  process.exit(1);
}
if (!filePath || !publicId) {
  console.error("Usage: node upload-to-bunny.js <path to lesson.mp4> <public_id>");
  process.exit(1);
}

function getDuration(file) {
  const out = execFileSync("ffprobe", [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    file,
  ], { encoding: "utf8" });
  return parseFloat(out.trim());
}

(async () => {
  const fileBuf = fs.readFileSync(filePath);
  const bytes = fileBuf.length;
  const duration = getDuration(filePath);

  const objectPath = `${publicId}.mp4`; // e.g. ltv-course/lesson-slug.mp4
  const uploadUrl = `${storageEndpoint}/${objectPath}`;

  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      AccessKey: apiKey,
      "Content-Type": "application/octet-stream",
    },
    body: fileBuf,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Bunny upload failed ${res.status}: ${text}`);
  }

  const secureUrl = `https://${pullZoneHost}/${objectPath}`;
  console.log(JSON.stringify({ secure_url: secureUrl, duration, bytes }, null, 2));
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
