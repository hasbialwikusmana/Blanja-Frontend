import { useEffect, useState } from "react";

import Modal from "react-modal";
import api from "../../services/Api";
import AddAddress from "./AddAddress";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

function AddressCard() {
  const [openAddModal, setOpenAddModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await api.get("/address/customer", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAddress(response.data.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddress();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await api.delete(`/address/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire("Deleted!", "Your address has been deleted.", "success");
        setAddress((prevAddresses) => prevAddresses.filter((addr) => addr.id !== id));
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      Swal.fire("Error!", "There was an error deleting the address.", "error");
    }
  };
  const handleSave = () => {
    setOpenAddModal((prev) => ({ ...prev, isShown: false }));
    setOpenAddModal((prev) => ({ ...prev, type: "add", data: null }));
    setOpenAddModal((prev) => ({ ...prev, type: "edit", data: null }));

    window.location.reload();
  };

  return (
    <>
      <div className="w-3/4 p-8">
        <div className="bg-white rounded-md border shadow-md p-6 mb-8 h-screen">
          <h2 className="text-lg font-semibold mb-4">Choose Another Address</h2>
          <p className="text-sm text-gray-600 mb-4">Manage your shipping address</p>
          <hr className="mb-4" />

          {/* Card Button for Adding New Address */}
          <div className="border-dashed border-2 border-[#9B9B9B] rounded-md p-4 mb-4 cursor-pointer" onClick={() => setOpenAddModal({ isShown: true, type: "add", data: null })}>
            <h3 className="text-lg text-[#9B9B9B] font-medium mb-2 text-center">Add New Address</h3>
          </div>

          <Modal
            isOpen={openAddModal.isShown}
            onRequestClose={() => setOpenAddModal({ isShown: false, type: "add", data: null })}
            style={{
              overlay: {
                backgroundColor: "rgba(0,0,0,0.2)",
              },
            }}
            contentLabel=""
            className="w-[50%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
          >
            <AddAddress type={openAddModal.type} addressData={openAddModal.data} onSave={handleSave} onClose={() => setOpenAddModal({ isShown: false, type: "add", data: null })} />
          </Modal>

          {/* Card for Displaying Address Data */}
          <div className="max-h-[400px] overflow-y-auto">
            {address.length > 0 ? (
              address.map((addr) => (
                <div key={addr.id} className="relative border border-primary rounded-md p-4 mb-4">
                  {/* Primary Address Label */}
                  {addr.primary_address && <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full">Primary Address</span>}
                  <h3 className="text-lg font-semibold mb-2">{addr.recipient_name}</h3>
                  <p>{`${addr.address}, ${addr.city}, ${addr.postal_code}`}</p>
                  <div className="flex gap-4 mt-4">
                    <button className="text-primary font-semibold" onClick={() => setOpenAddModal({ isShown: true, type: "edit", data: addr })}>
                      Change Address
                    </button>
                    <button className="text-red-500" onClick={() => handleDelete(addr.id)}>
                      <FaTrashAlt size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No addresses found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressCard;
