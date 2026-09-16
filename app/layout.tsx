import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import AnnouncementBar from "@/components/announcement-bar";
import Footer from "@/components/footer";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Iqbal Food | Premium Fast Food",
  description:
    "Iqbal Food serves premium burgers, BBQ, rolls, and more. Order online and enjoy fast delivery.",
  keywords: ["burgers", "bbq", "fast food", "Iqbal Food", "restaurant", "karachi"],
  openGraph: {
    title: "Iqbal Food | Premium Fast Food",
    description: "Iqbal Food – Order online, fast delivery.",
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
        <AuthProvider>
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
