/*
 * Uploads a lesson video to Cloudinary under folder ltv-powerbi/.
 * Usage: node upload-to-cloudinary.js <path to lesson.mp4> <public_id>
 * Requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const filePath = process.argv[2];
const publicId = process.argv[3];

if (!apiKey || !apiSecret || !cloudName) {
  console.error("Missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET env vars");
  process.exit(1);
}
if (!filePath || !publicId) {
  console.error("Usage: node upload-to-cloudinary.js <path to lesson.mp4> <public_id>");
  process.exit(1);
}

const timestamp = Math.floor(Date.now() / 1000);
const paramsToSign = { public_id: publicId, timestamp };
const toSign = Object.keys(paramsToSign).sort().map((k) => `${k}=${paramsToSign[k]}`).join("&");
const signature = crypto.createHash("sha1").update(toSign + apiSecret).digest("hex");

const boundary = "----CloudinaryBoundary" + Date.now();
const fields = { api_key: apiKey, timestamp, public_id: publicId, signature, resource_type: "video" };

const parts = [];
for (const [k, v] of Object.entries(fields)) {
  parts.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${k}"\r\n\r\n${v}\r\n`));
}
const fileBuf = fs.readFileSync(filePath);
parts.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${path.basename(filePath)}"\r\nContent-Type: video/mp4\r\n\r\n`));
parts.push(fileBuf);
parts.push(Buffer.from(`\r\n--${boundary}--\r\n`));
const body = Buffer.concat(parts);

fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
  method: "POST",
  headers: { "Content-Type": `multipart/form-data; boundary=${boundary}` },
  body,
})
  .then((r) => r.json())
  .then((json) => {
    if (json.error) throw new Error(json.error.message);
    console.log(JSON.stringify({ secure_url: json.secure_url, duration: json.duration, bytes: json.bytes }, null, 2));
  })
  .catch((e) => { console.error(e.message); process.exit(1); });
