import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import SidebarCustomer from "../../components/Sidebar/SidebarCustomer";
import ProfileCard from "../../components/Card/ProfileCard";

function Profile() {
  return (
    <>
      <Navbar />
      <div className="flex pt-1">
        <SidebarCustomer />
        <ProfileCard />
      </div>
      <Footer />
    </>
  );
}

export default Profile;
