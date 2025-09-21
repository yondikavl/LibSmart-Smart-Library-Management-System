import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata = {
  title: "Libsmart Admin",
  description: "Library Management Admin UI",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans", 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="min-h-screen bg-gray-50 font-sans">
        <main>{children}</main>
      </body>
    </html>
  );
}
