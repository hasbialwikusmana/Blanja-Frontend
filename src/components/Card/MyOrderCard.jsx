import { useEffect, useState } from "react";
import NoOrderImage from "../../assets/img/order/1.png";
import { FaSearch } from "react-icons/fa";
import api from "../../services/Api";

const MyOrderCard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await api.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [currentPage, activeTab, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  const filteredOrders = orders.filter((order) => {
    return (
      order.status.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeTab === "All" ||
        (activeTab === "Pending" && order.status === "Pending") ||
        (activeTab === "Processed" && order.status === "Processed") ||
        (activeTab === "Sent" && order.status === "Sent") ||
        (activeTab === "Completed" && order.status === "Completed"))
    );
  });

  const ordersPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const displayedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="w-3/4 p-8">
      <div className="bg-white rounded-md border shadow-md p-6 mb-8 h-screen">
        <h2 className="text-lg font-semibold mb-4">My Orders</h2>
        <div className="flex mb-4">
          <button className={`mr-4 px-4 py-2 text-[#9B9B9B] focus:outline-none ${activeTab === "All" ? "text-primary font-semibold border-b-2 border-primary" : ""}`} onClick={() => handleTabClick("All")}>
            All items
          </button>
          <button className={`mr-4 px-4 py-2 text-[#9B9B9B] focus:outline-none ${activeTab === "Pending" ? "text-primary font-semibold border-b-2 border-primary" : ""}`} onClick={() => handleTabClick("Pending")}>
            Pending
          </button>
          <button className={`mr-4 px-4 py-2 text-[#9B9B9B] focus:outline-none ${activeTab === "Processed" ? "text-primary font-semibold border-b-2 border-primary" : ""}`} onClick={() => handleTabClick("Processed")}>
            Processed
          </button>
          <button className={`mr-4 px-4 py-2 text-[#9B9B9B] focus:outline-none ${activeTab === "Sent" ? "text-primary font-semibold border-b-2 border-primary" : ""}`} onClick={() => handleTabClick("Sent")}>
            Sent
          </button>
          <button className={`mr-4 px-4 py-2 text-[#9B9B9B] focus:outline-none ${activeTab === "Completed" ? "text-primary font-semibold border-b-2 border-primary" : ""}`} onClick={() => handleTabClick("Completed")}>
            Completed
          </button>
          <button className={`mr-4 px-4 py-2 text-[#9B9B9B] focus:outline-none ${activeTab === "OrderCancel" ? "text-primary font-semibold border-b-2 border-primary" : ""}`} onClick={() => handleTabClick("OrderCancel")}>
            Order cancel
          </button>
        </div>
        <hr className="mb-4" />

        {/* SEARCH */}
        <div className="flex items-center mb-4">
          <div className="relative w-1/4">
            <input type="text" placeholder="Search..." className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:border-primary" value={searchQuery} onChange={handleSearch} />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <img src={NoOrderImage} alt="No Data" className="mx-auto object-cover w-1/4 -mt-44 mb-4" />
            <p className="text-center text-[#222222]">There are no orders yet</p>
          </div>
        ) : (
          <>
            {displayedOrders.map((order) => (
              <div key={order.id} className="flex items-center mb-4">
                <img src={order.image} alt={order.name} className="w-20 h-20 object-cover mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{order.name}</h3>
                  <p className="text-sm text-gray-600">Payment: {order.payment_method}</p>
                  <p className="text-sm text-gray-600">Total: {formatPrice(order.total_price)}</p>
                </div>
                <div className="ml-auto">
                  <p className="text-sm text-gray-600">Status: {order.status}</p>
                </div>
              </div>
            ))}
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrderCard;
