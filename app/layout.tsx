import { Providers } from "@/components/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import { Container } from "@/components/ui/container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Baca Quran",
  description: "Baca Quran Online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Container>
          <Providers>
            <Navbar />
            <Suspense fallback={<p>Loading...</p>}>
              <main>{children}</main>
            </Suspense>
            <Footer />
          </Providers>
        </Container>
      </body>
    </html>
  );
}
