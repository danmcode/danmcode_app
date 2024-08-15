import type { Metadata } from "next";
import NavBar from "../ui/components/navbar/nav-bar";
import SideBar from "../ui/components/sidebar/side-bar";
import Footer from "../ui/components/layout/footer";

export const metadata: Metadata = {
  title: "Danmcode App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SideBar />
        <NavBar />
        <div className="content">
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}