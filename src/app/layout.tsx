import "./globals.css";
import Providers from "./providers";
import React from "react";

export const metadata = {
  title: "GSIS Dashboard",
  description: "GeoStrategic Intelligence Sandbox",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}