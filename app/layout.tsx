import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import RentModal from "./components/modals/RentModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import ToastProvider from "./providers/ToastProvider";
import { Nunito } from "next/font/google";

export const metadata = {
  title: "Airbnb Clone",
  description: "An Airbnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ToastProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className='pt-24'>{children}</div>
      </body>
    </html>
  );
}
