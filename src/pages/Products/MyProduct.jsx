import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

import SidebarSeller from "../../components/Sidebar/SidebarSeller";
import MyProductCard from "../../components/Card/MyProductCard";

function MyProduct() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row pt-1 min-h-screen">
        <SidebarSeller />
        <MyProductCard />
      </div>

      <Footer />
    </>
  );
}

export default MyProduct;
