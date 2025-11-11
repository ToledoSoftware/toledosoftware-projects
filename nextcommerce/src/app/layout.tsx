import type { Metadata } from "next";
import { Inter, Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import SearchOverlay from "../components/SearchOverlay";
import MobileMenu from "../components/MobileMenu";
import { Toaster } from 'sonner';

config.autoAddCss = false

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NextCommerce | Tech Edition",
  description: "E-commerce template com identidade visual high-tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${firaCode.variable} font-sans bg-dark text-text-primary flex flex-col min-h-screen`}>
        
        <Toaster 
          theme="dark" 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#1A1A1A', 
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#e0e0e0',
            },
          }}
        />

        <Header />
        <CartDrawer />
        <SearchOverlay />
        <MobileMenu />
        
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}