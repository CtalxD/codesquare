// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Code Square",
    short_name: "Code Square",
    description:
      "Software studio in Kathmandu, Nepal building websites, mobile apps and custom software.",
    start_url: "/",
    display: "standalone",
    background_color: "#e8eeeb",
    theme_color: "#12332e",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
