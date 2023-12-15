// app/fonts.ts
import { Montserrat, Rubik } from "next/font/google";
import localFont from "next/font/local";

const kalnia = localFont({
  src: "../fonts/Kalnia/Kalnia-VariableFont_wdth,wght.ttf",
  variable: "--font-kalnia",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-rubik",
});

// const kalnia = Kalnia({
//   subsets: ["latin"],
//   variable: "--font-rubik",
// });

export const fonts = {
  rubik,
  montserrat,
  kalnia,
};
