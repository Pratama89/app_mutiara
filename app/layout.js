import "./globals.css";
import Header from "../components/header/page";
import Menu from "../components/menu/page";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* <Header /> */}
        <div className="flex flex-1">
          {/* <Menu /> */}
          <main className="flex-1 bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
