import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

function MyBag() {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myBag = useSelector((state) => state.myBag);

  useEffect(() => {
    // Update selectAll state based on selectedItems
    if (myBag.myBag.length > 0) {
      setSelectAll(selectedItems.size === myBag.myBag.length);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems, myBag.myBag.length]);

  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all items
      setSelectedItems(new Set());
    } else {
      // Select all items
      setSelectedItems(new Set(myBag.myBag.map((item) => item.id)));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(itemId)) {
        newSelected.delete(itemId);
      } else {
        newSelected.add(itemId);
      }
      return newSelected;
    });
  };

  const handleRemoveSelectedItems = () => {
    selectedItems.forEach((itemId) => handleRemoveItem(itemId));
    setSelectedItems(new Set());
    setSelectAll(false);
  };

  const handleRemoveItem = (itemId) => {
    dispatch({ type: "REMOVE_FROM_MYBAG", payload: itemId });
  };

  const handleQuantityChange = (itemId, change) => {
    const item = myBag.myBag.find((item) => item.id === itemId);
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: { itemId, quantity: newQuantity } });
    }
  };

  const handleCheckout = () => {
    const itemIds = Array.from(selectedItems);
    dispatch({ type: "CHECKOUT_ITEMS", payload: itemIds });
    navigate("/checkout");
  };

  const totalPrice = myBag.myBag.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const selectedItemCount = selectedItems.size;
  const itemCount = myBag.myBag.length;
  return (
    <>
      <Navbar />
      <div className="container w-11/12 md:w-5/6 mx-auto py-8">
        {/* My Bag */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">My Bag</h2>

          <div className="flex flex-wrap lg:flex-nowrap justify-between">
            {/* Card Select All and Delete */}
            <div className="w-full lg:w-3/4 pr-0 md:pr-10">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  {/* Select all items */}
                  <div className="flex items-center">
                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="form-checkbox h-4 w-4 text-white bg-primary border-none rounded focus:ring-primary mr-4" />
                    <label htmlFor="selectAllItems"> Select all items</label>
                    <span className="text-gray-600 ml-2">
                      ({selectedItemCount} {selectedItemCount === 1 ? "item" : "items"} selected)
                    </span>
                  </div>
                  {/* Delete button */}
                  <button className="text-red-500 font-medium" onClick={handleRemoveSelectedItems}>
                    Delete
                  </button>
                </div>
              </div>

              {/* Individual Bag Items */}
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {myBag.myBag.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                      {/* Select item */}
                      <div className="flex items-center">
                        <input type="checkbox" checked={selectedItems.has(item.id)} onChange={() => handleSelectItem(item.id)} className="form-checkbox h-4 w-4 text-white bg-primary border-none rounded focus:ring-primary mr-4" />
                        <img src={item.photo} alt="Product" className="w-20 h-20 object-cover rounded-md mr-4" />
                        <div>
                          <p className="text-lg font-semibold">{item.product_name}</p>
                          <p className="text-gray-600">{item.category_name}</p>
                        </div>
                      </div>
                      {/* Price and Quantity */}
                      <div className="flex items-center">
                        <div className="flex items-center mr-4 md:mr-32">
                          {/* Button Minus */}
                          <button className="bg-gray-300 text-white px-2 py-2 rounded-full focus:outline-none " onClick={() => handleQuantityChange(item.id, -1)}>
                            <FaMinus />
                          </button>
                          {/* Quantity */}
                          <span className="px-3 font-semibold">{item.quantity}</span>
                          {/* Button Plus */}
                          <button className="bg-white border text-black px-2 py-2 rounded-full focus:outline-none" onClick={() => handleQuantityChange(item.id, 1)}>
                            <FaPlus />
                          </button>
                        </div>
                        {/* Price */}
                        <p className="text-lg font-semibold">{formatCurrency((item.price * item.quantity).toFixed(2))}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Shopping Summary and Total Price */}
            <div className="w-full lg:w-1/3">
              <div className="mb-8">
                {/* Total price */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <h3 className="text-md font-semibold mb-4">Shopping Summary</h3>
                  {/* Total price */}
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-sm text-gray-600">Total Price ({itemCount} items)</p>
                    <p className="text-md font-semibold text-black">{formatCurrency(totalPrice)}</p>
                  </div>
                  {/* Button Buy */}
                  <button onClick={handleCheckout} className="w-full px-4 py-2 text-white bg-primary rounded-full hover:bg-opacity-90 transition-all duration-200 ease-in-out">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyBag;
