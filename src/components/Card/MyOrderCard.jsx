import { useEffect, useState } from "react";
import NoOrderImage from "../../assets/img/order/1.png";
import { FaSearch } from "react-icons/fa";
import api from "../../services/Api";
import { formatCurrency } from "../../utils/formatCurrency";
import { getOrderStatus } from "../../utils/statusOrder";
import { format } from "date-fns";
import { HiInformationCircle } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const MyOrderCard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await api.get("/orders/customer", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setOrders([]); // Set orders to empty array
        } else {
          console.error("Error fetching orders:", error);
        }
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
    return order.status.toLowerCase().includes(searchQuery.toLowerCase()) && (activeTab === "All" || (activeTab === "pending" && order.status === "pending") || (activeTab === "completed" && order.status === "completed"));
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

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-3/4 p-8 mt-16 h-screen">
      <div className="bg-white rounded-md border shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">My Orders</h2>
        <div className="flex mb-4">
          <button className={`mr-4 px-4 py-2 text-[#9B9B9B] focus:outline-none ${activeTab === "All" ? "text-primary font-semibold border-b-2 border-primary" : ""}`} onClick={() => handleTabClick("All")}>
            All items
          </button>
          <button className={`mr-4 px-4 py-2 text-[#9B9B9B] focus:outline-none ${activeTab === "pending" ? "text-primary font-semibold border-b-2 border-primary" : ""}`} onClick={() => handleTabClick("pending")}>
            Pending
          </button>
          <button className={`mr-4 px-4 py-2 text-[#9B9B9B] focus:outline-none ${activeTab === "completed" ? "text-primary font-semibold border-b-2 border-primary" : ""}`} onClick={() => handleTabClick("completed")}>
            Completed
          </button>
        </div>
        <hr className="mb-4" />

        <div className="flex items-center mb-4">
          <div className="relative w-1/4">
            <input type="text" placeholder="Search..." className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:border-primary" value={searchQuery} onChange={handleSearch} />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-gray-700">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-center px-4 py-2">ID Order</th>
                  <th className="text-center px-4 py-2">Quantity</th>
                  <th className="text-center px-4 py-2">Total</th>
                  <th className="text-center px-4 py-2">Status</th>
                  <th className="text-center px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-4 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <img src={NoOrderImage} alt="No Data" className="mx-auto object-cover w-1/4 mb-4" />
                        <p className="text-center text-[#222222]">There are no orders yet</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  displayedOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-center">
                        <p className="text-gray-700">{order.order_id}</p>
                      </td>
                      <td className="px-4 py-2 text-center">{order.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
                      <td className="px-4 py-2 text-center">{formatCurrency(order.total_price)}</td>
                      <td className="px-4 py-2 text-center">{getOrderStatus(order.status)}</td>
                      <td className="px-4 py-2 text-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-1 px-2 rounded" onClick={() => handleViewDetails(order)}>
                          <HiInformationCircle className="text-2xl" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {isModalOpen && selectedOrder && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
                    <button onClick={closeModal} aria-label="Close">
                      <AiOutlineClose className="text-gray-600 hover:text-gray-900 text-2xl" />
                    </button>
                  </div>
                  <div className="flex flex-col mb-6 max-h-[50vh] overflow-y-auto">
                    {selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
                          <img src={item.photo} alt={item.name} className="w-28 h-28 object-cover rounded-md" />
                          <div className="flex-1 ml-6">
                            <h3 className="text-lg font-semibold text-gray-800">{item.product_name}</h3>
                            <p className="text-gray-600">
                              Quantity: <span className="font-medium">{item.quantity}</span>
                            </p>
                            <p className="text-gray-600">
                              Price: <span className="font-medium">{formatCurrency(item.price)}</span>
                            </p>
                            <p className="text-gray-600">
                              Subtotal: <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">No items found for this order.</p>
                    )}
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-6">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-gray-700">Order Date:</p>
                      <p className="text-gray-800 font-semibold">{format(new Date(selectedOrder.created_at), "MMM dd, yyyy")}</p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-gray-700">Status:</p>
                      <p className="text-gray-800 font-semibold">{getOrderStatus(selectedOrder.status)}</p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-gray-700">Payment Method:</p>
                      <p className="text-gray-800 font-semibold">{selectedOrder.payment_method}</p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-gray-700">Total Quantity:</p>
                      <p className="text-gray-800 font-semibold">{selectedOrder.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-gray-700">Total Price:</p>
                      <p className="text-gray-800 font-semibold">{formatCurrency(selectedOrder.total_price)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {orders.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <button className={`px-4 py-2 text-white rounded-full ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"}`} onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <p className="text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <button className={`px-4 py-2 text-white rounded-full ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"}`} onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrderCard;
