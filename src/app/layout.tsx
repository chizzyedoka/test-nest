import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/components-theme-provider";
import { ThirdwebProvider } from "thirdweb/react";
import { QueryProviders } from "@/components/providers";
import { headers } from "next/headers";
import { AuthProvider } from "./auth-providers";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Prompt Mining Labs",
  description: "Analytics and Insights for Prompt Mining",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = headers().get("cookie");

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning>
        <QueryProviders>
          <ThirdwebProvider>
            <AuthProvider>
              <ThemeProvider
                attribute='class'
                defaultTheme='dark'
                enableSystem={false}
                forcedTheme='dark'
                disableTransitionOnChange>
                {children}
                <Toaster />
              </ThemeProvider>
            </AuthProvider>
          </ThirdwebProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
