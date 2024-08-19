import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

import SidebarSeller from "../../components/Sidebar/SidebarSeller";
import SellingProductCard from "../../components/Card/SellingProductCard";

function SellingProduct() {
  return (
    <>
      <Navbar />

      <div className="flex bg-[#F5F5F5] pt-1">
        <SidebarSeller />
        <SellingProductCard />
      </div>

      <Footer />
    </>
  );
}

export default SellingProduct;
