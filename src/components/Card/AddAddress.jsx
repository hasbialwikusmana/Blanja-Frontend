import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import api from "../../services/Api";
import Swal from "sweetalert2";

function AddAddress({ onClose, type, addressData, onSave }) {
  const [formData, setFormData] = useState({
    address_as: "",
    recipient_name: "",
    recipient_phone: "",
    address: "",
    postal_code: "",
    city: "",
    primary_address: false,
  });

  useEffect(() => {
    if (type === "edit" && addressData) {
      setFormData({
        address_as: addressData.address_as || "",
        recipient_name: addressData.recipient_name || "",
        recipient_phone: addressData.recipient_phone || "",
        address: addressData.address || "",
        postal_code: addressData.postal_code || "",
        city: addressData.city || "",
        primary_address: addressData.primary_address || false,
      });
    }
  }, [type, addressData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    // Check if all required fields are filled
    const isFormValid = Object.values(formData).every((value) => value !== "" && (typeof value !== "boolean" || value !== undefined));

    if (!isFormValid) {
      await Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    try {
      if (type === "add") {
        await api.post("/address", formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else if (type === "edit" && addressData) {
        await api.put(`/address/${addressData.id}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }

      // Show success alert and wait for confirmation
      const result = await Swal.fire({
        icon: "success",
        title: "Success",
        text: `Address has been successfully ${type === "add" ? "added" : "updated"}!`,
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });

      if (result.isConfirmed) {
        onSave(); // Refresh the address list after saving
        onClose(); // Close the modal only after confirmation
      }
    } catch (error) {
      console.error("Error saving address:", error);

      // Show error alert
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was a problem saving the address. Please try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <>
      <div className="relative">
        <button className="w-10 h-10 rounded-full flex item-center justify-center absolute -top-3 p-2 -right-3 hover:bg-slate-50" onClick={onClose}>
          <MdClose className="text-xl text-slate-400" size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">{type === "edit" ? "Edit Address" : "Add New Address"}</h2>

        <div className="flex flex-col gap-2 mt-10">
          <label className="text-[#9B9B9B] text-sm">Save address as (ex: home address, office address)</label>
          <input type="text" name="address_as" className="text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" placeholder="Rumah" value={formData.address_as} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#9B9B9B] text-sm">Recipient’s Name</label>
            <input type="text" name="recipient_name" className="text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" value={formData.recipient_name} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#9B9B9B] text-sm">Recipient’s Telephone Number</label>
            <input type="text" name="recipient_phone" className="text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" value={formData.recipient_phone} onChange={handleChange} required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#9B9B9B] text-sm">Address</label>
            <input type="text" name="address" className="text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#9B9B9B] text-sm">Postal Code</label>
            <input type="text" name="postal_code" className="text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" value={formData.postal_code} onChange={handleChange} required />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#9B9B9B] text-sm">City or Subdistrict</label>
          <input type="text" name="city" className="w-1/2 text-sm text-slate-950 outline-none border-2 border-[#0000000D] bg-white p-2 rounded" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input type="checkbox" name="primary_address" id="primaryAddress" className="form-checkbox text-primary accent-primary" checked={formData.primary_address} onChange={handleChange} />
          <label htmlFor="primaryAddress" className="text-[#9B9B9B] text-sm">
            Make it the primary address
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <button className="text-sm text-[#9B9B9B] border-2 border-[#0000000D] px-10 py-2 rounded-full hover:text-[#222222] mr-4" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-primary text-white font-medium text-sm px-10 py-2 rounded-full hover:bg-hoverPrimary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

AddAddress.propTypes = {
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["add", "edit"]).isRequired,
  addressData: PropTypes.shape({
    id: PropTypes.string,
    address_as: PropTypes.string,
    recipient_name: PropTypes.string,
    recipient_phone: PropTypes.string,
    address: PropTypes.string,
    postal_code: PropTypes.string,
    city: PropTypes.string,
    primary_address: PropTypes.bool,
  }),
  onSave: PropTypes.func.isRequired,
};

export default AddAddress;
