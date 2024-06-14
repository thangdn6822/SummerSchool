import Navbar from "@/components/header/Navbar";
import Banner from "@/components/header/Banner";
import Footer from "@/components/footer/Footer";
import Popular from "@/components/main/Popular";
import AboutUs from "@/components/main/About";
import OutStandingStudent from "@/components/main/OutStandingStudent";
import Chat from "@/components/contact/Chat";
import ScrollToTopButton from "@/components/main/ScrollToTop";
import MyPartner from "@/components/main/MyPartner";
import "./globals.css";
export default function Home() {
  return (
    <div className="homepage-container">
      <Chat />
      <ScrollToTopButton />
      <div className="homepage-header">
      <Navbar />
      <Banner />
      </div>
      <div className="homepage-main">
        <Popular />
        <AboutUs />
        <OutStandingStudent />
        <MyPartner />
      </div>
      <div className="homepage-footer">
        <Footer />
      </div>
    </div>
  );
}
