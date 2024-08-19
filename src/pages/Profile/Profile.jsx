import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SidebarCustomer from "../../components/Sidebar/SidebarCustomer";
import ProfileCard from "../../components/Card/ProfileCard";

function Profile() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row bg-[#F5F5F5] pt-1 min-h-screen">
        <SidebarCustomer />
        <ProfileCard />
      </div>
      <Footer />
    </>
  );
}

export default Profile;
