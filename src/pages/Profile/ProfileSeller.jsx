import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SidebarSeller from "../../components/Sidebar/SidebarSeller";
import ProfileSellerCard from "../../components/Card/ProfileSellerCard";

function ProfileSeller() {
  return (
    <>
      <Navbar />

      <div className="flex bg-[#F5F5F5] pt-1">
        <SidebarSeller />
        <ProfileSellerCard />
      </div>

      <Footer />
    </>
  );
}

export default ProfileSeller;
