import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SidebarSeller from "../../components/Sidebar/SidebarSeller";
import ProfileSellerCard from "../../components/Card/ProfileSellerCard";

function ProfileSeller() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row pt-1 min-h-screen">
        <SidebarSeller />

        <ProfileSellerCard />
      </div>
      <Footer />
    </>
  );
}

export default ProfileSeller;
