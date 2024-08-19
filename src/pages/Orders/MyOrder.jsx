import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SidebarCustomer from "../../components/Sidebar/SidebarCustomer";
import MyOrderCard from "../../components/Card/MyOrderCard";

function MyOrder() {
  return (
    <>
      <Navbar />

      <div className="flex bg-[#F5F5F5] pt-1">
        <SidebarCustomer />
        <MyOrderCard />
      </div>

      <Footer />
    </>
  );
}

export default MyOrder;
