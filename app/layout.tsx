import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import "./globals.css";

export default function RootLoayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
