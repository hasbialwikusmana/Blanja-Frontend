import AddressCard from "../../components/Card/AddressCard";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import SidebarCustomer from "../../components/Sidebar/SidebarCustomer";

function ShippingAddress() {
  return (
    <>
      <Navbar />

      <div className="flex pt-1">
        <SidebarCustomer />
        <AddressCard />
      </div>

      <Footer />
    </>
  );
}

export default ShippingAddress;
