import "./globals.css";
import { Inter } from "next/font/google";
import ResponsiveAppBar from "@/components/NavbarHeader";
import SimpleBottomNavigation from "@/components/NavberFooter";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SHC Durable",
  description: "ระบบจัดการเกี่ยวกับครุภัณฑ์ในสถานกีฬาและสุขภาพ มทส.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <ResponsiveAppBar />
          {children}
          <SimpleBottomNavigation />
        </body>
      </Provider>
    </html>
  );
}
