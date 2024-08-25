import { useEffect, useRef, useState } from "react";
import profile from "../../assets/img/profile/1.png";
import Swal from "sweetalert2";
import api from "../../services/Api";

function ProfileSellerCard() {
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    store_name: "",
    store_description: "",
    photo: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const selersResponse = await api.get("/sellers/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const existingData = selersResponse.data.data;

        // Check if existingData is not null or undefined
        if (existingData) {
          setFormData({
            name: existingData.name || "",
            email: existingData.email || "",
            phone: existingData.phone || "",
            store_name: existingData.store_name || "",
            store_description: existingData.store_description || "",
            photo: existingData.photo || "",
          });
        } else {
          // Handle the case where data is null or undefined
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Profile data is missing.",
          });
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You do not have permission to view this profile.",
          }).then(() => {
            localStorage.clear();
            window.location.href = "/";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while fetching the profile.",
          });
        }
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedPhoto = e.target.files[0];
    if (selectedPhoto) {
      setPhoto(selectedPhoto);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedPhoto);
    }
  };

  const handleSelectImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    try {
      // Jika foto telah diubah
      if (photo) {
        const formDataToSend = new FormData();
        formDataToSend.append("photo", photo);

        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await api.put("/sellers/profile/update-image", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile photo updated successfully",
        });

        setFormData({
          ...formData,
          photo: response.data.data.photo,
        });
      } else {
        // Jika foto tidak diubah
        const response = await api.put("/sellers/profile", formData);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile updated successfully",
        });

        setFormData(response.data?.data || formData);
      }
    } catch (error) {
      console.error(error);

      // Tampilkan pesan error sesuai kondisi
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: photo ? "Failed to update profile photo" : "Failed to update profile",
      });
    }
  };

  return (
    <>
      <div className="w-3/4 p-8 mt-16">
        <div className="bg-white rounded-md border shadow-md p-6">
          {/* Form Data Profil */}
          <h2 className="text-lg font-semibold mb-4">My profile store</h2>
          <p className="text-sm text-gray-600 mb-4">Manage your profile information</p>
          <hr className="mb-4" />
          <form onSubmit={handleSubmitProfile}>
            <div className="flex flex-wrap">
              <div className="w-full md:w-2/3  px-4">
                <div className="p-6">
                  <div className="mb-4">
                    <label className="text-[#9B9B9B]  mr-2">Name</label>
                    <input type="text" className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" name="name" required value={formData.name} onChange={handleInputChange} />
                  </div>

                  <div className="mb-4">
                    <label className="text-[#9B9B9B]  mr-2">Store name</label>
                    <input type="text" className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" name="store_name" required value={formData.store_name} onChange={handleInputChange} />
                  </div>

                  <div className="mb-4">
                    <label className="text-[#9B9B9B]  mr-2">Email</label>
                    <input type="text" className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" name="email" readOnly value={formData.email} />
                  </div>

                  <div className="mb-4">
                    <label className="text-[#9B9B9B]  mr-2">Phone number</label>
                    <input type="text" className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" name="phone" required value={formData.phone} onChange={handleInputChange} />
                  </div>

                  <div className="mb-4">
                    <label className="text-[#9B9B9B] mr-2">Store description</label>
                    <div className="flex items-center">
                      <textarea
                        id="storeDescription"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-primary block w-full p-2.5"
                        name="store_description"
                        required
                        value={formData.store_description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded-full focus:outline-none hover:bg-hoverPrimary">
                      Save
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="w-full md:w-1/3 mb-4 flex ">
                <div className="p-6 rounded-md flex flex-col items-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                    <img src={image || formData.photo || profile} alt="Profile" className="object-cover w-full h-full" />
                    <input type="file" className="absolute inset-0 opacity-0" ref={fileInputRef} onChange={handleImageChange} />
                  </div>
                  <button type="button" onClick={handleSelectImageClick} className="bg-white text-[#9B9B9B] border border-[#9B9B9B] px-4 py-2 rounded-full focus:outline-none hover:bg-hoverPrimary hover:text-white">
                    Select image
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfileSellerCard;
