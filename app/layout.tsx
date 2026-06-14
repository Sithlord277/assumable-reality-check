import type { Metadata } from "next";
// Self-hosted variable fonts (bundled from node_modules — no build-time or
// runtime fetch to Google, so this works offline and behind the corporate proxy).
// Display: Fraunces (warm optical serif). Body: Plus Jakarta Sans.
import "@fontsource-variable/fraunces";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Assumable Reality Check",
  description:
    "A five-minute reality check on assumable mortgages. Learn how they actually work, then find your smartest next step.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
