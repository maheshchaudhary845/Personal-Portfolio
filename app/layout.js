import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900" ]
});

const roboto = Roboto({
  variable: "--roboto",
  subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900" ]

});

export const metadata = {
  title: "Mahesh Chaudhary - Personal Portfolio",
  description: "Portfolio of Mahesh Chaudhary, a Full-Stack Developer skilled in React, Next.js, Node.js, and MongoDB.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${roboto.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
