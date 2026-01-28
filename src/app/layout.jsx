import "./globals.css";
import { Inter } from "next/font/google";

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Yippu",
  description: "衣服(yī fu), but make it 이뻐(yippeo).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={bodyFont.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
