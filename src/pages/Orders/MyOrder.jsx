import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SidebarCustomer from "../../components/Sidebar/SidebarCustomer";
import MyOrderCard from "../../components/Card/MyOrderCard";

function MyOrder() {
  return (
    <>
      <Navbar />

      <div className="flex pt-1">
        <SidebarCustomer />
        <MyOrderCard />
      </div>

      <Footer />
    </>
  );
}

export default MyOrder;
