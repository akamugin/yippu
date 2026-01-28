import "./globals.css";

export const metadata = {
  title: "Yippu",
  description: "衣服(yī fu), but make it 이뻐(yippeo).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
