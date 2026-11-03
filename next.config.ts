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
  // `netlify dev`'s proxy (Next dev server -> Netlify's edge-function-aware
  // proxy -> browser) was labeling responses `content-encoding: gzip` while
  // actually sending plain, uncompressed HTML — real Chrome correctly
  // refuses this (net::ERR_CONTENT_DECODING_FAILED), curl silently didn't
  // care, which is why only the browser test hit it. Reproduced with raw
  // bytes: header said gzip, body started with literal "<!DOCTYPE html>"
  // rather than gzip's magic bytes. Disabling Next's own dev-server
  // compression removes the mismatched header Netlify's proxy was
  // otherwise forwarding uncompressed under.
  compress: false,
  // `next dev` (via `netlify dev`) crashed on Windows with an EPERM error
  // from its file watcher — traced to webpack's dev-server watcher trying
  // to track the 1.8GB+ content/ tree (hundreds of course folders) on top
  // of node_modules and the Prisma dev database. None of that needs
  // hot-reload: content/ is read at request time via fs, not imported as a
  // module, so changes there were never going to trigger a recompile
  // anyway — excluding it from the watcher doesn't change course content
  // or its own hot-reload behavior, it just stops the watcher choking on it.
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/content/**", "**/node_modules/**", "**/.netlify/**", "**/.git/**", "**/prisma/dev.db*"],
    };
    return config;
  },
};

export default nextConfig;
