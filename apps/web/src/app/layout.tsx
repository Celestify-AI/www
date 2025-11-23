import { Inter, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter} ${geistMono} ${dmSerifDisplay} antialiased`}>
        {children}
      </body>
    </html>
  );
}
