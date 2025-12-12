import {
  Inter,
  Geist_Mono,
  DM_Serif_Display,
  Roboto_Slab,
  Instrument_Serif,
} from "next/font/google";
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

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter} ${geistMono} ${dmSerifDisplay} ${robotoSlab} ${instrumentSerif} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
