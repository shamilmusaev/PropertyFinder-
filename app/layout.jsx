import Navbar from "@/components/Navbar";
import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Property Finder | Find the perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties"
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
    </AuthProvider>
  );
}
