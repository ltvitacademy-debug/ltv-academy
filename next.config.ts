import type { NextConfig } from "next";

// Every page here is prerendered at build time (generateStaticParams
// everywhere, no middleware/route handlers/cookies/next-image yet), so
// there's no need for a Netlify serverless function at all. Without
// this, Next still emits a per-route Lambda handler "just in case" —
// and loadLessonContent() (lib/courses.ts) reads guide.md/quiz.json via
// a dynamically-built fs path Next's tracer can't statically narrow,
// so it conservatively pulled the *entire* content/ directory (1.8GB+
// of slide/source-image PNGs across all three courses) into that
// handler's bundle, blowing past AWS Lambda's 250MB unzipped limit and
// failing the Netlify deploy. `output: "export"` removes the Lambda
// (and the trace question) entirely by shipping static HTML only.
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
