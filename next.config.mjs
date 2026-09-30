/** @type {import('next').NextConfig} */
const nextConfig = {
  // `.next` in this workspace is owned by another user, so build into `build/`.
  // NEXT_DIST_DIR lets the build be redirected when that dir is also
  // unwritable (e.g. a CI scratch run as a different user).
  distDir: process.env.NEXT_DIST_DIR || "build-verify",
};

export default nextConfig;
