import { Providers } from "@/components/Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import { Container } from "@/components/ui/container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quran App",
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
            {children}
          </Providers>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
