import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import MyOrderSellerCard from "../../components/Card/MyOrderSellerCard";
import SidebarSeller from "../../components/Sidebar/SidebarSeller";

function MyOrder() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row pt-1">
        <SidebarSeller />
        <MyOrderSellerCard />
      </div>

      <Footer />
    </>
  );
}

export default MyOrder;
