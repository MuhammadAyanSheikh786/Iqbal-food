import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AM Foods | Premium Fast Food & Burgers",
  description:
    "AM Foods serves premium burgers, crispy fries, and delicious chips. Experience fast food reimagined with quality ingredients and bold flavors.",
  keywords: ["burgers", "fries", "fast food", "AM Foods", "restaurant"],
  openGraph: {
    title: "AM Foods | Premium Fast Food & Burgers",
    description:
      "AM Foods serves premium burgers, crispy fries, and delicious chips. Experience fast food reimagined with quality ingredients and bold flavors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
