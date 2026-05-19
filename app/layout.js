import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./providers";

export const metadata = {
  title: "ElevateU",
  description: "Online Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}