// import Footer from "../../components/Footer/Footer";
// import Navbar from "../../components/Navbar/Navbar";
// import gambar1 from "../../assets/img/products/1.png";
// import Modal from "react-modal";
// import { MdClose } from "react-icons/md";
// import { useState } from "react";
// import GopayIcon from "../../assets/img/payment/gopay.png";
// import PosIcon from "../../assets/img/payment/pos.png";
// import MasterCardIcon from "../../assets/img/payment/mastercard.png";

// // eslint-disable-next-line react/prop-types
// function AddAddressNew({ onClose }) {
//   const [addressType, setAddressType] = useState("");
//   const [recipientName, setRecipientName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [city, setCity] = useState("");
//   const [isPrimary, setIsPrimary] = useState(false);

//   const handleSaveAddress = () => {
//     // Lakukan sesuatu dengan data alamat yang disimpan
//     // Kemudian tutup modal
//     onClose();
//   };

//   return (
//     <>
//       <div className="relative">
//         <button className="w-10 h-10 rounded-full flex item-center justify-center absolute -top-3 p-2 -right-3 hover:bg-slate-50" onClick={onClose}>
//           <MdClose className="text-xl text-slate-400" size={24} />
//         </button>

//         <h2 className="text-2xl font-semibold text-center mb-4">Add new address</h2>

//         <div className="flex flex-col gap-2 mt-10">
//           <label className="text-[#9B9B9B] text-sm">Save address as (ex: home address, office address)</label>
//           <input type="text" className="text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" placeholder="Rumah" value={addressType} onChange={(e) => setAddressType(e.target.value)} />
//         </div>

//         <div className="grid grid-cols-2 gap-2 mt-4">
//           <div className="flex flex-col gap-2">
//             <label className="text-[#9B9B9B] text-sm">Recipient’s name</label>
//             <input type="text" className="text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label className="text-[#9B9B9B] text-sm">Recipient&#39;s telephone number</label>
//             <input type="text" className="text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-2 mt-4">
//           <div className="flex flex-col gap-2">
//             <label className="text-[#9B9B9B] text-sm">Address</label>
//             <input type="text" className="text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" value={address} onChange={(e) => setAddress(e.target.value)} />
//           </div>
//           <div className="flex flex-col gap-2">
//             <label className="text-[#9B9B9B] text-sm">Postal code</label>
//             <input type="text" className="text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
//           </div>
//         </div>

//         <div className="flex flex-col gap-2 mt-4">
//           <label className="text-[#9B9B9B] text-sm">City or Subdistrict</label>
//           <input type="text" className="w-1/2 text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" value={city} onChange={(e) => setCity(e.target.value)} />
//         </div>
//         <div className="flex items-center gap-2 mt-4">
//           <input type="checkbox" id="primaryAddress" className="form-checkbox  text-primary accent-primary" checked={isPrimary} onChange={(e) => setIsPrimary(e.target.checked)} />
//           <label htmlFor="primaryAddress" className="text-[#9B9B9B] text-sm">
//             Make it the primary address
//           </label>
//         </div>

//         <div className="flex justify-end mt-6">
//           <button className="text-sm text-[#9B9B9B] border-2 border-[#0000000D] px-10 py-2 rounded-full hover:text-[#222222] mr-4" onClick={onClose}>
//             Cancel
//           </button>
//           <button className="bg-primary text-white font-medium text-sm px-10 py-2 rounded-full hover:bg-hoverPrimary" onClick={handleSaveAddress}>
//             Save
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// // eslint-disable-next-line react/prop-types
// function AddAddress({ onClose }) {
//   const [openAddModal, setOpenAddModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   return (
//     <>
//       <div className="relative">
//         <button className="w-10 h-10 rounded-full flex item-center justify-center absolute -top-3 p-2 -right-3 hover:bg-slate-50" onClick={onClose}>
//           <MdClose className="text-xl text-slate-400" size={24} />
//         </button>

//         <h2 className="text-2xl font-semibold text-center mb-10">Choose another address</h2>
//         <div className="border-dashed border-2 border-[#9B9B9B] rounded-md p-4 mb-4 cursor-pointer" onClick={() => setOpenAddModal({ isShown: true, type: "add", data: null })}>
//           <h3 className="text-lg text-[#9B9B9B] font-medium mb-2 text-center">Add New Address</h3>
//         </div>
//         <Modal
//           isOpen={openAddModal.isShown}
//           onRequestClose={() => {}}
//           style={{
//             overlay: {
//               backgroundColor: "rgba(0,0,0,0.2)",
//             },
//           }}
//           contentLabel=""
//           className="w-[50%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
//         >
//           <AddAddressNew
//             onClose={() => {
//               setOpenAddModal({ isShown: false, type: "add", data: null });
//             }}
//           />
//         </Modal>

//         {/* Card for Displaying Address Data */}
//         <div className="border border-primary rounded-md p-4 mb-4">
//           <h3 className="text-lg font-semibold mb-2">Andreas Jane</h3>
//           <p>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</p>
//           <button className="text-primary font-semibold  mt-4 block" onClick={() => setOpenAddModal({ isShown: true, type: "edit", data: null })}>
//             Change Address
//           </button>
//         </div>

//         <div className="border border-primary rounded-md p-4">
//           <h3 className="text-lg font-semibold mb-2">Andreas Jane</h3>
//           <p>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</p>
//           <button className="text-primary font-semibold  mt-4 block" onClick={() => setOpenAddModal({ isShown: true, type: "edit", data: null })}>
//             Change Address
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// // eslint-disable-next-line react/prop-types
// function SelectPayment({ onClose }) {
//   return (
//     <>
//       <div className="relative">
//         <button className="w-10 h-10 rounded-full flex item-center justify-center absolute p-2 -top-1 hover:bg-slate-50" onClick={onClose}>
//           <MdClose className="text-xl text-slate-400" size={24} />
//         </button>

//         <h2 className="text-[22px] font-semibold text-left ml-10 mb-4">Payment</h2>

//         <hr className="border-2 mb-4" />

//         {/* Payment method */}
//         <div className="flex flex-col mb-4">
//           <h3 className="text-[16px] font-semibold mb-4">Payment method</h3>
//           {/* Gopay */}
//           <div className="flex items-center mb-4">
//             {/* Logo Gopay */}
//             <img src={GopayIcon} alt="Gopay Logo" className="w-[82px] h-[18px] mr-10" />
//             <label htmlFor="gopay" className="flex-1 mr-4 text-[#222222] font-semibold">
//               Gopay
//             </label>
//             <input type="checkbox" id="gopay" className="form-checkbox accent-primary" />
//           </div>
//           {/* Pos Indonesia */}
//           <div className="flex items-center mb-4">
//             {/* Logo Pos Indonesia */}
//             <img src={PosIcon} alt="Pos Indonesia Logo" className="w-[58px] h-[38px] mr-16" />
//             <label htmlFor="posIndonesia" className="flex-1 mr-4 text-[#222222] font-semibold">
//               Pos Indonesia
//             </label>
//             <input type="checkbox" id="posIndonesia" className="form-checkbox accent-primary" />
//           </div>
//           {/* Mastercard */}
//           <div className="flex items-center mb-2">
//             {/* Logo Mastercard */}
//             <img src={MasterCardIcon} alt="Mastercard Logo" className="w-[53px] h-[41px] mr-16" />
//             <label htmlFor="mastercard" className="flex-1 ml-1 text-[#222222] font-semibold">
//               Mastercard
//             </label>
//             <input type="checkbox" id="mastercard" className="form-checkbox accent-primary" />
//           </div>
//         </div>

//         <hr className="border-2 mb-4" />

//         {/* Shopping summary */}
//         <div className="flex flex-col">
//           <h3 className="text-[16px] font-semibold mb-4">Shopping summary</h3>
//           {/* Order */}
//           <div className="flex items-center justify-between mb-2">
//             <p className="font-medium text-[#9B9B9B]">Order</p>
//             <p className="font-semibold text-[#222222]">$40.0</p>
//           </div>
//           {/* Delivery */}
//           <div className="flex items-center justify-between mb-2">
//             <p className="font-medium text-[#9B9B9B]">Delivery</p>
//             <p className="font-semibold text-[#222222]">$5.0</p>
//           </div>
//         </div>

//         {/* Shopping summary */}
//         <hr className="border-2 mt-8 mb-4" />
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="font-medium text-[16px] ">Shopping summary</p>
//             <p className="font-semibold text-[18px] text-[#DB3022]">$45.0</p>
//           </div>
//           {/* Button Buy */}
//           <div className="flex justify-end items-center">
//             <button className="bg-primary text-[14px] text-white font-medium px-14 py-2 rounded-full hover:bg-hoverPrimary">Buy</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function Checkout() {
//   const [openAddModal, setOpenAddModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });
//   const [paymentModal, setPaymentModal] = useState({
//     isShown: false,
//     type: "payment",
//     data: null,
//   });
//   return (
//     <>
//       <Navbar />
//       <div className="container w-4/5 mx-auto py-8">
//         {/* Checkout */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
//         </div>

//         <div className="flex justify-between">
//           {/* My Bag */}

//           {/* Card Select All dan Delete */}
//           <div className="w-full pr-4">
//             <h5 className="text-sm font-semibold mb-4">Shipping Adress</h5>
//             <div className="bg-white rounded-lg shadow-md p-6 mb-4">
//               <p className="mb-4 font-semibold">Andreas Jane</p>
//               <p className="mb-4 text-gray-600">Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</p>
//               <p>
//                 <button className="bg-transparent text-gray-600 border border-gray-600 rounded-full px-4 py-2 hover:bg-gray-100 focus:outline-none" onClick={() => setOpenAddModal({ isShown: true, type: "add", data: null })}>
//                   Choose another address
//                 </button>
//               </p>

//               <Modal
//                 isOpen={openAddModal.isShown}
//                 onRequestClose={() => {}}
//                 style={{
//                   overlay: {
//                     backgroundColor: "rgba(0,0,0,0.2)",
//                   },
//                 }}
//                 contentLabel=""
//                 className="w-[50%] h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
//               >
//                 <AddAddress
//                   onClose={() => {
//                     setOpenAddModal({ isShown: false, type: "add", data: null });
//                   }}
//                 />
//               </Modal>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//               <div className="flex items-center justify-between mb-4">
//                 {/* Select item */}
//                 <div className="flex items-center">
//                   <img src={gambar1} alt="Product Image" className="w-16 h-16 object-cover rounded-md mr-4" />
//                   <div>
//                     <p className="text-lg font-semibold">Men&#39;s formal suit - Black</p>
//                     <p className="text-gray-600">Zalora Cloth</p> {/* Brand */}
//                   </div>
//                 </div>
//                 {/* Price */}
//                 <div className="flex items-center">
//                   <p className="text-lg font-semibold">$20.0</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//               <div className="flex items-center justify-between mb-4">
//                 {/* Select item */}
//                 <div className="flex items-center">
//                   <img src={gambar1} alt="Product Image" className="w-16 h-16 object-cover rounded-md mr-4" />
//                   <div>
//                     <p className="text-lg font-semibold">Men&#39;s formal suit - Black</p>
//                     <p className="text-gray-600">Zalora Cloth</p> {/* Brand */}
//                   </div>
//                 </div>
//                 {/* Price */}
//                 <div className="flex items-center">
//                   <p className="text-lg font-semibold">$20.0</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Card Shopping Summary dan Total Price */}
//           <div className="w-2/4 ">
//             {/* Shopping Summary */}
//             <div className="mb-8">
//               {/* Total price */}
//               <div className="bg-white rounded-lg shadow-md p-6 mb-4">
//                 <h3 className="text-md font-semibold mb-4">Shopping Summary</h3>
//                 {/* Order */}
//                 <div className="flex items-center justify-between mb-5">
//                   <p className="text-sm text-gray-600">Order</p>
//                   <p className="text-lg font-semibold">$40.0</p>
//                 </div>
//                 {/* Delivery */}
//                 <div className="flex items-center justify-between mb-4  border-gray-200">
//                   <p className="text-sm text-gray-600">Delivery</p>
//                   <p className="text-lg font-semibold ">$5.0</p>
//                 </div>

//                 <div className="border-b-4 mb-4 border-gray-200"></div>

//                 {/* Delivery */}
//                 <div className="flex items-center justify-between mb-4  border-gray-200">
//                   <p className="text-sm text-black font-semibold">Shopping summary</p>
//                   <p className="text-lg font-semibold text-red-500 ">$45.0</p>
//                 </div>
//                 {/* Button Buy */}
//                 <div className="text-center">
//                   <button className="bg-primary text-white w-full px-4 py-2 rounded-full focus:outline-none hover:bg-hoverPrimary" onClick={() => setPaymentModal({ isShown: true, type: "payment", data: null })}>
//                     Select Payment
//                   </button>

//                   <Modal
//                     isOpen={paymentModal.isShown}
//                     onRequestClose={() => {}}
//                     style={{
//                       overlay: {
//                         backgroundColor: "rgba(0,0,0,0.2)",
//                       },
//                     }}
//                     contentLabel=""
//                     className="w-[30%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
//                   >
//                     <SelectPayment
//                       onClose={() => {
//                         setPaymentModal({ isShown: false, type: "payment", data: null });
//                       }}
//                     />
//                   </Modal>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default Checkout;

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import AddAddress from "../../components/Card/AddressCard";
import { formatCurrency } from "../../utils/formatCurrency";
import api from "../../services/Api";
import GopayIcon from "../../assets/img/payment/gopay.png";
import PosIcon from "../../assets/img/payment/pos.png";
import MasterCardIcon from "../../assets/img/payment/mastercard.png";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function SelectPayment({ onClose, checkoutItems, addressPrimary, formattedDeliveryCost, formattedTotalPrice, formattedTotalPriceWithDelivery }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleOrderCreation = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const orderItems = checkoutItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
        seller_id: item.seller_id,
      }));

      const orderData = {
        items: orderItems,
        status: "pending",
        payment_method: paymentMethod,
        address_id: addressPrimary?.id,
      };

      await api.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "REMOVE_ALL_FROM_MYBAG" });
      // Show success message and redirect
      Swal.fire({
        icon: "success",
        title: "Order created successfully",
        text: "Thank you for your order!",
        confirmButtonText: "Close",
      }).then(() => {
        navigate("/my-order");
      });

      onClose();
    } catch (error) {
      console.error("Error creating order:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      <div className="relative">
        <button className="w-10 h-10 rounded-full flex item-center justify-center absolute p-2 -top-1 hover:bg-slate-50" onClick={onClose}>
          <MdClose className="text-xl text-slate-400" size={24} />
        </button>

        <h2 className="text-[22px] font-semibold text-left ml-10 mb-4">Payment</h2>

        <hr className="border-2 mb-4" />

        {/* Payment method */}
        <div className="flex flex-col mb-4">
          <h3 className="text-[16px] font-semibold mb-4">Payment method</h3>
          {/* Gopay */}
          <div className="flex items-center mb-4">
            {/* Logo Gopay */}
            <img src={GopayIcon} alt="Gopay Logo" className="w-20 h-auto mr-4" />
            <div className="flex-1 text-center">
              <span className="text-lg font-medium">Gopay</span>
            </div>
            <input type="checkbox" id="gopay" name="paymentMethod" value="gopay" onChange={(e) => setPaymentMethod(e.target.value)} className="form-checkbox accent-primary" checked={paymentMethod === "gopay"} />
          </div>
          {/* Pos Indonesia */}
          <div className="flex items-center mb-4">
            {/* Logo Pos Indonesia */}
            <img src={PosIcon} alt="Pos Indonesia Logo" className="w-16 h-auto mr-4" />
            <div className="flex-1 text-center">
              <span className="text-lg font-medium">Pos Indonesia</span>
            </div>
            <input type="checkbox" id="posIndonesia" name="paymentMethod" value="posIndonesia" onChange={(e) => setPaymentMethod(e.target.value)} className="form-checkbox accent-primary" checked={paymentMethod === "posIndonesia"} />
          </div>
          {/* Mastercard */}
          <div className="flex items-center mb-2">
            {/* Logo Mastercard */}
            <img src={MasterCardIcon} alt="Mastercard Logo" className="w-14 h-auto mr-4" />
            <div className="flex-1 text-center">
              <span className="text-lg font-medium">Mastercard</span>
            </div>
            <input type="checkbox" id="mastercard" name="paymentMethod" value="mastercard" onChange={(e) => setPaymentMethod(e.target.value)} className="form-checkbox accent-primary" checked={paymentMethod === "mastercard"} />
          </div>
        </div>

        <hr className="border-2 mb-4" />

        {/* Shopping summary */}
        <div className="flex flex-col">
          <h3 className="text-[16px] font-semibold mb-4">Shopping summary</h3>
          {/* Order */}
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-[#9B9B9B]">Order</p>
            <p className="font-semibold text-[#222222]">{formattedTotalPrice}</p>
          </div>
          {/* Delivery */}
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-[#9B9B9B]">Delivery</p>
            <p className="font-semibold text-[#222222]">{formattedDeliveryCost}</p>
          </div>
        </div>

        {/* Shopping summary */}
        <hr className="border-2 mt-8 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-[16px] ">Total Amount</p>
            <p className="font-semibold text-[18px] text-[#DB3022]">{formattedTotalPriceWithDelivery}</p>
          </div>
          {/* Button Buy */}
          <div className="flex justify-end items-center">
            <button className="bg-primary text-[14px] text-white font-medium px-14 py-2 rounded-full hover:bg-hoverPrimary" onClick={handleOrderCreation} disabled={!paymentMethod}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Checkout() {
  const [addressPrimary, setAddressPrimary] = useState(null);
  const [openAddModal, setOpenAddModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [paymentModal, setPaymentModal] = useState({
    isShown: false,
    type: "payment",
    data: null,
  });

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        const response = await api.get("/address/primary-address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddressPrimary(response.data.data);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, []);

  const checkoutItems = useSelector((state) => state.myBag.checkoutItems);
  const totalPrice = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const deliveryCost = 5000;
  const totalPriceWithDelivery = parseFloat(totalPrice) + deliveryCost;

  const formattedTotalPrice = formatCurrency(totalPrice);
  const formattedDeliveryCost = formatCurrency(deliveryCost);
  const formattedTotalPriceWithDelivery = formatCurrency(totalPriceWithDelivery);

  return (
    <>
      <Navbar />
      <div className="container w-11/12 md:w-5/6 mx-auto py-8 pt-32">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

        <div className="flex flex-wrap lg:flex-nowrap justify-between">
          {/* Shipping Address Section */}
          <div className="w-full lg:w-3/4 pr-0 md:pr-10">
            <div className="w-full mb-8">
              <h5 className="text-sm font-semibold mb-4">Shipping Address</h5>
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <p className="mb-4 font-semibold">{addressPrimary?.recipient_name}</p>
                <p className="mb-4 text-gray-600">{addressPrimary?.address}</p>
                <button onClick={() => setOpenAddModal({ isShown: true, type: "add", data: null })} className="bg-transparent text-gray-600 border border-gray-600 rounded-full px-4 py-2 hover:bg-gray-100 focus:outline-none">
                  Choose another address
                </button>

                <Modal
                  isOpen={openAddModal.isShown}
                  onRequestClose={() => setOpenAddModal({ isShown: false, type: "add", data: null })}
                  style={{
                    overlay: {
                      backgroundColor: "rgba(0,0,0,0.2)",
                    },
                  }}
                  contentLabel="Add Address Modal"
                  className="w-[50%] max-h-3/4 rounded-md mx-auto mt-14 p-5 overflow-scroll"
                >
                  <AddAddress onClose={() => setOpenAddModal({ isShown: false, type: "add", data: null })} />
                </Modal>
              </div>
            </div>

            {/* Checkout Items Section */}
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
              {checkoutItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    {/* Product Information */}
                    <div className="flex items-center">
                      <img src={item.photo} alt="Product" className="w-20 h-20 object-cover rounded-md mr-4" />
                      <div>
                        <p className="text-lg font-semibold">{item.product_name}</p>
                        <p className="text-gray-600">{item.category_name}</p>
                      </div>
                    </div>
                    {/* Price */}
                    <div className="flex items-center">
                      <p className="text-lg font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shopping Summary Section */}
          <div className="w-full lg:w-1/3">
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h3 className="text-md font-semibold mb-4">Shopping Summary</h3>

                {/* Total Price */}
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm text-gray-600">Order ({checkoutItems.length} items)</p>
                  <p className="text-md font-semibold text-black">{formattedTotalPrice}</p>
                </div>

                {/* Delivery Cost */}
                <div className="flex items-center justify-between mb-4 border-gray-200">
                  <p className="text-sm text-gray-600">Delivery</p>
                  <p className="text-md font-semibold text-black">{formattedDeliveryCost}</p>
                </div>

                <div className="border-b-4 mb-4 border-gray-200"></div>

                {/* Total Amount */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-black font-semibold">Total Amount</p>
                  <p className="text-lg font-semibold text-red-500">{formattedTotalPriceWithDelivery}</p>
                </div>

                {/* Payment Button */}
                <div className="text-center">
                  <button className="bg-primary text-white w-full px-4 py-2 rounded-full focus:outline-none hover:bg-hoverPrimary" onClick={() => setPaymentModal({ isShown: true, type: "payment", data: null })}>
                    Select Payment
                  </button>

                  <Modal
                    isOpen={paymentModal.isShown}
                    onRequestClose={() => {}}
                    style={{
                      overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                      },
                    }}
                    contentLabel=""
                    className="w-[30%] max-h-3/4 bg-white rounded-md mx-auto mt-[5rem] p-5 z-50"
                  >
                    <SelectPayment
                      onClose={() => setPaymentModal({ isShown: false, type: "payment", data: null })}
                      checkoutItems={checkoutItems}
                      formattedTotalPrice={formattedTotalPrice}
                      formattedDeliveryCost={formattedDeliveryCost}
                      formattedTotalPriceWithDelivery={formattedTotalPriceWithDelivery}
                      addressPrimary={addressPrimary}
                    />
                  </Modal>
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

// PropTypes
SelectPayment.propTypes = {
  onClose: PropTypes.func.isRequired,
  formattedDeliveryCost: PropTypes.string.isRequired,
  formattedTotalPrice: PropTypes.string.isRequired,
  formattedTotalPriceWithDelivery: PropTypes.string.isRequired,
  checkoutItems: PropTypes.array.isRequired,
  addressPrimary: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default Checkout;
