import type { NextConfig } from "next";

const isEdgeOneBuild = process.env.EDGEONE_BUILD === "1";

const nextConfig: NextConfig = isEdgeOneBuild
  ? {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
      // The app itself is fully static. Cloudflare-only helper files are not
      // part of this EdgeOne build but are still visible to Next's type scan.
      typescript: { ignoreBuildErrors: true },
    }
  : {};

export default nextConfig;
