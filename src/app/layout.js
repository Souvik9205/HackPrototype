import Footer from "./(components)/Footer";
import Navbar from "./(components)/Navbar";
import "./globals.css";
import Providers from "./provider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <div className="flex-grow p-4">{children}</div>
          <div className="pt-14">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
